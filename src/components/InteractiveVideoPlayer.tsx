import React, { useState } from "react";
import { VIDEO_TUTORIALS } from "../data/videoTutorials";
import { InteractiveVideo, VideoMilestone } from "../types";
import { 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Volume2, 
  Clock, 
  ChevronRight,
  Maximize2,
  Bookmark,
  Award
} from "lucide-react";
import confetti from "canvas-confetti";

export const InteractiveVideoPlayer: React.FC = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>("video-pola-dasar");
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeQuizAnswer, setActiveQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [activeAngle, setActiveAngle] = useState<"depan" | "jarum" | "pola">("depan");

  const video = VIDEO_TUTORIALS.find(v => v.id === selectedVideoId) || VIDEO_TUTORIALS[0];
  const currentMilestone: VideoMilestone = video.milestones[activeMilestoneIndex] || video.milestones[0];

  const handleQuizSelect = (index: number) => {
    if (quizSubmitted) return;
    setActiveQuizAnswer(index);
    setQuizSubmitted(true);

    if (currentMilestone.quizQuestion && index === currentMilestone.quizQuestion.correctIndex) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // silent
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Section Header */}
      <div className="border-b border-[#EAE8E3] pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-2 font-semibold">
            <Video className="w-3.5 h-3.5" />
            <span>KULIAH VISUAL & MULTI-ANGLE STUDIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#1C1C1C] tracking-tight">
            Video Tutorial Interaktif Penjahit
          </h1>
          <p className="text-[#666666] text-sm mt-1 max-w-2xl font-light">
            Eksplorasi teknik mekanik jarum, penempatan kampuh pola, serta evaluasi pemahaman seketika melalui kuis checkpoint interaktif.
          </p>
        </div>

        <div className="text-xs font-mono text-[#888888]">
          <span>STUDIO PRODUKSI: HIGH DEFINITION</span>
        </div>
      </div>

      {/* Video Selector Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {VIDEO_TUTORIALS.map((vid, idx) => {
          const isSelected = vid.id === selectedVideoId;
          return (
            <div
              key={vid.id}
              onClick={() => {
                setSelectedVideoId(vid.id);
                setActiveMilestoneIndex(0);
                setActiveQuizAnswer(null);
                setQuizSubmitted(false);
              }}
              className={`p-6 border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-[#FAF8F3] border-[#1C1C1C] ring-1 ring-[#1C1C1C] shadow-xs"
                  : "bg-[#FFFFFF] border-[#EAE8E3] hover:border-[#CCCCCC]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 bg-[#F4F1EA] text-[#666666] border border-[#E0DED7]">
                    {vid.category}
                  </span>
                  <span className="flex items-center space-x-1 text-[#888888] text-[10px] font-mono">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>{vid.duration}</span>
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#D4AF37] font-semibold">TUTORIAL 0{idx + 1}</div>
                <h3 className="font-serif italic font-bold text-base text-[#1C1C1C] line-clamp-2 mt-1">
                  {vid.title}
                </h3>
                <p className="text-xs text-[#666666] font-mono mt-2">
                  Instruktur: {vid.instructor}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAE8E3] flex items-center justify-between text-[10px] font-mono text-[#888888]">
                <span>{vid.milestones.length} MILESTONE</span>
                {isSelected && <span className="text-[#1C1C1C] font-bold uppercase tracking-wider">SEDANG TAMPIL</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Video Studio Main Player */}
      <div className="bg-[#FFFFFF] border border-[#EAE8E3] shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EAE8E3]">
        {/* Left Side: Video Player Stage + Camera Angle Switcher */}
        <div className="lg:col-span-8 p-6 sm:p-8 bg-[#141414] flex flex-col justify-between">
          <div className="relative w-full aspect-video bg-[#1C1C1C] border border-[#2E2E2E] flex flex-col items-center justify-center text-white shadow-xl overflow-hidden">
            {/* Visual simulation stage based on activeAngle */}
            <div className="absolute inset-0 bg-radial from-[#222222] to-[#111111] flex flex-col items-center justify-center p-6 text-center">
              {activeAngle === "depan" && (
                <div className="space-y-3">
                  <div className="w-14 h-14 bg-[#262626] border border-[#3A3A3A] flex items-center justify-center mx-auto text-[#D4AF37]">
                    <Video className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                      SUDUT KAMERA: PERSPEKTIF INSTRUKTUR DEPAN
                    </span>
                    <h3 className="text-xl font-serif italic font-bold text-white mt-1">
                      {currentMilestone.title}
                    </h3>
                    <p className="text-xs text-[#999999] max-w-md mx-auto mt-1.5 font-light">
                      {currentMilestone.description}
                    </p>
                  </div>
                </div>
              )}

              {activeAngle === "jarum" && (
                <div className="space-y-3">
                  <div className="w-14 h-14 bg-[#262626] border border-[#3A3A3A] flex items-center justify-center mx-auto text-[#D4AF37] animate-pulse">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                      SUDUT KAMERA: JARUM & SEPATU JAHIT CLOSE-UP
                    </span>
                    <h3 className="text-xl font-serif italic font-bold text-white mt-1">
                      Detail Presisi: {currentMilestone.keyTechnique}
                    </h3>
                    <p className="text-xs text-[#999999] max-w-md mx-auto mt-1.5 font-light">
                      Fokus millimeter pada jarak mata jarum terhadap tepi kampuh kain dan tegangan benang.
                    </p>
                  </div>
                </div>
              )}

              {activeAngle === "pola" && (
                <div className="space-y-3">
                  <div className="w-14 h-14 bg-[#262626] border border-[#3A3A3A] flex items-center justify-center mx-auto text-[#D4AF37]">
                    <Bookmark className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                      SUDUT KAMERA: OVERLAY BLUEPRINT POLA KERTAS
                    </span>
                    <h3 className="text-xl font-serif italic font-bold text-white mt-1">
                      Korelasi Pola & Perakitan Kain
                    </h3>
                    <p className="text-xs text-[#999999] max-w-md mx-auto mt-1.5 font-light">
                      Mencocokkan tanda takik dan garis TM/TB pola kertas ke panel kain asli.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* In-Video Watermark & Status */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-xs text-[10px] font-mono flex items-center space-x-2 border border-white/10">
              <span className="w-2 h-2 bg-[#D4AF37] animate-ping"></span>
              <span className="text-stone-300">{currentMilestone.timeLabel}</span>
              <span className="text-stone-600">|</span>
              <span className="text-white font-semibold">{currentMilestone.keyTechnique}</span>
            </div>

            {/* Video Controls Overlay Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 flex flex-col space-y-2">
              {/* Interactive Milestones Timeline Progress Bar */}
              <div className="relative w-full h-1.5 bg-stone-800 cursor-pointer flex items-center">
                <div
                  className="h-full bg-[#D4AF37] transition-all"
                  style={{
                    width: `${((activeMilestoneIndex + 1) / video.milestones.length) * 100}%`,
                  }}
                />

                {/* Milestone Pins */}
                {video.milestones.map((m, mIdx) => (
                  <button
                    key={mIdx}
                    onClick={() => {
                      setActiveMilestoneIndex(mIdx);
                      setActiveQuizAnswer(null);
                      setQuizSubmitted(false);
                    }}
                    title={`${m.timeLabel} - ${m.title}`}
                    className={`absolute w-3 h-3 transform -translate-x-1/2 transition-all border ${
                      mIdx === activeMilestoneIndex
                        ? "bg-[#D4AF37] border-white scale-125 z-10"
                        : "bg-stone-500 border-black hover:scale-110"
                    }`}
                    style={{
                      left: `${((mIdx + 0.5) / video.milestones.length) * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Bottom Play Buttons & Angle Toggles */}
              <div className="flex items-center justify-between text-xs text-stone-300 pt-2">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-white text-black hover:bg-[#D4AF37] transition-all font-bold"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>

                  <span className="font-mono text-xs text-stone-300">
                    {currentMilestone.timeLabel} / {video.duration}
                  </span>
                </div>

                {/* Camera Angle Switcher */}
                <div className="flex items-center space-x-1 bg-[#222222] p-1 border border-[#3A3A3A] text-[10px] font-mono uppercase tracking-wider">
                  <button
                    onClick={() => setActiveAngle("depan")}
                    className={`px-3 py-1 transition-all ${
                      activeAngle === "depan" ? "bg-[#1C1C1C] text-[#D4AF37] font-bold border border-[#444444]" : "text-stone-400 hover:text-white"
                    }`}
                  >
                    Tampak Depan
                  </button>
                  <button
                    onClick={() => setActiveAngle("jarum")}
                    className={`px-3 py-1 transition-all ${
                      activeAngle === "jarum" ? "bg-[#1C1C1C] text-[#D4AF37] font-bold border border-[#444444]" : "text-stone-400 hover:text-white"
                    }`}
                  >
                    Kamera Jarum
                  </button>
                  <button
                    onClick={() => setActiveAngle("pola")}
                    className={`px-3 py-1 transition-all ${
                      activeAngle === "pola" ? "bg-[#1C1C1C] text-[#D4AF37] font-bold border border-[#444444]" : "text-stone-400 hover:text-white"
                    }`}
                  >
                    Diagram Pola
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Overview text below player */}
          <div className="mt-5 text-xs text-[#AAAAAA] font-light">
            <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-wider block mb-1">
              IKHTISAR TOPIK SILABUS:
            </span>
            <p className="leading-relaxed">{video.overview}</p>
          </div>
        </div>

        {/* Right Side: Interactive Milestone Index & In-Video Checkpoint Quiz */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-[#FFFFFF] flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E3]">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                MILESTONE ({video.milestones.length})
              </span>
              <span className="text-[10px] font-mono uppercase text-[#888888]">Klik untuk lompat</span>
            </div>

            {/* List of Milestones */}
            <div className="mt-4 space-y-2 max-h-56 overflow-y-auto pr-1">
              {video.milestones.map((m, mIdx) => {
                const isSelected = mIdx === activeMilestoneIndex;
                return (
                  <div
                    key={mIdx}
                    onClick={() => {
                      setActiveMilestoneIndex(mIdx);
                      setActiveQuizAnswer(null);
                      setQuizSubmitted(false);
                    }}
                    className={`p-3 border cursor-pointer transition-all flex items-start space-x-3 text-xs ${
                      isSelected
                        ? "bg-[#FAF8F3] border-[#1C1C1C] ring-1 ring-[#1C1C1C] font-semibold text-[#1C1C1C]"
                        : "bg-[#FFFFFF] border-[#EAE8E3] hover:border-[#CCCCCC] text-[#555555]"
                    }`}
                  >
                    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#F4F1EA] text-[#666666] border border-[#E0DED7] shrink-0 mt-0.5">
                      {m.timeLabel}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif italic text-sm text-[#1C1C1C]">{m.title}</p>
                      <p className="text-[10px] font-mono text-[#888888] mt-0.5">{m.keyTechnique}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* In-Video Quiz Checkpoint Box */}
            {currentMilestone.quizQuestion ? (
              <div className="mt-6 p-5 bg-[#FAF8F3] border border-[#E8E2D5] text-xs">
                <div className="flex items-center space-x-2 font-mono text-[10px] text-[#D4AF37] uppercase tracking-wider mb-2 font-bold">
                  <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>KUIS PEMAHAMAN CEPAT:</span>
                </div>

                <p className="font-serif italic font-bold text-sm text-[#1C1C1C] mb-3 leading-snug">
                  {currentMilestone.quizQuestion.question}
                </p>

                <div className="space-y-2">
                  {currentMilestone.quizQuestion.options.map((opt, optIdx) => {
                    const isSelected = activeQuizAnswer === optIdx;
                    const isCorrect = optIdx === currentMilestone.quizQuestion?.correctIndex;

                    let btnStyle = "bg-[#FFFFFF] border-[#EAE8E3] text-[#333333] hover:border-[#1C1C1C]";
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = "bg-[#F4FBF7] border-[#15803D] text-[#15803D] font-bold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-[#FFF9F9] border-[#DC2626] text-[#DC2626] line-through";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleQuizSelect(optIdx)}
                        className={`w-full p-3 border text-left text-xs transition-all flex items-start space-x-2.5 ${btnStyle}`}
                      >
                        <span className="font-mono font-bold text-[10px] shrink-0">{String.fromCharCode(65 + optIdx)}.</span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-4 p-3 bg-[#FFFFFF] border border-[#E8E2D5] text-[#333333] text-xs leading-relaxed">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#D4AF37] font-bold block mb-1">
                      Penjelasan Instruktur:
                    </span>
                    {currentMilestone.quizQuestion.explanation}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-6 p-5 bg-[#FAF8F3] border border-[#E8E2D5] text-xs text-[#555555]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888] block mb-1">
                  Catatan Teknik Milestone Ini:
                </span>
                <p className="leading-relaxed">{currentMilestone.description}</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#EAE8E3] flex items-center justify-between text-xs font-mono text-[#888888]">
            <span>BAHAN: {video.materialsUsed.slice(0, 2).join(", ")}</span>
            <Award className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </div>
      </div>
    </div>
  );
};

