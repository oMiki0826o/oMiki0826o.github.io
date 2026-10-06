import type {LocalizedText} from './types';

export type MusicTrack = {
  id: string;
  provider: 'youtube';
  youtubeId: string;
  title: LocalizedText;
  artist: LocalizedText;
};

export const musicTracks: MusicTrack[] = [
  {
    id: 'if-i-can-stop-one-heart-from-breaking',
    provider: 'youtube',
    youtubeId: 'MDcPpQHAEro',
    title: {'zh-TW': '使一顆心免於哀傷', en: 'If I Can Stop One Heart from Breaking', ja: 'もしも心を救えたなら'},
    artist: {'zh-TW': 'Robin／HOYO-MiX', en: 'Robin / HOYO-MiX', ja: 'ロビン／HOYO-MiX'}
  }
];
