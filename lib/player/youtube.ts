/*
 * File: youtube.ts
 * Modification: 2026-10-11 — API / player timeout, recoverable errors, retry and cleanup.
 */
import type {PlayerAdapter, PlayerSnapshot, PlayerState} from './types';

type YTPlayerLike = {
  playVideo(): void; pauseVideo(): void; seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void; getCurrentTime(): number; getDuration(): number; destroy(): void;
};
type YTGlobal = {
  Player: new (element: HTMLElement, options: {
    videoId: string; width: string; height: string;
    playerVars: Record<string, number>;
    events: {onReady: () => void; onStateChange: (event: {data: number}) => void; onError: () => void};
  }) => YTPlayerLike;
  PlayerState: {ENDED: number; PLAYING: number; PAUSED: number};
};
declare global {
  interface Window {
    YT?: YTGlobal;
    onYouTubeIframeAPIReady?: () => void;
    __mikiYouTubePromise?: Promise<YTGlobal>;
  }
}
const API_TIMEOUT = 15000;
const PLAYER_TIMEOUT = 12000;

// ── 載入外部 API；網路失敗後允許重試 ──
function loadYouTubeAPI(): Promise<YTGlobal> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (window.__mikiYouTubePromise) return window.__mikiYouTubePromise;

  let pending: Promise<YTGlobal>;
  pending = new Promise<YTGlobal>((resolve, reject) => {
    let settled = false;
    const previous = window.onYouTubeIframeAPIReady;
    const script = document.createElement('script');
    const timeout = window.setTimeout(() => settle(new Error('YouTube API 回應逾時')), API_TIMEOUT);
    function settle(error?: Error) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      script.onerror = null;
      window.onYouTubeIframeAPIReady = previous;
      if (error || !window.YT?.Player) {
        script.remove();
        window.__mikiYouTubePromise = undefined;
        reject(error ?? new Error('YouTube API 不可用'));
        return;
      }
      resolve(window.YT);
    }
    window.onYouTubeIframeAPIReady = () => { previous?.(); settle(); };
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => settle(new Error('無法載入 YouTube API'));
    document.head.appendChild(script);
    if (window.YT?.Player) settle();
  });
  window.__mikiYouTubePromise = pending;
  return pending;
}

// ── 等候播放器 ready，避免永遠停留在 loading ──
export async function createYouTubeAdapter(host: HTMLElement, youtubeId: string, onState: (state: PlayerState) => void): Promise<PlayerAdapter> {
  const YT = await loadYouTubeAPI();
  let internalState: PlayerState = 'idle';
  const setState = (state: PlayerState) => { internalState = state; onState(state); };
  const player = await new Promise<YTPlayerLike>((resolve, reject) => {
    let instance: YTPlayerLike | undefined;
    let finished = false;
    const timer = window.setTimeout(() => finish(new Error('YouTube 播放器初始化逾時')), PLAYER_TIMEOUT);
    function finish(error?: Error) {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      if (error) {
        setState('error');
        try {instance?.destroy();} catch { /* destroyed instance */ }
        reject(error);
      } else if (instance) {
        setState('ready');
        resolve(instance);
      } else reject(new Error('YouTube 播放器未建立'));
    }
    try {
      instance = new YT.Player(host, {
        width: '1', height: '1', videoId: youtubeId,
        playerVars: {autoplay: 0, controls: 0, disablekb: 1, fs: 0, playsinline: 1, rel: 0},
        events: {
          onReady: () => finish(),
          onStateChange: ({data}) => {
            if (finished && internalState === 'error') return;
            if (data === YT.PlayerState.PLAYING) setState('playing');
            else if (data === YT.PlayerState.PAUSED) setState('paused');
            else if (data === YT.PlayerState.ENDED) setState('ended');
          },
          onError: () => {if (finished) setState('error'); else finish(new Error('YouTube 無法播放這首歌曲'));}
        }
      });
    } catch (error) { finish(error instanceof Error ? error : new Error('播放器初始化失敗')); }
  });
  return {
    play: () => player.playVideo(), pause: () => player.pauseVideo(),
    seek: (seconds) => player.seekTo(seconds, true),
    setVolume: (value) => player.setVolume(Math.max(0, Math.min(100, value))),
    destroy: () => player.destroy(),
    snapshot: (): PlayerSnapshot => ({state: internalState, currentTime: player.getCurrentTime?.() ?? 0, duration: player.getDuration?.() ?? 0})
  };
}
