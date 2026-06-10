import { useEffect, useRef, useState } from 'react';

const css = `
.stats { background:#f5f7ff; padding:80px 24px; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; }
.stats-inner { max-width:1140px; margin:0 auto; }
.stats-top { text-align:center; margin-bottom:52px; }
.stats-top h2 { font-family:'Sora',sans-serif; font-size:clamp(1.7rem,3.5vw,2.4rem); font-weight:800; color:#0f172a; margin-bottom:10px; }
.stats-top p  { color:#64748b; font-size:.95rem; }
.stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
.stat-box {
  background:#fff; border:1.5px solid #e2e8f0;
  border-radius:18px; padding:28px 20px; text-align:center;
  box-shadow:0 2px 12px rgba(79,70,229,.07); transition:transform .3s, box-shadow .3s;
}
.stat-box:hover { transform:translateY(-4px); box-shadow:0 10px 32px rgba(79,70,229,.13); border-color:#c7d2fe; }
.stat-emoji { font-size:2rem; margin-bottom:10px; display:block; }
.stat-num { font-family:'Sora',sans-serif; font-size:2.8rem; font-weight:900; background:linear-gradient(135deg,#4f46e5,#0ea5e9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1; margin-bottom:6px; }
.stat-lbl { font-size:.82rem; font-weight:600; color:#64748b; }
.stats-note { text-align:center; margin-top:32px; font-size:.8rem; color:#94a3b8; }
@media(max-width:768px){ .stats-grid{grid-template-columns:repeat(2,1fr);} }
@media(max-width:420px){ .stats-grid{grid-template-columns:1fr;} }
`;

const DATA = [
  { emoji:'🎓', target:120000, suffix:'+', label:'Students Supported' },
  { emoji:'🏫', target:3200,   suffix:'+', label:'Schools Onboarded' },
  { emoji:'🗺️', target:18,     suffix:'',  label:'States Covered' },
  { emoji:'🌐', target:12,     suffix:'',  label:'Languages Available' },
];

function Counter({ target, suffix, active }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let c = 0; const step = target / 60;
    const t = setInterval(() => { c = Math.min(c + step, target); setV(Math.floor(c)); if (c >= target) clearInterval(t); }, 25);
    return () => clearInterval(t);
  }, [active, target]);
  return <>{v.toLocaleString('en-IN')}{suffix}</>;
}

export default function Stats() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } }, { threshold: .3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="stats" ref={ref}>
        <div className="stats-inner">
          <div className="stats-top">
            <h2>Trusted Across India</h2>
            <p>Real numbers from real schools — growing every day.</p>
          </div>
          <div className="stats-grid">
            {DATA.map((d, i) => (
              <div key={i} className="stat-box">
                <span className="stat-emoji">{d.emoji}</span>
                <div className="stat-num"><Counter target={d.target} suffix={d.suffix} active={active} /></div>
                <div className="stat-lbl">{d.label}</div>
              </div>
            ))}
          </div>
          <p className="stats-note">Numbers updated quarterly · Verified by partner schools</p>
        </div>
      </div>
    </>
  );
}
