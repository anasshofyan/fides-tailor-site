export const WA_NUMBER = "6285156959754";
export const WA_DISPLAY = "+62 851-5695-9754";

export function waLink(text = "Halo Fides Tailor, saya ingin konsultasi jahit.") {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const SOCIALS = {
  instagram: "https://www.instagram.com/fidestailor",
  tiktok: "https://www.tiktok.com/@fidestailor",
};
