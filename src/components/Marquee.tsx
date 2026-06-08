const ITEMS = ['React', 'TypeScript', 'Next.js', 'Angular', 'Node.js', 'SCSS', 'Figma'];

const Marquee = () => (
  <div className="pf-marquee">
    <div className="pf-marquee-track">
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span key={i} className="pf-marquee-item">{item}</span>
      ))}
    </div>
  </div>
);

export default Marquee;
