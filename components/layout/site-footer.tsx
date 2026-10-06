import type {Locale} from '@/i18n/config';
import {localize} from '@/lib/content';
import {quotes} from '@/content/quotes';

export function SiteFooter({locale}: {locale: Locale}) {
  const quote = localize(quotes[0]!, locale);
  return (
    <footer className="footer">
      <strong>{quote}</strong>
      <span>Miki&apos;s website · Next.js static export</span>
    </footer>
  );
}
