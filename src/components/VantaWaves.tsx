'use client';

import { useEffect, useRef, useState } from 'react';

export default function VantaWaves({ children }: { children: React.ReactNode }) {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !vantaRef.current) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Dynamic import for better performance
        let VANTA: any;
        let THREE: any;

        const initVanta = async () => {
            try {
                // Lazy load THREE.js and Vanta
                // @ts-ignore
                THREE = await import('three');
                // @ts-ignore
                const VantaWavesModule = await import('vanta/dist/vanta.waves.min');
                VANTA = VantaWavesModule.default;

                if (vantaRef.current && !vantaEffect.current) {
                    vantaEffect.current = VANTA({
                        el: vantaRef.current,
                        THREE: THREE,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        // Theme colors matching your portfolio
                        color: 0x0a0a0c, // Dark background
                        shininess: 40.00,
                        waveHeight: 15.00,
                        waveSpeed: 0.75,
                        zoom: 0.85,
                        // Performance optimizations
                        forceAnimate: true,
                    });
                }
            } catch (error) {
                console.warn('Vanta.js failed to load:', error);
            }
        };

        // Delay initialization slightly for better initial page load
        const timeout = setTimeout(initVanta, 100);

        return () => {
            clearTimeout(timeout);
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, [isClient]);

    return (
        <div ref={vantaRef} className="fixed inset-0 -z-20">
            {children}
        </div>
    );
}
