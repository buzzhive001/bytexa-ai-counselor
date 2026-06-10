import { useState, useEffect } from 'react';

const LINKS = ['Features', 'How It Works', 'For Schools', 'About'];

const css = `
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  transition: background .3s, box-shadow .3s;
}
.nav.scrolled {
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 #e2e8f0;
}
.nav-inner {
  max-width: 1140px; margin: 0 auto; padding: 0 24px;
  height: 68px; display: flex; align-items: center; justify-content: space-between;
}
.nav-logo {
  display: flex; align-items: center; gap: 10px;
}
.nav-logo-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: linear-gradient(135deg,#4f46e5,#6366f1);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: .85rem; font-weight: 900; letter-spacing: -.5px;
  box-shadow: 0 4px 12px rgba(79,70,229,.3);
}
.nav-logo-text {
  font-family: 'Sora', sans-serif; font-size: 1.15rem; font-weight: 800;
  color: #1e293b;
}
.nav-logo-text span { color: #4f46e5; }
.nav-links { display: flex; gap: 32px; }
.nav-links a {
  font-size: .88rem; font-weight: 600; color: #64748b;
  text-decoration: none; transition: color .2s;
}
.nav-links a:hover { color: #4f46e5; }
.nav-cta {
  background: linear-gradient(135deg,#4f46e5,#6366f1);
  color: #fff !important; padding: 9px 22px; border-radius: 50px;
  font-size: .85rem; font-weight: 700; transition: box-shadow .2s, transform .2s;
  box-shadow: 0 4px 14px rgba(79,70,229,.3);
}
.nav-cta:hover { box-shadow: 0 6px 20px rgba(79,70,229,.4); transform: translateY(-1px); }
@media(max-width:768px){ .nav-links{display:none} }
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <style>{css}</style>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <div className="nav-logo-icon">UG</div>
            <span className="nav-logo-text">U-Guide <span>AI</span></span>
          </a>
          <nav className="nav-links">
            {LINKS.map(l => <a key={l} href="#">{l}</a>)}
          </nav>
          <a href="#chat" className="nav-cta">🚀 Try Free</a>
        </div>
      </header>
    </>
  );
}
