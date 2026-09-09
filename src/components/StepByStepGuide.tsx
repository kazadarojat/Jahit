import React, { useState } from "react";
import { SEWING_PROJECTS } from "../data/sewingTutorials";
import { SewingProject, StepGuide } from "../types";
import { 
  BookOpen, 
  Scissors, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight, 
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Check
} from "lucide-react";

interface StepByStepGuideProps {
  onGoToVideo?: (videoId: string) => void;
  onGoToPattern?: (patternId: string) => void;
}

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ onGoToVideo, onGoToPattern }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("rok-aline-pemula");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem("jahitpedia_completed_steps");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const project = SEWING_PROJECTS.find(p => p.id === selectedProjectId) || SEWING_PROJECTS[0];
  const currentStep = project.steps[currentStepIndex] || project.steps[0];

  const toggleStepCompleted = (stepId: string) => {
    setCompletedSteps(prev => {
      const updated = { ...prev, [stepId]: !prev[stepId] };
      try {
        localStorage.setItem("jahitpedia_completed_steps", JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
      return updated;
    });
  };

  const calculateProjectProgress = (proj: SewingProject) => {
    const total = proj.steps.length;
    const completed = proj.steps.filter(s => completedSteps[s.id]).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Section Header */}
      <div className="border-b border-[#EAE8E3] pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-2 font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>PANDUAN KONSTRUKSI GARMEN LENGKAP</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#1C1C1C] tracking-tight">
            Proyek Pembuatan Busana Utuh
          </h1>
          <p className="text-[#666666] text-sm mt-1 max-w-2xl font-light">
            Ikuti silabus manufaktur jahit mandiri dari pengukuran antropometri, tata letak kain (*cutting layout*), hingga jahitan kelim (*hemming*) presisi tinggi.
          </p>
        </div>

        <div className="text-xs font-mono text-[#888888]">
          <span>EDISI: 2025</span> • <span>STUDIO PENJAHIT</span>
        </div>
      </div>

      {/* Project Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SEWING_PROJECTS.map((proj, idx) => {
          const isSelected = proj.id === selectedProjectId;
          const progress = calculateProjectProgress(proj);

          return (
            <div
              key={proj.id}
              onClick={() => {
                setSelectedProjectId(proj.id);
                setCurrentStepIndex(0);
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
                    {proj.category}
                  </span>
                  <span className="flex items-center space-x-1 text-[#888888] text-[10px] font-mono">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>{proj.duration}</span>
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#D4AF37] font-semibold">PROYEK 0{idx + 1}</div>
                <h3 className="font-serif italic font-bold text-[#1C1C1C] text-lg leading-snug mt-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#666666] mt-2 line-clamp-2 leading-relaxed">
                  {proj.subtitle}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-5 pt-4 border-t border-[#EAE8E3]">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-1.5">
                  <span>Penyelesaian</span>
                  <span className={progress === 100 ? "text-[#15803D] font-bold" : "text-[#1C1C1C]"}>{progress}%</span>
                </div>
                <div className="w-full h-1 bg-[#EAE8E3] overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      progress === 100 ? "bg-[#15803D]" : "bg-[#1C1C1C]"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Project Studio (Selected Project Workspace) */}
      <div className="bg-[#FFFFFF] border border-[#EAE8E3] shadow-xs overflow-hidden">
        {/* Project Header Bar */}
        <div className="p-8 sm:p-10 bg-[#1C1C1C] text-[#FDFCFB] flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-[#1C1C1C]">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 text-xs font-mono mb-3">
              <span className="px-2.5 py-0.5 bg-[#2E2E2E] text-[#D4AF37] text-[10px] uppercase tracking-wider border border-[#3E3E3E] font-semibold">
                Tingkat: {project.difficulty}
              </span>
              <span className="text-[#666666]">•</span>
              <span className="text-[#CCCCCC] text-[11px] font-mono uppercase">Estimasi Waktu: {project.duration}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-white">
              {project.title}
            </h2>
            <p className="text-[#CCCCCC] text-xs sm:text-sm mt-3 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Quick Material & Requirement Box */}
          <div className="bg-[#262626] p-5 border border-[#3A3A3A] text-xs space-y-3 min-w-[260px]">
            <div>
              <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-[0.2em] block mb-1">
                Kebutuhan Kain:
              </span>
              <span className="text-white font-serif">{project.fabricRequirement}</span>
            </div>
            <div className="pt-2 border-t border-[#333333]">
              <span className="font-mono text-[9px] text-[#888888] uppercase tracking-[0.2em] block mb-1">
                Alat Utama:
              </span>
              <span className="text-[#CCCCCC] text-xs leading-tight block">{project.toolsNeeded.slice(0, 3).join(", ")}...</span>
            </div>
          </div>
        </div>

        {/* Steps Navigation & Step Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EAE8E3]">
          {/* Left Step Roadmap (List of all steps) */}
          <div className="lg:col-span-4 p-6 bg-[#FAF8F3] space-y-3">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8E2D5]">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#666666] font-bold">
                TAHAP KERJA ({project.steps.length})
              </h4>
              <button
                onClick={() => {
                  const updated = { ...completedSteps };
                  project.steps.forEach(s => delete updated[s.id]);
                  setCompletedSteps(updated);
                  localStorage.setItem("jahitpedia_completed_steps", JSON.stringify(updated));
                }}
                className="text-[10px] font-mono uppercase tracking-wider text-[#888888] hover:text-[#1C1C1C] flex items-center space-x-1"
                title="Reset progres proyek ini"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-2">
              {project.steps.map((step, idx) => {
                const isCurrent = idx === currentStepIndex;
                const isDone = !!completedSteps[step.id];

                return (
                  <div
                    key={step.id}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`p-3.5 border cursor-pointer transition-all flex items-center justify-between ${
                      isCurrent
                        ? "bg-[#FFFFFF] border-[#1C1C1C] ring-1 ring-[#1C1C1C] font-semibold text-[#1C1C1C] shadow-xs"
                        : "bg-[#FFFFFF] border-[#EAE8E3] hover:border-[#CCCCCC] text-[#555555]"
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStepCompleted(step.id);
                        }}
                        className={`w-5 h-5 rounded-none flex items-center justify-center shrink-0 border transition-all ${
                          isDone
                            ? "bg-[#15803D] text-white border-[#15803D]"
                            : "bg-white text-[#888888] border-[#CCCCCC] hover:border-[#1C1C1C]"
                        }`}
                      >
                        {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : <span className="text-[9px] font-mono">{step.stepNumber}</span>}
                      </button>

                      <span className="text-xs truncate font-serif">{step.title}</span>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 ${isCurrent ? "text-[#D4AF37]" : "text-[#CCCCCC]"}`} />
                  </div>
                );
              })}
            </div>

            {/* Tools Needed Detailed Checklist */}
            <div className="mt-8 pt-5 border-t border-[#E8E2D5]">
              <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888] font-bold mb-3">
                Perlengkapan & Spesifikasi:
              </h5>
              <ul className="space-y-1.5 text-xs text-[#555555]">
                {project.toolsNeeded.map((tool, tIdx) => (
                  <li key={tIdx} className="flex items-start space-x-2">
                    <span className="text-[#D4AF37] font-mono text-[10px]">•</span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Main Step Detail Studio */}
          <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-[#FFFFFF]">
            <div className="space-y-6">
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 pb-4 border-b border-[#EAE8E3]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                    LANGKAH 0{currentStep.stepNumber} DARI 0{project.steps.length}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#1C1C1C] mt-1">
                    {currentStep.title}
                  </h3>
                </div>

                <button
                  onClick={() => toggleStepCompleted(currentStep.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all shrink-0 border ${
                    completedSteps[currentStep.id]
                      ? "bg-[#F4FBF7] text-[#15803D] border-[#15803D] font-bold"
                      : "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C] hover:bg-[#333333]"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{completedSteps[currentStep.id] ? "Selesai Dikerjakan ✓" : "Tandai Langkah Selesai"}</span>
                </button>
              </div>

              {/* Main Instruction Lead */}
              <div className="p-6 bg-[#FAF8F3] border border-[#E8E2D5] text-sm text-[#1C1C1C] leading-relaxed font-light">
                <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest block mb-1">PETUNJUK UTAMA:</span>
                {currentStep.instruction}
              </div>

              {/* Step Breakdown Bullet Points */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888] font-bold">
                  RINCIAN KERJA TEKNIS:
                </h4>
                <div className="space-y-3">
                  {currentStep.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start space-x-3.5 p-4 bg-[#FDFCFB] border border-[#EAE8E3] text-xs sm:text-sm text-[#333333]">
                      <span className="font-mono text-[11px] font-bold text-[#D4AF37] shrink-0 mt-0.5">
                        0{dIdx + 1}.
                      </span>
                      <p className="leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip or Warning Box */}
              {currentStep.tips && (
                <div className="p-5 bg-[#1C1C1C] text-[#FDFCFB] border border-[#1C1C1C] text-xs flex items-start space-x-3">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4AF37] block mb-1">
                      Catatan Ahli Tata Busana:
                    </span>
                    <p className="leading-relaxed text-stone-300 font-light">{currentStep.tips}</p>
                  </div>
                </div>
              )}

              {currentStep.warning && (
                <div className="p-5 bg-[#FFF9F9] border border-[#FCA5A5] text-xs text-[#991B1B] flex items-start space-x-3">
                  <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold block mb-1">
                      Peringatan Kritis Kerusakan Pola/Kain:
                    </span>
                    <p className="leading-relaxed text-[#7F1D1D]">{currentStep.warning}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="pt-6 border-t border-[#EAE8E3] flex items-center justify-between">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider border border-[#CCCCCC] text-[#1C1C1C] hover:bg-[#F4F1EA] disabled:opacity-30 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <button
                disabled={currentStepIndex === project.steps.length - 1}
                onClick={() => {
                  toggleStepCompleted(currentStep.id);
                  setCurrentStepIndex(prev => Math.min(project.steps.length - 1, prev + 1));
                }}
                className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider bg-[#1C1C1C] text-[#FDFCFB] hover:bg-[#333333] disabled:opacity-30 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>Tahap Berikutnya</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

