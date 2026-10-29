"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/lib/nav";
import { waLink } from "@/lib/contact";
import SocialLinks from "@/components/SocialLinks";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-stone-200/60 shadow-[0_8px_30px_-12px_rgba(28,25,23,0.08)]"
          : "bg-stone-50/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#home" aria-label="Fides Tailor - kembali ke atas">
          <Logo />
        </a>

        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.15em] text-stone-700 font-semibold">
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="luxury-underline hover:text-stone-900 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex px-5 py-3 bg-stone-950 text-white font-semibold text-xs uppercase tracking-widest hover:bg-gold-700 transition-colors duration-300"
        >
          Chat WhatsApp
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMenuOpen}
          className="md:hidden p-2 text-stone-600 hover:bg-stone-100 cursor-pointer"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav aria-label="Navigasi seluler" className="md:hidden border-t border-stone-200 bg-white w-full px-6 py-6 space-y-1 shadow-sm animate-fade-in">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-xs uppercase tracking-widest text-stone-800 py-3"
            >
              {link.label}
            </a>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold text-center block"
          >
            Chat WhatsApp
          </a>
          <SocialLinks variant="light" className="pt-4 justify-center" />
        </nav>
      )}
    </header>
  );
}
