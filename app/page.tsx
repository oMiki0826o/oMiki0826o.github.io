import {PageShell} from '@/components/layout/page-shell';
import {HomePage} from '@/components/home/home-page';
import type {Metadata} from 'next';
import {buildPageMetadata} from '@/lib/metadata';
import {profile} from '@/content/profile';

export const metadata: Metadata = buildPageMetadata({locale: 'zh-TW', title: 'Miki 的奇幻世界', description: profile.intro['zh-TW']});

export default function Home() {
  return <PageShell locale="zh-TW"><HomePage locale="zh-TW" /></PageShell>;
}
