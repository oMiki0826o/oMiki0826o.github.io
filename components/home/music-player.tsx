/*
 * File: music-player.tsx
 * Modification: 2026-10-11 — Robust async control, keyboard seeking and honest single-track controls.
 */
'use client';
import {useCallback, useEffect, useRef, useState, type CSSProperties} from 'react';
import {musicTracks} from '@/content/music';
import {createYouTubeAdapter} from '@/lib/player/youtube';
import type {PlayerAdapter, PlayerState} from '@/lib/player/types';
import type {Locale} from '@/i18n/config';
import {localize} from '@/lib/content';
import {ui} from '@/i18n/ui';

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '00:00';
  return `${String(Math.floor(value / 60)).padStart(2,'0')}:${String(Math.floor(value % 60)).padStart(2,'0')}`;
}

function PlayerIcon({kind}: {kind: 'restart' | 'play' | 'pause' | 'open'}) {
  if (kind === 'restart') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8V4m0 4h4M5.4 8.2A7.5 7.5 0 1 1 4.9 14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
  if (kind === 'open') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16 16.5 7.5M10 7.5h6.5V14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
  if (kind === 'pause') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6v12M16 6v12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z" fill="currentColor" /></svg>;
}

export function MusicPlayer({locale}: {locale: Locale}) {
  const copy = ui[locale].player;
  const track = musicTracks[0]!;
  const [state, setState] = useState<PlayerState>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const adapterRef = useRef<PlayerAdapter | null>(null);
  const loadingRef = useRef<Promise<PlayerAdapter> | null>(null);
  const mountedRef = useRef(true);
  const volumeRef = useRef(volume);
  const currentDuration = useRef(0);
  const endedHandledRef = useRef(false);

  const ensureAdapter = useCallback(async () => {
    if (adapterRef.current?.snapshot().state === 'error') {adapterRef.current.destroy();adapterRef.current = null;}
    if (adapterRef.current) return adapterRef.current;
    if (loadingRef.current) return loadingRef.current;
    if (!hostRef.current) throw new Error('播放器尚未準備好');
    const host = hostRef.current;
    setLoading(true);
    setError('');
    loadingRef.current = createYouTubeAdapter(host, track.youtubeId, (next) => {if (mountedRef.current) {setState(next);if(next==='error')setError('YouTube 影片暫時無法播放');}})
      .then((adapter) => {
        if (!mountedRef.current) {adapter.destroy(); throw new Error('播放器已關閉');}
        adapter.setVolume(volumeRef.current);
        adapterRef.current = adapter;
        return adapter;
      }).catch((reason: unknown) => {
        if (mountedRef.current) {setState('error');setError(reason instanceof Error ? reason.message : '音樂播放器暫時無法使用');}
        throw reason;
      }).finally(() => {
        loadingRef.current = null;
        if (mountedRef.current) setLoading(false);
      });
    return loadingRef.current;
  }, [track.youtubeId]);

  useEffect(() => {
    mountedRef.current = true;
    const timer = window.setInterval(() => {
      const adapter = adapterRef.current;
      if (!adapter) return;
      const snapshot = adapter.snapshot();
      if (Number.isFinite(snapshot.duration)) {currentDuration.current = Math.max(0,snapshot.duration); setDuration(currentDuration.current);}
      setCurrentTime(Math.max(0,snapshot.currentTime));
      if (snapshot.state === 'ended' && !endedHandledRef.current) {
        endedHandledRef.current = true;
        adapter.seek(0);
        adapter.pause();
        setState('paused');
      } else if (snapshot.state !== 'ended') {
        endedHandledRef.current = false;
      }
    }, 500);
    return () => {mountedRef.current = false;window.clearInterval(timer);adapterRef.current?.destroy();adapterRef.current = null;};
  }, []);

  const safeAction = async (action: (adapter: PlayerAdapter) => void) => {
    try {const adapter = await ensureAdapter();action(adapter);} catch (reason) {if (mountedRef.current) {setState('error');setError(reason instanceof Error ? reason.message : '播放操作失敗，請重試。');}}
  };
  const toggle = () => void safeAction((adapter) => {if (state === 'playing') adapter.pause(); else adapter.play();});
  const restart = () => void safeAction((adapter) => {adapter.seek(0);setCurrentTime(0);});
  const seek = (ratio: number) => {
    const seconds = currentDuration.current * Math.max(0,Math.min(1,ratio));
    setCurrentTime(seconds);
    // Range onChange includes keyboard and touch; commit immediately to avoid stuck drag flags.
    if (adapterRef.current) adapterRef.current.seek(seconds);
  };
  const progress = duration > 0 ? Math.min(1,currentTime / duration) : 0;

  return <section className="music" aria-label={copy.label}>
    <div className="music-label">now playing</div>
    <div className="music-title">{localize(track.title,locale)}</div>
    <div className="music-artist">{localize(track.artist,locale)}</div>
    <div className="music-buttons">
      <button type="button" onClick={restart} aria-label={locale === 'en' ? 'Restart track' : locale === 'ja' ? '曲の先頭へ' : '重新播放'}><PlayerIcon kind="restart" /></button>
      <button type="button" id="play" className="play" disabled={loading} onClick={toggle} aria-label={state === 'playing' ? copy.pause : copy.play}>{loading ? <span className="player-loading" aria-hidden="true" /> : <PlayerIcon kind={state === 'playing' ? 'pause' : 'play'} />}</button>
      <a className="music-source" href={`https://www.youtube.com/watch?v=${encodeURIComponent(track.youtubeId)}`} target="_blank" rel="noopener noreferrer" aria-label={locale === 'en' ? 'Open on YouTube' : locale === 'ja' ? 'YouTube で開く' : '在 YouTube 開啟'}><PlayerIcon kind="open" /></a>
    </div>
    <div className="progress-row">
      <time>{formatTime(currentTime)}</time>
      <input className="player-progress" type="range" min="0" max="1000" value={Math.round(progress*1000)} style={{'--progress':`${progress*100}%`} as CSSProperties} onChange={(event)=>seek(Number(event.currentTarget.value)/1000)} aria-label={copy.progress} disabled={!duration}/>
      <time>{formatTime(duration)}</time>
    </div>
    <label className="volume"><span>VOL</span><input type="range" min="0" max="100" value={volume} onChange={(event)=>{const v=Number(event.target.value);setVolume(v);volumeRef.current=v;adapterRef.current?.setVolume(v);}} aria-label={copy.volume}/></label>
    {error && <p className="player-error" role="alert">{error} · {locale === 'en' ? 'Press play to retry.' : locale === 'ja' ? '再生を押すと再試行します。' : '可再次按播放重試。'}</p>}
    <div className="youtube-host" ref={hostRef} aria-hidden="true" />
  </section>;
}
