import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {BackToTop} from '@/components/ui/back-to-top';

describe('BackToTop', () => {
  it('appears after reading and returns to the top when activated', () => {
    const scrollTo = vi.fn();
    Object.defineProperty(window, 'scrollY', {value: 0, configurable: true});
    Object.defineProperty(window, 'scrollTo', {value: scrollTo, configurable: true});
    render(<BackToTop label="回到頁面頂端" />);

    expect(screen.queryByRole('button', {name: '回到頁面頂端'})).toBeNull();
    Object.defineProperty(window, 'scrollY', {value: 520, configurable: true});
    fireEvent.scroll(window);
    fireEvent.click(screen.getByRole('button', {name: '回到頁面頂端'}));
    expect(scrollTo).toHaveBeenCalledWith({top: 0, behavior: 'smooth'});
  });
});
