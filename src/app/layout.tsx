import type { Metadata } from "next";
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
  title: "Kimo Nexus | Hybrid AI Systems",
  description: "Senior Full Stack Hybrid Engineer Portfolio. Design & build high-performance Hybrid AI Systems.",
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
        <link href="https://fonts.googleapis.com/css2?family=Momo+Signature&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          outfit.variable,
          jetbrainsMono.variable,
          rajdhani.variable,
          "font-signature antialiased bg-background-dark text-white overflow-x-hidden selection:bg-primary selection:text-white font-sans"
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
