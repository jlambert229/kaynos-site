import { Check, X, Minus } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import { comparisonColumns, comparisonFeatures } from "../data/competitors";

function Cell({ value }) {
  if (value === true) return <Check size={18} className="cmp-check" aria-label="Yes" />;
  if (value === false) return <X size={18} className="cmp-x" aria-label="No" />;
  if (typeof value === "string") return <span className="cmp-text">{value}</span>;
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
            Side-by-side with the tools coaches actually use and consider.
          </p>
        </div>

        <div ref={tableRef} className="reveal cmp-table-wrap">
          <table className="cmp-table" role="grid">
            <thead>
              <tr className="cmp-header">
                <th className="cmp-feature-col" scope="col"><span className="visually-hidden">Feature</span></th>
                {comparisonColumns.map((c) => (
                  <th
                    key={c.key}
                    scope="col"
                    className={`cmp-col${c.key === "kaynos" ? " cmp-col-kaynos" : ""}`}
                  >
                    <span className="cmp-col-name">{c.label}</span>
                    <span className="cmp-col-price">{c.sub}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((f) => (
                <tr key={f.name} className="cmp-row">
                  <th scope="row" className="cmp-feature-col">
                    <span className="cmp-feature-name">{f.name}</span>
                    <span className="cmp-feature-detail">{f.detail}</span>
                  </th>
                  {comparisonColumns.map((c) => (
                    <td
                      key={c.key}
                      className={`cmp-col${c.key === "kaynos" ? " cmp-col-kaynos" : ""}`}
                    >
                      <Cell value={f[c.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cmp-calc-link">
          <a href="#pricing">See pricing details &rarr;</a>
        </p>
      </div>
    </section>
  );
}
