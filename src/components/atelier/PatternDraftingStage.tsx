import React, { useState } from "react";
import { GarmentSimulationConfig, GarmentModelType } from "../../types";
import { sewingAudio } from "../../utils/sewingAudio";
import { 
  Compass, 
  Ruler, 
  ChevronRight, 
  Check, 
  Sliders, 
  Info, 
  FileText, 
  Layers, 
  Maximize2, 
  Scissors, 
  RotateCcw,
  Sparkles
} from "lucide-react";

export const GARMENT_MODELS: {
  id: GarmentModelType;
  name: string;
  category: "Dress" | "Blouse" | "Kemeja" | "Rok" | "Couture" | "Modest";
  description: string;
  difficulty: "Pemula" | "Menengah" | "Mahir";
  defaultMeasurements: {
    bust: number;
    waist: number;
    hip: number;
    garmentLength: number;
    sleeveLength: number;
    shoulderWidth: number;
  };
  defaultCollar: "shanghai" | "peter-pan" | "shirt-collar" | "v-neck" | "round-neck";
  defaultSleeve: "long-straight" | "puff-sleeve" | "short-sleeve" | "sleeveless";
  defaultDart: "side-bust" | "waist-darts" | "princess-line";
  recommendedFabric: string;
  easeRecommendation: string;
}[] = [
  {
    id: "dress-aline",
    name: "Gaun A-Line Klasik",
    category: "Dress",
    description: "Siluet feminin yang melebar lembut dari pinggang ke kelim bawah, dilengkapi kupnat dada presisi.",
    difficulty: "Pemula",
    defaultMeasurements: { bust: 92, waist: 72, hip: 96, garmentLength: 105, sleeveLength: 45, shoulderWidth: 38 },
    defaultCollar: "round-neck",
    defaultSleeve: "short-sleeve",
    defaultDart: "side-bust",
    recommendedFabric: "Katun Poplin Jepang",
    easeRecommendation: "+4 cm (Standar Pas Badan)"
  },
  {
    id: "blouse-peplum",
    name: "Blouse Peplum Romantis",
    category: "Blouse",
    description: "Atasan pas badan dengan potongan flare mekar di pinggang dan kerah rebah Peter Pan.",
    difficulty: "Menengah",
    defaultMeasurements: { bust: 88, waist: 68, hip: 94, garmentLength: 62, sleeveLength: 55, shoulderWidth: 37 },
    defaultCollar: "peter-pan",
    defaultSleeve: "puff-sleeve",
    defaultDart: "waist-darts",
    recommendedFabric: "Sutra Satin Silk",
    easeRecommendation: "+3 cm (Fitted Couture)"
  },
  {
    id: "kemeja-casual",
    name: "Kemeja Kerah Daun & Manset",
    category: "Kemeja",
    description: "Kemeja berstruktur dengan penutup kancing depan, kerah berkaki, saku tempel, dan manset.",
    difficulty: "Menengah",
    defaultMeasurements: { bust: 96, waist: 80, hip: 100, garmentLength: 70, sleeveLength: 58, shoulderWidth: 40 },
    defaultCollar: "shirt-collar",
    defaultSleeve: "long-straight",
    defaultDart: "side-bust",
    recommendedFabric: "Linen Slub Organik",
    easeRecommendation: "+6 cm (Kasual Rileks)"
  },
  {
    id: "rok-lingkar",
    name: "Rok Setengah Lingkar Midi",
    category: "Rok",
    description: "Rok dengan draperi jatuh mempesona, ban pinggang fitted dan ritsleting jepang rapi.",
    difficulty: "Pemula",
    defaultMeasurements: { bust: 90, waist: 70, hip: 98, garmentLength: 75, sleeveLength: 0, shoulderWidth: 38 },
    defaultCollar: "round-neck",
    defaultSleeve: "sleeveless",
    defaultDart: "waist-darts",
    recommendedFabric: "Rayon Viscose Twill",
    easeRecommendation: "+1 cm pada Ban Pinggang"
  },
  {
    id: "gaun-malam",
    name: "Gaun Malam Siluet Mermaid",
    category: "Couture",
    description: "Gaun adibusana pas badan dengan garis potongan princess seam dan ekor dramatis.",
    difficulty: "Mahir",
    defaultMeasurements: { bust: 90, waist: 66, hip: 95, garmentLength: 135, sleeveLength: 0, shoulderWidth: 36 },
    defaultCollar: "v-neck",
    defaultSleeve: "sleeveless",
    defaultDart: "princess-line",
    recommendedFabric: "Satin Silk & Brokat",
    easeRecommendation: "+2 cm (Couture Bodycon)"
  },
  {
    id: "tunik-modest",
    name: "Tunik Modest Syar'i",
    category: "Modest",
    description: "Busana longgar nyaman dengan kerah shanghai elegan, belahan samping, dan lengan wudhu-friendly.",
    difficulty: "Pemula",
    defaultMeasurements: { bust: 100, waist: 84, hip: 106, garmentLength: 95, sleeveLength: 56, shoulderWidth: 41 },
    defaultCollar: "shanghai",
    defaultSleeve: "long-straight",
    defaultDart: "side-bust",
    recommendedFabric: "Katun Linen Premium",
    easeRecommendation: "+8 cm (Longgar Nyaman)"
  }
];

interface PatternDraftingStageProps {
  config: GarmentSimulationConfig;
  setConfig: React.Dispatch<React.SetStateAction<GarmentSimulationConfig>>;
  onProceedNext: () => void;
}

export const PatternDraftingStage: React.FC<PatternDraftingStageProps> = ({
  config,
  setConfig,
  onProceedNext,
}) => {
  const [activeTab, setActiveTab] = useState<"catalog" | "measurements" | "blueprint">("catalog");
  const [easeAllowance, setEaseAllowance] = useState<number>(4); // in cm
  const [showPatternGuide, setShowPatternGuide] = useState<boolean>(false);
  const [interactiveLandmark, setInteractiveLandmark] = useState<string | null>("bust");

  // Handle Model Change
  const handleSelectModel = (model: typeof GARMENT_MODELS[0]) => {
    sewingAudio.playTapeSnap();
    setConfig(prev => ({
      ...prev,
      modelId: model.id,
      modelName: model.name,
      category: model.category,
      measurements: { ...model.defaultMeasurements },
      collarStyle: model.defaultCollar,
      sleeveStyle: model.defaultSleeve,
      dartStyle: model.defaultDart,
      isPatternCut: false,
      sewnParts: []
    }));
  };

  // Measurement change with sound
  const handleMeasurementChange = (key: keyof typeof config.measurements, val: number) => {
    sewingAudio.playTapeSnap();
    setConfig(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [key]: val
      }
    }));
  };

  // Calculated Pattern Formulas (Soen Method standard 1/4 body)
  const quarterBust = ((config.measurements.bust + easeAllowance) / 4).toFixed(1);
  const quarterWaist = ((config.measurements.waist + easeAllowance) / 4 + 3).toFixed(1); // +3cm for dart
  const quarterHip = ((config.measurements.hip + easeAllowance) / 4).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        {[
          { id: "catalog", label: "1. Pilih Model Pola", icon: <Layers className="w-3.5 h-3.5" /> },
          { id: "measurements", label: "2. Sesuaikan Ukuran & Kupnat", icon: <Ruler className="w-3.5 h-3.5" /> },
          { id: "blueprint", label: "3. Lembar Kerja Blueprint 2D", icon: <Compass className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sewingAudio.playTapeSnap();
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2 transition-all ${
              activeTab === tab.id
                ? "bg-[#1C1C1C] text-[#D4AF37] shadow-sm border border-[#D4AF37]/40"
                : "bg-white dark:bg-[#161922] text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-stone-400"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ================= TAB 1: MODEL CATALOG ================= */}
      {activeTab === "catalog" && (
        <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                KATALOG SILUET ATELIER • 6 MODEL UTAMA
              </span>
              <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white mt-0.5">
                Pilih Siluet Konstruksi Pakaian
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-400">
              Setiap model memiliki diagram arsitektur pola dan perhitungan kupnat tersendiri
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GARMENT_MODELS.map((model) => {
              const isSelected = config.modelId === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => handleSelectModel(model)}
                  className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between relative group ${
                    isSelected
                      ? "border-[#D4AF37] bg-[#FAF8F3] dark:bg-[#1F2433] shadow-lg scale-[1.02]"
                      : "border-stone-200 dark:border-stone-800 bg-white dark:bg-[#11141C] hover:border-stone-400 dark:hover:border-stone-700"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#D4AF37] text-[#1C1C1C] flex items-center justify-center shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold">
                        {model.category}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        Tingkat: {model.difficulty}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                      {model.name}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {model.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200/70 dark:border-stone-800 space-y-1.5 text-[11px] font-mono text-stone-500">
                    <div className="flex justify-between">
                      <span>Bahan Anjuran:</span>
                      <strong className="text-stone-800 dark:text-stone-200">{model.recommendedFabric}</strong>
                    </div>
                    <div className="flex justify-between text-[#D4AF37] font-bold">
                      <span>Toleransi:</span>
                      <span>{model.easeRecommendation}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => {
                sewingAudio.playTapeSnap();
                setActiveTab("measurements");
              }}
              className="px-6 py-3 rounded-xl bg-[#1C1C1C] text-[#D4AF37] font-serif font-bold text-sm hover:bg-[#2C2C2C] flex items-center space-x-2 border border-[#D4AF37]/30 transition-all shadow-md"
            >
              <span>Lanjut Sesuaikan Ukuran Pola</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 2: MEASUREMENTS & DART TUNING ================= */}
      {activeTab === "measurements" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Sliders & Anatomy Controls */}
          <div className="lg:col-span-6 bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                  PARAMETER UKURAN TUBUH (CM)
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white mt-0.5">
                  Konstruksi Ukuran & Kupnat
                </h3>
              </div>
              <button
                onClick={() => setShowPatternGuide(!showPatternGuide)}
                className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center space-x-1"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Rumus Soen</span>
              </button>
            </div>

            {/* Ease Allowance Selector */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F3] dark:bg-[#11141C] border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-stone-600 dark:text-stone-400 font-bold">Kelonggaran Gerak (Ease Allowance):</span>
                <span className="text-[#D4AF37] font-bold">+{easeAllowance} cm</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                {[
                  { val: 2, label: "Fitted (+2cm)", desc: "Bodycon" },
                  { val: 4, label: "Standar (+4cm)", desc: "Formal/Kerja" },
                  { val: 8, label: "Loose (+8cm)", desc: "Oversized/Syar'i" }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => {
                      sewingAudio.playTapeSnap();
                      setEaseAllowance(item.val);
                    }}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      easeAllowance === item.val
                        ? "bg-[#1C1C1C] text-[#D4AF37] border-[#1C1C1C] font-bold shadow-xs"
                        : "bg-white dark:bg-[#161922] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800"
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className="text-[9px] opacity-70">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              {/* Bust */}
              <div 
                onMouseEnter={() => setInteractiveLandmark("bust")}
                className="p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
              >
                <div className="flex justify-between text-xs font-mono mb-1 text-stone-700 dark:text-stone-300">
                  <span className="flex items-center space-x-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block"></span>
                    <span>Lingkar Dada (Bust):</span>
                  </span>
                  <div className="text-stone-900 dark:text-white font-bold">
                    {config.measurements.bust} cm <span className="text-[10px] text-stone-400">→ ¼ = {quarterBust} cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="78"
                  max="125"
                  value={config.measurements.bust}
                  onChange={(e) => handleMeasurementChange("bust", parseInt(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              {/* Waist */}
              <div 
                onMouseEnter={() => setInteractiveLandmark("waist")}
                className="p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
              >
                <div className="flex justify-between text-xs font-mono mb-1 text-stone-700 dark:text-stone-300">
                  <span className="flex items-center space-x-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                    <span>Lingkar Pinggang (Waist):</span>
                  </span>
                  <div className="text-stone-900 dark:text-white font-bold">
                    {config.measurements.waist} cm <span className="text-[10px] text-stone-400">→ ¼+kupnat = {quarterWaist} cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="58"
                  max="110"
                  value={config.measurements.waist}
                  onChange={(e) => handleMeasurementChange("waist", parseInt(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              {/* Hip */}
              <div 
                onMouseEnter={() => setInteractiveLandmark("hip")}
                className="p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
              >
                <div className="flex justify-between text-xs font-mono mb-1 text-stone-700 dark:text-stone-300">
                  <span className="flex items-center space-x-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    <span>Lingkar Panggul (Hip):</span>
                  </span>
                  <div className="text-stone-900 dark:text-white font-bold">
                    {config.measurements.hip} cm <span className="text-[10px] text-stone-400">→ ¼ = {quarterHip} cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="82"
                  max="135"
                  value={config.measurements.hip}
                  onChange={(e) => handleMeasurementChange("hip", parseInt(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              {/* Length */}
              <div 
                onMouseEnter={() => setInteractiveLandmark("length")}
                className="p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
              >
                <div className="flex justify-between text-xs font-mono mb-1 text-stone-700 dark:text-stone-300">
                  <span className="font-bold">Panjang Busana (Garment Length):</span>
                  <strong className="text-stone-900 dark:text-white font-bold">{config.measurements.garmentLength} cm</strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="145"
                  value={config.measurements.garmentLength}
                  onChange={(e) => handleMeasurementChange("garmentLength", parseInt(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>

              {/* Sleeve Length */}
              <div 
                onMouseEnter={() => setInteractiveLandmark("sleeve")}
                className="p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
              >
                <div className="flex justify-between text-xs font-mono mb-1 text-stone-700 dark:text-stone-300">
                  <span className="font-bold">Panjang Lengan (Sleeve Length):</span>
                  <strong className="text-stone-900 dark:text-white font-bold">{config.measurements.sleeveLength} cm</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="68"
                  value={config.measurements.sleeveLength}
                  onChange={(e) => handleMeasurementChange("sleeveLength", parseInt(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>
            </div>

            {/* Collar & Dart Customizer */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-1.5 font-bold">
                  Bentuk Kerah (Neckline):
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-xs font-mono">
                  {[
                    { id: "round-neck", label: "Bulat" },
                    { id: "v-neck", label: "V-Neck" },
                    { id: "shanghai", label: "Shanghai" },
                    { id: "peter-pan", label: "Peter Pan" },
                    { id: "shirt-collar", label: "Kemeja" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        sewingAudio.playTapeSnap();
                        setConfig(prev => ({ ...prev, collarStyle: c.id as any }));
                      }}
                      className={`p-2 rounded-xl border transition-all text-center ${
                        config.collarStyle === c.id
                          ? "bg-[#1C1C1C] text-[#D4AF37] border-[#1C1C1C] font-bold"
                          : "bg-white dark:bg-[#11141C] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-1.5 font-bold">
                  Sistem Kupnat (Dart Manipulation):
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {[
                    { id: "side-bust", label: "Kupnat Sisi Dada", tip: "Klasik Dada" },
                    { id: "waist-darts", label: "Kupnat Pinggang", tip: "Fitted Badan" },
                    { id: "princess-line", label: "Princess Seam", tip: "Adibusana Couture" },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        sewingAudio.playTapeSnap();
                        setConfig(prev => ({ ...prev, dartStyle: d.id as any }));
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        config.dartStyle === d.id
                          ? "bg-[#1C1C1C] text-[#D4AF37] border-[#1C1C1C] font-bold"
                          : "bg-white dark:bg-[#11141C] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800"
                      }`}
                    >
                      <div>{d.label}</div>
                      <div className="text-[9px] opacity-70 mt-0.5">{d.tip}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => {
                  sewingAudio.playTapeSnap();
                  setActiveTab("blueprint");
                }}
                className="flex-1 py-3.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-mono font-bold text-xs hover:bg-stone-200 dark:hover:bg-stone-700 transition-all flex items-center justify-center space-x-2"
              >
                <Compass className="w-4 h-4" />
                <span>Lihat Blueprint Lengkap</span>
              </button>

              <button
                onClick={onProceedNext}
                className="flex-1 py-3.5 rounded-xl bg-[#1C1C1C] text-[#D4AF37] font-serif font-bold text-sm hover:bg-[#2C2C2C] transition-all flex items-center justify-center space-x-2 border border-[#D4AF37]/30 shadow-md"
              >
                <span>Lanjut ke Kain & Potong</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel: Interactive Visual Mannequin Landmarks */}
          <div className="lg:col-span-6 bg-[#141824] text-white rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <h4 className="font-serif font-bold text-base text-white">
                    Visualisasi Titik Ukur Anatomi Tubuh
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                  Skala Real-Time
                </span>
              </div>

              {/* Anatomy Diagram SVG */}
              <div className="bg-[#0D1017] rounded-2xl p-6 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[360px]">
                <svg viewBox="0 0 320 400" className="w-full max-w-xs h-auto relative z-10">
                  {/* Mannequin Silhouette Body */}
                  <path
                    d="M 160 30 Q 145 30 140 45 L 120 70 L 105 85 L 115 140 Q 110 180 120 230 L 100 370 L 220 370 L 200 230 Q 210 180 205 140 L 215 85 L 200 70 L 180 45 Q 175 30 160 30 Z"
                    fill="#1F2433"
                    stroke="#334155"
                    strokeWidth="2"
                  />

                  {/* Neck Landmark */}
                  <ellipse cx="160" cy="45" rx="20" ry="8" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 2" />

                  {/* Bust Line */}
                  <g className={`transition-all duration-300 ${interactiveLandmark === "bust" ? "opacity-100" : "opacity-70"}`}>
                    <line x1="80" y1="130" x2="240" y2="130" stroke="#06b6d4" strokeWidth={interactiveLandmark === "bust" ? "3" : "1.5"} />
                    <circle cx="160" cy="130" r="4" fill="#06b6d4" />
                    <circle cx="130" cy="135" r="3" fill="#ef4444" />
                    <circle cx="190" cy="135" r="3" fill="#ef4444" />
                    <text x="245" y="134" fill="#06b6d4" fontSize="10" fontFamily="monospace" fontWeight="bold">Dada: {config.measurements.bust}cm</text>
                  </g>

                  {/* Waist Line */}
                  <g className={`transition-all duration-300 ${interactiveLandmark === "waist" ? "opacity-100" : "opacity-70"}`}>
                    <line x1="95" y1="210" x2="225" y2="210" stroke="#f59e0b" strokeWidth={interactiveLandmark === "waist" ? "3" : "1.5"} />
                    <circle cx="160" cy="210" r="4" fill="#f59e0b" />
                    <text x="230" y="214" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">Pinggang: {config.measurements.waist}cm</text>
                  </g>

                  {/* Hip Line */}
                  <g className={`transition-all duration-300 ${interactiveLandmark === "hip" ? "opacity-100" : "opacity-70"}`}>
                    <line x1="90" y1="270" x2="230" y2="270" stroke="#10b981" strokeWidth={interactiveLandmark === "hip" ? "3" : "1.5"} />
                    <circle cx="160" cy="270" r="4" fill="#10b981" />
                    <text x="235" y="274" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">Panggul: {config.measurements.hip}cm</text>
                  </g>

                  {/* Garment Length Arrow */}
                  <line x1="70" y1="70" x2="70" y2="380" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="35" y="220" fill="#c084fc" fontSize="9" fontFamily="monospace" transform="rotate(-90 40 220)">Panjang: {config.measurements.garmentLength}cm</text>
                </svg>
              </div>
            </div>

            {/* Real-time Math Breakdown Box */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2 text-xs font-mono">
              <div className="text-[#D4AF37] font-bold uppercase tracking-wider text-[10px]">
                Formula Pola Dasar (Metode Soen / Porrie)
              </div>
              <div className="grid grid-cols-2 gap-3 text-stone-300">
                <div>• Pola Depan TM: (LD + {easeAllowance})/4 + 1 = <strong>{((config.measurements.bust + easeAllowance)/4 + 1).toFixed(1)} cm</strong></div>
                <div>• Pola Belakang TB: (LD + {easeAllowance})/4 - 1 = <strong>{((config.measurements.bust + easeAllowance)/4 - 1).toFixed(1)} cm</strong></div>
                <div>• Kerung Leher: ⅙ LD + 2.5 = <strong>{((config.measurements.bust)/6 + 2.5).toFixed(1)} cm</strong></div>
                <div>• Kedalaman Kupnat: <strong>3.0 cm (Puncak 2.5 cm sebelum BP)</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: FULL 2D DRAFTING BLUEPRINT ================= */}
      {activeTab === "blueprint" && (
        <div className="bg-[#0B0F19] text-white rounded-3xl border border-cyan-900/40 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cyan-900/50 pb-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-800">
                <Compass className="w-3.5 h-3.5" />
                <span>LEMBAR KERJA BLUEPRINT POLA JAHIT ATELIER</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                Konstruksi 4 Potongan Pola Utama ({config.modelName})
              </h3>
            </div>

            <button
              onClick={onProceedNext}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#b8952b] text-[#1C1C1C] font-mono font-bold text-xs flex items-center space-x-2 transition-all shadow-md shrink-0"
            >
              <span>Setujui Pola & Lanjut ke Meja Potong</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Blueprint Vector Drawing */}
          <div className="bg-[#06090F] rounded-2xl p-6 border border-cyan-500/30 relative overflow-hidden">
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
                backgroundSize: "25px 25px"
              }}
            />

            <svg viewBox="0 0 800 420" className="w-full h-auto relative z-10">
              {/* TM Front Piece */}
              <g transform="translate(50, 40)">
                <path
                  d="M 60 20 Q 100 20 120 40 L 180 60 L 160 140 Q 180 200 170 280 L 230 380 L 50 380 Z"
                  fill="rgba(6, 182, 212, 0.12)"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                />
                {/* Seam Allowance dashed line */}
                <path
                  d="M 60 10 Q 105 10 125 30 L 190 52 L 172 138 Q 192 200 182 280 L 245 390 L 40 390 Z"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
                {/* Darts */}
                <path d="M 165 170 L 110 185 L 165 200 Z" fill="rgba(239, 68, 68, 0.35)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="50" y1="20" x2="50" y2="380" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="8 4" />
                <text x="55" y="200" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">TM (Lipatan Kain)</text>
                <text x="95" y="300" fill="#a5f3fc" fontSize="13" fontFamily="serif" fontWeight="bold">Badan Depan (x1)</text>
                {/* Grainline */}
                <line x1="110" y1="90" x2="110" y2="240" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="106,100 110,85 114,100" fill="#38bdf8" />
                <polygon points="106,230 110,245 114,230" fill="#38bdf8" />
              </g>

              {/* TB Back Piece */}
              <g transform="translate(320, 40)">
                <path
                  d="M 60 30 Q 100 30 120 45 L 180 60 L 160 140 Q 175 200 165 280 L 220 380 L 50 380 Z"
                  fill="rgba(99, 102, 241, 0.12)"
                  stroke="#818cf8"
                  strokeWidth="2.5"
                />
                {/* Back Dart */}
                <path d="M 110 180 L 122 280 L 134 180 Z" fill="rgba(239, 68, 68, 0.35)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1="50" y1="30" x2="50" y2="380" stroke="#60a5fa" strokeWidth="2.5" />
                <text x="55" y="200" fill="#60a5fa" fontSize="11" fontFamily="monospace" fontWeight="bold">TB (Pasang Zipper)</text>
                <text x="95" y="320" fill="#c7d2fe" fontSize="13" fontFamily="serif" fontWeight="bold">Badan Belakang (x2)</text>
              </g>

              {/* Sleeve Pattern */}
              <g transform="translate(580, 50)">
                <path
                  d="M 30 330 L 15 120 Q 80 10 145 120 L 130 330 Z"
                  fill="rgba(245, 158, 11, 0.12)"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />
                <text x="45" y="200" fill="#fcd34d" fontSize="12" fontFamily="serif" fontWeight="bold">Lengan (x2)</text>
                <line x1="80" y1="60" x2="80" y2="290" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
              </g>

              {/* Collar + Interfacing */}
              <g transform="translate(570, 320)">
                <path
                  d="M 10 10 Q 75 45 140 10 L 140 40 Q 75 75 10 40 Z"
                  fill="rgba(16, 185, 129, 0.18)"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <text x="35" y="36" fill="#6ee7b7" fontSize="11" fontFamily="monospace">Kerah + Viselin (x2)</text>
              </g>
            </svg>
          </div>

          {/* Pattern Spec Sheet Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-stone-300">
              <thead className="bg-white/10 text-[#D4AF37] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Nama Potongan</th>
                  <th className="p-3">Jumlah Potong</th>
                  <th className="p-3">Arah Serat (Grain)</th>
                  <th className="p-3">Kampuh Jahit</th>
                  <th className="p-3">Keterangan Khusus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="p-3 font-bold text-white">Badan Depan (TM)</td>
                  <td className="p-3">1 Lembar (Lipatan)</td>
                  <td className="p-3 text-cyan-300">Tegak Lurus TM</td>
                  <td className="p-3">1.5 cm keliling, 3 cm kelim</td>
                  <td className="p-3">Kupnat dada 2.5 cm sebelum BP</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Badan Belakang (TB)</td>
                  <td className="p-3">2 Lembar (Kanan-Kiri)</td>
                  <td className="p-3 text-cyan-300">Tegak Lurus TB</td>
                  <td className="p-3">2.0 cm (Zipper), 1.5 cm sisi</td>
                  <td className="p-3">Bukaan ritsleting jepang 50 cm</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Lengan Kanan & Kiri</td>
                  <td className="p-3">2 Lembar Sepasang</td>
                  <td className="p-3 text-amber-300">Tengah Puncak Lengan</td>
                  <td className="p-3">1.5 cm kerung, 2.5 cm manset</td>
                  <td className="p-3">2 baris setik kerut puncak lengan</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Daun Kerah + Lapisan</td>
                  <td className="p-3">2 Kain + 2 Viselin</td>
                  <td className="p-3 text-emerald-300">Lipatan Serat Memanjang</td>
                  <td className="p-3">1.0 cm keliling</td>
                  <td className="p-3">Press kain keras dengan setrika uap</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
