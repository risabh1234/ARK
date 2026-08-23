export function Eyebrow({
  children,
  tone = "accent",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "accent" | "muted";
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-eyebrow uppercase ${tone === "accent" ? "text-accent" : "text-muted"} ${className}`}
    >
      {children}
    </span>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-container px-24 md:px-56 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  border = true,
}: {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
}) {
  return (
    <section className={`pt-140 ${border ? "rule-h" : ""} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Panel({
  children,
  className = "",
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`border ${accent ? "border-accent-deep bg-accent/[0.06]" : "border-rule bg-bg-raised"} p-32 ${className}`}
    >
      {children}
    </div>
  );
}
