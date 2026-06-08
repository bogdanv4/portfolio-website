import { useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFlowField } from '@/hooks/useFlowField';
import { Github, Linkedin, Download, ArrowUp } from 'lucide-react';

const LINES = ["LET'S WORK", 'TOGETHER.'];

function KineticText() {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const fine = useRef(window.matchMedia('(pointer:fine)').matches);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!fine.current) return;
    const root = rootRef.current;
    if (!root) return;
    const r = root.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    const chars = root.querySelectorAll<HTMLSpanElement>('.ch');
    chars.forEach(c => {
      const cr = c.getBoundingClientRect();
      const ccx = (cr.left + cr.width / 2 - r.left) / r.width - 0.5;
      c.style.transform = `translate(${-(ccx - mx) * 26}px, ${my * 20}px)`;
    });
  }, []);

  const onLeave = useCallback(() => {
    const chars = rootRef.current?.querySelectorAll<HTMLSpanElement>('.ch') ?? [];
    chars.forEach(c => { c.style.transform = 'translate(0,0)'; });
  }, []);

  return (
    <h2 className="cta-kinetic" ref={rootRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      {LINES.map((line, li) => (
        <span key={li} className="line">
          {[...line].map((ch, ci) => (
            <span
              key={ci}
              className="ch"
              style={{ animationDelay: `${((li * line.length + ci) % 7) * 0.22}s` }}
            >
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}

function useMagnetic() {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX-(r.left+r.width/2))*0.35}px,${(e.clientY-(r.top+r.height/2))*0.35}px)`;
  }, []);
  const onLeave = useCallback(() => { if (ref.current) ref.current.style.transform = ''; }, []);
  return { ref, onMove, onLeave };
}

const Contact = () => {
  const flowRef = useRef<HTMLCanvasElement>(null);
  useFlowField(flowRef);
  const emailMag = useMagnetic();

  useEffect(() => {
    const btn = document.getElementById('pf-totop');
    if (!btn) return;
    const onClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    btn.addEventListener('click', onClick);
    return () => btn.removeEventListener('click', onClick);
  }, []);

  return (
    <section id="contact" className="pf-contact">
      <canvas className="contact-flow" ref={flowRef} />
      <div className="pf-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.span
          className="eyebrow cta-eyebrow"
          initial={{ opacity: 0, x: -34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="dot" /> Let's build something
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <KineticText />
        </motion.div>

        <motion.a
          className="cta-email"
          href="mailto:vujicbogdan@gmail.com"
          ref={emailMag.ref}
          onMouseMove={emailMag.onMove}
          onMouseLeave={emailMag.onLeave}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          vujicbogdan@gmail.com <span className="ar">↗</span>
        </motion.a>

        <motion.div
          className="cta-socials"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <a className="cta-soc" href="https://github.com/bogdanv4" target="_blank" rel="noopener noreferrer">
            <Github size={20} /> GitHub
          </a>
          <a className="cta-soc" href="https://www.linkedin.com/in/bogdan-vujic" target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} /> LinkedIn
          </a>
          <a className="cta-soc" href="/Bogdan_Vujic_CV.pdf" download>
            <Download size={20} /> Download CV
          </a>
        </motion.div>

        <footer>
          <div className="foot-row">
            <span>© {new Date().getFullYear()} Bogdan Vujić. Built with care &amp; caffeine.</span>
            <span>Belgrade, Serbia 🇷🇸</span>
          </div>
          <button className="totop" id="pf-totop">
            <span className="circ">
              <ArrowUp size={15} />
            </span>
            Back to top
          </button>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
