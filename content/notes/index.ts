import {loadMarkdownNote} from '../notes-loader';
import metadiscord_bot_from_zero from './discord-bot-from-zero/meta';
import metaabout_me from './about-me/meta';
import metadiscord_bot_usage_guide from './discord-bot-usage-guide/meta';
import metadiscord_bot_mod_guide from './discord-bot-mod-guide/meta';
import metaseasonal_night_sky_guide from './seasonal-night-sky-guide/meta';
import metaspacetime_and_gravitational_waves from './spacetime-and-gravitational-waves/meta';
import metaultrasonic_call_study_notes from './ultrasonic-call-study-notes/meta';

export const notes = [
  loadMarkdownNote(metadiscord_bot_from_zero),
  loadMarkdownNote(metaabout_me),
  loadMarkdownNote(metadiscord_bot_usage_guide),
  loadMarkdownNote(metadiscord_bot_mod_guide),
  loadMarkdownNote(metaseasonal_night_sky_guide),
  loadMarkdownNote(metaspacetime_and_gravitational_waves),
  loadMarkdownNote(metaultrasonic_call_study_notes)
].sort((left, right) => Date.parse(right.date) - Date.parse(left.date));

export const featuredNote = notes.find((note) => note.slug === 'ultrasonic-call-study-notes') ?? notes[0];

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}

export const pinnedNoteSlugs = [
  'discord-bot-usage-guide',
  'discord-bot-mod-guide',
  'seasonal-night-sky-guide'
] as const;

export const pinnedNotes = pinnedNoteSlugs.map((slug) => {
  const note = getNote(slug);
  if (!note) throw new Error(`Pinned note not found: ${slug}`);
  return note;
});
