import type { Metadata } from "next";
import { Geist, Geist_Mono, Spectral } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400"],
});

const spectral = Spectral({
  subsets: ["latin"],
  variable: "--font-spectral",
  weight: ["300", "400"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${spectral.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
