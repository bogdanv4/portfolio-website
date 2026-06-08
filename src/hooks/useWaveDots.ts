import { useEffect, RefObject } from 'react';

export function useWaveDots(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d')!;
    let w = 1, h = 1, dpr = 1, raf = 0, t = 0, running = false;
    const ptr = { x: -9999, y: -9999, active: false };
    const mx = { x: -9999, y: -9999 };
    const gap = 36, amp = 2.0, aMul = 0.5;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.7);
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = Math.max(1, rect.width * dpr);
      h = canvas.height = Math.max(1, rect.height * dpr);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      ptr.x = e.clientX - rect.left;
      ptr.y = e.clientY - rect.top;
      ptr.active = true;
    }
    function onMouseLeave() { ptr.active = false; ptr.x = ptr.y = -9999; }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    function frame() {
      if (!running) return;
      t += 0.016;
      mx.x += ((ptr.active ? ptr.x : w / dpr / 2) - mx.x) * 0.12;
      mx.y += ((ptr.active ? ptr.y : h / dpr / 2) - mx.y) * 0.12;
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil((w / dpr) / gap) + 1;
      const rows = Math.ceil((h / dpr) / gap) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const bx = i * gap, by = j * gap;
          const wave = Math.sin(bx * 0.018 + t * 1.4) + Math.cos(by * 0.02 - t * 1.1);
          let ox = Math.cos(by * 0.02 + t) * (amp * 0.85);
          let oy = wave * amp;
          const dx = bx - mx.x, dy = by - mx.y;
          const dist = Math.hypot(dx, dy);
          let glow = 0;
          if (dist < 150) {
            const f = (1 - dist / 150);
            const push = f * f * 26;
            ox += (dx / (dist || 1)) * push;
            oy += (dy / (dist || 1)) * push;
            glow = f;
          }
          const x = (bx + ox) * dpr, y = (by + oy) * dpr;
          const base = (wave + 2) / 4;
          const r = (0.85 + base * 1.0 + glow * 2.2) * dpr;
          const tcol = Math.min(1, base * 0.7 + glow);
          const cr = Math.round(99 + (34 - 99) * tcol);
          const cg = Math.round(102 + (211 - 102) * tcol);
          const cb = Math.round(241 + (238 - 241) * tcol);
          ctx.beginPath();
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${(0.18 + base * 0.42 + glow * 0.45) * aMul})`;
          ctx.arc(x, y, r, 0, 6.2832);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true; resize(); frame();
      } else if (!entry.isIntersecting) {
        running = false; cancelAnimationFrame(raf);
      }
    }, { threshold: 0.02 });
    observer.observe(canvas);

    const onResize = () => { if (running) resize(); };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      running = false; cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}
