import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "primary": "#16169c",
                "background-light": "#f6f6f8",
                "background-dark": "#050505",
                "glass-surface": "rgba(255, 255, 255, 0.03)",
                "glass-border": "rgba(255, 255, 255, 0.1)",
                "chrome-border": "rgba(255, 255, 255, 0.2)",
                "onyx": "#111117",
                "charcoal": "#1c1c26",
                "silver": "#C0C0C0",
                "off-white": "#E0E0E0",
                "surface-dark": "#1A1A1A",
                "text-main": "#F0F0F0",
                "text-muted": "#A0A0A0",
                "chrome": "#E2E2E2",
            },
            fontFamily: {
                "display": ["var(--font-rajdhani)", "sans-serif"],
                "body": ["var(--font-sans)", "sans-serif"],
                "mono": ["var(--font-mono)", "monospace"],
            },
            backgroundImage: {
                'dot-grid': 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
                'chrome-gradient': "linear-gradient(90deg, #555555 0%, #C0C0C0 50%, #555555 100%)",
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'neon': '0 0 10px rgba(22, 22, 156, 0.5)',
                'glow': '0 0 15px rgba(22, 22, 156, 0.5)',
                'card-hover': '0 0 0 1px #16169c, 0 0 15px rgba(22, 22, 156, 0.3)',
            },
            animation: {
                spotlight: "spotlight 2s ease .75s 1 forwards",
                scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
            },
            keyframes: {
                spotlight: {
                    "0%": {
                        opacity: "0",
                        transform: "translate(-72%, -62%) scale(0.5)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translate(-50%,-40%) scale(1)",
                    },
                },
                scroll: {
                    to: {
                        transform: "translate(calc(-50% - 0.5rem))",
                    },
                },
            },
        },
    },
    plugins: [],
};
export default config;
