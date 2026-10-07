import type {Locale} from '@/i18n/config';

export type LocalizedText = Record<Locale, string>;

export type Project = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  tags: string[];
  url: string;
  image: string;
  imageSource: string;
  tone: 'blue' | 'orange' | 'green';
};

export type Note = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  date: string;
  category: string;
  sections: Array<{
    heading: LocalizedText;
    paragraphs: Record<Locale, string[]>;
  }>;
};

export type TimelineItem = {
  pinned?: boolean;
  year: string;
  title: LocalizedText;
  description: LocalizedText;
};
