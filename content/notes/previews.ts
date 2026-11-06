/* Browser-safe summaries: never import the server-only StructMark note loader here. */
import usage from './discord-bot-usage-guide/meta';
import modGuide from './discord-bot-mod-guide/meta';
import sky from './seasonal-night-sky-guide/meta';
import spacetime from './spacetime-and-gravitational-waves/meta';

export const pinnedNoteSlugs = [
  'discord-bot-usage-guide',
  'discord-bot-mod-guide',
  'seasonal-night-sky-guide',
  'spacetime-and-gravitational-waves'
] as const;

const previewNotes = [usage, modGuide, sky, spacetime] as const;

export const pinnedNotePreviews = pinnedNoteSlugs.map((slug) => {
  const note = previewNotes.find((item) => item.slug === slug);
  if (!note) throw new Error(`Pinned preview missing: ${slug}`);
  return note;
});
