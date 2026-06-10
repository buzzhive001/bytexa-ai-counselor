import { useEffect, useRef } from 'react';

const css = `
.feats { background: #fff; padding: 88px 24px; }
.feats-inner { max-width:1140px; margin:0 auto; }
.feats-header { text-align:center; margin-bottom:64px; }
.feats-title { font-family:'Sora',sans-serif; font-size:clamp(1.9rem,4vw,2.8rem); font-weight:800; color:#0f172a; margin:12px 0; }
.feats-sub { color:#64748b; font-size:1rem; }

/* Alternating rows */
.feat-row {
  display:grid; grid-template-columns:1fr 1fr; gap:48px;
  align-items:center; margin-bottom:72px;
}
.feat-row:last-child { margin-bottom:0; }
.feat-row.flip .feat-visual { order:-1; }
.feat-visual {
  border-radius:22px; padding:36px;
  display:flex; align-items:center; justify-content:center;
  min-height:220px; position:relative; overflow:hidden;
}
.fv0 { background:linear-gradient(135deg,#eef2ff,#e0e7ff); border:1.5px solid #c7d2fe; }
.fv1 { background:linear-gradient(135deg,#f0fdfa,#ccfbf1); border:1.5px solid #99f6e4; }
.fv2 { background:linear-gradient(135deg,#fffbeb,#fef3c7); border:1.5px solid #fde68a; }
.feat-visual-emoji { font-size:5.5rem; filter:drop-shadow(0 8px 20px rgba(0,0,0,.1)); }
.feat-visual-deco {
  position:absolute; width:160px; height:160px; border-radius:50%;
  pointer-events:none; opacity:.25;
}
.feat-text {}
.feat-kicker { font-size:.7rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
.fk0 { color:#4338ca; } .fk1 { color:#0f766e; } .fk2 { color:#92400e; }
.feat-text h3 { font-family:'Sora',sans-serif; font-size:clamp(1.3rem,2.5vw,1.75rem); font-weight:800; color:#0f172a; margin-bottom:12px; line-height:1.25; }
.feat-text p  { font-size:.93rem; color:#475569; line-height:1.78; margin-bottom:20px; }
.feat-points { display:flex; flex-direction:column; gap:10px; }
.feat-point {
  display:flex; align-items:center; gap:12px;
  background:#f8fafc; border-radius:10px; padding:10px 14px;
  border:1px solid #e2e8f0; font-size:.83rem; font-weight:600; color:#334155;
}
.feat-point-dot { width:28px; height:28px; border-radius:8px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:.95rem; }

@media(max-width:768px){
  .feat-row, .feat-row.flip .feat-visual { grid-template-columns:1fr; order:unset; }
  .feat-row.flip .feat-visual { order:0; }
}
`;

const ROWS = [
  {
    flip: false, vClass:'fv0', kClass:'fk0',
    kicker:'📊 Insight Engine',
    emoji:'🧭',
    title:'Know Exactly Where You Are — and Where to Go',
    body:'Our aptitude engine doesn\'t just give you a score. It builds a complete picture of how you think, what drives you, and which careers will actually make you happy.',
    points:[
      { dot:'🎯', bg:'#eef2ff', text:'NEP 2020 multiple-intelligences framework' },
      { dot:'📈', bg:'#eef2ff', text:'Personalised weekly progress reports' },
      { dot:'🏆', bg:'#eef2ff', text:'500+ mapped career paths' },
    ],
  },
  {
    flip: true, vClass:'fv1', kClass:'fk1',
    kicker:'🎙️ Voice & Language',
    emoji:'🌐',
    title:'Talk in Your Language. Learn in Your Way.',
    body:'Whether you prefer typing, speaking, or your regional language — U-Guide AI meets you where you are. No language barrier, no tech barrier.',
    points:[
      { dot:'🗣️', bg:'#f0fdfa', text:'Voice-enabled sessions, hands-free' },
      { dot:'🌏', bg:'#f0fdfa', text:'12+ Indian languages supported' },
      { dot:'📱', bg:'#f0fdfa', text:'Works on any browser, no app needed' },
    ],
  },
  {
    flip: false, vClass:'fv2', kClass:'fk2',
    kicker:'🎮 Engagement & Family',
    emoji:'👨‍👩‍👧',
    title:'Learning That Sticks — for Students and Families',
    body:'Gamified missions keep students engaged while parents stay informed. Everyone plays a role in the student\'s success — and now everyone has a seat at the table.',
    points:[
      { dot:'🏅', bg:'#fffbeb', text:'Quests, badges and gamified milestones' },
      { dot:'👨‍👩‍👧', bg:'#fffbeb', text:'Secure parent dashboard with insights' },
      { dot:'📅', bg:'#fffbeb', text:'AI study planner with smart scheduling' },
    ],
  },
];

export default function Features() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: .08 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <section ref={ref} className="feats">
        <div className="feats-inner">
          <div className="feats-header reveal">
            <span className="chip chip-teal">Platform Features</span>
            <h2 className="feats-title">Tools Built for Real Students,<br />Real Schools, Real Impact</h2>
            <p className="feats-sub">Not just another edtech app — a counselling system that actually works.</p>
          </div>

          {ROWS.map((r, i) => (
            <div key={i} className={`feat-row${r.flip ? ' flip' : ''} reveal`} style={{ transitionDelay: `${i * .1}s` }}>
              <div className={`feat-visual ${r.vClass}`}>
                <div className="feat-visual-deco" style={{ background:'rgba(0,0,0,.15)', top:'-30px', right:'-30px' }} />
                <span className="feat-visual-emoji">{r.emoji}</span>
              </div>
              <div className="feat-text">
                <div className={`feat-kicker ${r.kClass}`}>{r.kicker}</div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <div className="feat-points">
                  {r.points.map((pt, j) => (
                    <div key={j} className="feat-point">
                      <div className="feat-point-dot" style={{ background: pt.bg }}>{pt.dot}</div>
                      {pt.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
