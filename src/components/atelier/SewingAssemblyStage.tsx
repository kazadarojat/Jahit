import React, { useState, useEffect, useRef } from "react";
import { GarmentSimulationConfig, SewingAssemblyStep } from "../../types";
import { sewingAudio } from "../../utils/sewingAudio";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Sliders, 
  Gauge, 
  Activity, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Scissors,
  HelpCircle,
  Eye
} from "lucide-react";

export const ASSEMBLY_STEPS: {
  id: SewingAssemblyStep;
  number: number;
  title: string;
  subTitle: string;
  description: string;
  technique: string;
  proTip: string;
  idealTension: number;
  needleType: string;
}[] = [
  {
    id: "step1-darts",
    number: 1,
    title: "1. Menjahit Kupnat Dada & Pinggang",
    subTitle: "Darts Construction",
    description: "Jahit kupnat dari pangkal lebar menuju ujung runcing (BP). Jangan kunci mati di puncak melainkan ikat simpul manual agar dada tidak menggelembung.",
    technique: "Setikan lurus 2.0 mm, arah jahitan ke puncak dada.",
    proTip: "Setrika kupnat dada mengarah ke bawah, kupnat pinggang mengarah ke tengah badan.",
    idealTension: 4,
    needleType: "Jarum Organ No. 11/75"
  },
  {
    id: "step2-shoulders",
    number: 2,
    title: "2. Menyambung Bahu & Obras Kampuh",
    subTitle: "Shoulder Seams & Overlock",
    description: "Satukan bahu badan depan dan badan belakang berhadapan baik (right sides together). Jahit kampuh 1.5 cm lalu obras tepi kain.",
    technique: "Lockstitch 2.5 mm + obras 3 benang.",
    proTip: "Beri pita penguat (stay-tape) di garis bahu belakang agar tidak melar saat dipakai.",
    idealTension: 4,
    needleType: "Jarum Standar No. 11/75"
  },
  {
    id: "step3-collar",
    number: 3,
    title: "3. Memasang Kerah & Lapisan Leher",
    subTitle: "Collar & Interfacing Assembly",
    description: "Tempelkan kain keras (viselin) pada daun kerah dengan setrika uap, jahit keliling, balik kerah, lalu pasangkan ke kerung leher.",
    technique: "Jahit tepi tindas (understitching) agar kerah rebah sempurna.",
    proTip: "Gunting cekik (notches) pada kampuh lengkung kerung leher sebelum dibalik.",
    idealTension: 4.5,
    needleType: "Jarum Microtex No. 9/65"
  },
  {
    id: "step4-sleeves",
    number: 4,
    title: "4. Mengerut & Memasang Lengan",
    subTitle: "Sleeve Cap Setting & Gathering",
    description: "Buat 2 baris setikan renggang di puncak kerung lengan, tarik benang sedikit untuk membentuk kap lengan (ease), lalu jahit ke kerung badan.",
    technique: "Basting 4.0 mm untuk kerutan + lockstitch 2.5 mm untuk sambungan.",
    proTip: "Pastikan tanda puncak lengan sejajar tepat dengan garis sambungan bahu.",
    idealTension: 3.5,
    needleType: "Jarum Universal No. 11/75"
  },
  {
    id: "step5-side-seams",
    number: 5,
    title: "5. Menjahit Garis Sisi Badan & Lengan",
    subTitle: "Side Seams & Arm Assembly",
    description: "Jahit garis sisi badan secara kontinu dari ujung pergelangan lengan hingga ke kelim bawah gaun. Buka kampuh dan setrika pipih.",
    technique: "Jahit lurus kontinu 2.5 mm, kunci maju-mundur di awal dan akhir.",
    proTip: "Periksa pertemuan garis ketiak harus bersilangan tepat seperti tanda + sempurna.",
    idealTension: 4,
    needleType: "Jarum Standar No. 11/75"
  },
  {
    id: "step6-zipper",
    number: 6,
    title: "6. Memasang Ritsleting Jepang / Kancing",
    subTitle: "Invisible Zipper & Closure",
    description: "Gunakan sepatu khusus ritsleting jepang. Buka gerigi ritsleting dengan jari saat jarum menusuk mepet di jalur gerigi agar ritsleting tersembunyi rapi.",
    technique: "Sepatu Ritsleting Jepang (Invisible Zipper Foot).",
    proTip: "Beri viselin strip 2 cm pada kampuh TB sebelum memasang ritsleting agar kain tidak bergelombang.",
    idealTension: 4,
    needleType: "Jarum Universal No. 11/75"
  },
  {
    id: "step7-hemming",
    number: 7,
    title: "7. Kelim Bawah & Setrika Uap Akhir",
    subTitle: "Blind Hemming & Steam Pressing",
    description: "Lipat kelim bawah selebar 3 cm, lakukan tusuk sum (blind stitch) atau kelim jahit mesin, lalu lakukan final steam pressing seluruh busana.",
    technique: "Blind stitch hemming + steam press 150°C.",
    proTip: "Gunakan tailor's clapper dari kayu untuk mengunci lipatan panas setrika agar tepian sangat tajam dan rapi.",
    idealTension: 4,
    needleType: "Jarum Hand-sewing / Machine"
  }
];

interface SewingAssemblyStageProps {
  config: GarmentSimulationConfig;
  setConfig: React.Dispatch<React.SetStateAction<GarmentSimulationConfig>>;
  onProceedNext: () => void;
  onBack: () => void;
}

export const SewingAssemblyStage: React.FC<SewingAssemblyStageProps> = ({
  config,
  setConfig,
  onProceedNext,
  onBack,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [stepProgress, setStepProgress] = useState<number>(0);
  const [isPedalPressed, setIsPedalPressed] = useState<boolean>(false);
  const [speed, setSpeed] = useState<"slow" | "normal" | "turbo">("normal");
  const [tension, setTension] = useState<number>(4);
  const [stitchLength, setStitchLength] = useState<number>(2.5); // mm
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [needleY, setNeedleY] = useState<number>(0);
  const [showSteamEffect, setShowSteamEffect] = useState<boolean>(false);

  const activeStep = ASSEMBLY_STEPS[currentStepIndex];
  const isCurrentStepFinished = config.sewnParts.includes(activeStep.id) || stepProgress >= 100;
  const isAllStepsFinished = config.sewnParts.length >= ASSEMBLY_STEPS.length;

  // Pedal Animation & Real-Time Motor Loop
  useEffect(() => {
    let animationFrameId: number;
    let clickCounter = 0;

    if (isPedalPressed) {
      sewingAudio.startMotor(speed);

      const stepIncrement = speed === "slow" ? 0.6 : speed === "normal" ? 1.4 : 2.6;

      const loop = () => {
        // Needle oscillation
        const time = Date.now() / (speed === "slow" ? 90 : speed === "normal" ? 60 : 35);
        setNeedleY(Math.sin(time) * 18);

        clickCounter++;
        if (clickCounter % (speed === "slow" ? 12 : speed === "normal" ? 7 : 4) === 0) {
          sewingAudio.playStitchClick();
        }

        setStepProgress((prev) => {
          const next = prev + stepIncrement;
          if (next >= 100) {
            sewingAudio.stopMotor();
            sewingAudio.playSuccessChime();
            // Mark step complete
            setConfig((c) => {
              const newSewn = c.sewnParts.includes(activeStep.id) 
                ? c.sewnParts 
                : [...c.sewnParts, activeStep.id];
              return { ...c, sewnParts: newSewn };
            });
            setIsPedalPressed(false);
            return 100;
          }
          return next;
        });

        animationFrameId = requestAnimationFrame(loop);
      };

      animationFrameId = requestAnimationFrame(loop);
    } else {
      sewingAudio.stopMotor();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      sewingAudio.stopMotor();
    };
  }, [isPedalPressed, speed, activeStep.id, setConfig]);

  // Handle Step Switch
  const handleSelectStep = (idx: number) => {
    sewingAudio.playTapeSnap();
    setCurrentStepIndex(idx);
    const stepId = ASSEMBLY_STEPS[idx].id;
    if (config.sewnParts.includes(stepId)) {
      setStepProgress(100);
    } else {
      setStepProgress(0);
    }
  };

  // Instant Complete Current Step
  const handleQuickFinishStep = () => {
    sewingAudio.playSuccessChime();
    setStepProgress(100);
    setConfig((c) => {
      const newSewn = c.sewnParts.includes(activeStep.id) 
        ? c.sewnParts 
        : [...c.sewnParts, activeStep.id];
      return { ...c, sewnParts: newSewn };
    });
  };

  // Steam Iron Pressing Action
  const handleSteamPress = () => {
    sewingAudio.playSteamIron();
    setShowSteamEffect(true);
    setTimeout(() => {
      setShowSteamEffect(false);
    }, 1200);
  };

  // Go to Next Sub-step
  const handleNextStepClick = () => {
    if (currentStepIndex < ASSEMBLY_STEPS.length - 1) {
      handleSelectStep(currentStepIndex + 1);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Overview Bar */}
      <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-1 font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>TAHAP 3: PERAKITAN MESIN JAHIT ATELIER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white">
            Perakitan 7 Langkah Penjahitan Presisi
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Injak pedal motor virtual, kendalikan ketegangan tensi benang, dan sambungkan setiap lembaran pola secara berurutan sesuai kaidah adibusana.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-mono font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition-all flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Kain</span>
          </button>

          <button
            onClick={onProceedNext}
            disabled={!isAllStepsFinished && config.sewnParts.length === 0}
            className="px-6 py-2.5 rounded-xl bg-[#1C1C1C] text-[#D4AF37] hover:bg-[#2C2C2C] font-serif font-bold text-xs flex items-center space-x-2 transition-all shadow-md border border-[#D4AF37]/30"
          >
            <span>Fitting ke Manekin</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 7 Steps Navigation Checklist */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-bold">
              URUTAN PERAKITAN BUSANA
            </span>
            <span className="text-xs font-mono text-[#D4AF37] font-bold">
              {config.sewnParts.length} / {ASSEMBLY_STEPS.length} Selesai
            </span>
          </div>

          <div className="space-y-2">
            {ASSEMBLY_STEPS.map((st, idx) => {
              const isSelected = idx === currentStepIndex;
              const isDone = config.sewnParts.includes(st.id);

              return (
                <button
                  key={st.id}
                  onClick={() => handleSelectStep(idx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#FAF8F3] dark:bg-[#1F2433] border-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]"
                      : "bg-white dark:bg-[#161922] border-stone-200 dark:border-stone-800 hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                      isDone 
                        ? "bg-emerald-500 text-white" 
                        : isSelected 
                          ? "bg-[#1C1C1C] text-[#D4AF37]" 
                          : "bg-stone-100 dark:bg-stone-800 text-stone-500"
                    }`}>
                      {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : st.number}
                    </div>

                    <div>
                      <div className="text-xs font-serif font-bold text-stone-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                        {st.title.replace(/^\d+\.\s*/, "")}
                      </div>
                      <div className="text-[10px] font-mono text-stone-400">
                        {st.subTitle}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Steam Press Helper Box */}
          <div className="bg-white dark:bg-[#161922] rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300 flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Setrika Uap Kampuh (Steam Press)</span>
              </span>
              <span className="text-[10px] font-mono text-orange-500">150°C Panas</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Setiap kali selesai menjahit satu sambungan, press kampuh jahit agar busana jatuh mulus tanpa kerut.
            </p>
            <button
              onClick={handleSteamPress}
              className="w-full py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30 text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all"
            >
              <span>💨 Semprotkan Uap Panas ke Kampuh</span>
            </button>
          </div>
        </div>

        {/* Right Column: Virtual Sewing Machine Workbench */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Step Details Banner */}
          <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
                  LANGKAH {activeStep.number} DARI 7: {activeStep.subTitle}
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-white mt-0.5">
                  {activeStep.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {activeStep.needleType}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {activeStep.description}
            </p>

            <div className="p-3 rounded-xl bg-[#FAF8F3] dark:bg-[#11141C] border border-stone-200 dark:border-stone-800 text-xs font-mono space-y-1">
              <div className="text-[#D4AF37] font-bold">💡 Tips Ahli Penjahit (Pro Tailor Tip):</div>
              <div className="text-stone-700 dark:text-stone-300">{activeStep.proTip}</div>
            </div>
          </div>

          {/* Interactive Mechanical Sewing Machine Unit */}
          <div className="bg-[#121622] text-white rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Steam Animation Overlay */}
            {showSteamEffect && (
              <div className="absolute inset-0 bg-white/20 backdrop-blur-xs flex items-center justify-center z-30 animate-in fade-in duration-200">
                <div className="text-center space-y-2 animate-bounce">
                  <div className="text-5xl">💨💨💨</div>
                  <div className="text-xs font-mono font-bold text-white bg-black/60 px-4 py-1.5 rounded-full">
                    Kampuh Jahitan Berhasil Di-Press Pipih & Rapi!
                  </div>
                </div>
              </div>
            )}

            {/* Machine Top Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              {/* Speed Switcher */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-stone-400">Kecepatan:</span>
                {(["slow", "normal", "turbo"] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      sewingAudio.playTapeSnap();
                      setSpeed(spd);
                    }}
                    className={`px-3 py-1 rounded-lg uppercase tracking-wider font-bold transition-all ${
                      speed === spd
                        ? "bg-[#D4AF37] text-black shadow-xs"
                        : "bg-white/5 text-stone-400 hover:bg-white/10"
                    }`}
                  >
                    {spd === "slow" ? "Lambat (Presisi)" : spd === "normal" ? "Standar" : "Turbo"}
                  </button>
                ))}
              </div>

              {/* Dial Tension */}
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="text-stone-400">Dial Tensi:</span>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="0.5"
                  value={tension}
                  onChange={(e) => setTension(parseFloat(e.target.value))}
                  className="w-24 accent-[#D4AF37]"
                />
                <span className="font-bold text-[#D4AF37] w-6">{tension}</span>
              </div>
            </div>

            {/* Sewing Machine Visualization SVG */}
            <div className="bg-[#090C14] rounded-2xl p-6 border border-stone-800 relative overflow-hidden flex flex-col items-center justify-center min-h-[280px]">
              {/* Moving Fabric underneath */}
              <div 
                className="w-full h-16 rounded-xl border border-stone-700 relative overflow-hidden flex items-center justify-center shadow-inner"
                style={{ backgroundColor: config.fabricColor }}
              >
                {/* Stitch Line Animation */}
                <div 
                  className="absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-white/90"
                  style={{
                    transform: `translateX(${(stepProgress * 4) % 20}px)`
                  }}
                />
                <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest bg-black/40 px-3 py-0.5 rounded-full z-10">
                  {config.fabricName} • Setikan {activeStep.subTitle}
                </span>
              </div>

              {/* Machine Needle & Presser Foot Rig */}
              <div className="relative mt-2 flex flex-col items-center">
                {/* Machine Arm / Head */}
                <div className="w-32 h-14 bg-gradient-to-b from-stone-300 to-stone-400 rounded-t-2xl border-2 border-stone-500 flex items-center justify-center text-stone-800 font-serif font-black text-xs tracking-wider shadow-md">
                  JAHITPEDIA PRO
                </div>

                {/* Needle Bar with dynamic translation */}
                <div 
                  className="w-1.5 bg-stone-100 rounded-full transition-transform"
                  style={{ 
                    height: "36px",
                    transform: `translateY(${needleY}px)`
                  }}
                />

                {/* Needle Point */}
                <div className="w-0.5 h-6 bg-gradient-to-b from-stone-200 to-stone-400 -mt-1" />

                {/* Presser Foot */}
                <div className="w-10 h-3 bg-stone-300 rounded-sm border border-stone-600 flex justify-between px-1">
                  <div className="w-2 h-1 bg-stone-700 rounded-xs"></div>
                  <div className="w-2 h-1 bg-stone-700 rounded-xs"></div>
                </div>
              </div>

              {/* Live Stitch Progress Bar inside machine */}
              <div className="w-full mt-6 space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-stone-400">
                  <span>Kemajuan Jahitan Jalur Ini:</span>
                  <strong className="text-[#D4AF37]">{Math.round(stepProgress)}%</strong>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-[#D4AF37] transition-all duration-100"
                    style={{ width: `${stepProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Foot Pedal & Action Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Holdable Foot Pedal Button */}
              <div className="sm:col-span-8">
                <button
                  onMouseDown={() => setIsPedalPressed(true)}
                  onMouseUp={() => setIsPedalPressed(false)}
                  onMouseLeave={() => setIsPedalPressed(false)}
                  onTouchStart={() => setIsPedalPressed(true)}
                  onTouchEnd={() => setIsPedalPressed(false)}
                  disabled={stepProgress >= 100}
                  className={`w-full py-5 px-6 rounded-2xl font-serif font-bold text-sm flex items-center justify-center space-x-3 transition-all select-none shadow-xl ${
                    stepProgress >= 100
                      ? "bg-emerald-900/60 border border-emerald-500 text-emerald-300 cursor-default"
                      : isPedalPressed
                        ? "bg-[#D4AF37] text-black scale-[0.98] ring-4 ring-[#D4AF37]/40"
                        : "bg-gradient-to-b from-stone-800 to-stone-900 text-[#D4AF37] hover:from-stone-700 hover:to-stone-800 border border-stone-700"
                  }`}
                >
                  {stepProgress >= 100 ? (
                    <>
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>Jahitan Langkah {activeStep.number} Selesai Sempurna!</span>
                    </>
                  ) : (
                    <>
                      <Activity className={`w-5 h-5 ${isPedalPressed ? "animate-spin" : ""}`} />
                      <span>{isPedalPressed ? "PEDAL DITEKAN • MENJAHIT..." : "TEKAN & TAHAN PEDAL INJAK (FOOT PEDAL)"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Finish & Next Step Buttons */}
              <div className="sm:col-span-4 flex gap-2">
                <button
                  onClick={handleQuickFinishStep}
                  disabled={stepProgress >= 100}
                  className="flex-1 py-4 px-3 rounded-2xl bg-white/10 hover:bg-white/15 text-stone-300 text-xs font-mono font-bold transition-all border border-white/10"
                >
                  Jahit Instan
                </button>

                {currentStepIndex < ASSEMBLY_STEPS.length - 1 && (
                  <button
                    onClick={handleNextStepClick}
                    className="flex-1 py-4 px-3 rounded-2xl bg-[#D4AF37] hover:bg-[#b8952b] text-black text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Lanjut</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
