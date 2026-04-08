import { Check, X, Minus } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const features = [
  { name: "Timestamped video notes", kaynos: true, drive: false, teachable: false, diy: false },
  { name: "Client-specific sessions", kaynos: true, drive: false, teachable: true, diy: false },
  { name: "Shared group classes", kaynos: true, drive: "partial", teachable: true, diy: false },
  { name: "No app download needed", kaynos: true, drive: true, teachable: true, diy: true },
  { name: "Built for coaching", kaynos: true, drive: false, teachable: false, diy: false },
  { name: "Revenue sharing credits", kaynos: true, drive: false, teachable: false, diy: false },
  { name: "Usage & watch tracking", kaynos: true, drive: false, teachable: true, diy: false },
  { name: "Under $49/mo (or free)", kaynos: true, drive: true, teachable: false, diy: true },
];

function Cell({ value }) {
  if (value === true) return <Check size={18} className="cmp-check" aria-label="Yes" />;
  if (value === false) return <X size={18} className="cmp-x" aria-label="No" />;
  return <Minus size={18} className="cmp-partial" aria-label="Partial" />;
}

export default function Comparison() {
  const headerRef = useScrollReveal();
  const tableRef = useScrollReveal();

  return (
    <section id="comparison" className="section section--alt">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Compare</span>
          <h2 className="section-title">How Kaynos stacks up</h2>
          <p className="section-subtitle">
            Most coaches cobble together Google Drive, Vimeo links, and group
            chats. Here's what a purpose-built tool gives you.
          </p>
        </div>

        <div ref={tableRef} className="reveal cmp-table-wrap">
          <div className="cmp-table">
            <div className="cmp-header">
              <div className="cmp-feature-col" />
              <div className="cmp-col cmp-col-kaynos">Kaynos</div>
              <div className="cmp-col">Drive + Vimeo</div>
              <div className="cmp-col">Teachable / Kajabi</div>
              <div className="cmp-col">DIY / Email</div>
            </div>
            {features.map((f) => (
              <div key={f.name} className="cmp-row">
                <div className="cmp-feature-col">{f.name}</div>
                <div className="cmp-col cmp-col-kaynos"><Cell value={f.kaynos} /></div>
                <div className="cmp-col"><Cell value={f.drive} /></div>
                <div className="cmp-col"><Cell value={f.teachable} /></div>
                <div className="cmp-col"><Cell value={f.diy} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
