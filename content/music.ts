export type MusicTrack = {
  id: string;
  provider: 'youtube';
  youtubeId: string;
  title: string;
  artist: string;
};

export const musicTracks: MusicTrack[] = [
  {
    id: 'if-i-can-stop-one-heart-from-breaking',
    provider: 'youtube',
    youtubeId: 'MDcPpQHAEro',
    title: '使一顆心免於哀傷',
    artist: 'Robin / HOYO-MiX'
  }
];
