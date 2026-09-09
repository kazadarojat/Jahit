import React, { useState, useEffect, useRef } from "react";
import { AtelierFullSewingStudio } from "./AtelierFullSewingStudio";
import { 
  Activity, 
  Play, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Gauge,
  Scissors,
  Crown,
  Layers,
  User
} from "lucide-react";
import confetti from "canvas-confetti";

export const SewingSimulator: React.FC = () => {
  const [simulatorMode, setSimulatorMode] = useState<"full-atelier" | "machine-lab">("full-atelier");
  const [isPedalPressed, setIsPedalPressed] = useState<boolean>(false);
  const [stitchType, setStitchType] = useState<"straight" | "zigzag" | "basting">("straight");
  const [tension, setTension] = useState<number>(4); // 1 - 9
  const [fabricType, setFabricType] = useState<"cotton" | "denim" | "chiffon" | "jersey">("cotton");
  const [needleSpeed, setNeedleSpeed] = useState<"slow" | "medium" | "fast">("medium");

  const [stitchProgress, setStitchProgress] = useState<number>(0); // 0 to 100
  const [driftOffset, setDriftOffset] = useState<number>(0); // -20 to +20
  const [stitchLogs, setStitchLogs] = useState<{ x: number; y: number; type: string }[]>([]);
  const [stitchScore, setStitchScore] = useState<number | null>(null);

  // Speed multiplier
  const speedStep = needleSpeed === "slow" ? 0.3 : needleSpeed === "medium" ? 0.6 : 1.2;

  // Stitching simulation loop
  useEffect(() => {
    if (!isPedalPressed || stitchProgress >= 100) return;

    const interval = setInterval(() => {
      setStitchProgress(prev => {
        const next = prev + speedStep;
        if (next >= 100) {
          setIsPedalPressed(false);
          calculateFinalScore();
          return 100;
        }

        // Add stitch point to canvas
        setStitchLogs(curr => [
          ...curr,
          {
            x: 200 + driftOffset + (Math.random() * 2 - 1),
            y: (next / 100) * 280 + 10,
            type: stitchType
          }
        ]);

        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isPedalPressed, stitchProgress, driftOffset, needleSpeed, stitchType]);

  const calculateFinalScore = () => {
    const idealTensions: Record<string, number> = {
      cotton: 4,
      denim: 5,
      chiffon: 3,
      jersey: 3.5
    };

    const ideal = idealTensions[fabricType] || 4;
    const tensionDiff = Math.abs(tension - ideal);
    const driftPenalty = Math.abs(driftOffset) * 2;
    const rawScore = Math.max(20, Math.round(100 - tensionDiff * 12 - driftPenalty));

    setStitchScore(rawScore);

    if (rawScore >= 80) {
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setIsPedalPressed(false);
    setStitchProgress(0);
    setDriftOffset(0);
    setStitchLogs([]);
    setStitchScore(null);
  };

  // Keyboard spacebar listener for foot pedal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat && stitchProgress < 100) {
        e.preventDefault();
        setIsPedalPressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPedalPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [stitchProgress]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Mode Switcher Bar */}
      <div className="bg-[#FAF8F3] dark:bg-[#11141C] p-2 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-2 items-center justify-between">
        <div className="flex w-full sm:w-auto p-1 bg-white dark:bg-[#161922] rounded-xl border border-stone-200 dark:border-stone-800">
          <button
            onClick={() => setSimulatorMode("full-atelier")}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
              simulatorMode === "full-atelier"
                ? "bg-[#1C1C1C] text-[#D4AF37] shadow-sm"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Simulasi Jahit Busana Penuh (Pola ➔ Manekin)</span>
            <span className="px-1.5 py-0.2 text-[9px] bg-[#D4AF37] text-black rounded font-sans">Utama</span>
          </button>

          <button
            onClick={() => setSimulatorMode("machine-lab")}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
              simulatorMode === "machine-lab"
                ? "bg-[#1C1C1C] text-[#D4AF37] shadow-sm"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Lab Mekanika Mesin & Tensi Jahit</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-3 text-xs font-mono text-stone-500 pr-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Simulator Atelier Aktif • Presisi Real-Time</span>
        </div>
      </div>

      {/* Conditionally Render Mode 1: Full Atelier Studio */}
      {simulatorMode === "full-atelier" && (
        <AtelierFullSewingStudio />
      )}

      {/* Conditionally Render Mode 2: Machine Mechanics Lab */}
      {simulatorMode === "machine-lab" && (
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Section Header */}
          <div className="border-b border-[#EAE8E3] dark:border-stone-800 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-2 font-semibold">
                <Activity className="w-3.5 h-3.5" />
                <span>SIMULATOR MOTOR & MEKANIKA TEGANGAN JAHIT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#1C1C1C] dark:text-white tracking-tight">
                Laboratorium Virtual Mesin Jahit
              </h2>
              <p className="text-[#666666] dark:text-stone-400 text-sm mt-1 max-w-2xl font-light">
                Latih ketepatan koordinasi tangan memandu jalur kampuh kain, injakan pedal motor, dan penyesuaian dial tensi benang.
              </p>
            </div>

            <div className="text-xs font-mono text-[#888888]">
              <span>FISIKA TEKSTIL: REAL-TIME</span>
            </div>
          </div>

          {/* Simulator Workspace Card */}
          <div className="bg-[#FFFFFF] dark:bg-[#161922] border border-[#EAE8E3] dark:border-stone-800 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EAE8E3] dark:divide-stone-800">
            {/* Left Side: Controls & Tuning Settings */}
            <div className="lg:col-span-4 p-6 sm:p-8 bg-[#FAF8F3] dark:bg-[#11141C] space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5] dark:border-stone-800">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666666] dark:text-stone-400 font-bold flex items-center space-x-2">
                    <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>PENGATURAN PARAMETER MESIN</span>
                  </h3>
                </div>

                {/* 1. Fabric Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#666666] dark:text-stone-400 block">
                    01. Material Kain:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "cotton", label: "Katun Poplin", tip: "Tensi Ideal: 4.0" },
                      { id: "denim", label: "Denim / Canvas", tip: "Tensi Ideal: 5.0" },
                      { id: "chiffon", label: "Sifon Silk", tip: "Tensi Ideal: 3.0" },
                      { id: "jersey", label: "Jersey Stretch", tip: "Tensi Ideal: 3.5" },
                    ].map((fab) => (
                      <button
                        key={fab.id}
                        onClick={() => { setFabricType(fab.id as any); handleReset(); }}
                        className={`p-3 text-left border transition-all ${
                          fabricType === fab.id
                            ? "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C] font-semibold shadow-xs"
                            : "bg-[#FFFFFF] dark:bg-[#161922] border-[#E0DED7] dark:border-stone-800 text-[#555555] dark:text-stone-300 hover:border-[#1C1C1C]"
                        }`}
                      >
                        <div className="text-xs font-serif font-bold">{fab.label}</div>
                        <div className={`text-[10px] font-mono mt-0.5 ${fabricType === fab.id ? "text-[#D4AF37]" : "text-[#888888]"}`}>
                          {fab.tip}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Stitch Mode Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#666666] dark:text-stone-400 block">
                    02. Ragam Setikan:
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: "straight", label: "Lurus (Lockstitch)" },
                      { id: "zigzag", label: "Zigzag Obras" },
                      { id: "basting", label: "Jelujur Longgar" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setStitchType(s.id as any); handleReset(); }}
                        className={`flex-1 py-2 px-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                          stitchType === s.id
                            ? "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C] font-bold"
                            : "bg-[#FFFFFF] dark:bg-[#161922] border-[#E0DED7] dark:border-stone-800 text-[#666666] dark:text-stone-300 hover:border-[#1C1C1C]"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

            {/* 3. Thread Tension Dial (1 - 9) */}
            <div className="space-y-2.5 p-4 bg-[#FFFFFF] border border-[#E8E2D5]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666666]">03. Dial Tensi Benang Atas:</span>
                <span className="font-mono font-bold text-[#D4AF37] text-xs bg-[#1C1C1C] px-2.5 py-0.5">
                  TENSION {tension}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="9"
                step="0.5"
                value={tension}
                onChange={(e) => setTension(parseFloat(e.target.value))}
                className="w-full accent-[#1C1C1C] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-[#888888]">
                <span>1 (Kendur)</span>
                <span>4.0 (Standar)</span>
                <span>9 (Kencang)</span>
              </div>
            </div>

            {/* 4. Speed Controller */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#666666] block">
                04. Rasio Putaran Motor:
              </label>
              <div className="flex gap-2">
                {(["slow", "medium", "fast"] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setNeedleSpeed(spd)}
                    className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                      needleSpeed === spd
                        ? "bg-[#1C1C1C] text-[#D4AF37] border-[#1C1C1C] font-bold"
                        : "bg-[#FFFFFF] border-[#E0DED7] text-[#666666]"
                    }`}
                  >
                    {spd === "slow" ? "Lambat" : spd === "medium" ? "Sedang" : "Tinggi"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#1C1C1C] text-[#FDFCFB] text-xs space-y-1.5 border border-[#1C1C1C]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4AF37] block font-bold">
              💡 Kendali Operasi:
            </span>
            <p className="text-stone-300 font-light text-xs leading-relaxed">• Tekan & Tahan tombol **"Injak Pedal Jahit"** atau tombol **Spasi**.</p>
            <p className="text-stone-300 font-light text-xs leading-relaxed">• Geser slider pemandu kain agar jarum tepat melintas di garis putus-putus.</p>
          </div>
        </div>

        {/* Right Side: Virtual Sewing Bed & Canvas Needle */}
        <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col items-center justify-between space-y-8 bg-[#FFFFFF]">
          <div className="w-full max-w-lg space-y-5">
            {/* Machine Head Status & Needle Bed */}
            <div className="relative w-full h-80 bg-[#F4F1EA] border border-[#CCCCCC] overflow-hidden shadow-inner flex flex-col items-center justify-center">
              {/* Virtual Fabric Bed */}
              <div
                className="absolute inset-0 bg-[#EAE6DD] transition-transform duration-75"
                style={{
                  transform: `translateX(${driftOffset * 2}px)`,
                  backgroundImage:
                    fabricType === "denim"
                      ? "radial-gradient(#1E293B 15%, #0F172A 15%)"
                      : fabricType === "cotton"
                      ? "radial-gradient(#CBD5E1 15%, transparent 15%)"
                      : fabricType === "chiffon"
                      ? "radial-gradient(#F5D0FE 10%, #FAF5FF 10%)"
                      : "radial-gradient(#D8B4FE 15%, #FAF5FF 15%)",
                  backgroundSize: "10px 10px",
                }}
              >
                {/* Target Seamline (Red Dashed Line) */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 border-r-2 border-dashed border-[#DC2626] transform -translate-x-1/2 opacity-70"></div>

                {/* Drawn stitches */}
                {stitchLogs.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className={`absolute w-1.5 h-1.5 rounded-none ${
                      st.type === "zigzag"
                        ? "bg-[#D4AF37]"
                        : st.type === "basting"
                        ? "bg-[#1E40AF]"
                        : "bg-[#1C1C1C]"
                    }`}
                    style={{
                      left: `${st.x}px`,
                      top: `${st.y}px`,
                    }}
                  />
                ))}
              </div>

              {/* Sewing Needle & Presser Foot Overlay (Center) */}
              <div className="relative z-20 flex flex-col items-center pointer-events-none">
                {/* Needle Bar */}
                <div
                  className={`w-1 bg-[#1C1C1C] transition-transform duration-75 ${
                    isPedalPressed ? "translate-y-2" : "translate-y-0"
                  }`}
                  style={{ height: "45px" }}
                />
                {/* Needle Tip */}
                <div className="w-0.5 h-3 bg-[#D4AF37]" />

                {/* Presser Foot Metal */}
                <div className="w-12 h-6 border border-[#1C1C1C] bg-[#FFFFFF]/90 shadow-xs flex items-center justify-center text-[9px] font-mono text-[#1C1C1C] mt-1">
                  1.5CM
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 border border-[#1C1C1C] text-[10px] font-mono font-bold text-[#1C1C1C] shadow-xs">
                JARAK: {Math.round(stitchProgress)}%
              </div>

              {isPedalPressed && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37] text-[10px] font-mono uppercase tracking-wider font-bold">
                  MOTOR AKTIF ⚡
                </div>
              )}
            </div>

            {/* Interactive Steering Guide Slider */}
            <div className="space-y-2 bg-[#FAF8F3] p-4 border border-[#E8E2D5]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666666]">Pemandu Jalur Tangan Penjahit:</span>
                <span className={`font-mono font-bold text-xs ${Math.abs(driftOffset) < 3 ? "text-[#15803D]" : "text-[#B45309]"}`}>
                  {Math.abs(driftOffset) < 3 ? "PRESISI LURUS ✓" : `DEVIASI ${driftOffset}MM`}
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={driftOffset}
                onChange={(e) => setDriftOffset(parseInt(e.target.value))}
                className="w-full accent-[#1C1C1C] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-[#888888]">
                <span>← Kiri</span>
                <span>Tengah (Kampuh 1.5cm)</span>
                <span>Kanan →</span>
              </div>
            </div>
          </div>

          {/* Action Bar (Pedal & Reset) */}
          <div className="w-full max-w-lg flex flex-col sm:flex-row items-center gap-3">
            <button
              onMouseDown={() => { if (stitchProgress < 100) setIsPedalPressed(true); }}
              onMouseUp={() => setIsPedalPressed(false)}
              onTouchStart={() => { if (stitchProgress < 100) setIsPedalPressed(true); }}
              onTouchEnd={() => setIsPedalPressed(false)}
              disabled={stitchProgress >= 100}
              className={`w-full flex-1 py-4 font-mono text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all border select-none ${
                stitchProgress >= 100
                  ? "bg-[#EAE8E3] text-[#888888] border-[#CCCCCC] cursor-not-allowed"
                  : isPedalPressed
                  ? "bg-[#15803D] text-white border-[#15803D]"
                  : "bg-[#1C1C1C] hover:bg-[#333333] text-[#FDFCFB] border-[#1C1C1C]"
              }`}
            >
              <Play className="w-4 h-4 text-[#D4AF37]" />
              <span>{isPedalPressed ? "PEDAL DITEKAN (MENJAHIT...)" : "TEKAN & TAHAN PEDAL GAS"}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-5 py-4 border border-[#CCCCCC] text-[#1C1C1C] hover:bg-[#F4F1EA] text-xs font-mono uppercase tracking-wider flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Score & Evaluation Feedback Box */}
          {stitchScore !== null && (
            <div className="w-full max-w-lg p-6 bg-[#1C1C1C] text-[#FDFCFB] border border-[#1C1C1C] space-y-3">
              <div className="flex items-center justify-between border-b border-[#333333] pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-serif italic font-bold text-lg text-white">Evaluasi Mutu Jahitan:</h4>
                </div>
                <div className="text-xl font-bold text-[#D4AF37] font-mono">
                  SKOR: {stitchScore}/100
                </div>
              </div>

              <div className="text-xs text-[#CCCCCC] space-y-1 leading-relaxed font-light">
                {stitchScore >= 85 ? (
                  <p className="text-[#4ADE80] font-normal">
                    🌟 Sempurna! Garis jahitan sangat lurus, konsisten di dalam kampuh, dan tegangan benang seimbang tanpa kerutan.
                  </p>
                ) : stitchScore >= 65 ? (
                  <p className="text-[#FDE047]">
                    👍 Bagus! Jahitan cukup rapi. Pertahankan kestabilan tangan saat melaju pada kecepatan sedang agar jahitan tidak meleset.
                  </p>
                ) : (
                  <p className="text-[#FCA5A5]">
                    ⚠️ Jahitan mengalami deviasi garis atau tensi benang kurang sinkron dengan material {fabricType}. Sesuaikan dial tensi dan kendalikan kecepatan injakan pedal.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
      )}
    </div>
  );
};

