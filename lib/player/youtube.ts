import type {PlayerAdapter, PlayerSnapshot, PlayerState} from './types';

type YTPlayerLike = {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
};

type YTGlobal = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      width: string;
      height: string;
      playerVars: Record<string, number>;
      events: {
        onReady: () => void;
        onStateChange: (event: {data: number}) => void;
        onError: () => void;
      };
    }
  ) => YTPlayerLike;
  PlayerState: {ENDED: number; PLAYING: number; PAUSED: number};
};

declare global {
  interface Window {
    YT?: YTGlobal;
    onYouTubeIframeAPIReady?: () => void;
    __mikiYouTubePromise?: Promise<YTGlobal>;
  }
}

function loadYouTubeAPI(): Promise<YTGlobal> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (window.__mikiYouTubePromise) return window.__mikiYouTubePromise;

  window.__mikiYouTubePromise = new Promise<YTGlobal>((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);
  });

  return window.__mikiYouTubePromise;
}

export async function createYouTubeAdapter(
  host: HTMLElement,
  youtubeId: string,
  onState: (state: PlayerState) => void
): Promise<PlayerAdapter> {
  const YT = await loadYouTubeAPI();
  let internalState: PlayerState = 'idle';

  const setState = (state: PlayerState) => {
    internalState = state;
    onState(state);
  };

  const player = await new Promise<YTPlayerLike>((resolve, reject) => {
    let instance: YTPlayerLike;
    instance = new YT.Player(host, {
      width: '1',
      height: '1',
      videoId: youtubeId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        playsinline: 1,
        rel: 0
      },
      events: {
        onReady: () => {
          setState('ready');
          resolve(instance);
        },
        onStateChange: ({data}) => {
          if (data === YT.PlayerState.PLAYING) setState('playing');
          else if (data === YT.PlayerState.PAUSED) setState('paused');
          else if (data === YT.PlayerState.ENDED) setState('ended');
        },
        onError: () => {
          setState('error');
          reject(new Error('YouTube player failed to load.'));
        }
      }
    });
  });

  return {
    play: () => player.playVideo(),
    pause: () => player.pauseVideo(),
    seek: (seconds) => player.seekTo(seconds, true),
    setVolume: (volume) => player.setVolume(Math.max(0, Math.min(100, volume))),
    destroy: () => player.destroy(),
    snapshot: (): PlayerSnapshot => ({
      state: internalState,
      currentTime: player.getCurrentTime?.() ?? 0,
      duration: player.getDuration?.() ?? 0
    })
  };
}
