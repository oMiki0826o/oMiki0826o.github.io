import {render, screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import RootLayout from '@/app/layout';
import {HomePage} from '@/components/home/home-page';
import {timeline} from '@/content/timeline';
import {notes} from '@/content/notes';

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
    expect(container.querySelectorAll('.project-cover img')).toHaveLength(2);
    expect(screen.queryByText('Minecraft Server Backup')).not.toBeInTheDocument();
  });

  it('does not load an icon CDN in the document head', () => {
    const {container} = render(<RootLayout><main>content</main></RootLayout>);

    expect(container.querySelector('link[href*="font-awesome"]')).toBeNull();
  });

  it('marks timeline entries for scroll-based reveal', () => {
    const {container} = render(<HomePage locale="zh-TW" />);

    expect(container.querySelectorAll('.timeline-reveal')).toHaveLength(timeline.length);
  });

  it('keeps the homepage notes preview to the three pinned records', () => {
    const {container} = render(<HomePage locale="zh-TW" />);

    expect(container.querySelectorAll('.note')).toHaveLength(Math.min(notes.length, 3));
    expect(within(container).getByText('Discord Bot 使用教學')).toBeInTheDocument();
    expect(within(container).getByText('Discord Bot Mod 撰寫教學')).toBeInTheDocument();
    expect(within(container).getByText('夜空入門：從北極星開始認星')).toBeInTheDocument();
    expect(within(container).queryByText('幼鼠超音波叫聲研究紀錄與發表')).toBeNull();
  });
});
