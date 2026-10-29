import Image from "next/image";
import { ArrowUpRight, MapPin, Phone, Clock, AtSign, Plus } from "lucide-react";

import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import ThreadCanvas from "@/components/ThreadCanvas";
import Portfolio from "@/components/Portfolio";
import { MotionSection } from "@/components/MotionSection";
import { MotionCard } from "@/components/MotionCard";
import { NAV_LINKS } from "@/lib/nav";
import { WA_DISPLAY, waLink } from "@/lib/contact";

const SERVICES = [
  { num: "01", title: "Gaun Pesta & Pengantin", desc: "Gaun malam, gaun pengantin, dan dress kustom dengan fitting detail sesuai siluet tubuh Anda." },
  { num: "02", title: "Kebaya Modern & Bridesmaid", desc: "Kebaya kontemporer, busana wisuda, dan seragam bridesmaid dengan potongan pas badan." },
  { num: "03", title: "Jas & Setelan Formal", desc: "Setelan jas pria dengan furing rapi, bahu presisi, dan konstruksi standar butik." },
  { num: "04", title: "Payet & Sulam Tangan", desc: "Pemasangan payet dan mutiara handmade oleh pengrajin berpengalaman." },
];

const PROCESS = [
  { step: "01", title: "Chat WhatsApp", desc: "Ceritakan kebutuhan dan referensi desain Anda." },
  { step: "02", title: "Ukur & Konsultasi", desc: "Datang ke atelier untuk pengukuran detail." },
  { step: "03", title: "Fitting", desc: "Penyesuaian hingga potongan jatuh sempurna." },
  { step: "04", title: "Selesai", desc: "Busana siap dikenakan di hari spesial Anda." },
];

const FAQS = [
  {
    q: "Berapa lama proses menjahit di Fides Tailor?",
    a: "Tergantung tingkat kerumitan desain dan detail payet. Hubungi kami via WhatsApp untuk estimasi waktu pengerjaan pesanan Anda.",
  },
  {
    q: "Apakah boleh membawa kain sendiri?",
    a: "Boleh. Anda bisa membawa kain sendiri atau berkonsultasi dengan kami untuk pemilihan bahan.",
  },
  {
    q: "Apakah menerima pesanan seragam dalam jumlah banyak?",
    a: "Ya, kami melayani seragam bridesmaid, seragam keluarga, batik kantor, hingga seragam sekolah.",
  },
  {
    q: "Di mana lokasi Fides Tailor?",
    a: "Jl. Pahlawan RT 01/RW 07 No. 3, Kalianyar (sebelah barat pasar), Lamongan, Jawa Timur. Buka Senin–Sabtu, 08.00–17.00 WIB.",
  },
];

const MAPS_URL =
  "https://www.google.com/maps/place/Fides+Tailor+Lamongan+%7C+Jahit+dan+Payet/@-7.127123,112.4037178,1125m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2e77f757b70064eb:0xa35335b0a218e6b2!8m2!3d-7.127123!4d112.4062927!16s%2Fg%2F11t4hly5vc";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function WaButton({ label = "Konsultasi via WhatsApp", dark = true }: { label?: string; dark?: boolean }) {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 px-7 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-300 ${
        dark ? "bg-stone-950 text-white hover:bg-gold-700" : "bg-white text-stone-950 hover:bg-gold-100"
      }`}
    >
      {label}
      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export default function Home() {
  return (
    <div className="flex-1 flex flex-col font-sans bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section id="home" className="relative min-h-[calc(100svh-80px)] flex items-center overflow-hidden">
          <HeroCanvas />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-stone-50/40 via-transparent to-stone-50 pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-24 text-center animate-slide-up">
            <p className="text-xs uppercase tracking-[0.35em] text-gold-700 font-semibold">Penjahit Bespoke · Lamongan · Sejak 1996</p>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-stone-900 leading-[1.05] tracking-tight mt-8">
              Busana yang dijahit <span className="italic gold-text-gradient">khusus untuk Anda.</span>
            </h1>
            <p className="text-stone-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light mt-8">
              Gaun, kebaya, jas, dan payet handmade — dikerjakan dengan teliti oleh atelier Fides Tailor di Lamongan.
            </p>
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
              <WaButton />
              <a href="#portofolio" className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-700 luxury-underline">
                Lihat Karya
              </a>
            </div>
          </div>
        </section>

        {/* TENTANG */}
        <MotionSection id="tentang" className="py-28 md:py-36">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              <Image
                src="/images/payet.png"
                alt="Detail sulam payet handmade Fides Tailor Lamongan"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.5s] hover:scale-105"
              />
            </div>
            <div className="space-y-8">
              <p className="text-xs uppercase tracking-[0.35em] text-gold-700 font-semibold">Tentang Kami</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-900 leading-tight">
                Tiga dekade menjahit dengan <span className="italic">ketelitian.</span>
              </h2>
              <p className="text-stone-600 text-base md:text-lg leading-relaxed font-light">
                <strong className="font-medium text-stone-900">Fides Tailor</strong> adalah atelier jahit di Lamongan yang berdiri sejak 1996. Setiap busana dibuat dari pola personal, dijahit dengan tangan terampil, dan disesuaikan hingga benar-benar pas.
              </p>
              <dl className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
                {[
                  ["30", "Tahun"],
                  ["10k+", "Busana"],
                  ["100%", "Handmade"],
                ].map(([value, label]) => (
                  <div key={label} className="flex flex-col-reverse">
                    <dt className="text-xs uppercase tracking-wider text-stone-400 mt-1">{label}</dt>
                    <dd className="font-serif text-4xl font-light text-stone-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </MotionSection>

        {/* LAYANAN */}
        <MotionSection id="layanan" className="py-28 md:py-36 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="max-w-2xl mb-16 space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-gold-700 font-semibold">Layanan</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-900 leading-tight">Jasa jahit bespoke di Lamongan</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200">
              {SERVICES.map((srv, index) => (
                <MotionCard key={srv.num} index={index} className="bg-white p-10 md:p-12 group">
                  <article className="space-y-4">
                    <span className="font-serif text-sm text-gold-600">{srv.num}</span>
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-stone-900">{srv.title}</h3>
                    <p className="text-stone-500 leading-relaxed font-light">{srv.desc}</p>
                  </article>
                </MotionCard>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* PORTOFOLIO */}
        <MotionSection id="portofolio" className="py-28 md:py-36">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <Portfolio />
          </div>
        </MotionSection>

        {/* PROSES */}
        <MotionSection className="py-28 md:py-36 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="max-w-2xl mb-16 space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-gold-700 font-semibold">Cara Pesan</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-900 leading-tight">Mudah, cukup mulai dari chat.</h2>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {PROCESS.map((p) => (
                <li key={p.step} className="border-t border-stone-300 pt-6">
                  <span className="font-serif text-sm text-gold-600">{p.step}</span>
                  <h3 className="font-serif text-2xl text-stone-900 mt-3">{p.title}</h3>
                  <p className="text-sm text-stone-500 mt-2 leading-relaxed font-light">{p.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </MotionSection>

        {/* FAQ */}
        <MotionSection id="faq" className="py-28 md:py-36">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-14 space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-gold-700 font-semibold">FAQ</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-900">Pertanyaan umum</h2>
            </div>
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-serif text-xl md:text-2xl text-stone-900">
                    {f.q}
                    <Plus className="w-5 h-5 shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-4 text-stone-600 font-light leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* CTA */}
        <section id="kontak" className="relative py-32 md:py-44 bg-stone-950 text-center overflow-hidden">
          <ThreadCanvas />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,14,13,0.85)_0%,rgba(15,14,13,0.35)_45%,rgba(15,14,13,0)_75%)] pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center">
            <p className="flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-gold-300 font-semibold">
              <span className="h-px w-10 bg-gold-500/60" />
              Konsultasi Gratis
              <span className="h-px w-10 bg-gold-500/60" />
            </p>
            <h2 className="font-serif text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight mt-8">
              Mari jahit <span className="italic gold-text-gradient">cerita Anda</span>
              <br />
              menjadi busana.
            </h2>
            <p className="text-stone-400 font-light text-base md:text-lg max-w-md mt-8 leading-relaxed">
              Kirim referensi desain atau ceritakan acara Anda. Atelier kami siap membantu dari ukuran pertama hingga jahitan terakhir.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-shine group relative mt-12 inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 pl-8 pr-2 py-2 text-stone-950 text-sm font-semibold tracking-wide shadow-[0_0_60px_-10px_rgba(214,191,123,0.6)] transition-shadow duration-500 hover:shadow-[0_0_80px_-5px_rgba(214,191,123,0.8)]"
            >
              Chat via WhatsApp
              <span className="w-11 h-11 rounded-full bg-stone-950 text-gold-200 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
            <p className="mt-6 text-xs tracking-[0.2em] text-stone-500">{WA_DISPLAY} · Senin–Sabtu, 08.00–17.00</p>
          </div>
        </section>
      </main>

      <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-4">
            <p className="font-serif text-2xl text-white tracking-[0.3em] uppercase">Fides</p>
            <p className="font-light leading-relaxed max-w-sm text-sm">Atelier jahit bespoke di Lamongan sejak 1996.</p>
          </div>
          <nav aria-label="Navigasi footer" className="md:col-span-3">
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <address className="md:col-span-4 not-italic space-y-3 text-sm">
            <p className="flex gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gold-500" /><a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Jl. Pahlawan RT 01/RW 07 No. 3, Kalianyar, Lamongan</a></p>
            <p className="flex gap-3"><Phone className="w-4 h-4 shrink-0 mt-0.5 text-gold-500" /><a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">{WA_DISPLAY}</a></p>
            <p className="flex gap-3"><Clock className="w-4 h-4 shrink-0 mt-0.5 text-gold-500" />Senin–Sabtu, 08.00–17.00 WIB</p>
            <p className="flex gap-3"><AtSign className="w-4 h-4 shrink-0 mt-0.5 text-gold-500" /><a href="https://www.instagram.com/fidestailor" target="_blank" rel="noopener noreferrer" className="hover:text-white">@fidestailor</a></p>
          </address>
        </div>
        <p className="mt-14 text-xs text-stone-600 text-center">© {new Date().getFullYear()} Fides Tailor</p>
      </footer>
    </div>
  );
}
