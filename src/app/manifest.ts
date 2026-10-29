import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fides Tailor — Bespoke Atelier Lamongan",
    short_name: "Fides Tailor",
    description: "Penjahit bespoke di Lamongan: gaun pesta, kebaya modern, jas formal, dan payet handmade.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f6",
    theme_color: "#0f0e0d",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    lang: "id",
    categories: ["shopping", "lifestyle"],
  };
}
