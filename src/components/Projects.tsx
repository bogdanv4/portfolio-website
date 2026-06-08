import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const SLOT_GRADIENTS = [
  'linear-gradient(135deg, #1a1b2e 0%, #0f1629 40%, #181030 100%)',
  'linear-gradient(135deg, #0d1629 0%, #0a1f2e 40%, #0d1a24 100%)',
  'linear-gradient(135deg, #18101e 0%, #0f1a2e 40%, #0a1520 100%)',
  'linear-gradient(135deg, #0a1420 0%, #101628 40%, #1a1230 100%)',
];
const SLOT_ACCENT: [string, string][] = [
  ['#6366f1', '#818cf8'],
  ['#22d3ee', '#6366f1'],
  ['#a855f7', '#22d3ee'],
  ['#22d3ee', '#9ece6a'],
];

const PROJECTS = [
  { title: 'Air Pollution Tracker', context: 'Grid Dynamics — Capstone', stack: 'React · TypeScript · Maps API', display: 'github.com/bogdanv4/airo-capstone', url: 'https://github.com/bogdanv4/airo-capstone', cta: 'View code' },
  { title: 'Angular Web Shop', context: 'Ingsoftware — Internship', stack: 'Angular · TypeScript · Bootstrap', display: 'github.com/bogdanv4/angular-shop-project', url: 'https://github.com/bogdanv4/angular-shop-project', cta: 'View code' },
  { title: 'AI Haiku', context: 'Side Project', stack: 'React · TypeScript · AI', display: 'github.com/bogdanv4/ai-haiku', url: 'https://github.com/bogdanv4/ai-haiku', cta: 'View code' },
  { title: 'Agencija Kozic', context: 'Client Work — Live', stack: 'React · Tailwind · Framer Motion', display: 'agencijakozic.rs', url: 'https://agencijakozic.rs/', cta: 'Visit live' },
];

function ArrowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

const Projects = () => {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef<HTMLDivElement>(null);

  const isPointerFine = useRef(window.matchMedia('(pointer:fine)').matches);

  const showCta = useCallback(() => { stageRef.current?.classList.add('show-cta'); }, []);
  const hideCta = useCallback(() => { stageRef.current?.classList.remove('show-cta'); }, []);

  useEffect(() => {
    if (!isPointerFine.current) {
      stageRef.current?.classList.add('show-cta');
    }
  }, []);

  const activeProject = PROJECTS[active];

  return (
    <section id="projects">
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

        <div className="proj-layout">
          <motion.div
            className="proj-index"
            ref={idxRef}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onMouseEnter={showCta}
            onMouseLeave={hideCta}
          >
            {PROJECTS.map((p, i) => (
              <a
                key={i}
                className={`proj-row ${active === i ? 'active' : ''}`}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={e => { if (window.innerWidth >= 1000) e.preventDefault(); }}
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

          <motion.div
            className="proj-stage"
            ref={stageRef}
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
                <span className="stage-url">{activeProject.display}</span>
              </div>
              <div className="stage-body">
                {PROJECTS.map((p, i) => (
                  <div
                    key={i}
                    className={`stage-slot ${active === i ? 'on' : ''}`}
                    style={{ background: SLOT_GRADIENTS[i] }}
                  >
                    <div className="stage-slot-inner">
                      <div
                        className="stage-slot-num"
                        style={{
                          background: `linear-gradient(90deg, ${SLOT_ACCENT[i][0]}, ${SLOT_ACCENT[i][1]})`,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                          fontWeight: 700,
                        }}
                      >
                        /{String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="stage-slot-title">{p.title}</div>
                      <div className="stage-slot-stack">{p.stack}</div>
                    </div>
                    <div className="stage-glow" />
                  </div>
                ))}
                <a
                  className="stage-cta"
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{activeProject.cta}</span> ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
