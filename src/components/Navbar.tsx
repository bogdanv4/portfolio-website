import { useState, useEffect, useCallback } from 'react';
import { X, Menu } from 'lucide-react';

const SECTIONS = ['about', 'projects', 'experience', 'testimonials', 'contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollWidth, setScrollWidth] = useState(0);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
    const doc = document.documentElement;
    setScrollWidth(window.scrollY / (doc.scrollHeight - doc.clientHeight) * 100);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div id="pf-scrollbar" style={{ width: `${scrollWidth}%` }} />

      <nav className={`pf-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="pf-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#hero" className="pf-logo">bogdan<span className="dot">.</span></a>

          <div className="pf-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            {SECTIONS.map(id => (
              <a key={id} href={`#${id}`} className={`pf-nav-link ${activeSection === id ? 'active' : ''}`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <a href="/Bogdan_Vujic_CV.pdf" download className="pf-nav-cta">Resume</a>
          </div>

          <button
            className="pf-nav-toggle"
            style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: '4px' }}
            aria-label="Menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`pf-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {SECTIONS.map(id => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
        <a href="/Bogdan_Vujic_CV.pdf" download className="cta" onClick={closeMenu}>
          Download Resume →
        </a>
      </div>
    </>
  );
};

export default Navbar;
