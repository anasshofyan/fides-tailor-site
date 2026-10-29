import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#faf9f6",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fidestailor.com"),
  alternates: { canonical: "/" },
  title: "Fides Tailor | Rumah Adibusana Bespoke & Gaun Kustom Lamongan",
  description: "Rumah adibusana bespoke Fides Tailor di Lamongan. Menghadirkan kesempurnaan potongan gaun kustom, kebaya modern, jas formal, dan payet mewah berstandar butik haute couture.",
  keywords: [
    "adibusana lamongan",
    "tailor bespoke lamongan", 
    "penjahit lamongan", 
    "jahit gaun lamongan", 
    "kebaya modern lamongan", 
    "payet gaun lamongan", 
    "seragam premium lamongan",
    "jahit jas lamongan",
    "fides tailor"
  ],
  authors: [{ name: "Fides Tailor" }],
  creator: "Fides Tailor",
  publisher: "Fides Tailor",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Fides Tailor | Rumah Adibusana Bespoke & Gaun Kustom Lamongan",
    description: "Rumah adibusana bespoke Fides Tailor di Lamongan. Menghadirkan kesempurnaan potongan gaun kustom, kebaya modern, jas formal, dan payet mewah berstandar butik haute couture.",
    url: "https://fidestailor.com",
    siteName: "Fides Tailor",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fides Tailor | Rumah Adibusana Bespoke Lamongan",
    description: "Gaun kustom, kebaya modern, jas formal, dan payet handmade di Lamongan sejak 1996.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ClothingStore"],
    "name": "Fides Tailor",
    "image": "https://fidestailor.com/opengraph-image",
    "@id": "https://fidestailor.com/#localbusiness",
    "url": "https://fidestailor.com",
    "telephone": "+6285156959754",
    "foundingDate": "1996",
    "areaServed": ["Lamongan", "Babat", "Paciran", "Gresik", "Tuban"],
    "hasMap": "https://maps.google.com/?cid=11768809283999295154",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Pahlawan RT 01/RW 07 No. 3, Kalianyar (sebelah barat pasar)",
      "addressLocality": "Lamongan",
      "addressRegion": "Jawa Timur",
      "postalCode": "62211",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-7.127123",
      "longitude": "112.4062927"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.instagram.com/fidestailor",
      "https://www.tiktok.com/@fidestailor"
    ]
  };

  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 selection:bg-gold-100 selection:text-stone-900 antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
