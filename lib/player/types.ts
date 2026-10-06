export type PlayerState = 'idle' | 'ready' | 'playing' | 'paused' | 'ended' | 'error';

export type PlayerSnapshot = {
  state: PlayerState;
  currentTime: number;
  duration: number;
};

export interface PlayerAdapter {
  play(): void;
  pause(): void;
  seek(seconds: number): void;
  setVolume(volume: number): void;
  destroy(): void;
  snapshot(): PlayerSnapshot;
}
