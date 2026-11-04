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

describe('Personal site smoke tests', () => {
  it('renders the application root', () => {
    render(<RootLayout><main>content</main></RootLayout>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('centers the homepage on writing, then works, with local images', () => {
    const {container} = render(<HomePage locale="zh-TW" />);
    expect(within(container).getByRole('heading', {name: '你好，這裡是 Miki。'})).toBeInTheDocument();
    expect(container.querySelectorAll('.home-post')).toHaveLength(Math.min(notes.length, 4));
    expect(container.querySelectorAll('.home-work')).toHaveLength(3);
    expect(container.querySelector('.home-post-list')!.compareDocumentPosition(container.querySelector('.home-work-list')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelectorAll('.home-work img')).toHaveLength(3);
    expect(container.querySelectorAll('img[src^="/assets/"]')).toHaveLength(4);
    expect(within(container).getByRole('link', {name: '讀讀文章'})).toHaveAttribute('href', '/zh-TW/notes');
    expect(container.querySelector('[class*="fa-"]')).toBeNull();
  });

  it('does not load an icon CDN', () => {
    const {container} = render(<RootLayout><main>content</main></RootLayout>);
    expect(container.querySelector('link[href*="font-awesome"]')).toBeNull();
  });

  it('moves the timeline into About instead of keeping it on Home', async () => {
    const {container} = render(await AboutPage({params: Promise.resolve({locale: 'zh-TW'})}));
    expect(container.querySelectorAll('.about-timeline .event')).toHaveLength(pinnedTimeline.length);
    const {container: home} = render(<HomePage locale="zh-TW" />);
    expect(home.querySelector('.timeline')).toBeNull();
  });

  it('displays the four newest posts with their localized category label', () => {
    const {container} = render(<HomePage locale="zh-TW" />);
    expect(container.querySelectorAll('.home-post')).toHaveLength(4);
    expect(within(container).getByText('Discord Bot 使用教學')).toBeInTheDocument();
    expect(within(container).getByText('Discord Bot Mod 撰寫教學')).toBeInTheDocument();
    expect(within(container).getByText('夜空入門：從北極星開始認星')).toBeInTheDocument();
    expect(within(container).queryByText('幼鼠超音波叫聲研究紀錄與發表')).toBeNull();
  });

  it('uses consistent English categories even on Japanese Blog previews', () => {
    const {container} = render(<HomePage locale="ja" />);
    expect(within(container).getAllByText('Astronomy').length).toBeGreaterThan(0);
  });

  it('keeps profile sections readable', async () => {
    const {container} = render(await AboutPage({params: Promise.resolve({locale: 'zh-TW'})}));
    expect(container.querySelector('.about-profile')).toBeInTheDocument();
    expect(container.querySelectorAll('.about-details section')).toHaveLength(8);
    expect(container.querySelector('.about-details + .tags')).toBeInTheDocument();
  });

  it('marks the locale shell for translated pages', () => {
    const {container} = render(<PageShell locale="ja"><main>content</main></PageShell>);
    expect(container.querySelector('.page')).toHaveAttribute('lang', 'ja');
  });

  it('keeps all nine authentic Works entries', async () => {
    const {container} = render(await ProjectsPage({params: Promise.resolve({locale: 'zh-TW'})}));
    expect(container.querySelectorAll('.page-project-cover img')).toHaveLength(9);
    expect(within(container).getAllByRole('link', {name: 'CipherTool'})[0]).toHaveAttribute('href', '/zh-TW/projects/cipher-tool');
  });

  it('connects technical and astronomy articles through related writing', async () => {
    const {container} = render(await NotePage({params: Promise.resolve({locale: 'zh-TW', slug: 'seasonal-night-sky-guide'})}));
    expect(within(container).getByRole('heading', {name: '繼續閱讀'})).toBeInTheDocument();
    expect(within(container).getByRole('link', {name: /從幾何到重力波/})).toBeInTheDocument();
  });
});
