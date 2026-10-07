import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import RootLayout from '@/app/layout';
import {HomePage} from '@/components/home/home-page';
import {timeline} from '@/content/timeline';

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
});
