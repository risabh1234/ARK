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
    "inline-flex items-center justify-center bg-accent text-bg px-24 py-16 font-sans text-ui font-medium shadow-1 hover:bg-accent-deep hover:shadow-2 hover:-translate-y-[1px] transition-[background-color,box-shadow,transform] duration-fast ease-standard",
  secondary:
    "inline-flex items-center justify-center border border-rule bg-transparent text-ink px-24 py-16 font-sans text-ui font-medium hover:border-accent-deep hover:bg-bg-raised transition-colors duration-fast",
  tertiary:
    "inline-flex items-center gap-8 text-accent font-sans text-ui font-medium underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-colors duration-fast",
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
