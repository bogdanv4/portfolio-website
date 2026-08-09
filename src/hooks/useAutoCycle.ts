import { useEffect, useRef, useState, RefObject } from 'react';

interface UseAutoCycleOptions {
  count: number;
  intervalMs: number;
  paused: boolean;
  rootRef: RefObject<HTMLElement>;
  progressRef: RefObject<HTMLElement>;
}

export function useAutoCycle({ count, intervalMs, paused, rootRef, progressRef }: UseAutoCycleOptions) {
  const [index, setIndex] = useState(0);
  const elapsedRef = useRef(0);
  const lastRef = useRef(0);
  const pausedRef = useRef(paused);
  const inViewRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (count <= 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)';
      return;
    }

    function frame(t: number) {
      rafRef.current = requestAnimationFrame(frame);
      if (!lastRef.current) lastRef.current = t;
      const dt = t - lastRef.current;
      lastRef.current = t;

      if (!inViewRef.current || pausedRef.current) return;

      elapsedRef.current += dt;
      const p = Math.min(1, elapsedRef.current / intervalMs);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;

      if (elapsedRef.current >= intervalMs) {
        elapsedRef.current = 0;
        setIndex(i => (i + 1) % count);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
      lastRef.current = 0;
    }, { threshold: 0.15 });
    observer.observe(root);

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [count, intervalMs, rootRef, progressRef]);

  const select = (i: number) => {
    elapsedRef.current = 0;
    if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)';
    setIndex(i);
  };

  return { index, select };
}
