import type {Locale} from '@/i18n/config';

export type LocalizedText = Record<Locale, string>;

export const noteCategories = ['Discord', 'Astronomy', 'Science', 'Biology', 'About'] as const;
export type NoteCategory = typeof noteCategories[number];

export type Project = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  tags: string[];
  url: string;
  image: string;
  imageSource: string;
  tone: 'blue' | 'orange' | 'green';
  category: 'web' | 'tools';
  demoUrl?: string;
};

export type Note = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  date: string;
  category: NoteCategory;
  relatedSlugs?: readonly string[];
  projectSlug?: string;
  sections: Array<{
    heading: LocalizedText;
    paragraphs: Record<Locale, string[]>;
    html: Record<Locale, string>;
    ids: Record<Locale, string>;
  }>;
};

export type TimelineItem = {
  pinned?: boolean;
  year: string;
  title: LocalizedText;
  description: LocalizedText;
};
