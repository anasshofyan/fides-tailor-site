import Image from "next/image";
import { ArrowUp, ArrowUpRight, MapPin, Phone, Clock, Plus, Star } from "lucide-react";

import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import ThreadCanvas from "@/components/ThreadCanvas";
import Portfolio from "@/components/Portfolio";
import { MotionSection } from "@/components/MotionSection";
import { MotionCard } from "@/components/MotionCard";
import { Reveal, RevealImage } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import ScrollProgress from "@/components/ScrollProgress";
import SocialLinks from "@/components/SocialLinks";
import { NAV_LINKS } from "@/lib/nav";
import { WA_DISPLAY, waLink } from "@/lib/contact";

const SERVICES = [
  { num: "01", title: "Jasa Jahit", desc: "Gaun pesta, gaun pengantin, kebaya, jas, hingga seragam — dibuat dari pola personal sesuai ukuran dan siluet tubuh Anda." },
  { num: "02", title: "Permak", desc: "Mengecilkan, membesarkan, memotong, atau memperbaiki busana kesayangan agar kembali pas dan nyaman dipakai." },
  { num: "03", title: "Payet", desc: "Pemasangan payet, manik, dan mutiara secara manual oleh pengrajin berpengalaman untuk detail yang berkilau." },
  { num: "04", title: "Sewa Kebaya", desc: "Koleksi kebaya untuk wisuda, lamaran, dan acara spesial — tampil anggun tanpa harus membeli." },
];

// Ulasan asli dari Google Maps Fides Tailor (emoji dihapus, teks tidak diubah).
const REVIEWS = [
  { name: "Binar Ayu D.", tag: "Jahit Custom", text: "Mantap banget.. bisa kasi rekomendasi modelnya gimana cocoknya sama bentuk badan, dateline on time, jahitan bagus.. recommended. Terima kasih." },
  { name: "Hanifah E.", tag: "Permak", text: "Masyaa Allah suka banget sama jahitan nya. Motongin gamis yang kepanjangan di Fides Tailor Lamongan, puas banget sama hasilnya sesuai dan pas." },
  { name: "Yoyo A.", tag: "Payet", text: "Payetan dan jahitannya bagus banget, rapi dan pelayanannya cepat. Ownernya juga ramah, pokoknya rekomen bgt buat yg lagi cari payetan berkualitas." },
  { name: "Dewi Intan N. Q.", tag: "Pelanggan Luar Kota", text: "Ku belain jauh2 dr luar kota gapapa, krn cuma di Fides Tailor aja yg srek di hati." },
  { name: "Ukhty Im", tag: "Seragam", text: "Repeat order ini ceritanya, jahit seragam dadakan dan jadi sesuai estimasi. Owner ramah poll, rekomen buat jahit custom baju juga." },
  { name: "Alifia M.", tag: "Jahit Custom", text: "Hasil jahitannya rapi banget dan detailnya bagus, fittingnya juga pas. Pelayanannya ramah dan nyaman. Aku sama temen barengan jahit di sini dan sama-sama puas." },
];

const PROCESS = [
  { step: "01", title: "Chat WhatsApp", desc: "Ceritakan kebutuhan dan referensi desain Anda." },
  { step: "02", title: "Ukur & Konsultasi", desc: "Datang ke tempat kami untuk pengukuran detail." },
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
    q: "Apakah bisa bayar DP terlebih dahulu?",
    a: "Bisa. Anda cukup membayar DP saat pemesanan, dan sisanya dilunasi ketika busana selesai.",
  },
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "Kami menerima pembayaran tunai langsung di tempat maupun transfer bank.",
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
      <ScrollProgress />
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section id="home" className="relative min-h-[calc(100svh-80px)] flex items-center overflow-hidden">
          <HeroCanvas />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-stone-50/40 via-transparent to-stone-50 pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-24 text-center">
            <p className="hero-in text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-gold-800 font-semibold">Penjahit Lamongan · Sejak 1996</p>
            <h1 className="hero-in [animation-delay:120ms] mt-6 sm:mt-8 font-serif text-[2.6rem] leading-[1.08] sm:text-6xl md:text-7xl lg:text-8xl font-light text-stone-900 tracking-tight">
              Busana yang dijahit <span className="italic gold-text-gradient">khusus untuk Anda.</span>
            </h1>
            <p className="hero-in [animation-delay:260ms] mt-6 sm:mt-8 text-stone-700 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Jahit busana baru, permak, payet, hingga sewa kebaya — semuanya dikerjakan dengan teliti oleh tangan-tangan terampil Fides Tailor.
            </p>
            <div className="hero-in [animation-delay:400ms] mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
              <WaButton />
              <a href="#portofolio" className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 luxury-underline">
                Lihat Karya
              </a>
            </div>
          </div>
          <a href="#tentang" aria-label="Gulir ke bawah" className="hero-in [animation-delay:700ms] absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-stone-600">
            Scroll
            <span className="scroll-cue block w-px h-10 bg-stone-400" />
          </a>
        </section>

        {/* TENTANG */}
        <MotionSection id="tentang" className="py-20 sm:py-28 lg:py-36">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <RevealImage className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              <Image
                src="/images/payet.png"
                alt="Detail sulam payet buatan tangan Fides Tailor Lamongan"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.5s] hover:scale-105"
              />
            </RevealImage>
            <div className="space-y-8">
              <Reveal as="p" className="text-xs uppercase tracking-[0.35em] text-gold-800 font-semibold">Tentang Kami</Reveal>
              <Reveal as="h2" delay={0.1} className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 leading-tight">
                Tiga dekade menjahit dengan <span className="italic">ketelitian.</span>
              </Reveal>
              <p className="text-stone-700 text-base md:text-lg leading-relaxed">
                <strong className="font-medium text-stone-900">Fides Tailor</strong> adalah rumah jahit di Lamongan yang berdiri sejak 1996. Setiap busana dibuat dari pola personal, dijahit dengan tangan terampil, dan disesuaikan hingga benar-benar pas.
              </p>
              <dl className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
                {([
                  [30, "", "Tahun"],
                  [10, "k+", "Busana"],
                  [100, "%", "Buatan Tangan"],
                ] as const).map(([num, suffix, label]) => (
                  <div key={label} className="flex flex-col-reverse">
                    <dt className="text-xs uppercase tracking-wider text-stone-600 mt-1">{label}</dt>
                    <dd className="font-serif text-3xl sm:text-4xl font-light text-stone-900"><CountUp to={num} suffix={suffix} /></dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </MotionSection>

        {/* LAYANAN */}
        <MotionSection id="layanan" className="py-20 sm:py-28 lg:py-36 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="max-w-2xl mb-12 sm:mb-16 space-y-5">
              <Reveal as="p" className="text-xs uppercase tracking-[0.35em] text-gold-800 font-semibold">Layanan</Reveal>
              <Reveal as="h2" delay={0.1} className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 leading-tight">Jahit, permak, payet &amp; sewa kebaya di Lamongan</Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200">
              {SERVICES.map((srv, index) => (
                <MotionCard key={srv.num} index={index} className="bg-white p-7 sm:p-10 lg:p-12 group h-full">
                  <article className="relative space-y-4">
                    <span aria-hidden className="absolute -top-7 sm:-top-10 lg:-top-12 left-0 h-0.5 w-0 bg-gold-500 transition-all duration-700 group-hover:w-16" />
                    <span className="font-serif text-sm font-medium text-gold-700">{srv.num}</span>
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-stone-900">{srv.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{srv.desc}</p>
                  </article>
                </MotionCard>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* PORTOFOLIO */}
        <MotionSection id="portofolio" className="py-20 sm:py-28 lg:py-36">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <Portfolio />
          </div>
        </MotionSection>

        {/* ULASAN */}
        <MotionSection id="ulasan" className="py-20 sm:py-28 lg:py-36 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
              <div className="max-w-2xl space-y-5">
                <Reveal as="p" className="text-xs uppercase tracking-[0.35em] text-gold-800 font-semibold">Ulasan Pelanggan</Reveal>
                <Reveal as="h2" delay={0.1} className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 leading-tight">
                  Kata mereka yang <span className="italic">sudah menjahit</span> di sini.
                </Reveal>
              </div>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-sm text-stone-700 hover:text-stone-900">
                <span className="flex gap-0.5 text-gold-600" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </span>
                <span className="luxury-underline">Lihat semua ulasan di Google Maps</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200 border border-stone-200">
              {REVIEWS.map((r, i) => (
                <Reveal as="li" key={r.name} delay={(i % 3) * 0.1} className="bg-white p-7 sm:p-9 flex">
                  <figure className="flex flex-col justify-between gap-8 w-full">
                    <div className="space-y-5">
                      <span aria-hidden className="block font-serif text-5xl leading-none text-gold-400">&ldquo;</span>
                      <blockquote className="text-stone-700 leading-relaxed">{r.text}</blockquote>
                    </div>
                    <figcaption className="flex items-center justify-between gap-4 pt-5 border-t border-stone-100">
                      <span className="font-serif text-lg text-stone-900">{r.name}</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gold-800 font-semibold">{r.tag}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </MotionSection>

        {/* PROSES */}
        <MotionSection className="py-20 sm:py-28 lg:py-36">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="max-w-2xl mb-12 sm:mb-16 space-y-5">
              <Reveal as="p" className="text-xs uppercase tracking-[0.35em] text-gold-800 font-semibold">Cara Pesan</Reveal>
              <Reveal as="h2" delay={0.1} className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 leading-tight">Mudah, cukup mulai dari WhatsApp.</Reveal>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {PROCESS.map((p, i) => (
                <Reveal as="li" key={p.step} delay={i * 0.12} className="relative border-t border-stone-300 pt-6 group">
                  <span aria-hidden className="absolute -top-px left-0 h-px w-0 bg-gold-600 transition-all duration-700 group-hover:w-full" />
                  <span className="font-serif text-sm font-medium text-gold-700">{p.step}</span>
                  <h3 className="font-serif text-2xl text-stone-900 mt-3">{p.title}</h3>
                  <p className="text-sm text-stone-600 mt-2 leading-relaxed">{p.desc}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </MotionSection>

        {/* FAQ */}
        <MotionSection id="faq" className="py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-14 space-y-6">
              <Reveal as="p" className="text-xs uppercase tracking-[0.35em] text-gold-800 font-semibold">Tanya Jawab</Reveal>
              <Reveal as="h2" delay={0.1} className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900">Pertanyaan yang sering diajukan</Reveal>
            </div>
            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-serif text-lg sm:text-xl md:text-2xl text-stone-900">
                    {f.q}
                    <Plus className="w-5 h-5 shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-4 text-stone-700 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* CTA */}
        <section id="kontak" className="relative py-24 sm:py-32 lg:py-44 bg-stone-950 text-center overflow-hidden">
          <ThreadCanvas />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,14,13,0.85)_0%,rgba(15,14,13,0.35)_45%,rgba(15,14,13,0)_75%)] pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center">
            <p className="flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-gold-300 font-semibold">
              <span className="h-px w-10 bg-gold-500/60" />
              Konsultasi Gratis
              <span className="h-px w-10 bg-gold-500/60" />
            </p>
            <Reveal as="h2" delay={0.1} className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight">
              Mari jahit <span className="italic gold-text-gradient-light">cerita Anda</span>
              <br />
              menjadi busana.
            </Reveal>
            <Reveal as="p" delay={0.2} className="mt-8 text-stone-300 text-base md:text-lg max-w-md leading-relaxed">
              Kirim referensi desain atau ceritakan acara Anda. Kami siap membantu dari ukuran pertama hingga jahitan terakhir.
            </Reveal>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-shine group relative mt-12 inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 pl-8 pr-2 py-2 text-stone-950 text-sm font-semibold tracking-wide shadow-[0_0_60px_-10px_rgba(214,191,123,0.6)] transition-shadow duration-500 hover:shadow-[0_0_80px_-5px_rgba(214,191,123,0.8)]"
            >
              Hubungi via WhatsApp
              <span className="w-11 h-11 rounded-full bg-stone-950 text-gold-200 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
            <p className="mt-6 text-xs tracking-[0.15em] text-stone-400">{WA_DISPLAY} · Senin–Sabtu, 08.00–17.00</p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Lihat karya terbaru kami</p>
              <SocialLinks />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative bg-stone-950 text-stone-300 overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10">
          <div className="flex flex-col items-center text-center">
            <Image src="/images/logo-full.png" alt="Fides Tailor" width={140} height={147} className="w-28 md:w-36 h-auto" />
            <p className="mt-8 font-serif text-2xl md:text-4xl font-light text-stone-100 leading-snug max-w-xl">
              Your style, <span className="italic text-gold-300">our hands.</span>
            </p>
            <p className="mt-5 max-w-lg text-sm md:text-base text-stone-400 leading-relaxed">
              Gaya adalah milik Anda — kami yang mewujudkannya. Dari permak hingga busana baru, setiap jahitan dikerjakan tangan terampil kami di Lamongan sejak 1996.
            </p>
            <SocialLinks className="mt-8" />
          </div>

          <div className="mt-14 md:mt-16 pt-12 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold">Layanan</h2>
              <ul className="mt-5 flex flex-wrap justify-center sm:justify-start sm:flex-col gap-x-6 gap-y-3 text-sm">
                {SERVICES.map((srv) => (
                  <li key={srv.num}>
                    <a href="#layanan" className="luxury-underline hover:text-white transition-colors">{srv.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Navigasi footer">
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold">Jelajahi</h2>
              <ul className="mt-5 flex flex-wrap justify-center sm:justify-start sm:flex-col gap-x-6 gap-y-3 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} className="luxury-underline hover:text-white transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="not-italic">
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold">Lokasi</h2>
              <div className="mt-5 space-y-3 text-sm leading-relaxed">
                <p className="flex justify-center sm:justify-start gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gold-400" /><a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Jl. Pahlawan RT 01/RW 07 No. 3, Kalianyar, Lamongan</a></p>
                <p className="flex justify-center sm:justify-start gap-3"><Phone className="w-4 h-4 shrink-0 mt-0.5 text-gold-400" /><a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{WA_DISPLAY}</a></p>
              </div>
            </address>

            <div>
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold">Jam Buka</h2>
              <div className="mt-5 space-y-3 text-sm">
                <p className="flex justify-center sm:justify-start gap-3"><Clock className="w-4 h-4 shrink-0 mt-0.5 text-gold-400" />Senin–Sabtu, 08.00–17.00 WIB</p>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-stone-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>© {new Date().getFullYear()} Fides Tailor · Penjahit Bespoke Lamongan sejak 1996</p>
            <a href="#home" className="group inline-flex items-center gap-2 uppercase tracking-[0.25em] hover:text-gold-300 transition-colors">
              Kembali ke atas
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
