import {siteUrl} from '@/lib/metadata';

export function JsonLd({data}: {data: Record<string, unknown>}) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />;
}

export function SiteJsonLd() {
  return <JsonLd data={{
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Miki',
        url: siteUrl,
        email: 'mailto:chenmiki0925@gmail.com',
        sameAs: [
          'https://github.com/oMiki0826o',
          'https://discord.com/users/839381498351190036'
        ]
      },
      {
        '@type': 'WebSite',
        name: "Miki's Website",
        url: siteUrl,
        inLanguage: ['zh-TW', 'en', 'ja']
      }
    ]
  }} />;
}
