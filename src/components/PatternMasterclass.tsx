import React, { useState } from "react";
import { PATTERN_SYMBOLS, PATTERN_LESSONS } from "../data/patternLessons";
import { PatternVisualizer } from "./PatternVisualizer";
import { 
  Compass, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Scissors,
  CheckCircle2
} from "lucide-react";

export const PatternMasterclass: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>("grainline");
  const [activeLessonId, setActiveLessonId] = useState<string>("modul-1");

  const categories = ["Semua", "Garis & Serat", "Tanda Lipatan & Potongan", "Penyesuaian & Bentuk", "Aksesori"];

  const filteredSymbols = activeCategory === "Semua" 
    ? PATTERN_SYMBOLS 
    : PATTERN_SYMBOLS.filter(s => s.category === activeCategory);

  const activeLesson = PATTERN_LESSONS.find(l => l.id === activeLessonId) || PATTERN_LESSONS[0];
  const selectedSymbol = PATTERN_SYMBOLS.find(s => s.id === selectedSymbolId) || PATTERN_SYMBOLS[0];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Editorial Hero Banner */}
      <div className="border border-[#EAE8E3] bg-[#1C1C1C] text-[#FDFCFB] p-8 sm:p-12 relative overflow-hidden shadow-xs">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#2E2E2E] text-[#D4AF37] text-[10px] font-mono uppercase tracking-[0.25em] border border-[#3E3E3E] mb-4">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Masterclass Pola Busana • Edisi Akademi 2025</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic font-bold text-white tracking-tight leading-tight">
            Arsitektur & Konstruksi Pola Jahit Busana
          </h1>
          
          <p className="mt-4 text-[#CCCCCC] text-sm sm:text-base leading-relaxed font-light max-w-2xl">
            Pola jahit adalah cetak biru dari setiap busana berkelas. Kuasai kaidah garis serat benang, penempatan TM/TB pada lipatan kain, manipulasi kupnat lekuk tubuh, serta takik pasang dengan metode presisi tinggi.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono">
            <span className="flex items-center space-x-2 bg-white/5 px-3.5 py-2 border border-white/10 text-stone-300">
              <span className="text-[#D4AF37]">01.</span>
              <span className="tracking-wider uppercase text-[10px]">Kamus Simbol Internasional</span>
            </span>
            <span className="flex items-center space-x-2 bg-white/5 px-3.5 py-2 border border-white/10 text-stone-300">
              <span className="text-[#D4AF37]">02.</span>
              <span className="tracking-wider uppercase text-[10px]">Blueprint Pembedah Vektor</span>
            </span>
            <span className="flex items-center space-x-2 bg-white/5 px-3.5 py-2 border border-white/10 text-stone-300">
              <span className="text-[#D4AF37]">03.</span>
              <span className="tracking-wider uppercase text-[10px]">5 Modul Sistem Soen Dressmaking</span>
            </span>
          </div>
        </div>

        {/* Decorative Editorial Watermark */}
        <div className="absolute right-[-20px] top-[-20px] bottom-[-20px] w-1/3 opacity-5 pointer-events-none hidden lg:flex items-center justify-center">
          <Scissors className="w-80 h-80 text-white -rotate-12" />
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE BLUEPRINT PATTERN VISUALIZER */}
      <section className="space-y-6">
        <div className="border-b border-[#EAE8E3] pb-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] font-semibold">
              BAGIAN 01
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#1C1C1C]">
              Pembedah Anatomi & Blueprint Pola
            </h2>
          </div>
          <p className="text-xs text-[#666666] font-mono uppercase tracking-wider">
            Interaktif • Badan, Lengan, Rok, Kerah & Layout Kain
          </p>
        </div>

        <PatternVisualizer />
      </section>

      {/* SECTION 2: FLASHCARD SIMBOL POLA JAHIT */}
      <section className="space-y-6">
        <div className="border-b border-[#EAE8E3] pb-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] font-semibold">
              BAGIAN 02
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#1C1C1C]">
              Kamus Simbol & Notasi Pola Jahit
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-[11px] uppercase font-mono tracking-wider transition-all border ${
                  activeCategory === cat
                    ? "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C] font-semibold"
                    : "bg-[#FFFFFF] text-[#666666] border-[#E0DED7] hover:border-[#1C1C1C] hover:text-[#1C1C1C]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Symbol Grid & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Grid (List of Symbols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredSymbols.map((symbol) => {
              const isSelected = symbol.id === selectedSymbolId;
              return (
                <div
                  key={symbol.id}
                  onClick={() => setSelectedSymbolId(symbol.id)}
                  className={`p-5 border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#FAF8F3] border-[#1C1C1C] ring-1 ring-[#1C1C1C] shadow-xs"
                      : "bg-[#FFFFFF] border-[#EAE8E3] hover:border-[#CCCCCC]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 bg-[#F4F1EA] text-[#666666] border border-[#E0DED7]">
                      {symbol.category}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">
                        TERPILIH
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#1C1C1C] mt-2.5">
                    {symbol.name}
                  </h3>
                  <p className="text-xs text-[#666666] italic">
                    {symbol.indonesianName}
                  </p>

                  <p className="text-xs text-[#555555] mt-2 line-clamp-2 leading-relaxed">
                    {symbol.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Inspector Box (Deep Dive Card) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#EAE8E3] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E3]">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                  DEKODING SIMBOL
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#666666]">
                  {selectedSymbol.category}
                </span>
              </div>

              <h3 className="text-2xl font-serif italic font-bold text-[#1C1C1C] mt-4">
                {selectedSymbol.name}
              </h3>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#666666] mb-4">
                {selectedSymbol.indonesianName}
              </h4>

              {/* Graphical representation of the symbol */}
              <div className="my-5 p-4 bg-[#FDFCFB] border border-[#EAE8E3] flex items-center justify-center h-28">
                {selectedSymbol.visualType === "grainline" && (
                  <svg viewBox="0 0 200 60" className="w-48 h-12">
                    <line x1="20" y1="30" x2="180" y2="30" stroke="#15803D" strokeWidth="2.5" />
                    <polygon points="20,30 28,26 28,34" fill="#15803D" />
                    <polygon points="180,30 172,26 172,34" fill="#15803D" />
                    <text x="55" y="22" fill="#15803D" fontSize="9" fontWeight="bold" fontFamily="monospace">GRAINLINE / SERAT</text>
                  </svg>
                )}
                {selectedSymbol.visualType === "fold" && (
                  <svg viewBox="0 0 200 60" className="w-48 h-12">
                    <line x1="10" y1="30" x2="190" y2="30" stroke="#1E40AF" strokeWidth="2.5" strokeDasharray="8 4" />
                    <text x="35" y="22" fill="#1E40AF" fontSize="10" fontWeight="bold" fontFamily="monospace">LIPATAN KAIN (TM/TB)</text>
                  </svg>
                )}
                {selectedSymbol.visualType === "dart" && (
                  <svg viewBox="0 0 200 80" className="w-48 h-16">
                    <path d="M 40,70 L 100,15 L 160,70 Z" fill="#FBF7EE" stroke="#1C1C1C" strokeWidth="1.8" strokeDasharray="4 2" />
                    <circle cx="100" cy="15" r="3.5" fill="#D4AF37" />
                    <text x="70" y="77" fill="#1C1C1C" fontSize="9" fontWeight="bold" fontFamily="monospace">DASAR KUPNAT</text>
                  </svg>
                )}
                {selectedSymbol.visualType === "notch" && (
                  <svg viewBox="0 0 200 60" className="w-48 h-12">
                    <line x1="10" y1="40" x2="190" y2="40" stroke="#1C1C1C" strokeWidth="2" />
                    <polygon points="60,40 65,22 70,40" fill="#B91C1C" />
                    <polygon points="130,40 135,22 140,40" fill="#1E40AF" />
                    <polygon points="145,40 150,22 155,40" fill="#1E40AF" />
                    <text x="45" y="55" fill="#B91C1C" fontSize="8" fontFamily="monospace">DEPAN (1V)</text>
                    <text x="125" y="55" fill="#1E40AF" fontSize="8" fontFamily="monospace">BELAKANG (2V)</text>
                  </svg>
                )}
                {selectedSymbol.visualType === "seam-allowance" && (
                  <svg viewBox="0 0 200 60" className="w-48 h-12">
                    <line x1="20" y1="35" x2="180" y2="35" stroke="#1C1C1C" strokeWidth="2" />
                    <line x1="20" y1="15" x2="180" y2="15" stroke="#B91C1C" strokeWidth="1.2" strokeDasharray="5 3" />
                    <text x="25" y="10" fill="#B91C1C" fontSize="8" fontFamily="monospace">POTONG (+1.5CM)</text>
                    <text x="25" y="50" fill="#1C1C1C" fontSize="8" fontFamily="monospace">GARIS JAHITAN</text>
                  </svg>
                )}
                {selectedSymbol.visualType !== "grainline" && selectedSymbol.visualType !== "fold" && selectedSymbol.visualType !== "dart" && selectedSymbol.visualType !== "notch" && selectedSymbol.visualType !== "seam-allowance" && (
                  <div className="flex items-center space-x-2 text-[#666666]">
                    <Compass className="w-5 h-5 text-[#D4AF37]" />
                    <span className="font-mono text-xs text-[#1C1C1C] uppercase tracking-wider">{selectedSymbol.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 text-xs text-[#333333]">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#888888]">
                    Deskripsi & Makna:
                  </h4>
                  <p className="mt-1 leading-relaxed text-[#2D2D2D] text-xs">
                    {selectedSymbol.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#888888]">
                    Tingkat Kepentingan Pola:
                  </h4>
                  <p className="mt-1 leading-relaxed text-[#2D2D2D] text-xs">
                    {selectedSymbol.importance}
                  </p>
                </div>

                <div className="p-4 bg-[#1C1C1C] text-[#FDFCFB] text-xs border border-[#1C1C1C]">
                  <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-wider flex items-center space-x-1.5 mb-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Petunjuk Eksekusi Penjahit:</span>
                  </span>
                  <p className="leading-relaxed text-stone-300 text-xs">{selectedSymbol.exampleTip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MODUL PEMBELAJARAN STRUKTUR POLA */}
      <section className="space-y-6">
        <div className="border-b border-[#EAE8E3] pb-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] font-semibold">
              BAGIAN 03
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#1C1C1C]">
              Kurikulum Tata Busana: 5 Modul Teori Pola
            </h2>
          </div>
          <p className="text-xs text-[#666666] font-mono uppercase tracking-wider">
            Sistem Konstruksi Pola Dasar Soen & Porrie
          </p>
        </div>

        {/* Lesson Module Tabs */}
        <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
          {PATTERN_LESSONS.map((lesson, idx) => {
            const isCurrent = lesson.id === activeLessonId;
            return (
              <button
                key={lesson.id}
                onClick={() => setActiveLessonId(lesson.id)}
                className={`px-4 py-3 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all border ${
                  isCurrent
                    ? "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C] font-bold"
                    : "bg-[#FFFFFF] text-[#666666] border-[#E0DED7] hover:border-[#1C1C1C] hover:text-[#1C1C1C]"
                }`}
              >
                <span className="text-[#D4AF37] mr-1.5">0{idx + 1}.</span>
                <span>{lesson.title.split(":")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Lesson Content Reader */}
        <div className="bg-[#FFFFFF] border border-[#EAE8E3] p-8 sm:p-12 shadow-xs">
          <div className="border-b border-[#EAE8E3] pb-6 mb-8">
            <div className="flex items-center space-x-4 text-xs font-mono text-[#666666] mb-3">
              <span className="px-2.5 py-0.5 bg-[#F4F1EA] text-[#1C1C1C] border border-[#E0DED7] font-semibold text-[10px] uppercase tracking-wider">
                Tingkat: {activeLesson.level}
              </span>
              <span>•</span>
              <span className="text-[11px] uppercase tracking-wider">Durasi Baca: {activeLesson.readTime}</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#1C1C1C]">
              {activeLesson.title}
            </h3>
            <p className="text-sm text-[#555555] mt-2 font-light max-w-3xl">
              {activeLesson.subtitle}
            </p>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-6 bg-[#FAF8F3] border border-[#E8E2D5] mb-8">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#1C1C1C] font-bold mb-3 flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Kompetensi Utama yang Dikuasai:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#333333]">
              {activeLesson.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-[#2D2D2D] text-sm">
            {activeLesson.contentSections.map((sec, idx) => (
              <div key={idx} className="space-y-3 pb-6 border-b border-[#F0EFEB] last:border-b-0">
                <div className="flex items-center space-x-2">
                  <span className="font-serif italic text-[#D4AF37] font-bold text-lg">0{idx + 1}.</span>
                  <h4 className="text-lg font-serif font-bold text-[#1C1C1C]">
                    {sec.heading}
                  </h4>
                </div>
                <p className="text-[#444444] leading-relaxed text-sm">
                  {sec.explanation}
                </p>

                {sec.subpoints && (
                  <ul className="space-y-2 pl-4 list-disc text-xs text-[#555555] my-3 leading-relaxed">
                    {sec.subpoints.map((sub, sIdx) => (
                      <li key={sIdx}>{sub}</li>
                    ))}
                  </ul>
                )}

                {sec.practicalExercise && (
                  <div className="p-4 bg-[#F4F1EA] border border-[#E0DED7] text-xs text-[#1C1C1C] mt-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888] block mb-1">
                      🎯 Studi Kasus & Latihan Mandiri:
                    </span>
                    <p className="leading-relaxed">{sec.practicalExercise}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

