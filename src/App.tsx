import React, { useState } from "react";
import { AppTab } from "./types";
import { ThemeProvider, useAppTheme } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { PatternMasterclass } from "./components/PatternMasterclass";
import { StepByStepGuide } from "./components/StepByStepGuide";
import { InteractiveVideoPlayer } from "./components/InteractiveVideoPlayer";
import { SewingSimulator } from "./components/SewingSimulator";
import { PatternCalculator } from "./components/PatternCalculator";
import { AIConsultant } from "./components/AIConsultant";
import { SewingGlossary } from "./components/SewingGlossary";
import { ThemeFontModal } from "./components/ThemeFontModal";
import { Scissors, Palette, Sparkles, Type } from "lucide-react";

function AppContent() {
  const [activeTab, setActiveTab] = useState<AppTab>("pattern-lessons");
  const { themeConfig, fontConfig, setIsModalOpen } = useAppTheme();

  return (
    <div className="min-h-screen bg-[var(--theme-bg-app)] text-[var(--theme-text-primary)] flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === "pattern-lessons" && <PatternMasterclass />}
        {activeTab === "guides" && <StepByStepGuide />}
        {activeTab === "video-tutorials" && <InteractiveVideoPlayer />}
        {activeTab === "sewing-simulator" && <SewingSimulator />}
        {activeTab === "pattern-calc" && <PatternCalculator />}
        {activeTab === "ai-consultant" && <AIConsultant />}
        {activeTab === "glossary-quiz" && <SewingGlossary />}
      </main>

      {/* Floating Theme & Font Quick Switcher Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center space-x-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-3.5 rounded-full bg-[#1C1C1C] text-[#D4AF37] hover:bg-[#2C2C2C] shadow-2xl border-2 border-[#D4AF37]/50 flex items-center space-x-2 transition-all hover:scale-105 group"
          title="Ubah Tema & Font Aplikasi"
        >
          <Palette className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-mono font-bold tracking-wider pr-1">
            Ubah Tema & Font
          </span>
        </button>
      </div>

      {/* Theme & Font Customization Modal */}
      <ThemeFontModal />

      {/* Editorial Footer */}
      <footer className="bg-[#1C1C1C] text-[#FDFCFB] border-t border-[#2E2E2E] py-12 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#FDFCFB] text-[#1C1C1C] flex items-center justify-center font-serif italic text-lg font-bold">
                J
              </div>
              <span className="font-serif font-bold text-lg tracking-tight text-white">JahitPedia Atelier</span>
              <span className="text-[#D4AF37] tracking-widest text-[9px] uppercase font-mono">EDISI 2025</span>
            </div>
            <p className="text-[#999999] text-xs leading-relaxed max-w-md">
              Platform studi tata busana, konstruksi pola jahit, dan panduan pembuatan pakaian terstruktur dengan simulasi interaktif & kecerdasan buatan.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-stone-400 font-mono text-[11px]">
              <span>Tema Aktif: <strong className="text-[#D4AF37]">{themeConfig.name}</strong></span>
              <span>•</span>
              <span>Font: <strong className="text-stone-200">{fontConfig.headingFont} + {fontConfig.bodyFont}</strong></span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] font-semibold">
              Metode & Standar
            </div>
            <ul className="space-y-1.5 text-stone-400 text-xs">
              <li>• Sistem Pola Dasar Soen Dressmaking</li>
              <li>• Standar Pola Porrie & Bunka Fashion</li>
              <li>• Penyesuaian Ukuran Proporsional Indonesia</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] font-semibold">
              Fitur Interaktif
            </div>
            <ul className="space-y-1.5 text-stone-400 text-xs">
              <li>• Blueprint & Pembedah Pola Vektor</li>
              <li>• Simulator Setikan & Kerapatan Jahitan</li>
              <li>• Asisten Konsultan Pola Gemini AI</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#777777] text-[11px]">
          <div>© {new Date().getFullYear()} JahitPedia Indonesia. Hak Cipta Dilindungi.</div>
          <div className="flex items-center space-x-4 tracking-wider uppercase font-mono text-[10px]">
            <span>Est. 2025</span>
            <span>•</span>
            <span className="text-[#D4AF37]">Haute Couture & Ready-to-Wear</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

