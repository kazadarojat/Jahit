import React from "react";
import { AppTab } from "../types";
import { useAppTheme } from "../context/ThemeContext";
import { 
  Scissors, 
  Compass, 
  BookOpen, 
  Video, 
  Activity, 
  Calculator, 
  Sparkles, 
  HelpCircle,
  CheckCircle2,
  Palette,
  Type
} from "lucide-react";

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  completedStepsCount?: number;
  totalStepsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  completedStepsCount = 8,
  totalStepsCount = 24,
}) => {
  const { themeConfig, fontConfig, setIsModalOpen } = useAppTheme();

  const tabs: { id: AppTab; label: string; number: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "pattern-lessons", label: "Pola & Arsitektur", number: "01", icon: <Compass className="w-3.5 h-3.5" />, badge: "Inti" },
    { id: "guides", label: "Panduan Busana", number: "02", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "video-tutorials", label: "Studio Video", number: "03", icon: <Video className="w-3.5 h-3.5" /> },
    { id: "sewing-simulator", label: "Studio Jahit & Manekin", number: "04", icon: <Scissors className="w-3.5 h-3.5" />, badge: "Atelier" },
    { id: "pattern-calc", label: "Kalkulator Ukuran", number: "05", icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: "ai-consultant", label: "Konsultan AI", number: "06", icon: <Sparkles className="w-3.5 h-3.5" />, badge: "AI" },
    { id: "glossary-quiz", label: "Kamus & Kuis", number: "07", icon: <HelpCircle className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCFB]/95 dark:bg-[#0D0F14]/95 backdrop-blur-md border-b border-[#EAE8E3] dark:border-stone-800 transition-colors">
      {/* Top Editorial Banner */}
      <div className="border-b border-[#F0EFEB] dark:border-stone-800 bg-[#1C1C1C] text-[#FDFCFB] py-1.5 px-4 sm:px-6 text-[10px] tracking-[0.25em] uppercase flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-[#D4AF37] font-bold">● STUDIO AKADEMI</span>
          <span className="hidden sm:inline text-stone-400">PANDUAN TATA BUSANA, POLA & KONSTRUKSI JAHIT</span>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4 text-stone-300">
          {/* Quick Theme Badge trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[#D4AF37] transition-all font-mono normal-case text-[10px]"
            title="Klik untuk ubah Tema & Font"
          >
            <Palette className="w-3 h-3" />
            <span className="hidden sm:inline">Tema: {themeConfig.name.split(" ")[0]}</span>
            <span>•</span>
            <span className="hidden sm:inline">Font: {fontConfig.name.split(" ")[0]}</span>
            <span className="sm:hidden">Tema & Font</span>
          </button>

          <span className="hidden md:inline">METODE SOEN & PORRIE</span>
          <span className="text-[#D4AF37]">PROGRES: {completedStepsCount}/{totalStepsCount} TAHAP</span>
        </div>
      </div>

      {/* Main Header / Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center space-x-3.5 cursor-pointer group select-none" 
            onClick={() => setActiveTab("pattern-lessons")}
          >
            <div className="w-11 h-11 bg-[#1C1C1C] flex items-center justify-center text-[#FDFCFB] font-serif italic text-xl shadow-xs transition-transform group-hover:scale-105 border border-[#1C1C1C]">
              J
            </div>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif italic font-bold text-2xl tracking-tight text-[#1C1C1C] dark:text-white">
                  JahitPedia
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                  ATELIER
                </span>
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#666666] dark:text-stone-400 font-medium hidden sm:block">
                Edukasi Jahit & Pemahaman Pola Pakaian
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Theme & Font Customizer Trigger Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-2 rounded-xl bg-white dark:bg-[#161922] border border-[#E0DED7] dark:border-stone-700 text-[#1C1C1C] dark:text-stone-200 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-[#F4F1EA] dark:hover:bg-stone-800 transition-all shadow-xs group"
              title="Buka Pengaturan Tema & Font"
            >
              <Palette className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Tema & Font</span>
              <span className="sm:hidden">Tema</span>
              <span 
                className="w-2.5 h-2.5 rounded-full border border-stone-300 dark:border-stone-600 shadow-xs shrink-0" 
                style={{ backgroundColor: themeConfig.previewColors.accent }}
              />
            </button>

            <button
              onClick={() => setActiveTab("pattern-calc")}
              className="hidden lg:flex items-center space-x-1.5 px-3.5 py-2 border border-[#E0DED7] dark:border-stone-700 text-[#1C1C1C] dark:text-stone-200 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-[#F4F1EA] dark:hover:bg-stone-800 transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Drafting Pola</span>
            </button>

            <button
              onClick={() => setActiveTab("ai-consultant")}
              className="flex items-center space-x-2 px-3.5 sm:px-4 py-2 bg-[#1C1C1C] text-[#FDFCFB] text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#2A2A2A] shadow-xs transition-all border border-[#1C1C1C]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Konsultan AI</span>
              <span className="sm:hidden">AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="border-t border-[#EAE8E3] dark:border-stone-800 bg-[#FDFCFB] dark:bg-[#0D0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1.5 no-scrollbar" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  id={`nav-tab-${tab.id}`}
                  className={`group relative flex items-center space-x-2 px-3.5 py-2.5 text-xs whitespace-nowrap transition-all ${
                    isActive
                      ? "text-[#1C1C1C] dark:text-white font-semibold"
                      : "text-[#666666] dark:text-stone-400 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-[#F7F5F0] dark:hover:bg-stone-800/50"
                  }`}
                >
                  <span className="font-mono text-[9px] tracking-wider text-[#999999] group-hover:text-[#D4AF37] transition-colors">
                    {tab.number}
                  </span>
                  <span className="tracking-[0.05em] uppercase text-[11px] font-medium">
                    {tab.label}
                  </span>
                  {tab.badge && (
                    <span
                      className={`text-[8px] px-1.5 py-0.5 font-mono uppercase tracking-widest ${
                        isActive
                          ? "bg-[#1C1C1C] text-[#FDFCFB] dark:bg-[#D4AF37] dark:text-[#1C1C1C]"
                          : "bg-[#EAE8E3] dark:bg-stone-800 text-[#666666] dark:text-stone-300"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#1C1C1C] dark:bg-[#D4AF37]"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

