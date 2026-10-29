import { SOCIALS, WA_NUMBER } from "@/lib/contact";

export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fidestailor.com",
  name: "Fides Tailor",
  title: "Fides Tailor — Penjahit Bespoke Lamongan | Gaun, Kebaya, Jas & Payet",
  description:
    "Fides Tailor, penjahit bespoke di Lamongan sejak 1996. Jasa jahit gaun pengantin, kebaya modern, bridesmaid, jas pria, seragam, payet handmade, permak & sewa kebaya. Konsultasi gratis via WhatsApp.",
  phone: `+${WA_NUMBER}`,
  address: {
    street: "Jl. Pahlawan RT 01/RW 07 No. 3, Kalianyar (sebelah barat pasar)",
    city: "Lamongan",
    region: "Jawa Timur",
    postalCode: "62211",
    country: "ID",
  },
  geo: { lat: -7.127123, lng: 112.4062927 },
  socials: [SOCIALS.instagram, SOCIALS.tiktok],
  images: ["/images/galeri-kebaya-pengantin-putih.webp", "/images/galeri-kebaya-biru-gradasi.webp", "/images/galeri-gaun-dusty-pink.webp", "/images/galeri-kebaya-maroon-payet.webp"],
};
