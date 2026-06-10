import { useState, useRef, useEffect } from 'react';

const css = `
.chat-sec { background:#fff; padding:88px 24px; }
.chat-inner { max-width:1140px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
.chat-info-chip { margin-bottom:14px; }
.chat-title { font-family:'Sora',sans-serif; font-size:clamp(1.8rem,3.5vw,2.6rem); font-weight:800; color:#0f172a; line-height:1.18; margin:12px 0 14px; }
.chat-sub { font-size:.95rem; color:#475569; line-height:1.75; margin-bottom:28px; }
.feat-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.feat-tile {
  background:#f8fafc; border-radius:12px; padding:14px;
  border:1px solid #e2e8f0; display:flex; align-items:flex-start; gap:10px;
  transition:border-color .2s, box-shadow .2s;
}
.feat-tile:hover { border-color:#c7d2fe; box-shadow:0 4px 16px rgba(79,70,229,.08); }
.feat-tile .ico { font-size:1.3rem; flex-shrink:0; margin-top:2px; }
.feat-tile .ft-label { font-size:.82rem; font-weight:700; color:#0f172a; }
.feat-tile .ft-sub   { font-size:.72rem; color:#64748b; margin-top:2px; }

/* Chat window */
.chat-win {
  border-radius:20px; overflow:hidden;
  box-shadow:0 12px 48px rgba(79,70,229,.12);
  border:1.5px solid #e2e8f0;
}
.chat-topbar {
  background:linear-gradient(135deg,#4f46e5,#6366f1);
  padding:14px 18px; display:flex; align-items:center; gap:10px;
}
.chat-avt {
  width:38px;height:38px;border-radius:50%;
  background:rgba(255,255,255,.2);
  display:flex;align-items:center;justify-content:center;font-size:1.3rem;
}
.chat-topbar-name { color:#fff; font-weight:800; font-size:.88rem; line-height:1.2; }
.chat-topbar-status { color:#a5f3fc; font-size:.72rem; font-weight:600; }
.chat-topbar-badge {
  margin-left:auto; background:rgba(255,255,255,.18); color:#fff;
  font-size:.65rem; font-weight:800; padding:3px 10px; border-radius:50px;
  border:1px solid rgba(255,255,255,.25);
}
.chat-dots { display:flex;gap:5px;padding:14px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0; }
.chat-dot { width:10px;height:10px;border-radius:50%; }
.chat-msgs {
  background:#f8fafc; padding:14px 14px 0;
  display:flex;flex-direction:column;gap:10px;
  overflow-y:auto;max-height:260px;
}
.chat-msgs::-webkit-scrollbar{width:3px;}
.chat-msgs::-webkit-scrollbar-thumb{background:#c7d2fe;border-radius:4px;}
.msg-bubble {
  max-width:82%; padding:10px 14px; border-radius:16px;
  font-size:.84rem; line-height:1.55; animation:msgIn .35s ease both;
}
.msg-ai   { align-self:flex-start; background:#fff; border:1px solid #e2e8f0; color:#1e293b; border-radius:16px 16px 16px 4px; box-shadow:0 2px 8px rgba(0,0,0,.06); }
.msg-user { align-self:flex-end; background:linear-gradient(135deg,#4f46e5,#6366f1); color:#fff; border-radius:16px 16px 4px 16px; }
.typing-row { align-self:flex-start; display:flex; gap:4px; padding:10px 14px; background:#fff; border:1px solid #e2e8f0; border-radius:16px 16px 16px 4px; margin-bottom:0; }
.typing-row span { width:7px;height:7px;border-radius:50%;background:#a5b4fc;animation:bounceDot 1.2s ease-in-out infinite; }
.chat-input-area { background:#fff; padding:12px 14px; border-top:1px solid #e2e8f0; display:flex; gap:8px; }
.chat-input {
  flex:1; border:1.5px solid #e2e8f0; border-radius:50px;
  padding:10px 18px; font-size:.85rem; font-family:'Inter',sans-serif;
  outline:none; color:#1e293b; background:#f8fafc;
  transition:border-color .2s;
}
.chat-input:focus { border-color:#a5b4fc; background:#fff; }
.chat-input::placeholder { color:#94a3b8; }
.chat-send {
  width:40px;height:40px;border-radius:50%;
  background:linear-gradient(135deg,#4f46e5,#6366f1);
  border:none;color:#fff;font-size:1rem;cursor:pointer;
  transition:transform .2s,box-shadow .2s;flex-shrink:0;
}
.chat-send:hover { transform:scale(1.1); box-shadow:0 4px 16px rgba(79,70,229,.4); }
@media(max-width:768px){ .chat-inner{grid-template-columns:1fr;} .feat-grid{grid-template-columns:1fr;} }
`;

const INIT = [
  { from:'ai',   text:"Hello! 👋 I'm Counsel AI, your school counselor. How are you feeling about school today?" },
  { from:'user', text:"I'm really stressed about my report card 😓" },
  { from:'ai',   text:"Looking at your recent report, I can see you've been putting in effort. 📊 Grades don't define you — but let's talk about which subjects feel the hardest right now so we can make a real plan." },
  { from:'user', text:"Maths and Science are really worrying me" },
  { from:'ai',   text:"Your school report shows progress in some areas and room to grow in others. 📝 That's completely normal. Which subject would you like to focus on first — the one you enjoy or the one that worries you most?" },
];
const REPLIES = [
  "Based on our last counseling session, you mentioned feeling behind in class. 🗓️ Have things improved this week, or is the pressure still building up? Let's update your study schedule together.",
  "Your teacher's feedback in the report mentions you're capable but distracted. 💬 That's actually a good sign — it means you have the potential. What do you think is causing the distraction? Let's figure it out.",
  "School can feel like a lot — reports, exams, friendships, expectations. 🏫 You don't have to handle it all alone. I'm here as your counselor. What part of school life feels the most difficult for you today?",
  "Your school report shows progress in some areas and room to grow in others. 📝 That's completely normal. Which subject would you like to focus on first — the one you enjoy or the one that worries you most?",
  "Looking at your recent report, I can see you've been putting in effort. 📊 Grades don't define you — but let's talk about which subjects feel the hardest right now so we can make a real plan.",
];
const FEATS = [
  { ico:'📋', label:'Report Analysis', sub:'Smart grade insights' },
  { ico:'🧑‍⚕️', label:'Human Backup', sub:'Real school counsellor' },
  { ico:'🔒', label:'100% Private', sub:'DPDP Act 2023' },
  { ico:'🏫', label:'School Portal', sub:'Teacher & parent view' },
];

export default function ChatDemo() {
  const [msgs, setMsgs] = useState(INIT);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [idx, setIdx] = useState(0);
  const boxRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: .1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [msgs, typing]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMsgs(p => [...p, { from:'user', text:t }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { from:'ai', text:REPLIES[idx % REPLIES.length] }]);
      setIdx(n => n + 1);
    }, 1500);
  };

  return (
    <>
      <style>{css}</style>
      <section id="chat" ref={ref} className="chat-sec">
        <div className="chat-inner">
          {/* Info */}
          <div className="reveal">
            <div className="chat-info-chip">
              <span className="chip chip-indigo">Live Demo</span>
            </div>
            <h2 className="chat-title">Counsel AI Listens.<br />Never Judges.</h2>
            <p className="chat-sub">Report card stress, exam pressure, or classroom anxiety — Counsel AI is your school's always-on counselor, ready to help every student.</p>
            <div className="feat-grid">
              {FEATS.map(f => (
                <div key={f.label} className="feat-tile">
                  <span className="ico">{f.ico}</span>
                  <div>
                    <div className="ft-label">{f.label}</div>
                    <div className="ft-sub">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className="chat-win reveal" style={{ transitionDelay:'.1s' }}>
            {/* Browser dots */}
            <div className="chat-dots">
              <div className="chat-dot" style={{ background:'#fca5a5' }} />
              <div className="chat-dot" style={{ background:'#fde68a' }} />
              <div className="chat-dot" style={{ background:'#a7f3d0' }} />
            </div>
            {/* Topbar */}
            <div className="chat-topbar">
              <div className="chat-avt">🧭</div>
              <div>
                <div className="chat-topbar-name">Counsel AI</div>
                <div className="chat-topbar-status">● Online • School Counselor</div>
              </div>
              <span className="chat-topbar-badge">FREE</span>
            </div>
            {/* Messages */}
            <div className="chat-msgs" ref={boxRef}>
              {msgs.map((m, i) => (
                <div key={i} className={`msg-bubble ${m.from === 'ai' ? 'msg-ai' : 'msg-user'}`}>{m.text}</div>
              ))}
              {typing && (
                <div className="typing-row">
                  {[0, .2, .4].map((d, i) => <span key={i} style={{ animationDelay:`${d}s` }} />)}
                </div>
              )}
              <div style={{ height:14 }} />
            </div>
            {/* Input */}
            <div className="chat-input-area">
              <input
                className="chat-input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Type your message…"
              />
              <button className="chat-send" onClick={send}>➤</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
