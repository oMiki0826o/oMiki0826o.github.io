'use client';

import {useMemo, useState} from 'react';
import Link from 'next/link';
import type {Note, NoteCategory} from '@/content/types';
import type {Locale} from '@/i18n/config';
import {localizedPath, localize} from '@/lib/content';
import {estimateReadingMinutes, formatNoteDate, localizeNoteCategory} from '@/lib/note-metadata';
import {ui} from '@/i18n/ui';

const categories: NoteCategory[] = ['Discord', 'Astronomy', 'Science', 'Biology', 'About'];

function NoteLink({note, locale, featured = false}: {note: Note; locale: Locale; featured?: boolean}) {
  const category = localizeNoteCategory(note.category, locale);
  const minutes = estimateReadingMinutes(note, locale);
  const className = featured ? 'featured-note' : 'page-note';

  return <Link className={className} href={localizedPath(locale, `/notes/${note.slug}`)}>
    <span className="note-meta"><time dateTime={note.date}>{formatNoteDate(note.date, locale)}</time><i aria-hidden="true">·</i>{category}<i aria-hidden="true">·</i>{ui[locale].notes.readingTime(minutes)}</span>
    <h2>{localize(note.title, locale)}</h2>
    <p>{localize(note.excerpt, locale)}</p>
    <b aria-hidden="true">↗</b>
  </Link>;
}

export function NotesIndex({locale, notes, featuredNote}: {locale: Locale; notes: Note[]; featuredNote?: Note}) {
  const [selected, setSelected] = useState<NoteCategory | 'all'>('all');
  const visibleNotes = useMemo(() => notes.filter((note) => selected === 'all' || note.category === selected), [notes, selected]);
  const visibleFeatured = featuredNote && visibleNotes.some((note) => note.slug === featuredNote.slug) ? featuredNote : undefined;

  return <>
    <div className="note-filters" aria-label={ui[locale].notes.filter}>
      <button type="button" className={selected === 'all' ? 'is-active' : ''} onClick={() => setSelected('all')}>{ui[locale].notes.all}</button>
      {categories.filter((category) => notes.some((note) => note.category === category)).map((category) => <button type="button" className={selected === category ? 'is-active' : ''} onClick={() => setSelected(category)} key={category}>{localizeNoteCategory(category, locale)}</button>)}
    </div>
    {visibleFeatured ? <NoteLink note={visibleFeatured} locale={locale} featured /> : null}
    <div className="page-notes">
      {visibleNotes.filter((note) => note.slug !== visibleFeatured?.slug).map((note) => <NoteLink note={note} locale={locale} key={note.slug} />)}
    </div>
  </>;
}
