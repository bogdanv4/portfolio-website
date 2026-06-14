const ITEMS = ['React', 'TypeScript', 'Next.js', 'Vue', 'Angular', 'Node.js', 'SCSS', 'Figma', 'Claude', 'Cursor', 'Lovable'];

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
