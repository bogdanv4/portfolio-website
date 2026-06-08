import { motion } from 'framer-motion';

const TESTIMONIALS = [
  { name: 'Ana Petrović', role: 'Senior Developer, Grid Dynamics', quote: "Bogdan picks up new concepts remarkably fast. His attention to detail in UI implementation and willingness to take on complex tasks set him apart from other interns I've worked with." },
  { name: 'Marko Nikolić', role: 'Team Lead, Ingsoftware', quote: "What impressed me most was Bogdan's ability to work independently. He delivered both projects on time with clean, well-structured code. A genuinely self-driven developer." },
  { name: 'Prof. Jelena Đorđević', role: 'Faculty of Organizational Sciences', quote: "Bogdan brought real enthusiasm to teaching web development. Students responded well to his practical approach, and his materials were always thorough and up-to-date." },
  { name: 'Stefan Jovanović', role: 'Project Manager, Levi9', quote: "Bogdan consistently demonstrated strong problem-solving skills and a collaborative spirit. He communicated clearly with the team and always delivered quality work ahead of schedule." },
];

const TW_GRAD: [string, string][] = [
  ['#6366f1', '#22d3ee'],
  ['#a855f7', '#6366f1'],
  ['#22d3ee', '#9ece6a'],
  ['#818cf8', '#a855f7'],
];
const TW_HASH = ['a3f9c2e', '7d11b04', 'e82c5fa', '4b6a9d1'];
const TW_AGO = ['2 days ago', 'last week', '3 weeks ago', 'last month'];

function TwCard({ t, i }: { t: typeof TESTIMONIALS[0]; i: number }) {
  const initials = t.name.split(' ').map(n => n[0]).slice(0, 2).join('');
  const [a, b] = TW_GRAD[i % TW_GRAD.length];
  return (
    <article className="tw-card">
      <header className="tw-top">
        <div className="tw-av" style={{ background: `linear-gradient(135deg,${a},${b})` }}>{initials}</div>
        <div className="tw-id">
          <div className="tw-nm">{t.name}</div>
          <div className="tw-rl">{t.role}</div>
        </div>
        <span className="tw-appr"><span className="ic">✓</span> approved</span>
      </header>
      <p className="tw-quote">{t.quote}</p>
      <footer className="tw-foot">
        <span className="tw-hash">#{TW_HASH[i % TW_HASH.length]}</span>
        <span className="tw-ago">reviewed · {TW_AGO[i % TW_AGO.length]}</span>
      </footer>
    </article>
  );
}

function TwCol({ indices, reversed }: { indices: number[]; reversed?: boolean }) {
  const cards = indices.map(i => <TwCard key={i} t={TESTIMONIALS[i]} i={i} />);
  return (
    <div className={`tw-col ${reversed ? 'rev' : ''}`}>
      <div className="tw-coltrack">
        {cards}
        {cards}
      </div>
    </div>
  );
}

const Testimonials = () => (
  <section id="testimonials">
    <div className="pf-container">
      <div className="tw-head">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: 16 }}
          >
            <span className="section-tag"><span className="idx">04</span> Testimonials</span>
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Peer reviews<span className="dot">.</span>
          </motion.h2>
        </div>

        <motion.div
          className="tw-approved"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="appr-ring">
            <svg viewBox="0 0 36 36">
              <circle className="ring-bg" cx="18" cy="18" r="15.5" />
              <circle className="ring-fg" cx="18" cy="18" r="15.5" />
            </svg>
            <span className="appr-chk">✓</span>
          </span>
          <div className="appr-txt">
            <b><span>{TESTIMONIALS.length}</span> approvals</b>
            <span>merged to main</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="tw-wall"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <TwCol indices={[0, 1, 2, 3]} />
        <TwCol indices={[2, 3, 0, 1]} reversed />
      </motion.div>
    </div>
  </section>
);

export default Testimonials;
