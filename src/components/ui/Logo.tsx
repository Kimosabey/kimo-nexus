import React from "react";

export const KimoLogo = ({ className }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Cybernetic 'H' */}
            <path
                d="M20 20 V80 M20 50 H50 M80 20 V80"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="square"
                className="opacity-100" // Fallback
            />
            {/* Connection Nodes */}
            <circle cx="20" cy="20" r="3" fill="currentColor" />
            <circle cx="20" cy="80" r="3" fill="currentColor" />
            <circle cx="80" cy="20" r="3" fill="currentColor" />
            <circle cx="80" cy="80" r="3" fill="currentColor" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>
    );
};

export const HarshanSignature = ({ className }: { className?: string }) => {
    return (
        <svg viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Stylized 'HARSHAN' - Geometric/Tech Font approximation */}
            {/* H */}
            <path d="M20,20 L20,80 M20,50 L50,50 M50,20 L50,80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* A */}
            <path d="M70,80 L85,20 L100,80 M75,60 L95,60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* R */}
            <path d="M120,80 L120,20 L140,20 C150,20 150,40 140,50 L120,50 L145,80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* S */}
            <path d="M180,30 C170,20 190,20 190,30 C190,50 160,50 160,70 C160,90 190,80 180,80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* H */}
            <path d="M200,20 L200,80 M200,50 L230,50 M230,20 L230,80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* A */}
            <path d="M250,80 L265,20 L280,80 M255,60 L275,60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* N */}
            <path d="M290,80 L290,20 L310,80 L310,20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
    )
}
