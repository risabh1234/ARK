import type { ReactElement } from "react";

export interface ProductCardProps {
  id?: string;
  title: string;
  sub: string;
  list: string;
  linkText: string;
  href: string;
  engraving: ReactElement;
  gloss?: string;
}

export function ProductCard({
  id,
  title,
  sub,
  list,
  linkText,
  href,
  engraving,
  gloss,
}: ProductCardProps): ReactElement {
  return (
    <article id={id} className="v3-product-card ark-ecosystem-card" aria-label={`ĀRK ${title}`}>
      <div>
        <div className="v3-product-card-head">
          <div>
            <h3 className="v3-product-title">{title}</h3>
            <p className="v3-product-sub">{sub}</p>
          </div>
          <div className="v3-product-engraving-wrap">
            {engraving}
          </div>
        </div>

        <div className="v3-product-list">
          {list}
        </div>

        {gloss && (
          <div style={{ fontFamily: "var(--ark-font-mono)", fontSize: "10px", color: "var(--ark-muted)", marginTop: "8px", borderTop: "1px dashed var(--ark-rule)", paddingTop: "6px" }}>
            {gloss}
          </div>
        )}
      </div>

      <div style={{ marginTop: "12px" }}>
        <a href={href} className="v3-tertiary-link" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center" }}>
          {linkText} <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
