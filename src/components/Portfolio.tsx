"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { SOCIALS } from "@/lib/contact";
import { motion, AnimatePresence } from "framer-motion";

const GROUPS = ["Semua", "Kebaya", "Gaun", "Batik & Tenun", "Seragam & Kostum"] as const;
const PAGE_SIZE = 12;
type Group = Exclude<(typeof GROUPS)[number], "Semua">;

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
  group: Group;
  wide?: boolean;
}

// Portrait grid: all photos are mannequin shots, so every tile keeps a 3:4 frame.
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Kebaya Pengantin Putih",
    category: "Jahit & Payet",
    image: "/images/galeri-kebaya-pengantin-putih.webp",
    desc: "Kebaya brokat putih dengan taburan payet kristal dan mutiara di seluruh badan.",
    group: "Kebaya",
  },
  {
    id: 2,
    title: "Kebaya Biru Gradasi",
    category: "Jahit & Payet",
    image: "/images/galeri-kebaya-biru-gradasi.webp",
    desc: "Satin gradasi biru dengan rumbai manik di pinggang dan payet di kerah serta lengan.",
    group: "Kebaya",
  },
  {
    id: 3,
    title: "Kebaya Navy Satin",
    category: "Jahit & Payet",
    image: "/images/galeri-kebaya-navy-payet.webp",
    desc: "Satin navy berpotongan pas badan dengan payet di kerah, belahan depan, dan manset.",
    group: "Kebaya",
  },
  {
    id: 4,
    title: "Gaun Dusty Pink",
    category: "Gaun Pesta",
    image: "/images/galeri-gaun-dusty-pink.webp",
    desc: "Gaun satin dengan draperi di badan, lengan brokat bordir, dan payet mutiara di leher.",
    group: "Gaun",
  },
  {
    id: 5,
    title: "Kebaya Maroon Brokat",
    category: "Payet",
    image: "/images/galeri-kebaya-maroon-payet.webp",
    desc: "Brokat maroon dengan payet bunga di sepanjang bagian depan dan lengan terompet.",
    group: "Kebaya",
  },
  {
    id: 6,
    title: "Kebaya Mocca & Kain Batik",
    category: "Jahit & Payet",
    image: "/images/galeri-kebaya-mocca-batik.webp",
    desc: "Kebaya brokat mocca berpayet kristal dan mutiara, dipadukan rok kain batik.",
    group: "Kebaya",
  },
  {
    id: 7,
    title: "Kebaya Kartini Abu",
    category: "Jahit & Payet",
    image: "/images/galeri-kebaya-kartini-abu.webp",
    desc: "Kebaya kartini brokat abu dengan payet hitam-putih bergelombang di bagian depan.",
    group: "Kebaya",
  },
  {
    id: 8,
    title: "Detail Payet Navy",
    category: "Payet",
    image: "/images/galeri-detail-payet-navy.webp",
    desc: "Rangkaian mutiara, manik, dan kristal yang dipasang satu per satu dengan tangan.",
    group: "Kebaya",
  },
  {
    id: 9,
    title: "Seragam Blazer Hijau",
    category: "Seragam",
    image: "/images/galeri-seragam-blazer-hijau.webp",
    desc: "Blazer sekolah hijau dengan list krem di kerah, saku, dan lengan, lengkap dengan bed lambang.",
    group: "Seragam & Kostum",
  },
  {
    id: 10,
    title: "Seragam Batik Sekolah",
    category: "Seragam",
    image: "/images/galeri-seragam-batik-maroon.webp",
    desc: "Kemeja batik motif sekolah dipadukan rok lipit maroon.",
    group: "Seragam & Kostum",
  },
  {
    id: 11,
    title: "Seragam Salur Navy",
    category: "Seragam",
    image: "/images/galeri-seragam-salur-navy.webp",
    desc: "Kemeja salur hitam-putih dengan kerah dan manset navy, serta rok lipit senada.",
    group: "Seragam & Kostum",
  },
  {
    id: 12,
    title: "Seragam Pramuka",
    category: "Seragam",
    image: "/images/galeri-seragam-pramuka.webp",
    desc: "Seragam pramuka berpotongan rapi dengan pundak, saku, dan aksen garis di lengan.",
    group: "Seragam & Kostum",
  },
  {
    id: 13,
    title: "Gaun Anak Sequin",
    category: "Gaun",
    image: "/images/galeri-gaun-anak-sequin.webp",
    desc: "Gaun anak dengan atasan sequin dan rok tile mengembang, lengan ruffle.",
    group: "Gaun",
  },
  {
    id: 14,
    title: "Atasan Batik Kerja",
    category: "Batik",
    image: "/images/galeri-batik-kerja.webp",
    desc: "Atasan batik berpotongan pas badan dengan kerah asimetris dan model kutubaru.",
    group: "Batik & Tenun",
  },
  {
    id: 15,
    title: "Kebaya Pink Kondangan",
    category: "Kebaya",
    image: "/images/galeri-kebaya-pink-kondangan.webp",
    desc: "Kebaya satin pink kembaran untuk kondangan, dengan aksen payet di badan dan lengan.",
    group: "Kebaya",
  },
  {
    id: 16,
    title: "Kebaya Wisuda Maroon",
    category: "Kebaya",
    image: "/images/galeri-kebaya-wisuda-maroon.webp",
    desc: "Kebaya brokat maroon berpayet dengan lengan terompet, dipadukan rok songket krem.",
    group: "Kebaya",
  },
  {
    id: 17,
    title: "Gamis Lilac Brokat",
    category: "Gaun",
    image: "/images/galeri-gamis-lilac-brokat.webp",
    desc: "Gamis lilac berlapis brokat bordir putih dengan manset ruffle.",
    group: "Gaun",
  },
  {
    id: 18,
    title: "Seragam Keluarga Lilac",
    category: "Seragam",
    image: "/images/galeri-seragam-keluarga-lilac.webp",
    desc: "Seragam keluarga untuk acara pernikahan: gamis satin lilac dengan luaran brokat motif jaring.",
    group: "Gaun",
    wide: true,
  },
  {
    id: 19,
    title: "Gaun Kondangan Cream",
    category: "Gaun Pesta",
    image: "/images/galeri-gaun-kondangan-cream.webp",
    desc: "Dua model gaun cream untuk kondangan — tunik brokat bordir dan dress satin model lilit.",
    group: "Gaun",
  },
  {
    id: 20,
    title: "Kebaya Pengantin Adat",
    category: "Kebaya Pengantin",
    image: "/images/galeri-kebaya-pengantin-adat.webp",
    desc: "Kebaya pengantin putih berpayet kristal dan mutiara, dipakai bersama riasan adat.",
    group: "Kebaya",
  },
  {
    id: 21,
    title: "Kebaya Olive Brokat",
    category: "Jahit & Payet",
    image: "/images/galeri-kebaya-olive-brokat.webp",
    desc: "Kebaya brokat hijau olive dengan payet kristal di kerah dan sepanjang kancing depan.",
    group: "Kebaya",
  },
  {
    id: 22,
    title: "Kostum Dance Hitam",
    category: "Kostum",
    image: "/images/galeri-kostum-dance-hitam.webp",
    desc: "Kostum tim dance serba hitam dengan model berbeda untuk tiap anggota, dibuat sesuai konsep.",
    group: "Seragam & Kostum",
    wide: true,
  },
  {
    id: 23,
    title: "Atasan Tenun Ikat",
    category: "Tenun",
    image: "/images/galeri-atasan-tenun-ikat.webp",
    desc: "Atasan tenun ikat model kutubaru dengan lengan salur dan pundak tegas.",
    group: "Batik & Tenun",
  },
  {
    id: 24,
    title: "Kebaya Hitam Mutiara",
    category: "Jahit & Payet",
    image: "/images/galeri-kebaya-hitam-mutiara.webp",
    desc: "Kebaya brokat hitam dengan rangkaian mutiara dan manik, dilengkapi selendang tile.",
    group: "Kebaya",
  },
  {
    id: 25,
    title: "Gamis Navy Payet",
    category: "Gaun Pesta",
    image: "/images/galeri-gamis-navy-payet.webp",
    desc: "Gamis navy polos dengan payet mutiara di leher dan manset.",
    group: "Gaun",
  },
  {
    id: 26,
    title: "Kebaya Wisuda Kuning",
    category: "Kebaya",
    image: "/images/galeri-kebaya-wisuda-kuning.webp",
    desc: "Kebaya brokat kuning gading kembaran untuk wisuda, dipadukan rok senada.",
    group: "Kebaya",
  },
  {
    id: 27,
    title: "Blazer Batik Kombinasi",
    category: "Batik",
    image: "/images/galeri-blazer-batik-kombinasi.webp",
    desc: "Blazer batik model double-breasted dengan kerah dan panel kain hitam polos.",
    group: "Batik & Tenun",
  },
  {
    id: 28,
    title: "Kebaya Maroon Satin",
    category: "Jahit & Payet",
    image: "/images/galeri-kebaya-maroon-satin.webp",
    desc: "Kebaya satin maroon dengan kancing bungkus di depan dan payet di belahan serta manset.",
    group: "Kebaya",
  },
  {
    id: 29,
    title: "Seragam Batik Kantor",
    category: "Seragam Batik",
    image: "/images/galeri-seragam-batik-kantor.webp",
    desc: "Dua model seragam batik instansi — kerah bulat dengan list navy dan kerah kemeja klasik.",
    group: "Batik & Tenun",
  },
  {
    id: 30,
    title: "Batik Kombinasi Biru",
    category: "Batik",
    image: "/images/galeri-batik-kombinasi-biru.webp",
    desc: "Atasan batik dengan panel depan polos biru, kerah shanghai, dan kancing bungkus.",
    group: "Batik & Tenun",
  },
  {
    id: 31,
    title: "Kebaya Mocca Satin",
    category: "Jahit & Payet",
    image: "/images/galeri-kebaya-mocca-satin.webp",
    desc: "Kebaya satin mocca dengan payet kristal dan manik emas mengikuti garis asimetris.",
    group: "Kebaya",
  },
  {
    id: 32,
    title: "Couple Batik & Kebaya",
    category: "Couple",
    image: "/images/galeri-couple-batik-kebaya.webp",
    desc: "Pasangan kemeja batik pria dan kebaya brokat kuning dengan aplikasi bunga 3D, dipadukan rok batik senada.",
    group: "Kebaya",
  },
  {
    id: 33,
    title: "Seragam Batik Korpri",
    category: "Seragam Batik",
    image: "/images/galeri-seragam-batik-korpri.webp",
    desc: "Seragam batik Korpri model kerah shanghai dengan potongan pas badan.",
    group: "Batik & Tenun",
  },
  {
    id: 34,
    title: "Gaun Navy Kombinasi Batik",
    category: "Gaun Pesta",
    image: "/images/galeri-gaun-navy-batik.webp",
    desc: "Gaun satin navy dengan panel batik di tengah, lengan tile, dan taburan mutiara di sepanjang belahan.",
    group: "Gaun",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState<(typeof GROUPS)[number]>("Semua");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const filtered = filter === "Semua" ? PROJECTS : PROJECTS.filter((p) => p.group === filter);
  const shown = filtered.slice(0, limit);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-800 font-semibold">Galeri</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 leading-tight">
            Karya pilihan <span className="italic">tangan kami</span>
          </h2>
        </div>
        <p className="text-stone-600 max-w-xs">Setiap busana dibuat satu per satu, khusus untuk pemakainya.</p>
      </div>

      <div role="group" aria-label="Filter galeri" className="flex flex-wrap gap-2 mb-8">
        {GROUPS.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => {
              setFilter(g);
              setLimit(PAGE_SIZE);
            }}
            aria-pressed={filter === g}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold border transition-colors cursor-pointer ${
              filter === g
                ? "bg-stone-900 border-stone-900 text-white"
                : "border-stone-300 text-stone-700 hover:border-gold-600 hover:text-gold-800"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-3 md:gap-4">
        {shown.map((project, idx) => (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => setActive(project)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (idx % 4) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className={`group relative overflow-hidden bg-stone-200 cursor-pointer text-left ${project.wide ? "col-span-2 aspect-[3/2]" : "aspect-[3/4]"}`}
            aria-label={`Lihat ${project.title}`}
          >
            <Image
              src={project.image}
              alt={`${project.title} — Fides Tailor Lamongan`}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent opacity-90 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7 flex items-end justify-between gap-4 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100 transition-all duration-500">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-100">{project.category}</p>
                <h3 className="font-serif text-xl md:text-2xl text-white mt-1">{project.title}</h3>
              </div>
              <span className="w-10 h-10 shrink-0 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                <Plus className="w-4 h-4" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length > limit && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="rounded-full bg-stone-900 px-7 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-white transition-colors hover:bg-stone-700 cursor-pointer"
          >
            Tampilkan lebih banyak ({filtered.length - limit})
          </button>
        </div>
      )}

      <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-stone-200 pt-8">
        <p className="text-stone-600 text-center sm:text-left">Lihat semua karya terbaru kami di media sosial.</p>
        <div className="flex gap-3">
          {[
            { href: SOCIALS.instagram, label: "Instagram" },
            { href: SOCIALS.tiktok, label: "TikTok" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-stone-800 transition-colors hover:border-gold-600 hover:text-gold-800 hover:bg-gold-50"
            >
              {label}
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              className="relative bg-stone-50 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`relative bg-stone-200 ${active.wide ? "aspect-[3/2] md:col-span-2" : "aspect-[3/4]"}`}>
                <Image src={active.image} alt={active.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center space-y-5">
                <p className="text-xs uppercase tracking-[0.3em] text-gold-800 font-semibold">{active.category}</p>
                <h3 className="font-serif text-3xl md:text-4xl font-light text-stone-900">{active.title}</h3>
                <p className="text-stone-700 leading-relaxed">{active.desc}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Tutup"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-stone-900 cursor-pointer hover:bg-white"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
