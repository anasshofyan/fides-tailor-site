import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Brand Mark - FF monogram with needle & thread */}
      <Image
        src="/images/logo-mark.png"
        alt="Fides Tailor"
        width={44}
        height={44}
        preload
        className="w-11 h-11 object-contain transition-all duration-700 hover:scale-105"
      />

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-serif text-xl font-normal tracking-[0.25em] text-stone-900 leading-none">
            F I D E S
          </span>
          <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-stone-500 uppercase leading-none mt-2">
            TAILOR
          </span>
        </div>
      )}
    </div>
  );
}
