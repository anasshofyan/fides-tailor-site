import { SOCIALS } from "@/lib/contact";

// Brand icons drawn inline because lucide-react v1 ships no brand marks.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.37-2.48V9.66a5.73 5.73 0 0 0-.77-.05A5.7 5.7 0 0 0 4.17 15.3 5.7 5.7 0 0 0 9.86 21a5.7 5.7 0 0 0 5.69-5.7V9.01a7.35 7.35 0 0 0 4.28 1.37V7.3a4.3 4.3 0 0 1-3.23-1.48z" />
    </svg>
  );
}

const ITEMS = [
  { href: SOCIALS.instagram, label: "Instagram", handle: "@fidestailor", Icon: InstagramIcon },
  { href: SOCIALS.tiktok, label: "TikTok", handle: "@fidestailor", Icon: TikTokIcon },
];

interface SocialLinksProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function SocialLinks({ variant = "dark", className = "" }: SocialLinksProps) {
  const tone =
    variant === "dark"
      ? "border-stone-700 text-stone-200 hover:border-gold-400 hover:text-gold-200 hover:bg-white/5"
      : "border-stone-300 text-stone-800 hover:border-gold-600 hover:text-gold-800 hover:bg-gold-50";

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {ITEMS.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Fides Tailor di ${label}`}
            className={`group flex w-11 h-11 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${tone}`}
          >
            <Icon className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />
          </a>
        </li>
      ))}
    </ul>
  );
}
