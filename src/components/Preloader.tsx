import { useEffect, useRef } from 'react';

interface Props { onComplete: () => void; }

const LINES = [
  { html: '<span class="pr">$</span> npm run portfolio', d: 60 },
  { html: '<span class="ok" style="color:#9ece6a">✓</span> compiling components...', d: 420 },
  { html: '<span class="ok" style="color:#9ece6a">✓</span> loading bogdan.vujic', d: 700 },
  { html: '<span class="ok" style="color:#9ece6a">✓</span> mounting interface', d: 980 },
  { html: '<span style="color:#22d3ee">→</span> ready.', d: 1260 },
];

const Preloader = ({ onComplete }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const booted = sessionStorage.getItem('booted') === '1';

    if (booted || reduced) {
      rootRef.current?.classList.add('done');
      const t = setTimeout(onComplete, 50);
      return () => clearTimeout(t);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach(l => {
      timers.push(setTimeout(() => {
        if (!bodyRef.current) return;
        const div = document.createElement('div');
        div.className = 'boot-line';
        div.innerHTML = l.html;
        bodyRef.current.appendChild(div);
      }, l.d));
    });

    let p = 0;
    const pi = setInterval(() => {
      p = Math.min(p + 3.2, 100);
      if (progRef.current) progRef.current.style.width = p + '%';
      if (p >= 100) clearInterval(pi);
    }, 18);

    timers.push(setTimeout(() => {
      sessionStorage.setItem('booted', '1');
      rootRef.current?.classList.add('done');
      const t = setTimeout(onComplete, 600);
      timers.push(t);
    }, 1700));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(pi);
    };
  }, [onComplete]);

  return (
    <div id="pf-preloader" ref={rootRef}>
      <div className="boot">
        <div className="bar">
          <i style={{ background: '#ff5f56' }} />
          <i style={{ background: '#ffbd2e' }} />
          <i style={{ background: '#27c93f' }} />
          <span className="t">~/bogdan/portfolio</span>
        </div>
        <div className="body" ref={bodyRef} style={{ padding: '18px', minHeight: '150px' }} />
        <div className="prog"><i ref={progRef} /></div>
      </div>
    </div>
  );
};

export default Preloader;
