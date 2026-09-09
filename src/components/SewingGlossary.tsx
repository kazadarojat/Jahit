import React, { useState } from "react";
import { GLOSSARY_ITEMS, QUIZ_ITEMS } from "../data/glossary";
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw,
  Tag,
  GraduationCap,
  Crown,
  Check,
  X
} from "lucide-react";
import confetti from "canvas-confetti";

export const SewingGlossary: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"glossary" | "quiz">("glossary");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const categories = ["Semua", "Istilah Pola", "Teknik Jahit", "Alat & Mesin", "Jenis Kain"];

  const filteredGlossary = GLOSSARY_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectQuizAnswer = (qIdx: number, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let finalScore = 0;
    QUIZ_ITEMS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        finalScore += 1;
      }
    });

    setScore(finalScore);
    setIsQuizSubmitted(true);

    if (finalScore >= 4) {
      try {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setScore(0);
    setCurrentQuizIndex(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header Banner */}
      <div className="bg-[#1C1C1C] text-[#FDFCFB] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Sartorial Encyclopedia & Assessment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Kamus Istilah Busana & Uji Kompetensi Pola
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Kuasai terminologi standar industri fesyen Indonesia dan uji kepekaan membaca konstruksi pola serta teknik penjahitan presisi tinggi.
            </p>
          </div>

          {/* Sub-tab Switcher */}
          <div className="flex items-center space-x-1.5 bg-[#141414] p-1.5 rounded-2xl border border-stone-800 shrink-0">
            <button
              onClick={() => setActiveSubTab("glossary")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                activeSubTab === "glossary"
                  ? "bg-[#D4AF37] text-[#1C1C1C] font-bold shadow-md"
                  : "text-stone-400 hover:text-stone-100"
              }`}
            >
              Glosarium Istilah
            </button>

            <button
              onClick={() => setActiveSubTab("quiz")}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                activeSubTab === "quiz"
                  ? "bg-[#D4AF37] text-[#1C1C1C] font-bold shadow-md"
                  : "text-stone-400 hover:text-stone-100"
              }`}
            >
              Kuis Evaluasi ({QUIZ_ITEMS.length} Soal)
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: KAMUS ISTILAH (GLOSSARY) */}
      {activeSubTab === "glossary" && (
        <div className="space-y-6">
          {/* Search & Category Filter Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari istilah busana (misal: TM, Kupnat, Kampuh, Obras, Rayon)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] bg-[#FAF8F3]/50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all ${
                    selectedCategory === cat
                      ? "bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/50 shadow-xs"
                      : "bg-[#FAF8F3] text-stone-600 border border-stone-200 hover:bg-stone-200/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Glossary Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-[#D4AF37]/60 transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#8C6D1F] font-mono font-bold border border-[#D4AF37]/30 text-[10px] uppercase tracking-wider">
                      {item.category}
                    </span>
                    {item.pronunciation && (
                      <span className="text-[11px] font-mono text-stone-400 italic">
                        {item.pronunciation}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {item.term}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                    {item.definition}
                  </p>

                  <div className="mt-4 p-3 bg-[#FAF8F3] rounded-xl border border-stone-200/70 text-xs text-stone-700">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400 block mb-1">Aplikasi Praktis:</span>
                    <p className="leading-relaxed font-serif italic text-stone-800">{item.usageExample}</p>
                  </div>
                </div>

                {item.tips && (
                  <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-[#8C6D1F] flex items-start space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item.tips}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: KUIS PEMAHAMAN INTERAKTIF */}
      {activeSubTab === "quiz" && (
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-lg p-6 sm:p-10 max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <span className="text-xs font-mono font-bold text-[#8C6D1F] uppercase tracking-widest block">
                Evaluasi Mandiri Haute Couture
              </span>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                Uji Kompetensi Pola & Konstruksi Jahit
              </h2>
            </div>

            {isQuizSubmitted && (
              <div className="flex items-center space-x-2 bg-[#1C1C1C] px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#D4AF37] border border-[#D4AF37]/30 shrink-0">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Skor: {score}/{QUIZ_ITEMS.length} ({Math.round((score / QUIZ_ITEMS.length) * 100)}%)</span>
              </div>
            )}
          </div>

          {/* Quiz Questions List */}
          <div className="space-y-6">
            {QUIZ_ITEMS.map((q, qIdx) => {
              const userAnswer = selectedAnswers[qIdx];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = isQuizSubmitted && userAnswer === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isQuizSubmitted
                      ? isCorrect
                        ? "bg-emerald-50/50 border-emerald-300"
                        : "bg-red-50/40 border-red-300"
                      : "bg-[#FAF8F3]/60 border-stone-200/80"
                  }`}
                >
                  <div className="flex items-center space-x-2 text-xs font-mono text-stone-500 mb-2.5">
                    <span>Soal #{qIdx + 1}</span>
                    <span>•</span>
                    <span className="text-[#8C6D1F] font-semibold">{q.category}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 mb-4 leading-snug">
                    {q.question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      let btnStyle = "bg-white border-stone-200 text-stone-700 hover:bg-stone-50";

                      if (isQuizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = "bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs";
                        } else if (isSelected && optIdx !== q.correctIndex) {
                          btnStyle = "bg-red-500 text-white line-through border-red-500";
                        } else {
                          btnStyle = "bg-white/40 border-stone-200 text-stone-400";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-[#1C1C1C] text-[#D4AF37] font-bold border-[#1C1C1C] shadow-sm";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isQuizSubmitted}
                          onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start space-x-3 ${btnStyle}`}
                        >
                          <span className="font-mono font-bold shrink-0">{String.fromCharCode(65 + optIdx)}.</span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation card after submit */}
                  {isQuizSubmitted && (
                    <div className="mt-4 p-4 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed shadow-xs">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C6D1F] font-bold block mb-1">Penjelasan Anatomi:</span>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
            {isQuizSubmitted ? (
              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 rounded-xl border border-stone-300 text-xs font-mono font-bold text-stone-800 hover:bg-stone-100 flex items-center space-x-2 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Evaluasi</span>
              </button>
            ) : (
              <button
                disabled={Object.keys(selectedAnswers).length < QUIZ_ITEMS.length}
                onClick={handleSubmitQuiz}
                className="w-full py-4 rounded-xl bg-[#1C1C1C] hover:bg-[#2C2C2C] text-[#D4AF37] text-sm font-serif font-bold shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-[#D4AF37]/30"
              >
                Periksa & Nilai Jawaban ({Object.keys(selectedAnswers).length}/{QUIZ_ITEMS.length} Selesai)
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
