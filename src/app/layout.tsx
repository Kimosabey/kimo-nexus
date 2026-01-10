import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
    <html lang="en" className="dark">
      <body
        className={cn(
          spaceGrotesk.variable,
          "antialiased bg-black text-gray-50 overflow-x-hidden selection:bg-gray-200 selection:text-black font-sans"
        )}
      >
        <div className="noise-overlay" />
        <div className="mesh-gradient" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
