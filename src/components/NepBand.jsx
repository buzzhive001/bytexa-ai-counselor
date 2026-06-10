const css = `
.nep { background:#fff; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; padding:20px 24px; }
.nep-inner { max-width:1140px; margin:0 auto; display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
.nep-text { font-size:.88rem; color:#475569; line-height:1.7; flex:1; min-width:260px; }
.nep-text strong { color:#4f46e5; }
`;

export default function NepBand() {
  return (
    <>
      <style>{css}</style>
      <div className="nep">
        <div className="nep-inner">
          <span className="chip chip-indigo">📜 Govt. Mandate</span>
          <p className="nep-text">
            Under <strong>National Education Policy 2020</strong>, counselling is a{' '}
            <strong>mandatory core component</strong> of school education — career guidance,
            mental health &amp; holistic growth aligned with the <strong>5+3+3+4 structure</strong>.
          </p>
        </div>
      </div>
    </>
  );
}
