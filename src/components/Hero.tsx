import { useRef, useEffect, useState, useCallback } from 'react';
import { useAurora } from '@/hooks/useAurora';
import { useWaveDots } from '@/hooks/useWaveDots';

const ROLES = ['Frontend Engineer', 'React Developer', 'UI Craftsman', 'TypeScript Dev'];

const STATS = [
  { count: 5, label: 'Positions' },
  { count: 10, suffix: '+', label: 'Projects' },
  { count: 3, suffix: '+', label: 'Yrs Coding' },
];

function useTyped(words: string[], start: boolean) {
  const [text, setText] = useState('');
  useEffect(() => {
    if (!start) return;
    let wi = 0, ci = 0, del = false, timer: ReturnType<typeof setTimeout>;
    function tick() {
      const word = words[wi];
      setText(word.slice(0, ci));
      if (!del) {
        ci++;
        if (ci > word.length) { del = true; timer = setTimeout(tick, 1500); return; }
      } else {
        ci--;
        if (ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; }
      }
      timer = setTimeout(tick, del ? 45 : 95);
    }
    tick();
    return () => clearTimeout(timer);
  }, [words, start]);
  return text;
}

function useCounter(target: number, suffix = '', start = false) {
  const [val, setVal] = useState('0' + suffix);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !start) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const dur = 1500, start = performance.now();
      function step(now: number) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * target) + suffix);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, start]);
  return { val, ref };
}

function useMagnetic() {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width/2)) * 0.35}px, ${(e.clientY - (r.top + r.height/2)) * 0.35}px)`;
  }, []);
  const onLeave = useCallback(() => { if (ref.current) ref.current.style.transform = ''; }, []);
  return { ref, onMove, onLeave };
}

interface Props { ready: boolean; }

const Hero = ({ ready }: Props) => {
  const heroRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLCanvasElement>(null);
  const auroraRef = useRef<HTMLCanvasElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const typed = useTyped(ROLES, ready);

  useWaveDots(fieldRef);
  useAurora(auroraRef);

  const btn1 = useMagnetic();
  const btn2 = useMagnetic();

  const stat0 = useCounter(STATS[0].count, STATS[0].suffix, ready);
  const stat1 = useCounter(STATS[1].count, STATS[1].suffix, ready);
  const stat2 = useCounter(STATS[2].count, STATS[2].suffix, ready);

  useEffect(() => {
    const host = codeRef.current;
    if (!host || !ready) return;
    const lines = host.querySelectorAll<HTMLDivElement>('.ln');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      lines.forEach((ln, i) => setTimeout(() => ln.classList.add('vis'), 300 + i * 200));
    }, { threshold: 0.25 });
    observer.observe(host);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <header id="hero" className="pf-hero" ref={heroRef}>
      <canvas className="hero-field" ref={fieldRef} />

      <div className="hero-glow">
        <div className="g1" />
        <div className="g2" />
      </div>

      <div className="pf-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 'clamp(28px,4vw,64px)', alignItems: 'center', width: '100%' }}>
          <div className="hero-left" style={{ minWidth: 0 }}>
            <span className="eyebrow">
              <span className="dot" />
              Based in Serbia
            </span>

            <h1 className="hero-name">
              Bogdan<br />
              <span className="last">Vujić</span>
            </h1>

            <div className="role-line">
              <span className="gt">&gt;</span>
              <span className="key">role</span>
              {' = "'}
              <span className="typed">{typed}</span>
              {'"'}
              <span className="pf-cur" />
            </div>

            <div className="hero-stats">
              {[stat0, stat1, stat2].map((s, i) => (
                <div className="stat" key={i} ref={s.ref}>
                  <div className="n">{s.val}</div>
                  <div className="l">{STATS[i].label}</div>
                </div>
              ))}
            </div>

            <div className="hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a
                href="#projects"
                className="btn btn-primary"
                ref={btn1.ref}
                onMouseMove={btn1.onMove}
                onMouseLeave={btn1.onLeave}
              >
                View My Work <span className="ar">↓</span>
              </a>
              <a
                href="#contact"
                className="btn btn-ghost"
                ref={btn2.ref}
                onMouseMove={btn2.onMove}
                onMouseLeave={btn2.onLeave}
              >
                Get In Touch
              </a>
            </div>
          </div>

          <div className="pf-console">
            <canvas ref={auroraRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            <div className="bar">
              <i style={{ background: '#ff5f56' }} />
              <i style={{ background: '#ffbd2e' }} />
              <i style={{ background: '#27c93f' }} />
              <span className="t">bogdan.vujic.tsx</span>
            </div>
            <div className="code" ref={codeRef}>
              <div className="ln"><span className="cm">{'// building interfaces, one component at a time'}</span></div>
              <div className="ln"><span className="kw">const</span> <span className="pr">engineer</span> = {'{'}</div>
              <div className="ln">&nbsp;&nbsp;name: <span className="st">"Bogdan Vujić"</span>,</div>
              <div className="ln">&nbsp;&nbsp;focus: <span className="st">"Frontend"</span>,</div>
              <div className="ln">&nbsp;&nbsp;stack: [<span className="st">"React"</span>, <span className="st">"TypeScript"</span>, <span className="st">"Next.js"</span>],</div>
              <div className="ln">&nbsp;&nbsp;location: <span className="st">"Belgrade, Serbia"</span>,</div>
              <div className="ln">&nbsp;&nbsp;<span className="fn">isAvailable</span>: () =&gt; <span className="kw">true</span>,</div>
              <div className="ln">{'};'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="scrollcue">
        <div className="mouse"><i /></div>
        Scroll
      </div>
    </header>
  );
};

export default Hero;
