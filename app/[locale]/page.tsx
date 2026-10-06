import Link from 'next/link';
import {resolveLocale} from '@/i18n/config';
import {getMessages} from '@/i18n/messages';
import {getLinkHubItems, getProfile, getQuote} from '@/lib/content';
import {ThemeToggle} from '@/components/layout/theme-toggle';
import {LocaleSwitcher} from '@/components/layout/locale-switcher';
import {MusicCard} from '@/components/home/music-card';

export default async function LocaleHome({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getMessages(locale);
  const profile = getProfile(locale);
  const links = getLinkHubItems(locale);
  return (
    <main className="home-shell">
      <header className="home-nav"><Link href={`/${locale}`}>miki</Link><div className="nav-controls"><LocaleSwitcher locale={locale} /><ThemeToggle /></div></header>
      <section className="hero"><img src={profile.avatar} alt="Miki" /><p className="eyebrow">✦ {profile.status}</p><h1>{profile.name}</h1><p>{profile.subtitle}</p><blockquote>{profile.signature}</blockquote></section>
      <nav className="link-hub" aria-label="Primary">
        {links.map((item) => <Link className="hub-card" href={`/${locale}${item.href}`} key={item.id}><span>{item.icon}</span><strong>{item.label}</strong><i>↗</i></Link>)}
      </nav>
      <MusicCard />
      <p className="quote">{getQuote(locale, () => 0)}</p>
    </main>
  );
}
