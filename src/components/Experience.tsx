import { motion } from 'framer-motion';

const EXPERIENCE = [
  { year: 'Jan 2026 — Present', position: 'Frontend Developer Specialization', company: 'EPAM Systems' },
  { year: 'Mar 2025 — Sep 2025', position: 'Software Engineer Intern', company: 'Grid Dynamics' },
  { year: 'Oct 2024 — Dec 2024', position: 'Frontend Developer Intern', company: 'Ingsoftware' },
  { year: 'Oct 2022 — Oct 2023', position: 'Teaching Associate', company: 'Faculty of Organizational Sciences' },
];

const Experience = () => (
  <section id="experience">
    <div className="pf-container">
      <div className="exp-layout">
        <div className="exp-aside">
          <motion.div
            initial={{ opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: 16 }}
          >
            <span className="section-tag"><span className="idx">03</span> Experience</span>
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Career<br />path<span className="dot">.</span>
          </motion.h2>
          <motion.p
            className="note"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{ color: 'var(--muted)', marginTop: 22, maxWidth: '26ch', fontSize: 15 }}
          >
            Four roles across product engineering, client work, and teaching — each one sharpened a different edge.
          </motion.p>
        </div>

        <motion.div
          className="exp-list"
          initial={{ opacity: 0, x: 34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="exp-row">
              <span className="ex-idx">0{i + 1}</span>
              <div className="ex-main">
                <h4>{e.position}</h4>
                <div className="ex-co">{e.company}</div>
              </div>
              <span className="ex-yr">{e.year}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default Experience;
