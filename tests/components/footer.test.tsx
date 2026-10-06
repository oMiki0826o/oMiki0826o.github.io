import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {SiteFooter} from '@/components/layout/site-footer';

describe('SiteFooter', () => {
  it('renders a quote', () => {
    render(<SiteFooter locale="zh-TW" />);
    expect(screen.getByText('人生如逆旅，我亦是行人。')).toBeInTheDocument();
  });
});
