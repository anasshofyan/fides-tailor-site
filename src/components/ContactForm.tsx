"use client";

import React, { useState } from "react";
import { MessageSquare, MapPin, Phone, Clock, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    service: "Gaun Pesta & Haute Couture",
    date: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date) {
      alert("Mohon lengkapi Nama Lengkap Anda dan Rencana Tanggal Pengukuran.");
      return;
    }

    const number = "6282229562725"; // Fides Tailor WhatsApp contact number
    const dateFormatted = new Date(formData.date).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const message = `Halo Fides Tailor, saya ingin menjadwalkan janji temu fitting dan pengukuran baju dengan detail berikut:

👤 DETAIL RESERVASI FITTING 👤
--------------------------------------------------
• Nama Lengkap: ${formData.name}
• Kategori Layanan: ${formData.service}
• Rencana Tanggal Janji Temu: ${dateFormatted}
• Catatan Tambahan: ${formData.notes || "-"}
--------------------------------------------------

Mohon konfirmasi ketersediaan jam dan jadwal atelier untuk janji temu ini. Terima kasih.`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${number}?text=${encodedText}`, "_blank");
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch px-4">
        
        {/* Contact Information (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between relative">
          <div className="space-y-12">
            <div>
              <div className="mb-4">
                <span className="luxury-badge">Atelier Location</span>
              </div>
              <h4 className="font-serif text-3xl md:text-4xl font-light text-stone-900 leading-tight">
                Studio Fides Tailor
              </h4>
              <p className="text-stone-600 text-base mt-4 leading-relaxed max-w-sm font-light">
                Silakan jadwalkan kunjungan Anda ke atelier kami untuk sesi konsultasi bahan pribadi, penentuan pola busana, dan pengukuran tubuh yang presisi bersama penjahit utama kami.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-1" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-stone-400 font-bold">ALAMAT WORKSHOP</p>
                  <p className="text-base text-stone-700 mt-2 leading-relaxed">
                    Jl. Pahlawan RT 01/RW 07 No. 3, Kalianyar (sebelah barat pasar), Kec. Lamongan, Kabupaten Lamongan, Jawa Timur 62211
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <Phone className="w-5 h-5 text-gold-600 shrink-0 mt-1" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-stone-400 font-bold">WHATSAPP & KONTAK</p>
                  <a 
                    href="tel:+6282229562725"
                    className="text-base text-stone-700 mt-2 font-mono font-semibold block hover:text-gold-600 transition-colors"
                  >
                    +62 822-2956-2725
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <Clock className="w-5 h-5 text-gold-600 shrink-0 mt-1" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-stone-400 font-bold">JAM OPERASIONAL</p>
                  <p className="text-base text-stone-700 mt-2 leading-relaxed">
                    Senin - Sabtu: 08.00 - 17.00 WIB
                  </p>
                  <p className="text-xs text-stone-400 mt-1">Minggu & Hari Libur: Tutup</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <Mail className="w-5 h-5 text-gold-600 shrink-0 mt-1" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-stone-400 font-bold">SURAT ELEKTRONIK</p>
                  <p className="text-base text-stone-700 mt-2 font-mono">concierge@fidestailor.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-stone-200 mt-12 text-sm text-stone-400">
            <p>© {new Date().getFullYear()} Fides Tailor. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          </div>
        </div>

        {/* Booking Form (7 columns) - Styled like a premium invitation card */}
        <div className="lg:col-span-7 bg-white border border-stone-200/80 rounded-none p-10 md:p-14 shadow-sm flex flex-col justify-between gold-accent-frame">
          <div className="atelier-collage-item">
            <div className="mb-4">
              <span className="luxury-badge">Concierge Service</span>
            </div>
            <h4 className="font-serif text-3xl font-light text-stone-900">
              Reservasi Janji Temu Fitting
            </h4>
            <p className="text-stone-600 text-base mt-3 font-light">
              Lengkapi formulir di bawah ini untuk memesan slot konsultasi pribadi jahit adibusana Anda.
            </p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-10">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm uppercase tracking-widest font-bold text-stone-500 mb-2">
                  Nama Lengkap Pemesan
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap Anda"
                  className="atelier-input text-stone-900 placeholder-stone-300 text-base font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label htmlFor="service" className="text-sm uppercase tracking-widest font-bold text-stone-500 mb-2">
                    Kategori Layanan
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="atelier-input text-stone-900 text-base cursor-pointer font-sans"
                  >
                    <option value="Gaun Pesta & Haute Couture">Gaun Pesta & Haute Couture</option>
                    <option value="Kebaya Modern & Bridesmaid">Kebaya Modern & Bridesmaid</option>
                    <option value="Jas Formal & Bespoke Suit">Jas Formal & Bespoke Suit</option>
                    <option value="Seragam Premium / Batik">Seragam Premium / Batik</option>
                    <option value="Sulam Payet Eksklusif">Sulam Payet Eksklusif</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="date" className="text-sm uppercase tracking-widest font-bold text-stone-500 mb-2">
                    Rencana Tanggal Fitting
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="atelier-input text-stone-900 text-base cursor-pointer font-sans"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                 <label htmlFor="notes" className="text-sm uppercase tracking-widest font-bold text-stone-500 mb-2">
                  Catatan Desain & Detail Pengukuran (Opsional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Sebutkan detail preferensi desain, perkiraan lingkar badan, atau catatan khusus lainnya."
                  className="atelier-input text-stone-900 placeholder-stone-300 text-base resize-none font-sans"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, backgroundColor: "var(--ink-2, #3A3128)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 px-6 rounded-none bg-stone-900 text-white font-bold tracking-widest text-sm uppercase transition-colors flex items-center justify-center gap-3 cursor-pointer mt-4"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Kirim Permintaan Reservasi</span>
              </motion.button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
