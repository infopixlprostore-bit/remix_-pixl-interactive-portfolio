import React from "react";

interface PixlLogoProps extends React.SVGProps<SVGSVGElement> {
  glow?: boolean;
  className?: string;
}

export function PixlLogo({ glow = false, className = "h-8 w-8", ...props }: PixlLogoProps) {
  return (
    <svg
      viewBox="35 32 38 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Glow filter for neon effect */}
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Violet gradient for the main stem if needed, but white matches the brand */}
        <linearGradient id="white-silver" x1="42" y1="44" x2="67" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>

      {/* Stylized geometric P path */}
      <path
        d="M 42 36 H 58 A 12 12 0 0 1 58 60 H 48 A 6 6 0 0 0 42 66 V 73"
        stroke="url(#white-silver)"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The glowing neon pink/violet terminal block */}
      <rect
        x="38.75"
        y="73"
        width="6.5"
        height="6.5"
        fill="#D946EF"
        rx="0.5"
        filter={glow ? "url(#logo-glow)" : undefined}
        className={glow ? "animate-pulse" : ""}
      />
    </svg>
  );
}
