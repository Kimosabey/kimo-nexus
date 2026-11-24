import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Providers } from "./providers";
import { site, socials } from "@/lib/content";

// 2027 type system: one variable grotesk for display + UI, an italic serif for the single
// accent word per headline, and a mono for labels. See docs/design/REVAMP_2027.md.
const sans = Geist({ subsets: ["latin"], variable: "--fb", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--fs", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--fm", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: ["Harshan Aiyappa", "Full-Stack AI Engineer", "AI Engineer", "Next.js", "React", "Distributed Systems", "Speech AI"],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.ogDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${site.name} — portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.ogDescription,
    images: ["/og-image.png"],
    creator: "@HarshanAiyappa",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon-32.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // lets env(safe-area-inset-*) resolve on notched iPhones
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Full-Stack AI Engineer",
  url: `${site.url}/`,
  email: site.email,
  sameAs: socials.map((s) => s.href),
  knowsAbout: ["Artificial Intelligence", "Distributed Systems", "Full-Stack Engineering", "Speech AI", "Cloud Infrastructure"],
};

// No-FOUC theme boot: set html.dark before paint (default dark).
const themeBoot = `(function(){try{var s=localStorage.getItem('kn-theme');var d=s?s==='dark':true;document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`;
// Intro boot: repeat visits in a session and reduced-motion users never paint the intro
// overlay at all (it's server-rendered so first visits don't flash the page underneath).
const introBoot = `(function(){try{if(sessionStorage.getItem('kn-intro')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-intro','skip');}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script dangerouslySetInnerHTML={{ __html: introBoot }} />
        {/* Without JS the intro could never lift, so it must never show. */}
        <noscript>
          <style>{`.kn-intro{display:none!important}.kn-min{transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
