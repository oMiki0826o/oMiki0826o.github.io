import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {SiteHeader} from '@/components/layout/site-header';

describe('SiteHeader', () => {
  it('centers the Miki wordmark and reveals navigation from a hamburger button', () => {
    const {container} = render(<SiteHeader locale="zh-TW" />);

    expect(screen.getByRole('link', {name: 'Miki'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: '開啟選單'})).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', {name: '關於'})).toBeNull();

    fireEvent.click(screen.getByRole('button', {name: '開啟選單'}));

    expect(screen.getByRole('button', {name: '關閉選單'})).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', {name: '關於'})).toHaveAttribute('href', '/zh-TW/about');
    expect(container.querySelector('.site-menu')).toBeInTheDocument();
  });
});
