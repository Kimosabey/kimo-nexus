export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* H - Bold Geometric */}
            <path
                d="M10 8 V32 M26 8 V32 M10 20 H26"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="square"
            />

            {/* A - Bold Geometric side-by-side */}
            <path
                d="M40 32 L48 8 L56 32"
                stroke="var(--color-primary)"
                strokeWidth="5"
                strokeLinecap="square"
                strokeLinejoin="round"
            />
            <path d="M43 23 H53" stroke="var(--color-primary)" strokeWidth="5" strokeLinecap="square" />

            {/* Tech Dot removed */}
        </svg>
    </div>
);

export default Logo;
