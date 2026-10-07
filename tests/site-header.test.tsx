import {cleanup, fireEvent, render, screen, within} from '@testing-library/react';
import {afterEach, describe, expect, it} from 'vitest';
import {SiteHeader} from '@/components/layout/site-header';

afterEach(cleanup);

describe('SiteHeader', () => {
  it('centers the Miki wordmark and reveals navigation from a hamburger button', () => {
    const {container} = render(<SiteHeader locale="zh-TW" />);

    expect(screen.getByRole('link', {name: 'Miki'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: '開啟選單'})).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', {name: '關於'})).toBeNull();

    fireEvent.click(screen.getByRole('button', {name: '開啟選單'}));

    expect(container.querySelector('.menu-toggle')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', {name: '關於'})).toHaveAttribute('href', '/zh-TW/about');
    expect(container.querySelector('.site-menu')).toBeInTheDocument();
  });

  it('closes the drawer with Escape or its background and marks the active page', () => {
    const {container} = render(<SiteHeader locale="zh-TW" />);
    const trigger = within(container).getByRole('button', {name: '開啟選單'});

    fireEvent.click(trigger);
    expect(within(container.querySelector('.site-menu')!).getByRole('link', {name: '首頁'})).toHaveAttribute('aria-current', 'page');

    fireEvent.keyDown(window, {key: 'Escape'});
    expect(container.querySelector('.site-menu')).toBeNull();

    fireEvent.click(within(container).getByRole('button', {name: '開啟選單'}));
    fireEvent.click(container.querySelector('.menu-scrim')!);
    expect(container.querySelector('.site-menu')).toBeNull();
  });
});
