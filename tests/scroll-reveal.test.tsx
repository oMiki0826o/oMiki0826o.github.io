import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {ScrollReveal} from '@/components/ui/scroll-reveal';

describe('ScrollReveal', () => {
  it('keeps content visible when observer support is unavailable', () => {
    render(<ScrollReveal><p>可讀內容</p></ScrollReveal>);

    expect(screen.getByText('可讀內容').parentElement).not.toHaveClass('is-pending');
  });
});
