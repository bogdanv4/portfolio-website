import { useEffect, RefObject } from 'react';

const BLOBS = [
  { hue: [99, 102, 241] as [number,number,number], x: 0.30, y: 0.42, r: 0.55, ax: 0.10, ay: 0.08, sx: 0.21, sy: 0.17, ph: 0 },
  { hue: [34, 211, 238] as [number,number,number], x: 0.70, y: 0.55, r: 0.50, ax: 0.12, ay: 0.09, sx: 0.17, sy: 0.23, ph: 2 },
  { hue: [168, 85, 247] as [number,number,number], x: 0.55, y: 0.28, r: 0.42, ax: 0.09, ay: 0.07, sx: 0.27, sy: 0.19, ph: 4 },
  { hue: [56, 189, 248] as [number,number,number], x: 0.40, y: 0.72, r: 0.40, ax: 0.11, ay: 0.06, sx: 0.15, sy: 0.29, ph: 1 },
];

export function useAurora(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.background = 'radial-gradient(120% 100% at 30% 40%,rgba(99,102,241,0.25),transparent 60%),radial-gradient(120% 100% at 70% 60%,rgba(34,211,238,0.18),transparent 60%),#07090f';
      return;
    }

    const ctx = canvas.getContext('2d')!;
    let w = 1, h = 1, dpr = 1, raf = 0, t = 0, running = false;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.7);
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = Math.max(1, rect.width * dpr);
      h = canvas.height = Math.max(1, rect.height * dpr);
    }

    function frame() {
      if (!running) return;
      t += 0.0042;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#07090f';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      const base = Math.min(w, h);
      for (const b of BLOBS) {
        const cx = (b.x + Math.sin(t * b.sx * 6.28 + b.ph) * b.ax) * w;
        const cy = (b.y + Math.cos(t * b.sy * 6.28 + b.ph) * b.ay) * h;
        const rad = b.r * base * 0.95;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${b.hue[0]},${b.hue[1]},${b.hue[2]},0.42)`);
        g.addColorStop(0.55, `rgba(${b.hue[0]},${b.hue[1]},${b.hue[2]},0.12)`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.2832); ctx.fill();
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
      window.removeEventListener('resize', onResize);
      running = false; cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}
