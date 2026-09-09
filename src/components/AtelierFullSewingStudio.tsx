import React, { useState } from "react";
import { 
  GarmentSimulationConfig, 
  GarmentModelType 
} from "../types";
import { useAppTheme } from "../context/ThemeContext";
import { sewingAudio } from "../utils/sewingAudio";
import { PatternDraftingStage, GARMENT_MODELS } from "./atelier/PatternDraftingStage";
import { FabricCuttingStage, FABRICS } from "./atelier/FabricCuttingStage";
import { SewingAssemblyStage, ASSEMBLY_STEPS } from "./atelier/SewingAssemblyStage";
import { MannequinShowcaseStage } from "./atelier/MannequinShowcaseStage";
import { 
  Compass, 
  Scissors, 
  Zap, 
  User, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  Crown
} from "lucide-react";

export const AtelierFullSewingStudio: React.FC = () => {
  const { theme } = useAppTheme();
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(sewingAudio.getIsMuted());

  // Garment Simulation Global State
  const [config, setConfig] = useState<GarmentSimulationConfig>({
    modelId: "dress-aline",
    modelName: "Gaun A-Line Klasik",
    category: "Dress",
    measurements: {
      bust: 92,
      waist: 72,
      hip: 96,
      garmentLength: 105,
      sleeveLength: 45,
      shoulderWidth: 38,
    },
    collarStyle: "round-neck",
    sleeveStyle: "short-sleeve",
    dartStyle: "side-bust",
    fabricId: "cotton-poplin",
    fabricName: "Katun Poplin Jepang",
    fabricTexture: "smooth-cotton",
    fabricColor: "#1E3A8A", // Royal Navy
    seamAllowance: 1.5,
    isPatternCut: false,
    sewnParts: [],
    currentStage: "pattern-design",
    mannequinView: "front",
    activeAssemblyStep: "step1-darts"
  });

  const toggleSound = () => {
    const muted = sewingAudio.toggleMute();
    setIsAudioMuted(muted);
  };

  // Stage Switchers
  const goToStage = (st: GarmentSimulationConfig["currentStage"]) => {
    sewingAudio.playTapeSnap();
    setConfig(prev => ({ ...prev, currentStage: st }));
  };

  const handleRestart = () => {
    sewingAudio.playTapeSnap();
    const defaultModel = GARMENT_MODELS[0];
    setConfig({
      modelId: defaultModel.id,
      modelName: defaultModel.name,
      category: defaultModel.category,
      measurements: { ...defaultModel.defaultMeasurements },
      collarStyle: defaultModel.defaultCollar,
      sleeveStyle: defaultModel.defaultSleeve,
      dartStyle: defaultModel.defaultDart,
      fabricId: "cotton-poplin",
      fabricName: "Katun Poplin Jepang",
      fabricTexture: "smooth-cotton",
      fabricColor: "#1E3A8A",
      seamAllowance: 1.5,
      isPatternCut: false,
      sewnParts: [],
      currentStage: "pattern-design",
      mannequinView: "front",
      activeAssemblyStep: "step1-darts"
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 4-Stage Stepper Header Pipeline */}
      <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1C1C1C] text-[#D4AF37] flex items-center justify-center shadow-sm">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                SIMULASI END-TO-END ATELIER HAUTE COUTURE
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white">
                Studio Pembuatan Busana Lengkap (Pola ➔ Potong ➔ Jahit ➔ Manekin)
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center space-x-1.5 transition-all ${
                isAudioMuted
                  ? "bg-red-50 dark:bg-red-950/40 border-red-300 text-red-600 dark:text-red-400"
                  : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300"
              }`}
              title={isAudioMuted ? "Suara Efek Nonaktif" : "Suara Efek Aktif"}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
              <span className="hidden sm:inline">{isAudioMuted ? "Muted" : "Efek Suara Mesin & Gunting"}</span>
            </button>

            {/* Restart Button */}
            <button
              onClick={handleRestart}
              className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-all text-xs font-mono font-bold flex items-center space-x-1.5"
              title="Mulai Ulang Simulasi"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* 4 Interactive Steps Progress Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-6 pt-5 border-t border-stone-100 dark:border-stone-800">
          {[
            {
              id: "pattern-design",
              num: "01",
              label: "Pola & Anatomi",
              sub: "Ukuran & Blueprint",
              icon: <Compass className="w-4 h-4" />,
            },
            {
              id: "fabric-cutting",
              num: "02",
              label: "Kain & Meja Potong",
              sub: "Kapur, Pentul & Gunting",
              icon: <Scissors className="w-4 h-4" />,
            },
            {
              id: "sewing-assembly",
              num: "03",
              label: "Perakitan Mesin",
              sub: "7 Tahap Jahit & Steam",
              icon: <Zap className="w-4 h-4" />,
            },
            {
              id: "mannequin-fitting",
              num: "04",
              label: "Fitting Manekin 360°",
              sub: "Runway & Sertifikat",
              icon: <User className="w-4 h-4" />,
            },
          ].map((st) => {
            const isCurrent = config.currentStage === st.id;
            return (
              <button
                key={st.id}
                onClick={() => goToStage(st.id as any)}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center space-x-3 ${
                  isCurrent
                    ? "bg-[#1C1C1C] text-[#D4AF37] border-[#1C1C1C] shadow-md ring-2 ring-[#D4AF37]/50"
                    : "bg-stone-50 dark:bg-[#11141C] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-stone-400"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                  isCurrent ? "bg-[#D4AF37] text-black" : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                }`}>
                  {st.num}
                </div>
                <div>
                  <div className="text-xs font-serif font-bold truncate">{st.label}</div>
                  <div className="text-[10px] font-mono opacity-70 truncate">{st.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Current Stage */}
      {config.currentStage === "pattern-design" && (
        <PatternDraftingStage
          config={config}
          setConfig={setConfig}
          onProceedNext={() => goToStage("fabric-cutting")}
        />
      )}

      {config.currentStage === "fabric-cutting" && (
        <FabricCuttingStage
          config={config}
          setConfig={setConfig}
          onProceedNext={() => goToStage("sewing-assembly")}
          onBack={() => goToStage("pattern-design")}
        />
      )}

      {config.currentStage === "sewing-assembly" && (
        <SewingAssemblyStage
          config={config}
          setConfig={setConfig}
          onProceedNext={() => goToStage("mannequin-fitting")}
          onBack={() => goToStage("fabric-cutting")}
        />
      )}

      {config.currentStage === "mannequin-fitting" && (
        <MannequinShowcaseStage
          config={config}
          setConfig={setConfig}
          onRestart={handleRestart}
          onBackToSewing={() => goToStage("sewing-assembly")}
        />
      )}
    </div>
  );
};
