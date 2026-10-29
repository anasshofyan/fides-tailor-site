import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* SVG Icon/Mark - Ultra Elegant Monogram */}
      <svg
        className="w-9 h-9 transition-all duration-700 hover:scale-105"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#88642f" />
            <stop offset="30%" stopColor="#c9a451" />
            <stop offset="70%" stopColor="#d6bf7b" />
            <stop offset="100%" stopColor="#88642f" />
          </linearGradient>
        </defs>

        {/* Thin elegant rings */}
        <circle
          cx="50"
          cy="50"
          r="44"
          className="stroke-stone-200"
          strokeWidth="0.75"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
        />
        
        {/* Clean, high-fashion Serif F */}
        <text
          x="51"
          y="63"
          textAnchor="middle"
          fill="url(#goldGrad)"
          className="font-serif"
          fontSize="46"
          fontWeight="300"
        >
          F
        </text>
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-serif text-xl font-normal tracking-[0.25em] text-stone-900 leading-none">
            F I D E S
          </span>
          <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-stone-500 uppercase leading-none mt-2">
            BESPOKE &bull; EST. 1996
          </span>
        </div>
      )}
    </div>
  );
}
