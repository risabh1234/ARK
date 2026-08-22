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
    "inline-flex items-center justify-center bg-copper text-ink px-24 py-16 font-sans text-ui font-medium hover:bg-copper-lift transition-colors duration-150",
  secondary:
    "inline-flex items-center justify-center border border-[rgba(245,243,239,0.24)] bg-transparent text-bone px-24 py-16 font-sans text-ui font-medium hover:border-[rgba(245,243,239,0.48)] hover:bg-raise transition-colors duration-150",
  tertiary:
    "inline-flex items-center gap-8 text-copper font-sans text-ui font-medium underline underline-offset-4 decoration-copper/50 hover:decoration-copper transition-colors duration-150",
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
