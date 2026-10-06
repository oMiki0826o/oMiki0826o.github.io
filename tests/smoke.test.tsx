import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import RootLayout from '@/app/layout';

describe('RootLayout', () => {
  it('renders the application root without throwing', () => {
    render(
      <RootLayout>
        <main>content</main>
      </RootLayout>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
