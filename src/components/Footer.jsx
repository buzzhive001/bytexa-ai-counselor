const css = `
.footer { background:#0f172a; padding:56px 24px 28px; }
.footer-inner { max-width:1140px; margin:0 auto; }
.footer-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; padding-bottom:48px; border-bottom:1px solid rgba(255,255,255,.08); }
.footer-brand {}
.footer-logo { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
.footer-logo-icon { width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#4f46e5,#6366f1);display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;font-weight:900; }
.footer-logo-name { font-family:'Sora',sans-serif;font-size:1.1rem;font-weight:800;color:#fff; }
.footer-logo-name span { color:#818cf8; }
.footer-desc { font-size:.85rem; color:#94a3b8; line-height:1.75; max-width:260px; margin-bottom:18px; }
.footer-badges { display:flex; flex-wrap:wrap; gap:8px; }
.footer-badge { font-size:.68rem; font-weight:700; padding:3px 10px; border-radius:50px; background:rgba(255,255,255,.07); color:#cbd5e1; border:1px solid rgba(255,255,255,.1); }
.footer-col h5 { font-size:.78rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:#475569; margin-bottom:16px; }
.footer-col a { display:block; font-size:.85rem; color:#94a3b8; margin-bottom:10px; transition:color .2s; text-decoration:none; }
.footer-col a:hover { color:#fff; }
.footer-bottom {
  padding-top:24px; display:flex; flex-direction:column; align-items:center;
  gap:6px; text-align:center;
  border-top:1px solid rgba(255,255,255,.06);
}
.footer-copy { font-size:.85rem; color:#94a3b8; }
.footer-copy strong { color:#a5b4fc; font-weight:700; }
.footer-legal {
  font-size:.8rem; font-weight:600;
  background:linear-gradient(90deg,#6366f1,#38bdf8,#6366f1);
  background-size:200% auto;
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  animation:shimmer 4s linear infinite;
}
@media(max-width:900px){ .footer-top{grid-template-columns:1fr 1fr;} }
@media(max-width:560px){ .footer-top{grid-template-columns:1fr;} .footer-bottom{flex-direction:column;text-align:center;} }
`;

const LINKS = {
  Product:  ['Features', 'For Schools', 'Pricing', 'Changelog'],
  Support:  ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Use'],
  Company:  ['About Us', 'Blog', 'Careers', 'Press Kit'],
};

export default function Footer() {
  return (
    <>
      <style>{css}</style>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">UG</div>
                <span className="footer-logo-name">U-Guide <span>AI</span></span>
              </div>
              <p className="footer-desc">
                India's trusted AI counselor for students — built for NEP 2020, serving every school from Grade 1 to 12.
              </p>
            </div>
            {Object.entries(LINKS).map(([col, links]) => (
              <div key={col} className="footer-col">
                <h5>{col}</h5>
                {links.map(l => <a key={l} href="#">{l}</a>)}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2025 <strong>U-Guide AI</strong> — Built for India's students. Powered by NEP 2020.</p>
            <p className="footer-legal">Developed by U-Guide Foundation · Youth Empowerment &amp; Holistic Education</p>
          </div>
        </div>
      </footer>
    </>
  );
}
