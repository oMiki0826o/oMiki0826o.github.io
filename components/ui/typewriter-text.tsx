'use client';

import {useEffect, useState} from 'react';

export function TypewriterText({text, className = ''}: {text: string; className?: string}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const frame = window.requestAnimationFrame(() => setShown(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <span className={`typewriter${shown ? ' is-ready' : ''} ${className}`.trim()} aria-label={text}>{text}</span>;
}
