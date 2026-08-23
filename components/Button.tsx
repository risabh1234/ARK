import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "tertiary";

type BaseProps = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center bg-accent text-bg px-24 py-16 font-sans text-ui font-semibold tracking-[-0.01em] shadow-2 hover:bg-ink hover:shadow-3 hover:-translate-y-[2px] active:translate-y-0 active:shadow-1 transition-[background-color,box-shadow,transform] duration-fast ease-standard",
  secondary:
    "inline-flex items-center justify-center border border-ink/20 bg-transparent text-ink px-24 py-16 font-sans text-ui font-medium hover:border-ink hover:bg-ink hover:text-bg transition-[background-color,border-color,color] duration-fast ease-standard",
  tertiary:
    "inline-flex items-center gap-8 text-accent font-sans text-ui font-semibold underline underline-offset-4 decoration-accent/50 hover:decoration-accent hover:gap-12 transition-[gap,color] duration-fast ease-standard",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: BaseProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} className={`${styles[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
