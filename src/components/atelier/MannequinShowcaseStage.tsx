import React, { useState, useEffect } from "react";
import { GarmentSimulationConfig } from "../../types";
import { sewingAudio } from "../../utils/sewingAudio";
import { 
  User, 
  Eye, 
  RotateCcw, 
  Sparkles, 
  Download, 
  Share2, 
  Award, 
  Check, 
  Heart, 
  Palette, 
  Crown, 
  Camera, 
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";
import confetti from "canvas-confetti";

interface MannequinShowcaseStageProps {
  config: GarmentSimulationConfig;
  setConfig: React.Dispatch<React.SetStateAction<GarmentSimulationConfig>>;
  onRestart: () => void;
  onBackToSewing: () => void;
}

export const MannequinShowcaseStage: React.FC<MannequinShowcaseStageProps> = ({
  config,
  setConfig,
  onRestart,
  onBackToSewing,
}) => {
  const [currentView, setCurrentView] = useState<"front" | "side" | "back" | "angle">("front");
  const [currentAvatar, setCurrentAvatar] = useState<"mannequin" | "female-model" | "hijab-model" | "male-model">("female-model");
  const [studioLighting, setStudioLighting] = useState<"softbox" | "runway" | "golden" | "noir">("runway");
  const [accessories, setAccessories] = useState<{
    belt: boolean;
    brooch: boolean;
    necklace: boolean;
    goldButtons: boolean;
  }>({
    belt: true,
    brooch: false,
    necklace: true,
    goldButtons: false
  });
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    sewingAudio.playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  // Auto-rotation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoRotating) {
      const views: ("front" | "angle" | "side" | "back")[] = ["front", "angle", "side", "back"];
      let cur = views.indexOf(currentView);
      interval = setInterval(() => {
        cur = (cur + 1) % views.length;
        setCurrentView(views[cur]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating, currentView]);

  // Capture / Download Certificate
  const handleSaveCertificate = () => {
    sewingAudio.playCameraShutter();
    setSavedNotification(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      setSavedNotification(false);
    }, 3000);
  };

  // Toggle Accessory
  const toggleAccessory = (key: keyof typeof accessories) => {
    sewingAudio.playTapeSnap();
    setAccessories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-1 font-bold">
            <Crown className="w-3.5 h-3.5" />
            <span>TAHAP 4: FITTING & RUNWAY SHOWCASE 360°</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white">
            Busana Selesai Dirakit & Pas Badan ({config.modelName})
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Saksikan hasil rancangan karya adibusana Anda yang terpasang presisi pada manekin dan model peraga dengan pencahayaan studio adibusana.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSewing}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-mono font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition-all flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Mesin</span>
          </button>

          <button
            onClick={handleSaveCertificate}
            className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#b8952b] text-[#1C1C1C] font-mono font-bold text-xs flex items-center space-x-2 transition-all shadow-md"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Ambil Foto Studio & Sertifikat</span>
          </button>
        </div>
      </div>

      {savedNotification && (
        <div className="bg-emerald-900/90 border border-emerald-500 text-emerald-200 px-6 py-3 rounded-2xl text-xs font-mono flex items-center justify-between shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span><strong>Foto Hasil Karya Berhasil Disimpan!</strong> Lembar spesifikasi busana dan sertifikat kelulusan atelier telah siap.</span>
          </div>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Model, Lighting & Accessories Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Avatar Selector */}
          <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 font-bold flex items-center space-x-2">
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>PILIH PERAGA BUSANA (AVATAR)</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {[
                { id: "mannequin", label: "Manekin Kayu", desc: "Tailor Dress Form" },
                { id: "female-model", label: "Model Wanita", desc: "Haute Runway" },
                { id: "hijab-model", label: "Model Hijab", desc: "Modest Chic" },
                { id: "male-model", label: "Model Pria", desc: "Dapper Tailor" },
              ].map((av) => (
                <button
                  key={av.id}
                  onClick={() => {
                    sewingAudio.playTapeSnap();
                    setCurrentAvatar(av.id as any);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    currentAvatar === av.id
                      ? "bg-[#1C1C1C] text-[#D4AF37] border-[#1C1C1C] font-bold shadow-xs"
                      : "bg-white dark:bg-[#11141C] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-stone-400"
                  }`}
                >
                  <div className="font-bold">{av.label}</div>
                  <div className="text-[9px] opacity-70 mt-0.5">{av.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Lighting Environment Selector */}
          <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 font-bold flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>SUASANA PENCAHAYAAN STUDIO</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {[
                { id: "runway", label: "Runway Spotlight", desc: "Panggung Mewah" },
                { id: "softbox", label: "Studio Softbox", desc: "Presisi Netral" },
                { id: "golden", label: "Golden Hour", desc: "Hangat Elegan" },
                { id: "noir", label: "Editorial Noir", desc: "Kontras Gelap" },
              ].map((lt) => (
                <button
                  key={lt.id}
                  onClick={() => {
                    sewingAudio.playTapeSnap();
                    setStudioLighting(lt.id as any);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    studioLighting === lt.id
                      ? "bg-stone-900 text-white border-stone-900 font-bold"
                      : "bg-white dark:bg-[#11141C] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800"
                  }`}
                >
                  <div className="font-bold">{lt.label}</div>
                  <div className="text-[9px] opacity-70">{lt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Accessories Customizer */}
          <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-3">
            <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 font-bold flex items-center space-x-2">
                <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>AKSESORIS & FINISHING DETAIL</span>
              </h3>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {[
                { key: "belt", label: "Ikat Pinggang Kulit Emas (Waist Belt)" },
                { key: "brooch", label: "Bros Mutiara Dada (Pearl Brooch)" },
                { key: "necklace", label: "Kalung Permata Mewah (Necklace)" },
                { key: "goldButtons", label: "Kancing Emas Vintage (Gold Shank)" },
              ].map((acc) => (
                <button
                  key={acc.key}
                  onClick={() => toggleAccessory(acc.key as any)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    accessories[acc.key as keyof typeof accessories]
                      ? "bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-900 dark:text-amber-300 font-bold"
                      : "bg-white dark:bg-[#11141C] border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400"
                  }`}
                >
                  <span>{acc.label}</span>
                  <span>{accessories[acc.key as keyof typeof accessories] ? "✓ Aktif" : "—"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 360° Studio Showcase Stage */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main 360 Stage Card */}
          <div className={`rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-500 ${
            studioLighting === "runway" 
              ? "bg-gradient-to-b from-[#0D111A] via-[#161B28] to-[#0A0D14]" 
              : studioLighting === "golden"
                ? "bg-gradient-to-b from-[#241A14] via-[#1A1412] to-[#0F0B09]"
                : studioLighting === "noir"
                  ? "bg-black"
                  : "bg-[#161A24]"
          }`}>
            {/* Top Angle Selector Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 relative z-20">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-stone-400">Sudut Pandang:</span>
                {[
                  { id: "front", label: "Depan" },
                  { id: "angle", label: "Serong 45°" },
                  { id: "side", label: "Samping" },
                  { id: "back", label: "Belakang (Zipper)" },
                ].map((vw) => (
                  <button
                    key={vw.id}
                    onClick={() => {
                      sewingAudio.playTapeSnap();
                      setCurrentView(vw.id as any);
                    }}
                    className={`px-3 py-1 rounded-lg uppercase tracking-wider font-bold transition-all ${
                      currentView === vw.id
                        ? "bg-[#D4AF37] text-black shadow-xs"
                        : "bg-white/10 text-stone-300 hover:bg-white/20"
                    }`}
                  >
                    {vw.label}
                  </button>
                ))}
              </div>

              {/* Turntable Auto-Rotate Button */}
              <button
                onClick={() => {
                  sewingAudio.playTapeSnap();
                  setIsAutoRotating(!isAutoRotating);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all ${
                  isAutoRotating 
                    ? "bg-emerald-500 text-white animate-pulse" 
                    : "bg-white/10 text-stone-300 hover:bg-white/20"
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isAutoRotating ? "Auto-Rotate Aktif" : "Putar 360° Otomatis"}</span>
              </button>
            </div>

            {/* Showcase Stage Graphic SVG */}
            <div className="relative py-8 flex items-center justify-center min-h-[420px]">
              {/* Studio Spotlight Lightbeam Background */}
              <div className="absolute top-0 w-72 h-96 bg-radial from-amber-400/20 via-transparent to-transparent pointer-events-none blur-2xl" />

              {/* Mannequin / Model Peraga Vector SVG */}
              <svg viewBox="0 0 360 480" className="w-full max-w-sm h-auto relative z-10 filter drop-shadow-2xl">
                {/* Mannequin Base & Stand */}
                <ellipse cx="180" cy="460" rx="65" ry="12" fill="#0A0D14" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
                <line x1="180" y1="360" x2="180" y2="460" stroke="#78716C" strokeWidth="4" />

                {/* Avatar Head / Form */}
                {currentAvatar === "mannequin" ? (
                  <>
                    <ellipse cx="180" cy="45" rx="14" ry="18" fill="#D4AF37" opacity="0.8" />
                    <rect x="176" y="60" width="8" height="20" fill="#78716C" />
                  </>
                ) : currentAvatar === "hijab-model" ? (
                  <>
                    {/* Hijab Drape */}
                    <path d="M 155 30 Q 180 15 205 30 Q 220 60 215 90 L 195 110 L 165 110 L 145 90 Z" fill="#292524" stroke="#D4AF37" strokeWidth="1" />
                    {/* Face */}
                    <ellipse cx="180" cy="55" rx="13" ry="16" fill="#FDE68A" />
                  </>
                ) : (
                  <>
                    {/* Female / Male Head & Hair */}
                    <ellipse cx="180" cy="50" rx="14" ry="18" fill="#FDE68A" />
                    {/* Hair */}
                    <path d="M 160 40 Q 180 20 200 40 Q 210 70 195 75 Q 180 60 165 75 Z" fill="#1C1917" />
                  </>
                )}

                {/* Garment Rendering based on currentView */}
                {currentView === "front" && (
                  <g>
                    {/* Dress Body */}
                    <path
                      d={`M 140 85 Q 180 ${config.collarStyle === "v-neck" ? "120" : "95"} 220 85 L 235 150 Q 220 220 240 380 L 120 380 Q 140 220 125 150 Z`}
                      fill={config.fabricColor}
                      stroke="#000000"
                      strokeWidth="1.5"
                    />

                    {/* Darts Stitches */}
                    <line x1="150" y1="170" x2="168" y2="210" stroke="rgba(0,0,0,0.3)" strokeWidth="1" strokeDasharray="3 1" />
                    <line x1="210" y1="170" x2="192" y2="210" stroke="rgba(0,0,0,0.3)" strokeWidth="1" strokeDasharray="3 1" />

                    {/* Sleeves */}
                    {config.sleeveStyle !== "sleeveless" && (
                      <>
                        <path d="M 140 85 L 105 180 L 125 185 L 145 120 Z" fill={config.fabricColor} stroke="#000000" strokeWidth="1.5" />
                        <path d="M 220 85 L 255 180 L 235 185 L 215 120 Z" fill={config.fabricColor} stroke="#000000" strokeWidth="1.5" />
                      </>
                    )}

                    {/* Collar Style */}
                    {config.collarStyle === "peter-pan" && (
                      <>
                        <path d="M 150 85 Q 165 105 180 90 Q 170 80 150 85 Z" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
                        <path d="M 210 85 Q 195 105 180 90 Q 190 80 210 85 Z" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
                      </>
                    )}
                    {config.collarStyle === "shanghai" && (
                      <path d="M 160 75 L 200 75 L 195 85 L 165 85 Z" fill={config.fabricColor} stroke="#D4AF37" strokeWidth="1.5" />
                    )}

                    {/* Accessories: Belt */}
                    {accessories.belt && (
                      <g>
                        <rect x="135" y="210" width="90" height="10" rx="3" fill="#1C1917" stroke="#D4AF37" strokeWidth="1.5" />
                        <rect x="173" y="208" width="14" height="14" rx="2" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="1" />
                      </g>
                    )}

                    {/* Accessories: Brooch */}
                    {accessories.brooch && (
                      <circle cx="160" cy="120" r="5" fill="#D4AF37" stroke="#FFFFFF" strokeWidth="1.5" />
                    )}

                    {/* Accessories: Necklace */}
                    {accessories.necklace && (
                      <path d="M 165 85 Q 180 105 195 85" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2 1" />
                    )}
                  </g>
                )}

                {currentView === "back" && (
                  <g>
                    {/* Back Dress Body */}
                    <path
                      d="M 140 80 L 220 80 L 235 150 Q 220 220 240 380 L 120 380 Q 140 220 125 150 Z"
                      fill={config.fabricColor}
                      stroke="#000000"
                      strokeWidth="1.5"
                    />
                    {/* Back Invisible Zipper line */}
                    <line x1="180" y1="80" x2="180" y2="270" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 1" />
                    <circle cx="180" cy="84" r="3" fill="#D4AF37" />
                    {/* Back waist darts */}
                    <line x1="160" y1="160" x2="160" y2="240" stroke="rgba(0,0,0,0.3)" strokeWidth="1" strokeDasharray="3 1" />
                    <line x1="200" y1="160" x2="200" y2="240" stroke="rgba(0,0,0,0.3)" strokeWidth="1" strokeDasharray="3 1" />
                  </g>
                )}

                {(currentView === "side" || currentView === "angle") && (
                  <g>
                    {/* Side Silhouette */}
                    <path
                      d="M 170 85 Q 150 140 150 190 Q 165 215 155 260 L 140 380 L 210 380 Q 200 260 190 190 Q 185 140 180 85 Z"
                      fill={config.fabricColor}
                      stroke="#000000"
                      strokeWidth="1.5"
                    />
                    {/* Side Seam */}
                    <line x1="175" y1="140" x2="175" y2="380" stroke="rgba(0,0,0,0.35)" strokeWidth="1" strokeDasharray="4 2" />
                  </g>
                )}
              </svg>
            </div>

            {/* Quality Scorecard Banner */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-300">
              <div>
                <span className="text-stone-400">Presisi Kupnat & Ukuran:</span>
                <strong className="text-emerald-400 ml-1.5 font-bold">98.5% (Pas Badan)</strong>
              </div>
              <div>
                <span className="text-stone-400">Jatuhnya Kain (Drape):</span>
                <strong className="text-[#D4AF37] ml-1.5 font-bold">Sangat Luwes (Flowy)</strong>
              </div>
              <div>
                <span className="text-stone-400">Standar Mutu:</span>
                <strong className="text-cyan-400 ml-1.5 font-bold">Adibusana / Haute Couture</strong>
              </div>
            </div>
          </div>

          {/* Couture Certificate Spec Sheet Card */}
          <div className="bg-white dark:bg-[#161922] rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                  Sertifikat Spesifikasi Busana Atelier JahitPedia
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full font-bold">
                GRADE A+ ATELIER
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-stone-600 dark:text-stone-300">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#11141C] border border-stone-200 dark:border-stone-800">
                <div className="text-[10px] text-stone-400 uppercase">Siluet Busana</div>
                <div className="font-bold text-stone-900 dark:text-white mt-0.5">{config.modelName}</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#11141C] border border-stone-200 dark:border-stone-800">
                <div className="text-[10px] text-stone-400 uppercase">Material Kain</div>
                <div className="font-bold text-stone-900 dark:text-white mt-0.5">{config.fabricName}</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#11141C] border border-stone-200 dark:border-stone-800">
                <div className="text-[10px] text-stone-400 uppercase">Ukuran Dada/Pinggang</div>
                <div className="font-bold text-stone-900 dark:text-white mt-0.5">{config.measurements.bust} / {config.measurements.waist} cm</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#11141C] border border-stone-200 dark:border-stone-800">
                <div className="text-[10px] text-stone-400 uppercase">Panjang Busana</div>
                <div className="font-bold text-stone-900 dark:text-white mt-0.5">{config.measurements.garmentLength} cm</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onRestart}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-mono font-bold text-xs hover:bg-stone-200 dark:hover:bg-stone-700 transition-all flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Rancang Busana Baru dari Awal</span>
              </button>

              <button
                onClick={handleSaveCertificate}
                className="flex-1 py-3 px-4 rounded-xl bg-[#1C1C1C] text-[#D4AF37] hover:bg-[#2C2C2C] font-serif font-bold text-xs transition-all flex items-center justify-center space-x-2 border border-[#D4AF37]/30 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Sertifikat & Pola PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
