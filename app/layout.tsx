import type {Metadata} from 'next';
import './globals.css';

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
  return <html lang="zh-TW"><body>{children}</body></html>;
}
