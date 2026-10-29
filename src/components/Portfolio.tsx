"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
  span: string;
}

// Bento layout: one hero piece, one wide, two squares
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Gaun Pengantin Brokat Emas",
    category: "Gaun Pengantin",
    image: "/images/gown.png",
    desc: "Gaun pengantin ivory dengan aksen brokat emas dan bordir handmade.",
    span: "sm:col-span-2 sm:aspect-[16/10] lg:row-span-2",
  },
  {
    id: 2,
    title: "Dress Bridesmaid Sifon",
    category: "Bridesmaid",
    image: "/images/bridesmaid.png",
    desc: "Sifon premium yang jatuh lembut dengan detail lipit di bagian dada.",
    span: "lg:col-span-2",
  },
  {
    id: 3,
    title: "Detail Payet & Mutiara",
    category: "Payet Handmade",
    image: "/images/payet.png",
    desc: "Manik mutiara dan payet jepang yang dipasang satu per satu dengan tangan.",
    span: "",
  },
  {
    id: 4,
    title: "Jas & Seragam Formal",
    category: "Jas & Seragam",
    image: "/images/uniform.png",
    desc: "Jas formal pria dan seragam instansi dengan potongan bahu presisi.",
    span: "",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);

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
          <p className="text-xs uppercase tracking-[0.35em] text-gold-800 font-semibold">Lookbook</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 leading-tight">
            Karya pilihan <span className="italic">atelier kami</span>
          </h2>
        </div>
        <p className="text-stone-600 max-w-xs">Setiap busana dibuat satu per satu, khusus untuk pemakainya.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px] xl:auto-rows-[300px] gap-3 md:gap-4">
        {PROJECTS.map((project, idx) => (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => setActive(project)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className={`group relative overflow-hidden bg-stone-200 aspect-[4/5] lg:aspect-auto cursor-pointer text-left ${project.span}`}
            aria-label={`Lihat ${project.title}`}
          >
            <Image
              src={project.image}
              alt={`${project.title} — Fides Tailor Lamongan`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
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
              <div className="relative aspect-square md:aspect-auto md:min-h-[480px] bg-stone-200">
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
