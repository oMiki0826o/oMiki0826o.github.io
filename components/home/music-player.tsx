'use client';

import {useCallback, useEffect, useRef, useState, type CSSProperties} from 'react';
import {musicTracks} from '@/content/music';
import {createYouTubeAdapter} from '@/lib/player/youtube';
import type {PlayerAdapter, PlayerState} from '@/lib/player/types';

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '00:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [playerState, setPlayerState] = useState<PlayerState>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const hostRef = useRef<HTMLDivElement>(null);
  const adapterRef = useRef<PlayerAdapter | null>(null);
  const loadingRef = useRef<Promise<PlayerAdapter> | null>(null);
  const seekingRef = useRef(false);
  const track = musicTracks[trackIndex]!;

  const ensureAdapter = useCallback(async () => {
    if (adapterRef.current) return adapterRef.current;
    if (loadingRef.current) return loadingRef.current;
    if (!hostRef.current) throw new Error('Player host is unavailable.');

    loadingRef.current = createYouTubeAdapter(hostRef.current, track.youtubeId, (state) => setPlayerState(state))
      .then((adapter) => {
        adapter.setVolume(volume);
        adapterRef.current = adapter;
        return adapter;
      })
      .finally(() => {
        loadingRef.current = null;
      });

    return loadingRef.current;
  }, [track.youtubeId, volume]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const adapter = adapterRef.current;
      if (!adapter || seekingRef.current) return;
      const snapshot = adapter.snapshot();
      setCurrentTime(snapshot.currentTime);
      setDuration(snapshot.duration);

      if (snapshot.state === 'ended') {
        adapter.seek(0);
        setPlayerState('paused');
      }
    }, 400);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => () => adapterRef.current?.destroy(), []);

  const toggle = async () => {
    const adapter = await ensureAdapter();
    if (playerState === 'playing') adapter.pause();
    else adapter.play();
  };

  const restart = async () => {
    const adapter = await ensureAdapter();
    adapter.seek(0);
    setCurrentTime(0);
  };

  const handleVolume = async (next: number) => {
    setVolume(next);
    adapterRef.current?.setVolume(next);
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <section className="music" aria-label="音樂播放器">
      <div className="music-label">now playing</div>
      <div className="music-title">{track.title}</div>
      <div className="music-artist">{track.artist}</div>

      <div className="music-buttons">
        <button type="button" onClick={restart} aria-label="上一首">←</button>
        <button type="button" id="play" className="play" onClick={toggle} aria-label={playerState === 'playing' ? '暫停' : '播放'}>
          {playerState === 'playing' ? '❚❚' : '▶'}
        </button>
        <button type="button" onClick={restart} aria-label="下一首">→</button>
      </div>

      <div className="progress-row">
        <time>{formatTime(currentTime)}</time>
        <input
          className="player-progress"
          type="range"
          min="0"
          max="1000"
          value={Math.round(progress * 1000)}
          style={{'--progress': `${progress * 100}%`} as CSSProperties}
          onPointerDown={() => { seekingRef.current = true; }}
          onChange={(event) => {
            const ratio = Number(event.currentTarget.value) / 1000;
            const next = duration * ratio;
            setCurrentTime(next);
          }}
          onPointerUp={async (event) => {
            const ratio = Number(event.currentTarget.value) / 1000;
            const adapter = await ensureAdapter();
            adapter.seek(duration * ratio);
            seekingRef.current = false;
          }}
          aria-label="播放進度"
        />
        <time>{formatTime(duration)}</time>
      </div>

      <label className="volume">
        <span>VOL</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(event) => void handleVolume(Number(event.currentTarget.value))}
          aria-label="音量"
        />
      </label>

      <div className="youtube-host" ref={hostRef} aria-hidden="true" />
    </section>
  );
}
