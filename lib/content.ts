import {profile} from '@/content/profile';
import {linkHubItems} from '@/content/links';
import {quotes} from '@/content/quotes';
import type {LocalizedText, ProfileSource} from '@/content/schema';
import type {Locale} from '@/i18n/config';

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale] ?? value['zh-TW'];
}

export type Profile = Omit<ProfileSource, 'subtitle' | 'signature' | 'about' | 'status'> & {
  subtitle: string;
  signature: string;
  about: string;
  status: string;
};

export function getProfile(locale: Locale): Profile {
  return {...profile, subtitle: localize(profile.subtitle, locale), signature: localize(profile.signature, locale), about: localize(profile.about, locale), status: localize(profile.status, locale)};
}

export function getLinkHubItems(locale: Locale) {
  return linkHubItems.map((item) => ({...item, label: localize(item.label, locale)}));
}

export function getQuote(locale: Locale, random: () => number = Math.random): string {
  const index = Math.min(quotes.length - 1, Math.floor(random() * quotes.length));
  return localize(quotes[index]!, locale);
}
