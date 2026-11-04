import {cleanup, fireEvent, render, screen, within} from '@testing-library/react';
import {afterEach, describe, expect, it} from 'vitest';
import {SiteHeader} from '@/components/layout/site-header';

afterEach(cleanup);

describe('SiteHeader', () => {
  it('shows four desktop links and the mobile menu for a personal Blog', () => {
    const {container} = render(<SiteHeader locale="zh-TW" />);
    expect(screen.getByRole('link', {name: 'Miki.'})).toBeInTheDocument();
    expect(container.querySelectorAll('.desktop-navigation a')).toHaveLength(4);
    expect(within(container.querySelector('.desktop-navigation')!).getByRole('link', {name: 'Blog'})).toHaveAttribute('href', '/zh-TW/notes');
    expect(screen.getByRole('button', {name: '開啟選單'})).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(screen.getByRole('button', {name: '開啟選單'}));
    expect(container.querySelector('.menu-toggle')).toHaveAttribute('aria-expanded', 'true');
    expect(within(container.querySelector('.site-menu')!).getByRole('link', {name: '關於'})).toHaveAttribute('href', '/zh-TW/about');
  });

  it('closes the drawer on Escape or backdrop click and marks the active page', () => {
    const {container} = render(<SiteHeader locale="zh-TW" />);
    fireEvent.click(within(container).getByRole('button', {name: '開啟選單'}));
    expect(within(container.querySelector('.site-menu')!).getByRole('link', {name: '首頁'})).toHaveAttribute('aria-current', 'page');

    fireEvent.keyDown(window, {key: 'Escape'});
    expect(container.querySelector('.site-menu')).toBeNull();

    fireEvent.click(within(container).getByRole('button', {name: '開啟選單'}));
    fireEvent.click(container.querySelector('.menu-scrim')!);
    expect(container.querySelector('.site-menu')).toBeNull();
  });
});
