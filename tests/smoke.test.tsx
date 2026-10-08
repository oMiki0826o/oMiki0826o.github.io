import {render, screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import RootLayout from '@/app/layout';
import {HomePage} from '@/components/home/home-page';
import {pinnedTimeline} from '@/content/timeline';
import {notes} from '@/content/notes/index';
import AboutPage from '@/app/[locale]/about/page';
import ProjectsPage from '@/app/[locale]/projects/page';
import NotePage from '@/app/[locale]/notes/[slug]/page';
import {PageShell} from '@/components/layout/page-shell';

describe('RootLayout', () => {
  it('renders the application root without throwing', () => {
    render(
      <RootLayout>
        <main>content</main>
      </RootLayout>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('uses only real local social icons and contact destinations', () => {
    const {container} = render(<HomePage locale="zh-TW" />);

    expect(screen.getByRole('link', {name: 'GitHub'})).toHaveAttribute('href', 'https://github.com/omiki0826o');
    expect(screen.getByRole('link', {name: 'Discord: miki._.0826'})).toHaveAttribute('href', 'https://discord.com/users/839381498351190036');
    expect(screen.getByRole('link', {name: 'Email'})).toHaveAttribute('href', 'mailto:chenmiki0925@gmail.com');
    expect(container.querySelector('[class*="fa-"]')).toBeNull();
    expect(container.querySelectorAll('.project-cover img')).toHaveLength(3);
    expect(screen.queryByText('Minecraft Server Backup')).not.toBeInTheDocument();
  });

  it('does not load an icon CDN in the document head', () => {
    const {container} = render(<RootLayout><main>content</main></RootLayout>);

    expect(container.querySelector('link[href*="font-awesome"]')).toBeNull();
  });

  it('marks timeline entries for scroll-based reveal', () => {
    const {container} = render(<HomePage locale="zh-TW" />);

    expect(container.querySelectorAll('.timeline-reveal')).toHaveLength(pinnedTimeline.length);
  });

  it('keeps the homepage notes preview to the three pinned records', () => {
    const {container} = render(<HomePage locale="zh-TW" />);

    expect(container.querySelectorAll('.note')).toHaveLength(Math.min(notes.length, 3));
    expect(within(container).getByText('Discord Bot 使用教學')).toBeInTheDocument();
    expect(within(container).getByText('Discord Bot Mod 撰寫教學')).toBeInTheDocument();
    expect(within(container).getByText('夜空入門：從北極星開始認星')).toBeInTheDocument();
    expect(within(container).queryByText('幼鼠超音波叫聲研究紀錄與發表')).toBeNull();
  });

  it('keeps English note categories as a consistent visual label in every locale', () => {
    const {container} = render(<HomePage locale="ja" />);

    expect(within(container).getByText('2026-10-07 · Astronomy')).toBeInTheDocument();
  });

  it('groups About content into readable profile sections before its tags', async () => {
    const {container} = render(await AboutPage({params: Promise.resolve({locale: 'zh-TW'})}));

    expect(container.querySelector('.about-profile')).toBeInTheDocument();
    expect(container.querySelectorAll('.about-details section')).toHaveLength(8);
    expect(container.querySelector('.about-details + .tags')).toBeInTheDocument();
  });

  it('marks the rendered locale shell so initial English and Japanese content has the right language', () => {
    const {container} = render(<PageShell locale="ja"><main>content</main></PageShell>);

    expect(container.querySelector('.page')).toHaveAttribute('lang', 'ja');
  });

  it('shows each work with its real 5:3 cover on the Works page', async () => {
    const {container} = render(await ProjectsPage({params: Promise.resolve({locale: 'zh-TW'})}));

    expect(container.querySelectorAll('.page-project-cover img')).toHaveLength(3);
    expect(screen.getAllByRole('link', {name: 'CipherTool'})[0]).toHaveAttribute('href', '/zh-TW/projects/cipher-tool');
  });

  it('connects the two astronomy notes through related reading', async () => {
    const {container} = render(await NotePage({params: Promise.resolve({locale: 'zh-TW', slug: 'seasonal-night-sky-guide'})}));

    expect(within(container).getByRole('heading', {name: '繼續閱讀'})).toBeInTheDocument();
    expect(within(container).getByRole('link', {name: /從幾何到重力波/})).toBeInTheDocument();
  });
});
