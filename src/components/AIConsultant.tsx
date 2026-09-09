import React, { useState } from "react";
import { ChatMessage } from "../types";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Scissors, 
  AlertCircle, 
  Compass,
  RotateCcw,
  Loader2,
  Crown,
  BookOpen,
  MessageSquareQuote
} from "lucide-react";

export const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: `Selamat datang di **Atelier AI Couture Consultant** JahitPedia. ✂️\n\nSaya siap memberikan bimbingan teknis tingkat master untuk:\n1. **Dekonstruksi Pola & Simbol Busana** (TM/TB, Kupnat Dada/Pinggang, Grainline, Notch, Furing).\n2. **Troubleshooting Masalah Jahit** (Tension thread, benang lompat, kain mengkerut, sarang burung).\n3. **Kalkulasi & Rekomendasi Bahan** (Kebutuhan meteran kain, interfacing/viselin, teknik kampuh halus).\n\nAda proyek atau kendala jahit yang ingin Anda konsultasikan hari ini?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      source: "gemini"
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "Bagaimana cara mengatasi jahitan berkerut di kain sutra/katun?",
    "Jelaskan arah serat kain (grainline) saat memotong pola serong",
    "Kenapa jahitan bawah sekoci mesin menggumpal sarang burung?",
    "Berapa meter kain katun untuk membuat dress A-line panjang?",
    "Teknik menjahit kupnat dada agar ujungnya rata dan tidak berpunuk",
    "Perbedaan mendasar pola badan depan (TM) vs badan belakang (TB)",
  ];

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputPrompt("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({ role: m.sender, content: m.text })),
          context: "pattern-and-sewing-lesson"
        })
      });

      const data = await response.json();
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.reply || "Maaf, terjadi kendala saat memproses jawaban dari AI Atelier.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source
      };

      setMessages(prev => [...prev, aiReply]);
    } catch (err: any) {
      console.error("Error asking AI:", err);
      const errorReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Maaf, server AI sedang sibuk. Silakan coba kembali sesaat lagi.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: "fallback"
      };
      setMessages(prev => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header Banner */}
      <div className="bg-[#1C1C1C] text-[#FDFCFB] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
              <Crown className="w-3.5 h-3.5" />
              <span>Couture AI Consultation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Konsultan Busana & Pola Pintar AI
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Tanyakan solusi pola anatomi, kalkulasi meteran kain, perbaikan kendala mesin jahit, hingga trik penyelesaian kampuh tingkat tinggi bersama asisten kurasi AI kami.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-center">
              <span className="block text-xl font-serif font-bold text-[#D4AF37]">24/7</span>
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">Expert Advice</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-center">
              <span className="block text-xl font-serif font-bold text-emerald-400">Gemini</span>
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">Trained AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Workspace Box */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-lg overflow-hidden flex flex-col h-[680px]">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-[#141414] text-white flex items-center justify-between border-b border-[#D4AF37]/20">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-100">Master Tailor AI</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"></span>
              </div>
              <p className="text-xs font-mono text-stone-400">Specialist in Pattern Drafting & Haute Couture Construction</p>
            </div>
          </div>

          <button
            onClick={() => setMessages(messages.slice(0, 1))}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-mono border border-white/10 flex items-center space-x-1.5 transition-all"
            title="Bersihkan Percakapan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Sesi</span>
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF8F3]">
          {messages.map((msg) => {
            const isAI = msg.sender === "ai";
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isAI ? "justify-start" : "justify-end flex-row-reverse space-x-reverse"}`}
              >
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                    isAI
                      ? "bg-[#1C1C1C] text-[#D4AF37] border border-[#D4AF37]/40"
                      : "bg-[#D4AF37] text-[#1C1C1C] border border-[#B38F26]"
                  }`}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isAI
                      ? "bg-white text-stone-800 border border-stone-200/90"
                      : "bg-[#1C1C1C] text-stone-100 border border-stone-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className={`mt-2.5 text-[10px] font-mono flex items-center justify-between ${isAI ? "text-stone-400" : "text-stone-400"}`}>
                    <span>{msg.timestamp}</span>
                    {isAI && (
                      <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                        {msg.source === "gemini" ? "• Verified AI Response" : "• Atelier Advisory"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-3 text-stone-600 text-xs p-4 bg-white rounded-2xl border border-stone-200 w-fit shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
              <span className="font-serif italic">Master Tailor AI sedang menyusun rekomendasi teknis busana...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3.5 bg-stone-100/90 border-t border-stone-200 flex overflow-x-auto space-x-2 no-scrollbar">
          <div className="flex items-center space-x-1.5 text-stone-400 font-mono text-[11px] uppercase tracking-wider pl-1 pr-2 shrink-0">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Topik Cepat:</span>
          </div>
          {quickPrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-1.5 rounded-full bg-white text-stone-700 border border-stone-300/80 text-xs whitespace-nowrap hover:bg-[#1C1C1C] hover:text-[#D4AF37] hover:border-[#1C1C1C] transition-all shrink-0 shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center space-x-3">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Tanyakan analisis pola jahit, formula kain, perbaikan mesin..."
            className="flex-1 px-4 py-3 rounded-xl border border-stone-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] bg-[#FAF8F3]/50"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputPrompt.trim() || isLoading}
            className="px-6 py-3 rounded-xl bg-[#1C1C1C] hover:bg-[#2C2C2C] text-[#D4AF37] font-semibold text-xs flex items-center space-x-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md border border-[#D4AF37]/30"
          >
            <span>Kirim</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
