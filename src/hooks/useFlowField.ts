import { useEffect, RefObject } from 'react';

export function useFlowField(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d')!;
    let w = 1, h = 1, dpr = 1, raf = 0, t = 0, running = false;
    const ptr = { x: -9999, y: -9999, active: false };
    type Particle = { x: number; y: number; hue: [number, number, number] };
    let parts: Particle[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.7);
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = Math.max(1, rect.width * dpr);
      h = canvas.height = Math.max(1, rect.height * dpr);
      const count = Math.round((w * h) / (dpr * dpr) / 7000);
      parts = new Array(Math.min(220, Math.max(60, count))).fill(0).map(() => ({
        x: Math.random() * w, y: Math.random() * h,
        hue: (Math.random() < 0.5 ? [99, 102, 241] : [34, 211, 238]) as [number, number, number],
      }));
    }

    function field(x: number, y: number) {
      return Math.sin(x * 0.0016 + t) * 1.4 + Math.cos(y * 0.0019 - t * 0.8) * 1.4 + Math.sin((x + y) * 0.001 + t * 0.4);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      ptr.x = (e.clientX - rect.left) * dpr;
      ptr.y = (e.clientY - rect.top) * dpr;
      ptr.active = true;
    }
    function onMouseLeave() { ptr.active = false; ptr.x = ptr.y = -9999; }
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    function frame() {
      if (!running) return;
      t += 0.0026;
      ctx.fillStyle = 'rgba(6,7,13,0.16)';
      ctx.fillRect(0, 0, w, h);
      const px = ptr.active ? ptr.x : -9999;
      const py = ptr.active ? ptr.y : -9999;
      for (const p of parts) {
        const a = field(p.x, p.y);
        let vx = Math.cos(a) * 1.5 * dpr, vy = Math.sin(a) * 1.5 * dpr;
        const dx = p.x - px, dy = p.y - py, d = Math.hypot(dx, dy);
        if (d < 170 * dpr) {
          const f = (1 - d / (170 * dpr)) * 3.2;
          vx += (dx / (d || 1)) * f * dpr;
          vy += (dy / (d || 1)) * f * dpr;
        }
        const nx = p.x + vx, ny = p.y + vy;
        ctx.strokeStyle = `rgba(${p.hue[0]},${p.hue[1]},${p.hue[2]},0.5)`;
        ctx.lineWidth = 1.1 * dpr;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke();
        p.x = nx; p.y = ny;
        if (p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          p.x = Math.random() * w; p.y = Math.random() * h;
        }
      }
      raf = requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true; resize(); ctx.clearRect(0, 0, w, h); frame();
      } else if (!entry.isIntersecting) {
        running = false; cancelAnimationFrame(raf);
      }
    }, { threshold: 0.04 });
    observer.observe(canvas);

    const onResize = () => { if (running) resize(); };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      running = false; cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}
