'use client';

import {useEffect, useState} from 'react';

type Burst = {id: number; x: number; y: number};

export function Fireflies() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const addBurst = (event: PointerEvent) => {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
      if (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, [role="button"]')) return;
      const x = Math.min(Math.max(event.clientX, 18), window.innerWidth - 18);
      const y = Math.min(Math.max(event.clientY, 18), window.innerHeight - 18);
      const burst = {id: Date.now(), x, y};
      setBursts((current) => [...current.slice(-3), burst]);
      window.setTimeout(() => setBursts((current) => current.filter((item) => item.id !== burst.id)), 900);
    };
    document.addEventListener('pointerdown', addBurst);
    return () => document.removeEventListener('pointerdown', addBurst);
  }, []);

  return (
    <div className="fireflies" aria-hidden="true">
      <i /><i /><i /><i /><i />
      {bursts.map((burst) => <span className="firefly-burst" key={burst.id} style={{left: burst.x, top: burst.y}} />)}
    </div>
  );
}
