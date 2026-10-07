import type {Locale} from '@/i18n/config';
import {Fireflies} from '@/components/ui/fireflies';
import {SiteHeader} from './site-header';
import {LocaleDocument} from '@/components/ui/locale-document';

export function PageShell({locale, children}: {locale: Locale; children: React.ReactNode}) {
  return (
    <>
      <Fireflies />
      <LocaleDocument locale={locale} />
      <div className="page">
        <SiteHeader locale={locale} />
        {children}
      </div>
    </>
  );
}
