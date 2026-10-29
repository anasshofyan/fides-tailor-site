import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import { SITE } from "@/lib/site";
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
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#faf9f6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s | Fides Tailor Lamongan",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "fides tailor",
    "penjahit lamongan",
    "tailor lamongan",
    "jasa jahit lamongan",
    "jahit baju lamongan",
    "permak baju lamongan",
    "vermak lamongan",
    "sewa kebaya lamongan",
    "penjahit kebaya lamongan",
    "jahit kebaya wisuda lamongan",
    "jahit gaun pesta lamongan",
    "jahit seragam sekolah lamongan",
    "jahit seragam batik lamongan",
    "jasa payet lamongan",
    "penjahit jawa timur",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Penjahit & Busana",
  alternates: { canonical: "/" },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fides Tailor Lamongan — Your style, our hands." }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION after adding the site to Google Search Console
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "geo.region": "ID-JI",
    "geo.placename": "Lamongan",
    "geo.position": `${SITE.geo.lat};${SITE.geo.lng}`,
    ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}`,
  },
};

const SERVICES = [
  "Jasa Jahit Kebaya, Gaun & Seragam",
  "Permak & Vermak Baju",
  "Pemasangan Payet Tangan",
  "Sewa Kebaya",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "id-ID",
      publisher: { "@id": `${SITE.url}/#business` },
    },
    {
      "@type": ["LocalBusiness", "ClothingStore"],
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      description: SITE.description,
      slogan: SITE.tagline,
      url: SITE.url,
      logo: `${SITE.url}/icon.png`,
      image: [`${SITE.url}/opengraph-image`, ...SITE.images.map((src) => `${SITE.url}${src}`)],
      telephone: SITE.phone,
      paymentAccepted: "Cash, Bank Transfer",
      currenciesAccepted: "IDR",
      foundingDate: "1996",
      knowsLanguage: ["id", "jv"],
      areaServed: [
        { "@type": "City", name: "Lamongan" },
        { "@type": "AdministrativeArea", name: "Jawa Timur" },
      ],
      hasMap: "https://maps.google.com/?cid=11768809283999295154",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE.geo.lat,
        longitude: SITE.geo.lng,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer service",
        availableLanguage: ["Indonesian"],
        url: `https://wa.me/${SITE.phone.replace("+", "")}`,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan Fides Tailor",
        itemListElement: SERVICES.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, areaServed: "Lamongan" },
        })),
      },
      sameAs: SITE.socials,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
