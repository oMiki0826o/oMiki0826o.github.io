import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {SiteFooter} from '@/components/layout/site-footer';

describe('SiteFooter', () => {
  it('renders a quote', () => {
    render(<SiteFooter locale="zh-TW" />);
    expect(screen.getByText('滾滾長江東逝水')).toBeInTheDocument();
  });
});
