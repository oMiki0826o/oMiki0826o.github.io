import {fireEvent, render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Fireflies} from '@/components/ui/fireflies';

describe('Fireflies', () => {
  it('adds a short-lived glow after a background click without exceeding the viewport', () => {
    const {container} = render(<Fireflies />);
    fireEvent.pointerDown(document, {clientX: 140, clientY: 220, target: document.body});

    const burst = container.querySelector('.firefly-burst') as HTMLElement;
    expect(burst).toBeInTheDocument();
    expect(burst.style.left).toBe('140px');
    expect(burst.style.top).toBe('220px');
  });
});
