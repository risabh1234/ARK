import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

// Variable fonts — no `weight` array, so next/font serves the full
// variable-axis file rather than static per-weight instances. This is
// what makes §30.1's scroll-tied font-variation-settings possible.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ark.study"),
  title: {
    default: "ĀRK — The architecture of understanding.",
    template: "%s — ĀRK",
  },
  description:
    "ĀRK builds research and intelligence tools for people who would rather understand something completely than believe it quickly.",
  openGraph: {
    title: "ĀRK — The architecture of understanding.",
    description:
      "ĀRK builds research and intelligence tools for people who would rather understand something completely than believe it quickly.",
    siteName: "ĀRK",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
