import type { Metadata, Viewport } from "next";
import { Rajdhani, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";



const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "Harshan Aiyappa | Hybrid AI Engineer",
  description: "Senior Full Stack Hybrid Engineer specializing in Generative AI, Voice Synthesis, and Distributed Systems. Explore my high-performance projects.",
  keywords: ["AI Engineer", "Full Stack Developer", "Next.js", "React", "Portfolio", "Generative AI", "Harshan Aiyappa"],
  authors: [{ name: "Harshan Aiyappa", url: "https://kimo-nexus.vercel.app" }],
  creator: "Harshan Aiyappa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kimo-nexus.vercel.app",
    title: "Harshan Aiyappa | Hybrid AI Engineer",
    description: "Building the future of AI and Web. Senior Full Stack Engineer portfolio.",
    siteName: "Kimo Nexus",
    images: [{
      url: "/og-image.png", // Assuming existence or placeholder
      width: 1200,
      height: 630,
      alt: "Harshan Aiyappa Portfolio"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshan Aiyappa | Hybrid AI Engineer",
    description: "Senior Full Stack Hybrid Engineer portfolio. Design & build high-performance Hybrid AI Systems.",
    images: ["/og-image.png"],
    creator: "@HarshanAiyappa",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          outfit.variable,
          jetbrainsMono.variable,
          rajdhani.variable,
          "font-signature antialiased bg-background-dark text-white overflow-x-hidden selection:bg-cyan-400 selection:text-black font-sans"
        )}
      >
        {/* Background Texture from HTML */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-dot-grid opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark"></div>
        </div>

        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
