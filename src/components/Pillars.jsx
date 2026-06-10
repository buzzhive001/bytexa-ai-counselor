import { useEffect, useRef, useState } from 'react';

const css = `
.pillars { background: #fff; padding: 88px 0; overflow: hidden; }
.pillars-header { text-align: center; margin-bottom: 48px; padding: 0 24px; }
.pillars-title { font-family:'Sora',sans-serif; font-size:clamp(1.9rem,4vw,2.8rem); font-weight:800; color:#0f172a; margin:12px 0; }
.pillars-sub { color:#64748b; font-size:1rem; max-width:460px; margin:0 auto; }

/* Tab nav */
.pill-tabs { display:flex; justify-content:center; gap:10px; margin-bottom:40px; padding:0 24px; flex-wrap:wrap; }
.pill-tab {
  padding:10px 24px; border-radius:50px; font-size:.88rem; font-weight:700;
  cursor:pointer; border:2px solid #e2e8f0; background:#f8fafc; color:#64748b;
  transition:all .2s; display:flex; align-items:center; gap:8px;
}
.pill-tab.active { border-color:transparent; color:#fff; }
.pill-tab.t0.active { background:linear-gradient(135deg,#4f46e5,#6366f1); box-shadow:0 4px 18px rgba(79,70,229,.35); }
.pill-tab.t1.active { background:linear-gradient(135deg,#14b8a6,#2dd4bf); box-shadow:0 4px 18px rgba(20,184,166,.35); }
.pill-tab.t2.active { background:linear-gradient(135deg,#f59e0b,#fcd34d); color:#1e293b; box-shadow:0 4px 18px rgba(245,158,11,.35); }

/* Content panel */
.pill-panel {
  max-width:1140px; margin:0 auto; padding:0 24px;
  display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center;
  animation:scaleIn .35s ease both;
}
.pill-visual {
  border-radius:24px; aspect-ratio:4/3; display:flex; align-items:center;
  justify-content:center; font-size:8rem; position:relative; overflow:hidden;
}
.pill-visual.v0 { background:linear-gradient(135deg,#eef2ff,#c7d2fe); }
.pill-visual.v1 { background:linear-gradient(135deg,#f0fdfa,#99f6e4); }
.pill-visual.v2 { background:linear-gradient(135deg,#fffbeb,#fde68a); }
.pill-visual-deco {
  position:absolute; width:180px; height:180px; border-radius:50%;
  opacity:.3; pointer-events:none;
}
.pill-body {}
.pill-kicker { font-size:.72rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase; margin-bottom:14px; }
.v0-text { color:#4338ca; } .v1-text { color:#0f766e; } .v2-text { color:#92400e; }
.pill-body h3 { font-family:'Sora',sans-serif; font-size:clamp(1.5rem,3vw,2.1rem); font-weight:800; color:#0f172a; line-height:1.2; margin-bottom:16px; }
.pill-body p  { color:#475569; font-size:.96rem; line-height:1.8; margin-bottom:24px; }
.pill-bullets { list-style:none; display:flex; flex-direction:column; gap:10px; margin-bottom:28px; }
.pill-bullets li { display:flex; align-items:center; gap:10px; font-size:.88rem; color:#334155; font-weight:500; }
.pill-bullets li::before { content:''; width:8px; height:8px; border-radius:50%; flex-shrink:0; }
.t0 .pill-bullets li::before { background:#4f46e5; }
.t1 .pill-bullets li::before { background:#14b8a6; }
.t2 .pill-bullets li::before { background:#f59e0b; }
@media(max-width:768px){ .pill-panel{grid-template-columns:1fr;} .pill-visual{display:none;} }
`;

const TABS = [
  {
    icon: '🎯', label: 'Career Path',
    kicker: 'Career Guidance', vClass: 'v0', tClass: 't0', kColor: 'v0-text',
    emoji: '🗺️',
    title: 'Find the Career That Was Made for You',
    body: 'Stop guessing your future. U-Guide AI maps your unique strengths, passions and learning style to real career options — starting as early as Grade 3.',
    bullets: ['Strength-based aptitude mapping', 'Subject-to-career roadmaps', 'Live mentor connect sessions', '500+ career paths covered'],
    tag: '🎓 For Ages 8 – 18',
  },
  {
    icon: '💙', label: 'Wellness',
    kicker: 'Mental Wellness', vClass: 'v1', tClass: 't1', kColor: 'v1-text',
    emoji: '🌿',
    title: 'A Safe Space When Things Get Heavy',
    body: 'Exam pressure, friendship stress, family worries — U-Guide AI listens without judgement, around the clock. And when you need more, a real counsellor is one tap away.',
    bullets: ['Anonymous, judgment-free conversations', 'Stress & anxiety coping tools', 'Real human counsellor escalation', 'Crisis support protocols'],
    tag: '💙 Always On — 24 × 7',
  },
  {
    icon: '🌱', label: 'Full Growth',
    kicker: 'Holistic Development', vClass: 'v2', tClass: 't2', kColor: 'v2-text',
    emoji: '🏆',
    title: 'Grow Beyond the Textbook',
    body: 'Academic scores are just one part of the picture. U-Guide AI nurtures confidence, emotional intelligence and life skills at every stage — from kindergarten to Class 12.',
    bullets: ['Stage-tuned counselling approach', 'Emotional intelligence exercises', 'Life skills & confidence building', 'Play-based learning for young kids'],
    tag: '⚡ Stage-Adaptive AI',
  },
];

export default function Pillars() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: .1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const t = TABS[active];

  return (
    <>
      <style>{css}</style>
      <section id="pillars" ref={ref} className="pillars">
        <div className="pillars-header reveal">
          <span className="chip chip-indigo">What We Offer</span>
          <h2 className="pillars-title">One Platform. Three Superpowers.</h2>
          <p className="pillars-sub">Choose what you need — or let U-Guide AI figure it out for you.</p>
        </div>

        {/* Tabs */}
        <div className="pill-tabs reveal" style={{ transitionDelay: '.05s' }}>
          {TABS.map((tab, i) => (
            <button key={i} className={`pill-tab ${tab.tClass}${active === i ? ' active' : ''}`} onClick={() => setActive(i)}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div key={active} className={`pill-panel ${t.tClass} reveal`} style={{ transitionDelay: '.1s' }}>
          <div className={`pill-visual ${t.vClass}`}>
            <div className="pill-visual-deco" style={{ background: 'rgba(0,0,0,.08)', top: '-40px', right: '-40px' }} />
            <span style={{ fontSize: '7rem', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.15))' }}>{t.emoji}</span>
          </div>
          <div className="pill-body">
            <p className={`pill-kicker ${t.kColor}`}>{t.kicker}</p>
            <h3>{t.title}</h3>
            <p>{t.body}</p>
            <ul className="pill-bullets">
              {t.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
            <span className="chip chip-indigo">{t.tag}</span>
          </div>
        </div>
      </section>
    </>
  );
}
