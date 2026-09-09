import React, { useState } from "react";
import { GarmentSimulationConfig } from "../../types";
import { sewingAudio } from "../../utils/sewingAudio";
import { 
  Scissors, 
  Layers, 
  Sparkles, 
  Palette, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Info, 
  RotateCcw, 
  Eye,
  Activity,
  CheckSquare,
  Flame
} from "lucide-react";

export const FABRICS = [
  {
    id: "cotton-poplin",
    name: "Katun Poplin Jepang",
    gsm: "135 GSM",
    drape: "Jatuh Sedang, Ringan & Dingin",
    weave: "Plain Weave 100% Katun Sisir",
    texture: "smooth-cotton" as const,
    recommendedFor: "Kemeja, Gamis, Blouse Sehari-hari",
    colors: ["#1C1C1C", "#1E3A8A", "#064E3B", "#881337", "#D4AF37", "#9A3412", "#FDFCFB", "#475569"]
  },
  {
    id: "satin-silk",
    name: "Sutra Satin Silk Premium",
    gsm: "110 GSM",
    drape: "Sangat Mewah, Mengkilap & Flowy",
    weave: "Satin Filament Weave",
    texture: "shiny-silk" as const,
    recommendedFor: "Gaun Pesta, Blouse Satin, Rok Mewah",
    colors: ["#0F172A", "#831843", "#701A75", "#065F46", "#C2410C", "#D4AF37", "#FDFCFB", "#312E81"]
  },
  {
    id: "linen-organic",
    name: "Linen Slub Organik",
    gsm: "185 GSM",
    drape: "Bertekstur Natural, Breathable & Kokoh",
    weave: "Slub Flax Weave",
    texture: "rustic-linen" as const,
    recommendedFor: "Outer Kasual, Tunik, Kemeja Vintage",
    colors: ["#3F2E23", "#9C4124", "#4A5D4E", "#2B3A42", "#D4AF37", "#EFEBE2", "#1C1C1C", "#78350F"]
  },
  {
    id: "brocade-lace",
    name: "Brokat Renda Chantilly",
    gsm: "160 GSM",
    drape: "Mewah Berongga, Motif Floral Indah",
    weave: "Jacquard Lace Corded",
    texture: "floral-lace" as const,
    recommendedFor: "Kebaya Modern, Aksen Gaun Pengantin",
    colors: ["#1C1C1C", "#831843", "#047857", "#1D4ED8", "#B45309", "#FDFCFB", "#581C87", "#475569"]
  },
  {
    id: "rayon-viscose",
    name: "Rayon Viscose Twill",
    gsm: "140 GSM",
    drape: "Super Jatuh, Sangat Lembut & Adem",
    weave: "Twill Diagonal Soft Weave",
    texture: "flowy-rayon" as const,
    recommendedFor: "Homewear Elegan, Gamis Flowy, Rok A-Line",
    colors: ["#0F172A", "#15803D", "#B91C1C", "#6D28D9", "#C2410C", "#0284C7", "#D4AF37", "#F8FAFC"]
  },
  {
    id: "denim-chambray",
    name: "Denim Chambray 8oz",
    gsm: "220 GSM",
    drape: "Kokoh Berstruktur, Kasual Modis",
    weave: "Indigo Warp White Weft",
    texture: "matte-denim" as const,
    recommendedFor: "Kemeja Kasual, Rok Denim, Jaket Ringan",
    colors: ["#1E293B", "#1E3A8A", "#3B82F6", "#64748B", "#0F172A", "#334155", "#94A3B8", "#1C1C1C"]
  }
];

export const PATTERN_PRINTS = [
  { id: "solid", label: "Polos (Solid Luxury)", desc: "Warna pekat polos elegan" },
  { id: "pinstripe", label: "Garis Pinstripe", desc: "Aksen vertikal memanjangkan siluet" },
  { id: "floral", label: "Floral Romantis", desc: "Motif bunga adibusana klasik" },
  { id: "polkadot", label: "Polkadot Retro", desc: "Aksen bintik klasik vintage" },
  { id: "batik-kawung", label: "Batik Kawung", desc: "Motif geometris kearifan nusantara" },
  { id: "houndstooth", label: "Houndstooth", desc: "Kotak catur couture Paris" },
];

interface FabricCuttingStageProps {
  config: GarmentSimulationConfig;
  setConfig: React.Dispatch<React.SetStateAction<GarmentSimulationConfig>>;
  onProceedNext: () => void;
  onBack: () => void;
}

export const FabricCuttingStage: React.FC<FabricCuttingStageProps> = ({
  config,
  setConfig,
  onProceedNext,
  onBack,
}) => {
  const [cuttingProgress, setCuttingProgress] = useState<number>(config.isPatternCut ? 100 : 0);
  const [isCutting, setIsCutting] = useState<boolean>(false);
  const [chalkDrawn, setChalkDrawn] = useState<boolean>(false);
  const [pinnedCount, setPinnedCount] = useState<number>(0);
  const [seamAllowance, setSeamAllowance] = useState<number>(1.5); // cm
  const [selectedPrint, setSelectedPrint] = useState<string>("solid");

  const currentFabricObj = FABRICS.find(f => f.id === config.fabricId) || FABRICS[0];

  // Handle Fabric Selection
  const handleSelectFabric = (fab: typeof FABRICS[0]) => {
    sewingAudio.playTapeSnap();
    setConfig(prev => ({
      ...prev,
      fabricId: fab.id,
      fabricName: fab.name,
      fabricTexture: fab.texture,
      fabricColor: fab.colors[0],
      isPatternCut: false
    }));
    setCuttingProgress(0);
    setChalkDrawn(false);
    setPinnedCount(0);
  };

  // Chalking action
  const handleChalk = () => {
    sewingAudio.playTapeSnap();
    setChalkDrawn(true);
  };

  // Pinning action
  const handlePin = () => {
    sewingAudio.playTapeSnap();
    setPinnedCount(prev => Math.min(prev + 4, 12));
  };

  // Step-by-step Interactive Cutting
  const handleCutStep = () => {
    sewingAudio.playScissorsSnip();
    setCuttingProgress(prev => {
      const next = Math.min(prev + 20, 100);
      if (next >= 100) {
        sewingAudio.playSuccessChime();
        setConfig(c => ({ ...c, isPatternCut: true }));
      }
      return next;
    });
  };

  // Auto Cut with Animation
  const handleAutoCut = () => {
    if (isCutting) return;
    setIsCutting(true);
    let cur = cuttingProgress;
    const interval = setInterval(() => {
      cur += 15;
      sewingAudio.playScissorsSnip();
      if (cur >= 100) {
        cur = 100;
        clearInterval(interval);
        setIsCutting(false);
        sewingAudio.playSuccessChime();
        setConfig(c => ({ ...c, isPatternCut: true }));
      }
      setCuttingProgress(cur);
    }, 280);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-1 font-bold">
            <Scissors className="w-3.5 h-3.5" />
            <span>TAHAP 2: MEJA POTONG & TEKSTUR KAIN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white">
            Pemilihan Kain, Penataan Pola & Pemotongan Presisi
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Tentukan karakteristik bahan tekstil, beri tanda kapur kampuh jahit, tancapkan jarum pentul, dan potong kain mengikuti arah serat memanjang (*warp*).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-mono font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition-all flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Pola</span>
          </button>

          <button
            onClick={onProceedNext}
            disabled={!config.isPatternCut && cuttingProgress < 100}
            className={`px-6 py-2.5 rounded-xl font-serif font-bold text-xs flex items-center space-x-2 transition-all shadow-md ${
              config.isPatternCut || cuttingProgress >= 100
                ? "bg-[#1C1C1C] text-[#D4AF37] hover:bg-[#2C2C2C] border border-[#D4AF37]/30"
                : "bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed"
            }`}
          >
            <span>Lanjut ke Mesin Jahit</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Fabrics & Color Selector */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fabric Collection Cards */}
          <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 font-bold flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>PILIH MATERIAL TEKSTIL (6 KAIN)</span>
              </h3>
              <span className="text-[10px] font-mono text-stone-400">{currentFabricObj.gsm}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {FABRICS.map((fab) => {
                const isSelected = config.fabricId === fab.id;
                return (
                  <button
                    key={fab.id}
                    onClick={() => handleSelectFabric(fab)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? "bg-[#FAF8F3] dark:bg-[#1F2433] border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]"
                        : "bg-white dark:bg-[#11141C] border-stone-200 dark:border-stone-800 hover:border-stone-400"
                    }`}
                  >
                    <div className="text-xs font-serif font-bold text-stone-900 dark:text-white">
                      {fab.name}
                    </div>
                    <div className="text-[10px] font-mono text-stone-500 mt-1 line-clamp-1">
                      {fab.drape}
                    </div>
                    <div className="text-[9px] font-mono text-[#D4AF37] mt-1 font-semibold">
                      {fab.gsm}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fabric Specs Info */}
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#11141C] border border-stone-200 dark:border-stone-800 space-y-1 text-xs font-mono text-stone-600 dark:text-stone-300">
              <div className="flex justify-between">
                <span>Anyaman:</span>
                <strong className="text-stone-900 dark:text-white">{currentFabricObj.weave}</strong>
              </div>
              <div className="flex justify-between">
                <span>Rekomendasi:</span>
                <span className="text-[#D4AF37]">{currentFabricObj.recommendedFor}</span>
              </div>
            </div>
          </div>

          {/* Color & Motif Customizer */}
          <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-5">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 font-bold flex items-center space-x-2">
                <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>PALET WARNA & MOTIF ADIBUSANA</span>
              </h3>
            </div>

            {/* Swatches */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">
                Pilih Warna Dasar Kain:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {currentFabricObj.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      sewingAudio.playTapeSnap();
                      setConfig(prev => ({ ...prev, fabricColor: c }));
                    }}
                    className={`w-9 h-9 rounded-full border-2 transition-all transform hover:scale-110 shadow-xs relative ${
                      config.fabricColor === c ? "border-[#D4AF37] scale-110 ring-2 ring-[#D4AF37]/50" : "border-stone-300 dark:border-stone-700"
                    }`}
                    style={{ backgroundColor: c }}
                  >
                    {config.fabricColor === c && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white drop-shadow">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Motif / Prints */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block">
                Pilih Corak / Motif Kain:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PATTERN_PRINTS.map((pr) => (
                  <button
                    key={pr.id}
                    onClick={() => {
                      sewingAudio.playTapeSnap();
                      setSelectedPrint(pr.id);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all text-xs font-mono ${
                      selectedPrint === pr.id
                        ? "bg-[#1C1C1C] text-[#D4AF37] border-[#1C1C1C] font-bold shadow-xs"
                        : "bg-white dark:bg-[#11141C] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800"
                    }`}
                  >
                    <div className="font-bold">{pr.label}</div>
                    <div className="text-[9px] opacity-70 mt-0.5">{pr.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Seam Allowance Setting */}
            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-stone-500 font-bold">Kampuh Jahit (Seam Allowance):</span>
                <span className="text-[#D4AF37] font-bold">{seamAllowance} cm</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1.0, 1.5, 2.0].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      sewingAudio.playTapeSnap();
                      setSeamAllowance(val);
                    }}
                    className={`py-1.5 rounded-lg border text-xs font-mono text-center ${
                      seamAllowance === val
                        ? "bg-stone-900 text-white font-bold border-stone-900"
                        : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400"
                    }`}
                  >
                    {val} cm
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: The Cutting Table Studio */}
        <div className="lg:col-span-7 bg-[#10141E] text-white rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>MEJA POTONG ATELIER (CUTTING TABLE 1:1)</span>
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  Simulasi Penataan Pola di Atas Kain
                </h3>
              </div>

              {/* Progress pill */}
              <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-[#D4AF37] flex items-center space-x-2">
                <span>Progres Potong:</span>
                <strong>{cuttingProgress}%</strong>
              </div>
            </div>

            {/* Preparation Actions: Chalk & Pins */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <button
                onClick={handleChalk}
                className={`px-3.5 py-2 rounded-xl border flex items-center space-x-2 transition-all ${
                  chalkDrawn 
                    ? "bg-amber-950/80 border-amber-500 text-amber-300 font-bold" 
                    : "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10"
                }`}
              >
                <span>✏️</span>
                <span>{chalkDrawn ? "Kapur Kampuh Selesai Digaris" : "1. Beri Tanda Kapur Kampuh"}</span>
              </button>

              <button
                onClick={handlePin}
                className={`px-3.5 py-2 rounded-xl border flex items-center space-x-2 transition-all ${
                  pinnedCount > 0 
                    ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold" 
                    : "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10"
                }`}
              >
                <span>📍</span>
                <span>{pinnedCount > 0 ? `${pinnedCount} Jarum Pentul Terpasang` : "2. Pasang Jarum Pentul"}</span>
              </button>
            </div>

            {/* Interactive Cutting Canvas (Visual Fabric & Patterns Layout) */}
            <div 
              className="rounded-2xl p-6 border border-stone-700 relative overflow-hidden min-h-[340px] shadow-inner transition-all"
              style={{ backgroundColor: config.fabricColor }}
            >
              {/* Texture & Print Overlay */}
              {selectedPrint === "pinstripe" && (
                <div 
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.7) 0, rgba(255,255,255,0.7) 1px, transparent 1px, transparent 18px)`
                  }}
                />
              )}
              {selectedPrint === "polkadot" && (
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 2px, transparent 2px)`,
                    backgroundSize: "20px 20px"
                  }}
                />
              )}
              {selectedPrint === "houndstooth" && (
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%)`,
                    backgroundSize: "14px 14px"
                  }}
                />
              )}

              {/* Fabric Grain Direction Labels */}
              <div className="absolute top-2 left-4 text-[9px] font-mono text-white/60 uppercase tracking-widest flex items-center space-x-1">
                <span>Arah Serat Memanjang (Warp) ➔</span>
              </div>
              <div className="absolute top-2 right-4 text-[9px] font-mono text-amber-300 font-bold">
                Lipatan Kain (Fold Edge)
              </div>

              {/* SVG Pattern Pieces Placed on Fabric */}
              <svg viewBox="0 0 600 300" className="w-full h-auto relative z-10">
                {/* Pattern Piece 1: Badan Depan TM */}
                <g transform="translate(30, 20)">
                  <path
                    d="M 20 20 Q 50 20 70 35 L 110 50 L 95 110 Q 110 150 100 200 L 140 260 L 20 260 Z"
                    fill={cuttingProgress >= 40 ? "rgba(212, 175, 55, 0.4)" : "rgba(255, 255, 255, 0.15)"}
                    stroke={chalkDrawn ? "#f59e0b" : "#ffffff"}
                    strokeWidth="2"
                    strokeDasharray={chalkDrawn ? "none" : "4 2"}
                  />
                  <text x="35" y="140" fill="#ffffff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Badan Depan TM</text>
                  {/* Grainline */}
                  <line x1="60" y1="60" x2="60" y2="220" stroke="#38bdf8" strokeWidth="1.5" />
                  <polygon points="57,70 60,60 63,70" fill="#38bdf8" />
                  <polygon points="57,210 60,220 63,210" fill="#38bdf8" />
                  {/* Pins */}
                  {pinnedCount >= 4 && (
                    <>
                      <circle cx="30" cy="30" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                      <circle cx="105" cy="55" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                      <circle cx="135" cy="255" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                    </>
                  )}
                </g>

                {/* Pattern Piece 2: Badan Belakang TB */}
                <g transform="translate(200, 20)">
                  <path
                    d="M 20 25 Q 50 25 70 40 L 110 50 L 95 110 Q 105 150 100 200 L 135 260 L 20 260 Z"
                    fill={cuttingProgress >= 70 ? "rgba(212, 175, 55, 0.4)" : "rgba(255, 255, 255, 0.15)"}
                    stroke={chalkDrawn ? "#f59e0b" : "#ffffff"}
                    strokeWidth="2"
                    strokeDasharray={chalkDrawn ? "none" : "4 2"}
                  />
                  <text x="35" y="140" fill="#ffffff" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Badan Belakang TB</text>
                  {pinnedCount >= 8 && (
                    <>
                      <circle cx="30" cy="35" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                      <circle cx="130" cy="255" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                    </>
                  )}
                </g>

                {/* Pattern Piece 3: Sleeve */}
                <g transform="translate(370, 30)">
                  <path
                    d="M 20 230 L 10 90 Q 55 10 100 90 L 90 230 Z"
                    fill={cuttingProgress >= 90 ? "rgba(212, 175, 55, 0.4)" : "rgba(255, 255, 255, 0.15)"}
                    stroke={chalkDrawn ? "#f59e0b" : "#ffffff"}
                    strokeWidth="2"
                  />
                  <text x="30" y="140" fill="#ffffff" fontSize="10" fontFamily="sans-serif">Lengan x2</text>
                </g>

                {/* Pattern Piece 4: Collar */}
                <g transform="translate(485, 40)">
                  <path
                    d="M 10 10 Q 50 30 90 10 L 90 40 Q 50 60 10 40 Z"
                    fill={cuttingProgress >= 100 ? "rgba(212, 175, 55, 0.4)" : "rgba(255, 255, 255, 0.15)"}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text x="25" y="32" fill="#ffffff" fontSize="9" fontFamily="sans-serif">Kerah x2</text>
                </g>

                {/* Animated Scissors Cutting Indicator */}
                {isCutting && (
                  <g transform={`translate(${100 + (cuttingProgress * 3.5)}, ${100 + Math.sin(cuttingProgress) * 20})`}>
                    <circle cx="0" cy="0" r="16" fill="rgba(239, 68, 68, 0.3)" className="animate-ping" />
                    <text x="-8" y="6" fontSize="18">✂️</text>
                  </g>
                )}
              </svg>

              {/* Completed Stamp */}
              {cuttingProgress >= 100 && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center">
                  <div className="bg-[#1C1C1C] border-2 border-[#D4AF37] rounded-2xl p-4 text-center shadow-2xl animate-in zoom-in-95">
                    <Check className="w-8 h-8 text-[#D4AF37] mx-auto mb-1 stroke-[3]" />
                    <div className="font-serif font-bold text-base text-white">
                      Semua Potongan Kain Siap Dirakit!
                    </div>
                    <div className="text-[11px] font-mono text-[#D4AF37] mt-0.5">
                      4 Bagian Pola Terpotong Presisi Termasuk Kampuh {seamAllowance} cm
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Cutting Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleCutStep}
                disabled={cuttingProgress >= 100 || isCutting}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-all border border-stone-700"
              >
                <Scissors className="w-4 h-4 text-[#D4AF37]" />
                <span>Potong Bertahap (Klik Gunting)</span>
              </button>

              <button
                onClick={handleAutoCut}
                disabled={cuttingProgress >= 100 || isCutting}
                className="flex-1 py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#b8952b] text-[#1C1C1C] font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isCutting ? "Sedang Memotong..." : "Potong Otomatis Seluruh Pola"}</span>
              </button>
            </div>
          </div>

          {/* Efficiency Report Footer */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-stone-300">
            <div>
              <span>Kebutuhan Bahan: </span>
              <strong className="text-white font-bold">2.15 Meter</strong>
            </div>
            <div>
              <span>Efisiensi Tata Letak: </span>
              <strong className="text-emerald-400 font-bold">88.4% (Limbah Rendah)</strong>
            </div>
            <div>
              <span>Arah Serat: </span>
              <strong className="text-cyan-400 font-bold">Warp Memanjang 100% Presisi</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
