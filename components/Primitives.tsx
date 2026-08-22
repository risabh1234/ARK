export function Eyebrow({
  children,
  tone = "copper",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "copper" | "ash";
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-eyebrow uppercase ${tone === "copper" ? "text-copper" : "text-ash"} ${className}`}
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
      className={`border ${accent ? "border-copper-dim bg-copper/[0.06]" : "border-[rgba(245,243,239,0.1)] bg-panel"} p-32 ${className}`}
    >
      {children}
    </div>
  );
}
