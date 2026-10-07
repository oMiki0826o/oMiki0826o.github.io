'use client';

import {useEffect, useRef, useState, type ReactNode} from 'react';

export function ScrollReveal({children, className = ''}: {children: ReactNode; className?: string}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setPending(true);
    setVisible(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, {threshold: 0.1});
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`scroll-reveal${pending ? ' is-pending' : ''}${visible ? ' is-visible' : ''} ${className}`.trim()}>{children}</div>;
}
