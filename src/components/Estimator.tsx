"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MessageSquare, ShieldCheck, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Definitions
interface Service {
  id: string;
  name: string;
  basePrice: number;
  desc: string;
  fabricFactor: number;
}

const SERVICES: Service[] = [
  { id: "gown", name: "Gaun Pesta & Haute Couture", basePrice: 750000, desc: "Gaun malam kustom, gaun pengantin modern, dan busana adibusana.", fabricFactor: 1.5 },
  { id: "bridesmaid", name: "Kebaya Modern & Bridesmaid", basePrice: 450000, desc: "Kebaya kartini kontemporer, kebaya wisuda, dan gaun pengiring pengantin.", fabricFactor: 1.0 },
  { id: "suit", name: "Jas Formal & Bespoke Suit", basePrice: 1100000, desc: "Setelan jas pria premium dengan furing sutra dan konstruksi bahu presisi.", fabricFactor: 2.0 },
  { id: "uniform", name: "Seragam Premium / Batik", basePrice: 150000, desc: "Seragam dinas eksekutif, batik sutra semiformal, dan pakaian kerja berpotongan pas.", fabricFactor: 0.8 },
];

const FABRICS = [
  { id: "self", name: "Bahan Disediakan Klien", priceAdd: 0, desc: "Layanan jasa jahit murni dengan bahan/kain yang Anda bawa sendiri." },
  { id: "standard", name: "Koleksi Serat Katun & Velvet Atelier", priceAdd: 150000, desc: "Kain berkualitas tinggi dari kami (Katun Toyobo Fodu, Satin Velvet Jepang)." },
  { id: "premium", name: "Koleksi Brokat Perancis & Sutra Alam", priceAdd: 450000, desc: "Serat premium pilihan butik (Sutra asli, Brokat Perancis Chantilly, Wol Italia)." },
];

const PAYETS = [
  { id: "none", name: "Tanpa Hiasan Payet", priceAdd: 0, desc: "Desain minimalis berfokus sepenuhnya pada kekuatan potongan pola." },
  { id: "light", name: "Aksen Payet Minimalis (Kerah & Manset)", priceAdd: 150000, desc: "Detail sulam payet halus sebagai pemanis di garis leher atau lengan." },
  { id: "medium", name: "Aksen Payet Medium (Dada & Lengan)", priceAdd: 400000, desc: "Hiasan payet dengan kerapatan sedang untuk busana pesta elegan." },
  { id: "heavy", name: "Sulam Payet Luxury (Handmade Full)", priceAdd: 950000, desc: "Aplikasi payet manik-manik jepang penuh yang dikerjakan manual dengan tangan." },
];

const TIMELINES = [
  { id: "normal", name: "Jadwal Standar (3-4 Minggu)", multiplier: 1.0, desc: "Antrean reguler atelier untuk pengerjaan detail tanpa biaya tambahan." },
  { id: "express", name: "Prioritas Express (1-2 Minggu)", multiplier: 1.2, desc: "Layanan pengerjaan prioritas menengah dengan tambahan biaya jasa 20%." },
  { id: "super", name: "Atelier Prioritas Utama (3-5 Hari)", multiplier: 1.4, desc: "Layanan kilat khusus untuk kebutuhan mendesak dengan tambahan biaya jasa 40%." },
];

export default function Estimator() {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [selectedPayet, setSelectedPayet] = useState(PAYETS[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[0]);
  const [estDate, setEstDate] = useState("");

  // Calculations
  const baseJasa = selectedService.basePrice;
  const fabricCost = selectedFabric.priceAdd * selectedService.fabricFactor;
  const payetCost = selectedPayet.priceAdd;
  const subTotalBeforeUrgency = baseJasa + fabricCost + payetCost;
  const totalCost = Math.round(subTotalBeforeUrgency * selectedTimeline.multiplier);

  useEffect(() => {
    const today = new Date();
    let daysToAdd = 25; // Normal default
    if (selectedTimeline.id === "express") daysToAdd = 12;
    else if (selectedTimeline.id === "super") daysToAdd = 4;

    today.setDate(today.getDate() + daysToAdd);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString("id-ID", options);

    const timer = setTimeout(() => {
      setEstDate(dateStr);
    }, 0);
    return () => clearTimeout(timer);
  }, [selectedTimeline]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleWhatsAppClick = () => {
    const number = "6282229562725"; // Custom Fides Tailor contact number
    const message = `Halo Fides Tailor, saya tertarik untuk melakukan konsultasi pemesanan layanan Bespoke Tailoring dengan rincian pilihan sebagai berikut:

✨ RINCIAN PRAKIRAAN INVESTASI BUSANA ✨
--------------------------------------------------
• Kategori Busana: ${selectedService.name}
• Pilihan Bahan: ${selectedFabric.name}
• Detail Payet: ${selectedPayet.name}
• Timeline Pengerjaan: ${selectedTimeline.name}
--------------------------------------------------
• Estimasi Tanggal Selesai: ${estDate}
• Prakiraan Nilai Investasi: ${formatPrice(totalCost)}

Mohon kesediaan waktu penjahit ahli Fides Tailor untuk konsultasi desain dan fitting ukuran di studio Lamongan. Terima kasih.`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${number}?text=${encodedText}`, "_blank");
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-20 px-6 md:px-12 bg-white border border-stone-200 rounded-none shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <div className="mb-4">
          <span className="luxury-badge">Atelier Estimation</span>
        </div>
        <h3 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-stone-900">
          Prakiraan Nilai Investasi Busana
        </h3>
        <div className="luxury-divider max-w-sm mt-6 mb-6">
          <div className="luxury-diamond" />
        </div>
        <p className="text-stone-600 max-w-2xl text-base md:text-lg leading-relaxed font-light">
          Sesuaikan desain busana, pilihan serat material, dan batas waktu pengerjaan untuk mendapatkan transparansi estimasi nilai karya dari Fides Tailor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Step-by-Step Selectors (7 columns) */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Step 1: Service Type */}
          <div>
            <h4 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-4">
              <span className="font-sans text-sm text-stone-400 font-bold">01 /</span>
              Pilih Kategori Busana
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.map((srv) => (
                <motion.button
                  key={srv.id}
                  onClick={() => setSelectedService(srv)}
                  whileHover={{ y: -2, borderColor: "var(--ink, #18140E)" }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex flex-col items-start p-6 rounded-none border text-left transition-all duration-300 cursor-pointer ${
                    selectedService.id === srv.id
                      ? "border-stone-900 bg-stone-50/50 ring-1 ring-stone-900"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <span className="font-serif text-lg font-normal text-stone-900 flex items-center justify-between w-full">
                    {srv.name}
                    {selectedService.id === srv.id && <Check className="w-4 h-4 text-gold-600" />}
                  </span>
                  <span className="text-sm text-stone-500 mt-2.5 leading-relaxed font-light">{srv.desc}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Step 2: Fabric Material */}
          <div>
            <h4 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-4">
              <span className="font-sans text-sm text-stone-400 font-bold">02 /</span>
              Pilihan Material Serat Kain
            </h4>
            <div className="space-y-3">
              {FABRICS.map((fb) => {
                const actualAddPrice = fb.priceAdd * selectedService.fabricFactor;
                return (
                  <motion.button
                    key={fb.id}
                    onClick={() => setSelectedFabric(fb)}
                    whileHover={{ y: -1, borderColor: "var(--ink, #18140E)" }}
                    whileTap={{ scale: 0.995 }}
                    className={`w-full flex items-center justify-between p-6 rounded-none border text-left transition-all duration-300 cursor-pointer ${
                      selectedFabric.id === fb.id
                        ? "border-stone-900 bg-stone-50/50 ring-1 ring-stone-900"
                        : "border-stone-200 bg-white"
                    }`}
                  >
                    <div className="flex-1 pr-8">
                      <p className="font-serif text-base font-normal text-stone-900 flex items-center gap-2.5">
                        {fb.name}
                        {selectedFabric.id === fb.id && <Check className="w-4 h-4 text-gold-600" />}
                      </p>
                      <p className="text-sm text-stone-500 mt-2 leading-relaxed font-light">{fb.desc}</p>
                    </div>
                    <span className="font-sans text-sm font-bold text-stone-800 whitespace-nowrap">
                      {actualAddPrice === 0 ? "Tanpa Tambahan" : `+ ${formatPrice(actualAddPrice)}`}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Payet Sequin work */}
          <div>
            <h4 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-4">
              <span className="font-sans text-sm text-stone-400 font-bold">03 /</span>
              Sentuhan Payet & Manik-Manik
            </h4>
            <div className="space-y-3">
              {PAYETS.map((pt) => (
                <motion.button
                  key={pt.id}
                  onClick={() => setSelectedPayet(pt)}
                  whileHover={{ y: -1, borderColor: "var(--ink, #18140E)" }}
                  whileTap={{ scale: 0.995 }}
                  className={`w-full flex items-center justify-between p-6 rounded-none border text-left transition-all duration-300 cursor-pointer ${
                    selectedPayet.id === pt.id
                      ? "border-stone-900 bg-stone-50/50 ring-1 ring-stone-900"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <div className="flex-1 pr-8">
                    <p className="font-serif text-base font-normal text-stone-900 flex items-center gap-2.5">
                      {pt.name}
                      {selectedPayet.id === pt.id && <Check className="w-4 h-4 text-gold-600" />}
                    </p>
                    <p className="text-sm text-stone-500 mt-2 leading-relaxed font-light">{pt.desc}</p>
                  </div>
                  <span className="font-sans text-sm font-bold text-stone-800 whitespace-nowrap">
                    {pt.priceAdd === 0 ? "Proporsi Dasar" : `+ ${formatPrice(pt.priceAdd)}`}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Step 4: Urgency / Completion speed */}
          <div>
            <h4 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-4">
              <span className="font-sans text-sm text-stone-400 font-bold">04 /</span>
              Durasi Waktu Pembuatan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TIMELINES.map((tm) => (
                <motion.button
                  key={tm.id}
                  onClick={() => setSelectedTimeline(tm)}
                  whileHover={{ y: -2, borderColor: "var(--ink, #18140E)" }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex flex-col items-start p-6 rounded-none border text-left transition-all duration-300 cursor-pointer ${
                    selectedTimeline.id === tm.id
                      ? "border-stone-900 bg-stone-50/50 ring-1 ring-stone-900"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <span className="font-serif text-base font-normal text-stone-900 flex items-center gap-2.5 w-full justify-between">
                    {tm.name.split(" (")[0]}
                    {selectedTimeline.id === tm.id && <Check className="w-4 h-4 text-gold-600" />}
                  </span>
                  <span className="text-sm text-stone-500 mt-3 leading-relaxed font-light">
                    {tm.desc}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Bill Breakdown Sticky Box (5 columns) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div 
            layout
            className="bg-stone-50 rounded-none p-8 md:p-10 border border-stone-200 shadow-sm relative gold-accent-frame"
          >
            <div className="atelier-collage-item space-y-6">
              <h4 className="font-serif text-lg font-normal text-stone-900 uppercase tracking-widest pb-4 border-b border-stone-200">
                IKHTISAR PRAKIRAAN
              </h4>

              {/* Calculations items */}
              <div className="space-y-5 text-base text-stone-650 font-light">
                <div className="flex justify-between items-start gap-4">
                  <span>Nilai Jasa Jahit Pola</span>
                  <span className="font-mono text-stone-950 font-semibold">{formatPrice(baseJasa)}</span>
                </div>
                
                <div className="flex justify-between items-start gap-4">
                  <span>Penyediaan Material Serat</span>
                  <span className="font-mono text-stone-950 font-semibold">
                    {fabricCost === 0 ? "Klien Menyediakan" : formatPrice(fabricCost)}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span>Pekerjaan Sulam & Payet</span>
                  <span className="font-mono text-stone-950 font-semibold">
                    {payetCost === 0 ? "Minimalis / Polos" : formatPrice(payetCost)}
                  </span>
                </div>

                <AnimatePresence>
                  {selectedTimeline.multiplier > 1.0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between items-start gap-4 text-gold-700 overflow-hidden"
                    >
                      <span>Tambahan Prioritas Waktu ({selectedTimeline.name.split(" (")[0]})</span>
                      <span className="font-mono font-bold">
                        + {formatPrice(Math.round(subTotalBeforeUrgency * (selectedTimeline.multiplier - 1)))}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <hr className="border-stone-200 my-6" />

                {/* Delivery Date Estimation */}
                <div className="bg-white rounded-none p-5 border border-stone-200 flex items-start gap-4 my-6">
                  <Calendar className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider font-bold">ESTIMASI KARYA SELESAI</p>
                    <p className="text-base font-bold text-stone-900 mt-1.5">{estDate}</p>
                  </div>
                </div>

                <hr className="border-stone-200 my-6" />

                {/* Total Cost */}
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-sm text-stone-900 font-bold tracking-wider">ESTIMASI INVESTASI:</span>
                  <motion.span 
                    key={totalCost}
                    initial={{ scale: 0.95, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-serif text-3xl font-bold text-stone-900 tracking-tight"
                  >
                    {formatPrice(totalCost)}
                  </motion.span>
                </div>
              </div>

              {/* WA Button */}
              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.02, backgroundColor: "var(--ink-2, #3A3128)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-10 py-5 px-6 rounded-none bg-stone-900 text-white font-bold tracking-widest text-sm uppercase transition-colors flex items-center justify-center gap-3 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Daftarkan Konsultasi Bespoke</span>
              </motion.button>

              {/* Footer details */}
              <div className="flex items-center gap-2.5 mt-6 text-sm text-stone-400 justify-center">
                <ShieldCheck className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Nilai di atas merupakan prakiraan awal. Hubungi untuk fitting perdana.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
