import React, { useState } from "react";
import { useAppTheme, THEMES, FONTS } from "../context/ThemeContext";
import { AppThemeId, AppFontId } from "../types";
import { 
  Palette, 
  Type, 
  Check, 
  Sparkles, 
  RotateCcw, 
  X, 
  Eye, 
  Sun, 
  Moon, 
  Compass, 
  Layers, 
  Scissors,
  CheckCircle2,
  Sliders
} from "lucide-react";

export const ThemeFontModal: React.FC = () => {
  const { 
    theme, 
    font, 
    themeConfig, 
    fontConfig, 
    setTheme, 
    setFont, 
    isModalOpen, 
    setIsModalOpen, 
    resetToDefault 
  } = useAppTheme();

  const [activeTab, setActiveTab] = useState<"theme" | "font" | "preview">("theme");

  if (!isModalOpen) return null;

  const themeList = Object.values(THEMES);
  const fontList = Object.values(FONTS);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#161922] w-full max-w-4xl rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-[#1C1C1C] text-white flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-inner">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-100">
                  Studio Tema & Tipografi
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-mono uppercase tracking-widest border border-[#D4AF37]/30">
                  Kustomisasi
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono mt-0.5">
                Sesuaikan palet warna atelier dan karakter huruf sesuai kenyamanan Anda
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={resetToDefault}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white text-xs font-mono border border-white/10 flex items-center space-x-1.5 transition-all"
              title="Kembalikan ke Setelan Standar"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Default</span>
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-all"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher Navigation */}
        <div className="px-6 py-3 bg-stone-100 dark:bg-[#11141C] border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("theme")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "theme"
                  ? "bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm font-bold"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-stone-800/60"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>1. Palet Tema ({themeList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("font")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "font"
                  ? "bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm font-bold"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-stone-800/60"
              }`}
            >
              <Type className="w-4 h-4" />
              <span>2. Pilihan Font ({fontList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === "preview"
                  ? "bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm font-bold"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-stone-800/60"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>3. Pratinjau Studio</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-stone-500 dark:text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Tersimpan Otomatis</span>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* TAB 1: THEMES SELECTION */}
          {activeTab === "theme" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                    Pilih Suasana & Palet Busana
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Klik kartu tema di bawah ini untuk langsung mengubah tampilan seluruh aplikasi JahitPedia.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#D4AF37] font-semibold bg-[#1C1C1C] px-3 py-1 rounded-lg border border-[#D4AF37]/30">
                  Aktif: {themeConfig.name}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {themeList.map((th) => {
                  const isSelected = theme === th.id;
                  return (
                    <div
                      key={th.id}
                      onClick={() => setTheme(th.id)}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between relative overflow-hidden group ${
                        isSelected
                          ? "border-[#D4AF37] bg-white dark:bg-[#1C202B] shadow-xl scale-[1.02]"
                          : "border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-[#11141C] hover:border-stone-400 dark:hover:border-stone-700 hover:bg-white dark:hover:bg-[#161922]"
                      }`}
                    >
                      {/* Active Indicator Pin */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#D4AF37] text-[#1C1C1C] flex items-center justify-center shadow-md animate-in zoom-in">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                            {th.category}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                            {th.name}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed line-clamp-2">
                            {th.tagline}
                          </p>
                        </div>

                        {/* Visual Palette Swatches */}
                        <div className="pt-2">
                          <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1.5">
                            Palet Warna:
                          </div>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-7 h-7 rounded-lg shadow-sm border border-stone-300/40"
                              style={{ backgroundColor: th.previewColors.primary }}
                              title="Warna Primer"
                            />
                            <div 
                              className="w-7 h-7 rounded-lg shadow-sm border border-stone-300/40"
                              style={{ backgroundColor: th.previewColors.accent }}
                              title="Warna Aksen"
                            />
                            <div 
                              className="w-7 h-7 rounded-lg shadow-sm border border-stone-300/40"
                              style={{ backgroundColor: th.previewColors.background }}
                              title="Latar Belakang"
                            />
                            <div 
                              className="w-7 h-7 rounded-lg shadow-sm border border-stone-300/40"
                              style={{ backgroundColor: th.previewColors.surface }}
                              title="Kartu & Permukaan"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Select Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTheme(th.id);
                        }}
                        className={`mt-4 w-full py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                          isSelected
                            ? "bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/50"
                            : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 group-hover:border-stone-400"
                        }`}
                      >
                        {isSelected ? "Sedang Dipakai" : "Terapkan Tema"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: FONTS SELECTION */}
          {activeTab === "font" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                    Pilih Karakter & Pasangan Font
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Kombinasi font kurasi profesional untuk judul pola dan teks panduan jahit.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#D4AF37] font-semibold bg-[#1C1C1C] px-3 py-1 rounded-lg border border-[#D4AF37]/30">
                  Aktif: {fontConfig.name}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fontList.map((f) => {
                  const isSelected = font === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setFont(f.id)}
                      className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between relative group ${
                        isSelected
                          ? "border-[#D4AF37] bg-white dark:bg-[#1C202B] shadow-xl scale-[1.01]"
                          : "border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-[#11141C] hover:border-stone-400 dark:hover:border-stone-700 hover:bg-white dark:hover:bg-[#161922]"
                      }`}
                    >
                      {/* Active Indicator Pin */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#D4AF37] text-[#1C1C1C] flex items-center justify-center shadow-md animate-in zoom-in">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                            {f.vibe}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-baseline space-x-2">
                            <h4 className="text-lg font-bold text-stone-900 dark:text-white">
                              {f.name}
                            </h4>
                            <span className="text-xs font-mono text-stone-400">
                              ({f.headingFont} + {f.bodyFont})
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                            {f.description}
                          </p>
                        </div>

                        {/* Live Typographic Specimen Box */}
                        <div className="p-4 rounded-xl bg-[#FAF8F3] dark:bg-[#0D0F14] border border-stone-200 dark:border-stone-800 space-y-2">
                          <div 
                            className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white leading-tight"
                            style={{ fontFamily: f.headingFamily }}
                          >
                            {f.sampleHeading}
                          </div>
                          <div 
                            className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed"
                            style={{ fontFamily: f.bodyFamily }}
                          >
                            {f.sampleBody}
                          </div>
                        </div>
                      </div>

                      {/* Select Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFont(f.id);
                        }}
                        className={`mt-4 w-full py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                          isSelected
                            ? "bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/50"
                            : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 group-hover:border-stone-400"
                        }`}
                      >
                        {isSelected ? "Font Aktif Digunakan" : "Gunakan Font Ini"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LIVE PREVIEW STUDIO */}
          {activeTab === "preview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                    Simulasi Komponen Busana & Pola
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Lihat bagaimana kombinasi Tema <strong>{themeConfig.name}</strong> dan Font <strong>{fontConfig.name}</strong> tampil pada elemen aplikasi.
                  </p>
                </div>
              </div>

              {/* Sample 1: Pattern Blueprint Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#161922] border border-stone-200 dark:border-stone-800 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-mono text-xs text-stone-400 uppercase tracking-wider">
                      MODUL 01 • ANATOMI POLA
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/30">
                    Kupnat Dada (Bust Dart)
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                    Cara Menghitung Titik Puncak Payudara (BP) & Arah Serat
                  </h2>
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    Tarik garis tegak lurus dari garis tengah muka (TM) sejauh setengah jarak payudara (9-10 cm). Kupnat sisi diarahkan 2.5 cm sebelum titik puncak BP agar tidak menghasilkan punuk kerutan tajam.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button className="px-5 py-2.5 rounded-xl bg-[#1C1C1C] text-[#D4AF37] font-semibold text-xs border border-[#D4AF37]/40 shadow-sm flex items-center space-x-2">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Mulai Potong Pola</span>
                  </button>
                  <button className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-mono font-medium border border-stone-200 dark:border-stone-700">
                    Unduh Format PDF 1:1
                  </button>
                </div>
              </div>

              {/* Sample 2: Quick Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#11141C] border border-stone-200 dark:border-stone-800">
                  <span className="text-[11px] font-mono text-stone-400 uppercase">Kerapatan Setikan</span>
                  <div className="text-xl font-bold text-stone-900 dark:text-white mt-1">10-12 SPI</div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Standar Katun & Rayon</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#11141C] border border-stone-200 dark:border-stone-800">
                  <span className="text-[11px] font-mono text-stone-400 uppercase">Kampuh Jahit (Seam)</span>
                  <div className="text-xl font-bold text-stone-900 dark:text-white mt-1">1.5 - 2.0 cm</div>
                  <span className="text-[10px] text-[#D4AF37] font-medium">Sisi Badan & Lengan</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#11141C] border border-stone-200 dark:border-stone-800">
                  <span className="text-[11px] font-mono text-stone-400 uppercase">Status Simulator</span>
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">Tension 4.0 (Normal)</div>
                  <span className="text-[10px] text-stone-400 font-medium">Jarum No. 11/14 Sesuai</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 dark:bg-[#0E1017] border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs text-stone-600 dark:text-stone-400 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Tema: <strong>{themeConfig.name}</strong> • Font: <strong>{fontConfig.name}</strong></span>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#2A2A2A] text-[#D4AF37] text-xs font-mono uppercase tracking-wider font-bold border border-[#D4AF37]/30 shadow-md transition-all text-center"
          >
            Tutup & Simpan Pilihan
          </button>
        </div>
      </div>
    </div>
  );
};
