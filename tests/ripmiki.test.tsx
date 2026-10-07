import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import RipMiki from '@/app/ripmiki/page';

describe('RipMiki', () => {
  it('restores the separate memorial layout and its portrait', () => {
    const {container} = render(<RipMiki />);

    expect(container.querySelector('.grave-layout')).toBeInTheDocument();
    expect(screen.getByRole('img', {name: 'omiki'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: '故 菜菜之墓'})).toBeInTheDocument();
  });

  it('places a tribute flower where the visitor clicks', () => {
    const {container} = render(<RipMiki />);
    const memorial = container.querySelector('.rip')!;

    fireEvent.click(memorial, {clientX: 120, clientY: 180});

    expect(container.querySelectorAll('.rip-flower')).toHaveLength(1);
  });
});
