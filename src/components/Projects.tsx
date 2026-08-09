import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAutoCycle } from '@/hooks/useAutoCycle';

const SLOT_GRADIENTS = [
  'linear-gradient(135deg, #1a1b2e 0%, #0f1629 40%, #181030 100%)',
  'linear-gradient(135deg, #0d1629 0%, #0a1f2e 40%, #0d1a24 100%)',
  'linear-gradient(135deg, #18101e 0%, #0f1a2e 40%, #0a1520 100%)',
  'linear-gradient(135deg, #0a1420 0%, #101628 40%, #1a1230 100%)',
];
const PROJECTS = [
  { slug: 'finance-tracker', title: 'Finance Tracker', context: 'Full-Stack Side Project — Live', stack: 'Next.js · TypeScript · Supabase', display: 'finance-tracker-three-lake-17.vercel.app', url: 'https://finance-tracker-three-lake-17.vercel.app/', cta: 'Visit live' },
  { slug: 'air-pollution-tracker', title: 'Air Pollution Tracker', context: 'Grid Dynamics — Capstone', stack: 'React · TypeScript · Maps API', display: 'github.com/bogdanv4/airo-capstone', url: 'https://github.com/bogdanv4/airo-capstone', cta: 'View code' },
  { slug: 'angular-web-shop', title: 'Angular Web Shop', context: 'Ingsoftware — Internship', stack: 'Angular · TypeScript · Bootstrap', display: 'github.com/bogdanv4/angular-shop-project', url: 'https://github.com/bogdanv4/angular-shop-project', cta: 'View code' },
  { slug: 'agencija-kozic', title: 'Agencija Kozic', context: 'Client Work — Live', stack: 'React · Tailwind · Framer Motion', display: 'agencijakozic.rs', url: 'https://agencijakozic.rs/', cta: 'Visit live' },
];

const SHOTS = import.meta.glob('../assets/shots/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function shotFor(slug: string) {
  const entry = Object.entries(SHOTS).find(([path]) => path.includes(`/${slug}.`));
  return entry?.[1];
}

const CYCLE_INTERVAL_MS = 5000;

function ArrowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function StageUrl({ text }: { text: string }) {
  const [shown, setShown] = useState(text);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setShown(text);
      return;
    }

    clearTimeout(timerRef.current);
    setTyping(true);
    setShown('');
    const step = Math.max(50, 800 / Math.max(1, text.length));
    let i = 0;
    const tick = () => {
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) {
        timerRef.current = setTimeout(tick, step);
      } else {
        setTyping(false);
      }
    };
    timerRef.current = setTimeout(tick, step);

    return () => clearTimeout(timerRef.current);
  }, [text]);

  return (
    <span className="stage-url">
      {shown}
      {typing && <i className="stage-caret" />}
    </span>
  );
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLElement>(null);
  const isPointerFine = useRef(window.matchMedia('(pointer:fine)').matches);
  const [ctaVisible, setCtaVisible] = useState(!isPointerFine.current);
  const [hovered, setHovered] = useState(false);
  const [showStage, setShowStage] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1001px)').matches
  );

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1001px)');
    const onChange = () => setShowStage(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const { index: active, select } = useAutoCycle({
    count: PROJECTS.length,
    intervalMs: CYCLE_INTERVAL_MS,
    paused: hovered,
    rootRef: sectionRef,
    progressRef,
  });

  const showCta = useCallback(() => { setCtaVisible(true); }, []);
  const hideCta = useCallback(() => {
    if (isPointerFine.current) setCtaVisible(false);
  }, []);
  const onEnter = useCallback(() => { showCta(); setHovered(true); }, [showCta]);
  const onLeave = useCallback(() => { hideCta(); setHovered(false); }, [hideCta]);

  const activeProject = PROJECTS[active];

  return (
    <section id="projects" ref={sectionRef}>
      <div className="pf-container">
        <div className="proj-head">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ marginBottom: 16 }}
            >
              <span className="section-tag"><span className="idx">02</span> Selected Work</span>
            </motion.div>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Things I've built<span className="dot">.</span>
            </motion.h2>
          </div>
        </div>

        <div
          className="proj-layout"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onFocus={onEnter}
          onBlur={onLeave}
        >
          <motion.div
            className="proj-index"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {PROJECTS.map((p, i) => (
              <a
                key={i}
                className={`proj-row ${active === i ? 'active' : ''}`}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
              >
                <span className="pr-idx">0{i + 1}</span>
                <div className="pr-main">
                  <h3>{p.title}</h3>
                  <div className="pr-meta">
                    <span>{p.context}</span>
                    <span>{p.stack}</span>
                  </div>
                </div>
                <span className="pr-arrow"><ArrowIcon /></span>
              </a>
            ))}
          </motion.div>

          {showStage && (
            <motion.div
              className={`proj-stage ${ctaVisible ? 'show-cta' : ''}`}
              aria-hidden="true"
              initial={{ opacity: 0, x: 34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="stage-win">
                <div className="stage-bar">
                  <i style={{ background: '#ff5f56' }} />
                  <i style={{ background: '#ffbd2e' }} />
                  <i style={{ background: '#27c93f' }} />
                  <StageUrl text={activeProject.display} />
                </div>
                <div className="stage-progress"><i ref={progressRef} /></div>
                <div className="stage-body">
                  {PROJECTS.map((p, i) => {
                    const shot = shotFor(p.slug);
                    return (
                      <div
                        key={i}
                        className={`stage-slot ${active === i ? 'on' : ''}`}
                        style={{ background: SLOT_GRADIENTS[i] }}
                      >
                        {shot && (
                          <>
                            <img
                              className="stage-shot"
                              src={shot}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="stage-scrim" />
                          </>
                        )}
                        <div className="stage-glow" />
                      </div>
                    );
                  })}
                  <a
                    className="stage-cta"
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                  >
                    <span>{activeProject.cta}</span> ↗
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
