import type {Metadata} from 'next';
import './globals.css';
import {SiteJsonLd} from '@/components/seo/json-ld';

const siteUrl = 'https://omiki0826o.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {default: "Miki's Website", template: "%s | Miki's Website"},
  description: 'Miki 的個人網站：作品、文章、開發歷程與日常紀錄。',
  icons: {icon: '/assets/miki-avatar.jpeg'},
  openGraph: {
    type: 'website',
    siteName: "Miki's Website",
    title: 'Miki',
    description: 'Miki 的個人網站：作品、文章、開發歷程與日常紀錄。',
    url: siteUrl,
    images: ['https://pbs.twimg.com/media/GQgH_VIbQAAViAh?format=jpg&name=large']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miki',
    description: 'Miki 的個人網站：作品、文章、開發歷程與日常紀錄。',
    images: ['https://pbs.twimg.com/media/GQgH_VIbQAAViAh?format=jpg&name=large']
  }
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const themeScript = "try{var t=localStorage.getItem('miki-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){}";
  return <html lang="zh-TW" suppressHydrationWarning><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Klee+One:wght@600&family=Noto+Sans+TC:wght@400;500;600&family=Nunito:wght@500;600;700;800&family=Zen+Maru+Gothic:wght@500;700&display=swap" /><script dangerouslySetInnerHTML={{__html: themeScript}} /></head><body><SiteJsonLd />{children}</body></html>;
}
