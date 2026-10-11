/*
 * File: index.ts
 * Modification: 2026-10-11 — 由 npm run notes:sync 根據目錄自動產生文章註冊表。
 */
import {loadStructMarkNote} from '../notes-loader';
import {projects} from '../projects';
import meta_0 from './about-me/meta';
import meta_1 from './discord-bot-from-zero/meta';
import meta_2 from './discord-bot-mod-guide/meta';
import meta_3 from './discord-bot-usage-guide/meta';
import meta_4 from './seasonal-night-sky-guide/meta';
import meta_5 from './spacetime-and-gravitational-waves/meta';
import meta_6 from './ultrasonic-call-study-notes/meta';

export const notes = [
  loadStructMarkNote(meta_0),
  loadStructMarkNote(meta_1),
  loadStructMarkNote(meta_2),
  loadStructMarkNote(meta_3),
  loadStructMarkNote(meta_4),
  loadStructMarkNote(meta_5),
  loadStructMarkNote(meta_6)
].sort((left, right) => Date.parse(right.date) - Date.parse(left.date));

// ── 由 .sm Front Matter 自動對應 Works；不再複製文章 slug 清單 ──
const knownProjects = new Set(projects.map((project) => project.slug));
for (const note of notes) {
  if (note.projectSlug && !knownProjects.has(note.projectSlug)) {
    throw new Error(`Note ${note.slug} links to a missing project: ${note.projectSlug}`);
  }
}

export function getNotesForProject(projectSlug: string) {
  return notes.filter((note) => note.projectSlug === projectSlug);
}

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
