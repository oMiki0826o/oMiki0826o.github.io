import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {ThemeToggle} from '@/components/layout/theme-toggle';

describe('ThemeToggle', () => {
  it('offers an accessible theme control', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button', {name: /theme/i})).toBeInTheDocument();
  });
});
