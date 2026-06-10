import { useRef, useEffect } from 'react';

const css = `
.stages { background:#f5f7ff; padding:72px 0; overflow:hidden; }
.stages-header { text-align:center; margin-bottom:36px; padding:0 24px; }
.stages-title { font-family:'Sora',sans-serif; font-size:clamp(1.6rem,3.5vw,2.4rem); font-weight:800; color:#0f172a; margin:10px 0; }
.stages-sub { color:#64748b; font-size:.93rem; max-width:460px; margin:0 auto; }

/* Auto-scroll outer — masks overflow */
.stages-belt-outer {
  overflow:hidden;
  padding:8px 0 20px;
  position:relative;
}
/* Fade edges */
.stages-belt-outer::before,
.stages-belt-outer::after {
  content:''; position:absolute; top:0; bottom:0; width:160px; z-index:2; pointer-events:none;
}
.stages-belt-outer::before { left:0;  background:linear-gradient(to right,#f5f7ff 40%,transparent); }
.stages-belt-outer::after  { right:0; background:linear-gradient(to left,#f5f7ff 40%,transparent); }

/* The scrolling belt — duplicated for seamless loop */
.stages-belt {
  display:flex; gap:16px;
  width:max-content;
  animation:stagescroll 18s linear infinite;
}
.stages-belt:hover { animation-play-state:paused; }

@keyframes stagescroll {
  from { transform:translateX(0); }
  to   { transform:translateX(-50%); }
}

/* Card — smaller */
.stage-card {
  width:210px; flex-shrink:0; border-radius:18px; overflow:hidden;
  box-shadow:0 3px 14px rgba(0,0,0,.07);
  background:#fff; border:1.5px solid #e2e8f0;
  transition:transform .25s, box-shadow .25s;
  cursor:default;
}
.stage-card:hover { transform:translateY(-5px); box-shadow:0 10px 30px rgba(79,70,229,.12); border-color:#c7d2fe; }

.stage-card-top {
  padding:18px 18px 14px;
  position:relative; overflow:hidden;
}
.stage-card-top::after {
  content:''; position:absolute; bottom:-16px; right:-16px;
  width:72px; height:72px; border-radius:50%;
  background:rgba(255,255,255,.22); pointer-events:none;
}
.s0 .stage-card-top { background:linear-gradient(135deg,#4f46e5,#818cf8); }
.s1 .stage-card-top { background:linear-gradient(135deg,#14b8a6,#5eead4); }
.s2 .stage-card-top { background:linear-gradient(135deg,#f59e0b,#fcd34d); }
.s3 .stage-card-top { background:linear-gradient(135deg,#f43f5e,#fb7185); }

.stage-num  { font-family:'Sora',sans-serif; font-size:1.9rem; font-weight:900; color:rgba(255,255,255,.2); line-height:1; margin-bottom:5px; }
.stage-emoji { font-size:1.6rem; display:block; margin-bottom:7px; }
.stage-title { font-family:'Sora',sans-serif; font-size:.95rem; font-weight:800; color:#fff; margin-bottom:2px; }
.stage-yrs   { font-size:.62rem; font-weight:700; color:rgba(255,255,255,.72); letter-spacing:.07em; text-transform:uppercase; }

.stage-card-body { padding:14px 16px; }
.stage-ages { font-size:.7rem; font-weight:700; color:#94a3b8; margin-bottom:6px; }
.stage-desc { font-size:.78rem; color:#475569; line-height:1.65; margin-bottom:12px; }
.stage-pill { display:inline-block; font-size:.65rem; font-weight:700; padding:3px 10px; border-radius:50px; }
.s0 .stage-pill { background:#eef2ff; color:#4338ca; }
.s1 .stage-pill { background:#f0fdfa; color:#0f766e; }
.s2 .stage-pill { background:#fffbeb; color:#92400e; }
.s3 .stage-pill { background:#fff1f2; color:#be123c; }
`;

const STAGES = [
  { cls:'s0', num:'01', emoji:'🌸', title:'Foundational', yrs:'5 Years', ages:'Ages 3 – 8',
    desc:'Learning through play, making friends, and building emotional habits that last a lifetime.',
    pill:'Early Foundations' },
  { cls:'s1', num:'02', emoji:'📖', title:'Preparatory',  yrs:'3 Years', ages:'Ages 8 – 11',
    desc:'Sparking curiosity, practising self-expression, and discovering what makes each child unique.',
    pill:'Curiosity Stage' },
  { cls:'s2', num:'03', emoji:'🔭', title:'Middle Stage', yrs:'3 Years', ages:'Ages 11 – 14',
    desc:'Navigating exam stress, friendships, and the exciting maze of subject choices.',
    pill:'Exploration Stage' },
  { cls:'s3', num:'04', emoji:'🚀', title:'Secondary',    yrs:'4 Years', ages:'Ages 14 – 18',
    desc:'Turning dreams into plans — entrance prep, career roadmaps, and stepping boldly into the future.',
    pill:'Future-Ready Stage' },
];

function StageCard({ s }) {
  return (
    <div className={`stage-card ${s.cls}`}>
      <div className="stage-card-top">
        <div className="stage-num">{s.num}</div>
        <span className="stage-emoji">{s.emoji}</span>
        <div className="stage-title">{s.title}</div>
        <div className="stage-yrs">{s.yrs}</div>
      </div>
      <div className="stage-card-body">
        <div className="stage-ages">{s.ages}</div>
        <p className="stage-desc">{s.desc}</p>
        <span className="stage-pill">{s.pill}</span>
      </div>
    </div>
  );
}

export default function Stages() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: .1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <section ref={ref} className="stages">
        <div className="stages-header reveal">
          <span className="chip chip-amber">5 + 3 + 3 + 4 Framework</span>
          <h2 className="stages-title">The Right Support at the Right Age</h2>
          <p className="stages-sub">Every stage of childhood is different. Bytexa AI adapts so the guidance always fits.</p>
        </div>

        {/* Auto-scroll belt — cards duplicated for seamless loop */}
        <div className="stages-belt-outer reveal" style={{ transitionDelay:'.1s' }}>
          <div className="stages-belt">
            {/* Original set */}
            {STAGES.map((s, i) => <StageCard key={`a${i}`} s={s} />)}
            {/* Duplicate for seamless loop */}
            {STAGES.map((s, i) => <StageCard key={`b${i}`} s={s} />)}
          </div>
        </div>
      </section>
    </>
  );
}
