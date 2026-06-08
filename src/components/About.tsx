import { motion } from 'framer-motion';

const MANIFESTO_RAW = "I turn *complex* ideas into *clean*, *accessible* interfaces — sweating the details in ~React~ & ~TypeScript~ until they feel *effortless*.";

function parseManifesto(raw: string) {
  return raw.split(' ').map(tok => {
    let cls = 'w', t = tok;
    if (t.includes('~')) { cls += ' hl v'; t = t.replace(/~/g, ''); }
    else if (t.includes('*')) { cls += ' hl'; t = t.replace(/\*/g, ''); }
    return { cls, text: t };
  });
}

const SKILLS = [
  { label: 'Frontend', skills: [
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
    { name: 'SCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
    { name: 'Ionic', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  ]},
  { label: 'Backend', skills: [
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  ]},
  { label: 'Tools', skills: [
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', invert: true },
  ]},
];

const words = parseManifesto(MANIFESTO_RAW);

const About = () => (
  <section id="about">
    <div className="pf-container">
      <motion.div
        initial={{ opacity: 0, x: -34 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ marginBottom: 48 }}
      >
        <span className="section-tag"><span className="idx">01</span> About</span>
      </motion.div>

      <p className="manifesto">
        {words.map((w, i) => (
          <span key={i} style={{ display: 'inline' }}>
            <motion.span
              className={w.cls}
              initial={{ opacity: 0.12, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.028, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {w.text}
            </motion.span>
            {' '}
          </span>
        ))}
      </p>

      <div className="about-detail">
        <motion.div
          initial={{ opacity: 0, x: -34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="lbl">{'// Currently'}</div>
          <div className="status"><span className="dot" /> Open to opportunities</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          <p>I'm a frontend-focused Software Engineer with a degree in Information Systems from the University of Belgrade. I enjoy translating complex ideas into clean, intuitive interfaces that people actually want to use.</p>
          <p>Currently a Software Engineer Intern at Grid Dynamics — building React apps with Google SSO and interactive map visualizations. Previously sharpened my craft at Ingsoftware and spent a year teaching web development at the Faculty of Organizational Sciences.</p>
          <p className="fun">Fun fact: I've been on both sides of the classroom — teaching HTML to students before I even landed my first dev job. That's commitment.</p>
        </motion.div>
      </div>

      <div className="toolkit">
        <motion.h3
          className="tk-title"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          The toolkit<span style={{ color: 'var(--indigo)' }}>.</span>
        </motion.h3>

        {SKILLS.map((cat, ci) => (
          <motion.div
            key={cat.label}
            className="tk-row"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: ci * 0.1 }}
          >
            <div className="cat">{cat.label}</div>
            <div className="tk-items">
              {cat.skills.map(s => (
                <span key={s.name} className="tk-chip">
                  <img
                    src={s.icon}
                    alt={s.name}
                    loading="lazy"
                    style={s.invert ? { filter: 'invert(1)' } : undefined}
                  />
                  <span>{s.name}</span>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
