import React, { useState } from "react";
import { BodyMeasurementProfile } from "../types";
import { 
  Calculator, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  BookOpen, 
  Layers,
  ArrowRight,
  Printer
} from "lucide-react";

export const PatternCalculator: React.FC = () => {
  const [profile, setProfile] = useState<BodyMeasurementProfile>({
    name: "Ukuran Standar M",
    gender: "Wanita",
    unit: "cm",
    lingkarBadan: 92,
    lingkarPinggang: 72,
    lingkarPanggul: 98,
    lebarBahu: 38,
    panjangPunggung: 37,
    lebarPunggung: 34,
    panjangDada: 32,
    lebarMuka: 32,
    lingkarKerungLengan: 44,
    panjangLengan: 54,
    lingkarLeher: 36,
    panjangBaju: 65,
    panjangRokCelana: 92,
  });

  const [copied, setCopied] = useState(false);

  // Preset size charts (Standard Indonesian Tailoring)
  const presets: Record<string, Partial<BodyMeasurementProfile>> = {
    "S": {
      name: "Ukuran S (Small)",
      lingkarBadan: 86,
      lingkarPinggang: 66,
      lingkarPanggul: 92,
      lebarBahu: 36,
      panjangPunggung: 36,
      lingkarKerungLengan: 42,
      panjangLengan: 52,
    },
    "M": {
      name: "Ukuran M (Medium)",
      lingkarBadan: 92,
      lingkarPinggang: 72,
      lingkarPanggul: 98,
      lebarBahu: 38,
      panjangPunggung: 37,
      lingkarKerungLengan: 44,
      panjangLengan: 54,
    },
    "L": {
      name: "Ukuran L (Large)",
      lingkarBadan: 98,
      lingkarPinggang: 78,
      lingkarPanggul: 104,
      lebarBahu: 40,
      panjangPunggung: 38,
      lingkarKerungLengan: 46,
      panjangLengan: 55,
    },
    "XL": {
      name: "Ukuran XL (Extra Large)",
      lingkarBadan: 106,
      lingkarPinggang: 86,
      lingkarPanggul: 112,
      lebarBahu: 42,
      panjangPunggung: 39,
      lingkarKerungLengan: 49,
      panjangLengan: 56,
    },
  };

  const applyPreset = (key: string) => {
    if (presets[key]) {
      setProfile(prev => ({ ...prev, ...presets[key] }));
    }
  };

  // Indonesian Dressmaking Formulas (Sistem Porrie Mulhiawan / Soen)
  const rumus = {
    // Badan Depan
    lebarBadanDepan: (profile.lingkarBadan / 4) + 1,
    pinggangDepan: (profile.lingkarPinggang / 4) + 1 + 3, // +3 kupnat
    panggulDepan: (profile.lingkarPanggul / 4) + 1,
    turunLeherDepan: (profile.lingkarLeher / 6) + 2.5,
    lebarLeherDepan: (profile.lingkarLeher / 6) + 1,
    lebarBahuSatuSisi: (profile.lebarBahu / 2) - 1,

    // Badan Belakang
    lebarBadanBelakang: (profile.lingkarBadan / 4) - 1,
    pinggangBelakang: (profile.lingkarPinggang / 4) - 1 + 3,
    panggulBelakang: (profile.lingkarPanggul / 4) - 1,
    turunLeherBelakang: 1.5,

    // Lengan
    tinggiPuncakLengan: (profile.lingkarKerungLengan / 4) + 1.5,
    setengahKerung: profile.lingkarKerungLengan / 2,

    // Estimasi Kebutuhan Kain (Meter)
    kainLebar150: ((profile.panjangBaju + profile.panjangLengan + 20) / 100).toFixed(2),
    kainLebar115: (((profile.panjangBaju * 2) + profile.panjangLengan + 30) / 100).toFixed(2),
  };

  const copyBlueprintText = () => {
    const text = `📐 RINGKASAN RUMUS POLA JAHIT (${profile.name}):
- Lingkar Badan: ${profile.lingkarBadan} cm
- Lingkar Pinggang: ${profile.lingkarPinggang} cm
- Lingkar Panggul: ${profile.lingkarPanggul} cm
- Panjang Punggung: ${profile.panjangPunggung} cm

📋 RUMUS POLA BADAN DEPAN (TM):
• Lebar Dada (1/4 LB + 1 cm) = ${rumus.lebarBadanDepan.toFixed(1)} cm
• Pinggang (1/4 LP + 1 + 3 cm Kupnat) = ${rumus.pinggangDepan.toFixed(1)} cm
• Turun Kerung Leher = ${rumus.turunLeherDepan.toFixed(1)} cm
• Lebar Kerung Leher = ${rumus.lebarLeherDepan.toFixed(1)} cm

📋 RUMUS POLA BADAN BELAKANG (TB):
• Lebar Punggung (1/4 LB - 1 cm) = ${rumus.lebarBadanBelakang.toFixed(1)} cm
• Pinggang (1/4 LP - 1 + 3 cm Kupnat) = ${rumus.pinggangBelakang.toFixed(1)} cm
• Turun Kerung Leher = ${rumus.turunLeherBelakang} cm

✂️ POLA LENGAN:
• Tinggi Puncak Lengan = ${rumus.tinggiPuncakLengan.toFixed(1)} cm
• Panjang Lengan = ${profile.panjangLengan} cm

🧵 KEBUTUHAN KAIN:
• Kain Lebar 150 cm: ${rumus.kainLebar150} Meter
• Kain Lebar 115 cm: ${rumus.kainLebar115} Meter`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Section Header */}
      <div className="border-b border-[#EAE8E3] pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-2 font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>KALKULATOR METRIK & DRAFTING POLA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#1C1C1C] tracking-tight">
            Kalkulator Ukuran Badan & Rumus Pola
          </h1>
          <p className="text-[#666666] text-sm mt-1 max-w-2xl font-light">
            Konversi ukuran anatomi tubuh menjadi rumus potong pola presisi sistem Porrie Mulhiawan dan kalkulasi kebutuhan meteran kain.
          </p>
        </div>

        <div className="text-xs font-mono text-[#888888]">
          <span>METODE: METRIK DRESSMAKING</span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[#666666] mr-1">Preset Standar:</span>
        {Object.keys(presets).map((size) => (
          <button
            key={size}
            onClick={() => applyPreset(size)}
            className="px-4 py-2 border border-[#CCCCCC] bg-[#FFFFFF] hover:bg-[#FAF8F3] hover:border-[#1C1C1C] text-xs font-mono font-bold text-[#1C1C1C] transition-all"
          >
            SIZE {size}
          </button>
        ))}
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Body Measurements Input */}
        <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#EAE8E3] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE8E3]">
            <h3 className="font-serif italic font-bold text-xl text-[#1C1C1C]">
              Ukuran Tubuh Pemakai (Centimeter)
            </h3>
            <span className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 bg-[#FAF8F3] text-[#1C1C1C] border border-[#E0DED7] font-bold">
              STANDAR ID
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#666666] block mb-1.5">
                Lingkar Badan (Bust):
              </label>
              <input
                type="number"
                value={profile.lingkarBadan}
                onChange={(e) => setProfile({ ...profile, lingkarBadan: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border border-[#CCCCCC] text-sm font-mono focus:outline-none focus:border-[#1C1C1C] bg-[#FAF8F3]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#666666] block mb-1.5">
                Lingkar Pinggang (Waist):
              </label>
              <input
                type="number"
                value={profile.lingkarPinggang}
                onChange={(e) => setProfile({ ...profile, lingkarPinggang: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border border-[#CCCCCC] text-sm font-mono focus:outline-none focus:border-[#1C1C1C] bg-[#FAF8F3]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#666666] block mb-1.5">
                Lingkar Panggul (Hips):
              </label>
              <input
                type="number"
                value={profile.lingkarPanggul}
                onChange={(e) => setProfile({ ...profile, lingkarPanggul: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border border-[#CCCCCC] text-sm font-mono focus:outline-none focus:border-[#1C1C1C] bg-[#FAF8F3]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#666666] block mb-1.5">
                Lebar Bahu:
              </label>
              <input
                type="number"
                value={profile.lebarBahu}
                onChange={(e) => setProfile({ ...profile, lebarBahu: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border border-[#CCCCCC] text-sm font-mono focus:outline-none focus:border-[#1C1C1C] bg-[#FAF8F3]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#666666] block mb-1.5">
                Panjang Punggung:
              </label>
              <input
                type="number"
                value={profile.panjangPunggung}
                onChange={(e) => setProfile({ ...profile, panjangPunggung: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border border-[#CCCCCC] text-sm font-mono focus:outline-none focus:border-[#1C1C1C] bg-[#FAF8F3]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#666666] block mb-1.5">
                Lingkar Kerung Lengan:
              </label>
              <input
                type="number"
                value={profile.lingkarKerungLengan}
                onChange={(e) => setProfile({ ...profile, lingkarKerungLengan: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border border-[#CCCCCC] text-sm font-mono focus:outline-none focus:border-[#1C1C1C] bg-[#FAF8F3]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#666666] block mb-1.5">
                Panjang Lengan Baju:
              </label>
              <input
                type="number"
                value={profile.panjangLengan}
                onChange={(e) => setProfile({ ...profile, panjangLengan: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border border-[#CCCCCC] text-sm font-mono focus:outline-none focus:border-[#1C1C1C] bg-[#FAF8F3]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#666666] block mb-1.5">
                Rencana Panjang Baju:
              </label>
              <input
                type="number"
                value={profile.panjangBaju}
                onChange={(e) => setProfile({ ...profile, panjangBaju: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 border border-[#CCCCCC] text-sm font-mono focus:outline-none focus:border-[#1C1C1C] bg-[#FAF8F3]"
              />
            </div>
          </div>
        </div>

        {/* Right Blueprint Output Box */}
        <div className="lg:col-span-6 bg-[#1C1C1C] text-[#FDFCFB] p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6 border border-[#1C1C1C]">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#333333]">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-serif italic font-bold text-xl text-white">
                  Rincian Kalkulasi Potong Pola
                </h3>
              </div>

              <button
                onClick={copyBlueprintText}
                className="px-3.5 py-2 bg-[#2B2B2B] hover:bg-[#383838] text-[10px] font-mono uppercase tracking-wider text-stone-200 flex items-center space-x-2 border border-[#444444] transition-all"
              >
                {copied ? <Check className="w-3 h-3 text-[#D4AF37]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "TERSALIN" : "SALIN DATA"}</span>
              </button>
            </div>

            {/* Pattern Calculations Output Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Badan Depan Card */}
              <div className="p-4 bg-[#262626] border border-[#3A3A3A] space-y-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold block">
                  BADAN DEPAN (TM):
                </span>
                <div className="space-y-1.5 text-stone-300 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-stone-400">1/4 LB + 1:</span>
                    <span className="font-bold text-white">{rumus.lebarBadanDepan.toFixed(1)} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Pinggang (+1+3 Kup):</span>
                    <span className="font-bold text-white">{rumus.pinggangDepan.toFixed(1)} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Panggul (1/4 LP + 1):</span>
                    <span className="font-bold text-white">{rumus.panggulDepan.toFixed(1)} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Turun Leher:</span>
                    <span className="font-bold text-white">{rumus.turunLeherDepan.toFixed(1)} cm</span>
                  </div>
                </div>
              </div>

              {/* Badan Belakang Card */}
              <div className="p-4 bg-[#262626] border border-[#3A3A3A] space-y-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold block">
                  BADAN BELAKANG (TB):
                </span>
                <div className="space-y-1.5 text-stone-300 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-stone-400">1/4 LB - 1:</span>
                    <span className="font-bold text-white">{rumus.lebarBadanBelakang.toFixed(1)} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Pinggang (-1+3 Kup):</span>
                    <span className="font-bold text-white">{rumus.pinggangBelakang.toFixed(1)} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Panggul (1/4 LP - 1):</span>
                    <span className="font-bold text-white">{rumus.panggulBelakang.toFixed(1)} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Turun Leher:</span>
                    <span className="font-bold text-white">{rumus.turunLeherBelakang} cm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lengan & Kebutuhan Kain */}
            <div className="p-5 bg-[#262626] border border-[#3A3A3A] text-xs space-y-3 font-mono">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#3A3A3A]">
                <span className="text-stone-300 text-xs">PUNCAK KERUNG LENGAN:</span>
                <span className="font-bold text-[#D4AF37] text-sm">{rumus.tinggiPuncakLengan.toFixed(1)} CM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400 text-xs">ESTIMASI KAIN (LEBAR 150 CM):</span>
                <span className="font-bold text-white text-sm">{rumus.kainLebar150} METER</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400 text-xs">ESTIMASI KAIN (LEBAR 115 CM):</span>
                <span className="font-bold text-white text-sm">{rumus.kainLebar115} METER</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#888888] pt-3 border-t border-[#333333] flex items-center justify-between">
            <span>STANDAR KAMPUH: +1.5 CM SISI / BAHU, +1 CM LEHER.</span>
            <span className="text-[#D4AF37]">AKURASI FORMULA 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

