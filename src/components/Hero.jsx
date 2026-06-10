import { useEffect, useRef } from 'react';

const css = `
.hero {
  min-height:100vh;
  background:linear-gradient(160deg,#eef2ff 0%,#f5f7ff 55%,#fef9ee 100%);
  display:flex; align-items:center;
  padding:100px 24px 60px;
  position:relative; overflow:hidden;
}
.hero::before {
  content:''; position:absolute; top:-180px; right:-180px;
  width:560px; height:560px; border-radius:50%;
  background:radial-gradient(circle,rgba(79,70,229,.11) 0%,transparent 70%);
  pointer-events:none;
}
.hero::after {
  content:''; position:absolute; bottom:-120px; left:-120px;
  width:440px; height:440px; border-radius:50%;
  background:radial-gradient(circle,rgba(245,158,11,.09) 0%,transparent 70%);
  pointer-events:none;
}
.hero-inner {
  max-width:1140px; margin:0 auto; width:100%;
  display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center;
}
.hero-left { animation:fadeDown .8s ease both; }
.hero-badge {
  display:inline-flex; align-items:center; gap:8px;
  background:#eef2ff; color:#4338ca; border:1px solid #c7d2fe;
  padding:6px 16px; border-radius:50px; margin-bottom:24px;
  font-size:.72rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
}
.hero-badge .pulse { width:7px; height:7px; border-radius:50%; background:#4f46e5; animation:pulseBadge 1.8s ease-in-out infinite; }
.hero-title {
  font-family:'Sora',sans-serif; font-size:clamp(2.4rem,5vw,4rem);
  font-weight:800; color:#0f172a; line-height:1.1; margin-bottom:20px;
}
.hero-title .accent {
  background:linear-gradient(90deg,#4f46e5,#06b6d4,#4f46e5);
  background-size:200% auto;
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  animation:shimmer 3s linear infinite;
}
.hero-sub { font-size:1.05rem; color:#475569; max-width:460px; line-height:1.75; margin-bottom:34px; }
.hero-cta { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:40px; }
.hero-trust { display:flex; flex-wrap:wrap; gap:18px; }
.hero-trust-item { display:flex; align-items:center; gap:7px; font-size:.8rem; font-weight:600; color:#64748b; }
.tick-green { width:18px; height:18px; border-radius:50%; background:#dcfce7; color:#16a34a; display:flex; align-items:center; justify-content:center; font-size:.6rem; font-weight:900; }

/* Right visual */
.hero-right {
  display:flex; flex-direction:column; align-items:center; gap:16px;
  animation:fadeDown .9s .15s ease both; opacity:0;
}
.hero-avatar-wrap { position:relative; width:210px; height:210px; animation:floatY 3s ease-in-out infinite; }
.hero-ring {
  position:absolute; inset:-14px; border-radius:50%; border:3px solid transparent;
  background:linear-gradient(white,white) padding-box,
              linear-gradient(90deg,#4f46e5,#06b6d4,#f59e0b,#4f46e5) border-box;
  animation:spinRing 7s linear infinite;
}
.hero-circle {
  width:210px; height:210px; border-radius:50%;
  background:linear-gradient(135deg,#eef2ff,#e0e7ff);
  border:3px solid #c7d2fe;
  display:flex; align-items:center; justify-content:center;
  font-size:5rem; position:relative; z-index:1;
  box-shadow:0 16px 48px rgba(79,70,229,.16);
}
.hero-dot {
  position:absolute; bottom:12px; right:12px;
  width:20px; height:20px; border-radius:50%;
  background:#22c55e; border:3px solid #fff; z-index:2;
  animation:pulseBadge 1.6s ease-in-out infinite;
}
.hero-floating-cards { display:flex; gap:12px; }
.hero-fc {
  background:#fff; border-radius:14px; padding:12px 16px;
  box-shadow:0 4px 20px rgba(0,0,0,.08);
  display:flex; align-items:center; gap:10px;
}
.hero-fc-icon { width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:1.05rem; }
.hero-fc .fc-label { font-size:.79rem; font-weight:700; color:#0f172a; line-height:1.2; }
.hero-fc .fc-sub   { font-size:.68rem; color:#64748b; }
@media(max-width:768px){
  .hero-inner{grid-template-columns:1fr;text-align:center;}
  .hero-cta,.hero-trust{justify-content:center;}
  .hero-right{margin-top:16px;}
}
`;

const TRUST = ['NEP 2020 Certified','DPDP Act Compliant','24×7 Active','12+ Languages'];

export default function Hero() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold:.1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <section className="hero" ref={ref}>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="pulse" />
              India's #1 AI Counseling Platform — NEP 2020
            </div>
            <h1 className="hero-title">
              Your Future<br />
              <span className="accent">Starts with the</span><br />
              Right Guidance.
            </h1>
            <p className="hero-sub">
              U-Guide AI is your always-on counselor — helping every student from
              Grade 1 to 12 choose the right career, manage stress, and grow with confidence.
            </p>
            <div className="hero-cta">
              <a href="#chat" className="btn btn-primary">🚀 Start Free Today</a>
              <a href="#pillars" className="btn btn-ghost">See How It Works</a>
            </div>
            <div className="hero-trust">
              {TRUST.map(t => (
                <div key={t} className="hero-trust-item">
                  <span className="tick-green">✓</span>{t}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-avatar-wrap">
              <div className="hero-ring" />
              <div className="hero-circle">
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer glow ring */}
                  <circle cx="55" cy="55" r="50" fill="url(#grad1)" opacity="0.15"/>
                  {/* Main circle bg */}
                  <circle cx="55" cy="55" r="42" fill="url(#grad1)"/>
                  {/* Compass needle */}
                  <polygon points="55,20 61,55 55,50 49,55" fill="white" opacity="0.95"/>
                  <polygon points="55,90 61,55 55,60 49,55" fill="white" opacity="0.4"/>
                  {/* Center dot */}
                  <circle cx="55" cy="55" r="6" fill="white"/>
                  <circle cx="55" cy="55" r="3" fill="#4f46e5"/>
                  {/* Compass ring */}
                  <circle cx="55" cy="55" r="30" stroke="white" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"/>
                  {/* N/S/E/W marks */}
                  <text x="52" y="16" fill="white" fontSize="8" fontWeight="800" fontFamily="Sora,sans-serif">N</text>
                  <text x="52" y="98" fill="white" fontSize="8" fontWeight="800" fontFamily="Sora,sans-serif" opacity="0.6">S</text>
                  <text x="90" y="58" fill="white" fontSize="8" fontWeight="800" fontFamily="Sora,sans-serif" opacity="0.6">E</text>
                  <text x="14" y="58" fill="white" fontSize="8" fontWeight="800" fontFamily="Sora,sans-serif" opacity="0.6">W</text>
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="110" y2="110" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#4f46e5"/>
                      <stop offset="100%" stopColor="#06b6d4"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="hero-dot" />
              </div>
            </div>
            <div className="hero-floating-cards">
              <div className="hero-fc">
                <div className="hero-fc-icon" style={{ background:'#eef2ff' }}>🎯</div>
                <div>
                  <div className="fc-label">Career Match</div>
                  <div className="fc-sub">500+ paths mapped</div>
                </div>
              </div>
              <div className="hero-fc">
                <div className="hero-fc-icon" style={{ background:'#f0fdfa' }}>💙</div>
                <div>
                  <div className="fc-label">Wellness</div>
                  <div className="fc-sub">24×7 support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
