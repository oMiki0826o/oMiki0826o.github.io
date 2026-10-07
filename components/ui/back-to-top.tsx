'use client';

import {useEffect, useState} from 'react';

export function BackToTop({label}: {label: string}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 360);
    update();
    window.addEventListener('scroll', update, {passive: true});
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (!visible) return null;
  return <button className="back-to-top" type="button" aria-label={label} onClick={() => window.scrollTo({top: 0, behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'})}>↑</button>;
}
