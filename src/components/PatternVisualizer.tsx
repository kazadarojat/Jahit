import React, { useState } from "react";
import { 
  Layers, 
  Info, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

interface PatternVisualizerProps {
  initialPiece?: "badan" | "lengan" | "rok" | "kerah" | "layout";
}

export const PatternVisualizer: React.FC<PatternVisualizerProps> = ({ initialPiece = "badan" }) => {
  const [activePiece, setActivePiece] = useState<"badan" | "lengan" | "rok" | "kerah" | "layout">(initialPiece);
  const [showSeamAllowance, setShowSeamAllowance] = useState(true);
  const [showGrainline, setShowGrainline] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [selectedElement, setSelectedElement] = useState<string | null>("tm-depan");

  // Element info dictionary
  const elementDescriptions: Record<string, { title: string; subtitle: string; desc: string; tip: string; formula?: string }> = {
    "tm-depan": {
      title: "Garis Tengah Muka (TM) / Center Front",
      subtitle: "Sumbu Utama Badan Depan",
      desc: "Garis lurus vertikal di bagian tengah dada. Pada pola blus tanpa kancing depan, garis ini diletakkan tepat pada Lipatan Kain. Pada kemeja berkancing, ditambahkan lidah plaket kancing 3.5 cm.",
      tip: "Pola depan dibuat lebih lebar (+1 cm dari 1/4 lingkar badan) dibanding pola belakang untuk memberi ruang buah dada.",
      formula: "1/4 Lingkar Badan + 1 cm + Kelonggaran (1.5 cm)"
    },
    "tb-belakang": {
      title: "Garis Tengah Belakang (TB) / Center Back",
      subtitle: "Sumbu Tulang Belakang",
      desc: "Garis vertikal di sepanjang tulang punggung. Jika gaun atau rok menggunakan ritsleting di punggung, garis ini dipotong 2 lembar dan diberi kampuh 2.0 cm.",
      tip: "Kerung leher TB hanya diturunkan 1.5 - 2 cm dari garis leher dasar agar kerah menempel anggun di tengkuk.",
      formula: "1/4 Lingkar Badan - 1 cm"
    },
    "kupnat-pinggang": {
      title: "Kupnat Pinggang (Waist Dart)",
      subtitle: "Pembentuk Lekuk Tubuh & Siluet Pinggang",
      desc: "Segitiga lipatan selebar 3 cm yang dijahit dari garis pinggang mengarah ke puncak payudara (turun 2.5 cm di bawah apex agar tidak runcing berlebih).",
      tip: "Jahit dari dasar lebar menuju ujung runcing. Sisakan benang 10 cm lalu ikat mati dengan tangan tanpa jahitan kunci mesin mundur.",
      formula: "Lebar Kupnat Standar = 2.5 - 3.0 cm"
    },
    "kupnat-samping": {
      title: "Kupnat Samping Dada (Side Bust Dart)",
      subtitle: "Akomodasi Kelengkungan Payudara",
      desc: "Kupnat yang ditarik dari garis sisi samping badan mengarah ke titik puncak dada. Sangat efektif agar blus tidak terangkat di bagian depan.",
      tip: "Ujung kupnat sisi harus berhenti 2.5 cm sebelum titik Apex (puting).",
      formula: "Selisih Panjang Muka - Panjang Punggung"
    },
    "kerung-leher": {
      title: "Kerung Leher (Neckline Curve)",
      subtitle: "Garis Dasar Leher Busana",
      desc: "Lengkungan leher depan lebih dalam (turun 7 - 8 cm) dibanding leher belakang (turun 1.5 - 2 cm). Selalu diberi kampuh 1.0 cm.",
      tip: "Sebelum memasang kerah atau facing, lakukan stay-stitching agar serat serong melengkung tidak melar.",
      formula: "Radius Leher = 1/6 Lingkar Leher + 0.5 cm"
    },
    "kerung-lengan": {
      title: "Kerung Lengan (Armhole Curve)",
      subtitle: "Jalur Sambungan Bahu & Lengan",
      desc: "Lengkungan tempat menyatukan lengan. Kerung depan melengkung lebih masuk ke dalam (cekung) untuk fleksibilitas dada, sedangkan kerung belakang lebih landai.",
      tip: "Gunakan penggaris lengkung kurva armhole prancis untuk mendapatkan kontur kurva yang mulus.",
      formula: "Kedalaman Kerung = 1/2 Panjang Punggung - 1 cm"
    },
    "puncak-lengan": {
      title: "Puncak Lengan (Sleeve Cap / Crown)",
      subtitle: "Kubah Pundak Lengan",
      desc: "Bagian tertinggi pola lengan. Keliling lengkungan pola lengan sengaja dibuat lebih panjang 1.5 - 2.5 cm dibanding kerung badan baju. Selisih ini diserap sebagai kemewahan bentuk bundar pundak.",
      tip: "Notch puncak lengan harus tepat bertemu dengan jahitan sambungan bahu baju.",
      formula: "Tinggi Puncak = 1/4 Kerung Lengan + 2 cm"
    },
    "pinggang-rok": {
      title: "Garis Pinggang Rok (Skirt Waistband Line)",
      subtitle: "Garis Konstruksi Pinggang",
      desc: "Garis pinggang rok depan dibuat sedikit melengkung turun 1 - 1.5 cm di tengah muka agar rok tidak mendongak ke atas saat dikenakan di atas perut.",
      tip: "Kupnat rok belakang biasanya lebih panjang (12-14 cm) dibanding kupnat rok depan (10-12 cm).",
      formula: "1/4 Lingkar Pinggang + Kupnat 3 cm"
    },
    "kelim-bawah": {
      title: "Kelim Bawah (Hemline Curve)",
      subtitle: "Penyelesaian Tepi Bawah",
      desc: "Garis tepi bawah rok atau pakaian. Pada rok A-line atau lingkar, kelim harus dibentuk melengkung harmonis mengikuti radius pinggang.",
      tip: "Gantung pakaian 24 jam sebelum mengelim rok lingkaran karena serat serong akan memanjang akibat gravitasi.",
      formula: "Kampuh Kelim Bawah = 3.0 - 4.0 cm"
    },
    "kaki-kerah": {
      title: "Kaki Kerah (Collar Stand / Band)",
      subtitle: "Penopang Kerah Kemeja",
      desc: "Pita lengkung penyambung antara leher baju dengan daun kerah. Diberi lidah tumpang tindih selebar 1.5 cm untuk tempat kancing leher.",
      tip: "Kaki kerah wajib dilapisi viselin berperekat (interfacing) agar berdiri kokoh rapi.",
      formula: "Panjang = 1/2 Lingkar Leher + Lidah Kancing 1.5 cm"
    },
    "daun-kerah": {
      title: "Daun Kerah (Collar Leaf / Point)",
      subtitle: "Sayap Kerah yang Terlipat Anggun",
      desc: "Bagian kerah yang jatuh melipat di atas pundak. Pola daun kerah atas (top collar) dipotong 2 mm lebih lebar dari daun bawah agar sambungan kampuh tersembunyi rapi ke sisi bawah.",
      tip: "Pangkas sudut lancip kerah sebelum dibalik untuk menghasilkan sudut 90 derajat tajam.",
      formula: "Lebar Ujung Daun = 6.0 - 7.5 cm"
    },
    "selvage-lipatan": {
      title: "Arah Serat & Tepi Kain (Grainline & Selvage)",
      subtitle: "Layout Pemotongan Kain Presisi",
      desc: "Kain dilipat dua memanjang dengan tepi tenunan pabrik (selvage) sejajar di sisi luar. Pola TM/TB lipatan menempel di lipatan tengah kain.",
      tip: "Susun pola potongan besar terlebih dahulu (badan depan, badan belakang, lengan) lalu sisipkan pola kecil (kerah, saku) di celah kosong.",
      formula: "Arah Serat Lurus = Sejajar 100% dengan Tepi Selvage"
    }
  };

  const currentInfo = selectedElement ? elementDescriptions[selectedElement] || elementDescriptions["tm-depan"] : elementDescriptions["tm-depan"];

  return (
    <div className="bg-[#FFFFFF] border border-[#EAE8E3] shadow-xs overflow-hidden">
      {/* Header Selector Bar */}
      <div className="p-4 sm:p-6 bg-[#1C1C1C] text-[#FDFCFB] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5 mb-1">
            <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#D4AF37] font-semibold">
              BLUEPRINT STUDIO
            </span>
            <span className="text-stone-500">•</span>
            <span className="text-[10px] text-stone-400 font-mono tracking-wider">
              VEKTOR DRAFTING SOEN & PORRIE
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-white tracking-tight">
            Pembedah Struktur & Anatomi Pola Busana
          </h3>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Klik bagian pola atau takik untuk menginspeksi rumus matematis, fungsi anatomis, dan teknik menjahitnya.
          </p>
        </div>

        {/* Piece Switcher Tabs */}
        <div className="flex flex-wrap gap-1 bg-[#282828] p-1 border border-[#3A3A3A]">
          {[
            { id: "badan", label: "Pola Badan (TM/TB)" },
            { id: "lengan", label: "Pola Lengan" },
            { id: "rok", label: "Pola Rok A-Line" },
            { id: "kerah", label: "Pola Kerah" },
            { id: "layout", label: "Layout Kain" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePiece(item.id as any);
                if (item.id === "badan") setSelectedElement("tm-depan");
                if (item.id === "lengan") setSelectedElement("puncak-lengan");
                if (item.id === "rok") setSelectedElement("pinggang-rok");
                if (item.id === "kerah") setSelectedElement("daun-kerah");
                if (item.id === "layout") setSelectedElement("selvage-lipatan");
              }}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition-all ${
                activePiece === item.id
                  ? "bg-[#D4AF37] text-[#1C1C1C] font-bold shadow-xs"
                  : "text-stone-300 hover:text-white hover:bg-[#333333]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Control Layer Toggles */}
      <div className="px-4 sm:px-6 py-3 bg-[#F9F7F2] border-b border-[#EAE8E3] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2 text-[#1C1C1C]">
          <Layers className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1C1C1C]">
            Layer Blueprint:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <label className="flex items-center space-x-2 cursor-pointer select-none text-[#1C1C1C]">
            <input
              type="checkbox"
              checked={showSeamAllowance}
              onChange={(e) => setShowSeamAllowance(e.target.checked)}
              className="accent-[#1C1C1C]"
            />
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B91C1C] inline-block"></span>
              <span className="font-mono text-[10px] uppercase tracking-wider">Kampuh (1.5cm)</span>
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer select-none text-[#1C1C1C]">
            <input
              type="checkbox"
              checked={showGrainline}
              onChange={(e) => setShowGrainline(e.target.checked)}
              className="accent-[#1C1C1C]"
            />
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#15803D] inline-block"></span>
              <span className="font-mono text-[10px] uppercase tracking-wider">Arah Serat (Grainline)</span>
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer select-none text-[#1C1C1C]">
            <input
              type="checkbox"
              checked={showMeasurements}
              onChange={(e) => setShowMeasurements(e.target.checked)}
              className="accent-[#1C1C1C]"
            />
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block"></span>
              <span className="font-mono text-[10px] uppercase tracking-wider">Notasi & Rumus</span>
            </span>
          </label>
        </div>
      </div>

      {/* Main Canvas & Detail Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#EAE8E3]">
        {/* Left / Top SVG Canvas (Interactive Vector Pattern) */}
        <div className="lg:col-span-7 p-6 bg-[#FDFCFB] flex flex-col items-center justify-center min-h-[420px] relative">
          <div className="w-full max-w-lg aspect-[4/3] bg-white border border-[#E5E5E5] p-3 flex items-center justify-center relative shadow-xs">
            {/* 1. POLA BADAN (TM & TB) */}
            {activePiece === "badan" && (
              <svg viewBox="0 0 400 300" className="w-full h-full select-none">
                <defs>
                  <marker id="arrow-gold" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#15803D" />
                  </marker>
                  <pattern id="editorial-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F0EDE6" strokeWidth="1" />
                  </pattern>
                </defs>

                <rect width="400" height="300" fill="url(#editorial-grid)" />

                {/* --- SISI KIRI: POLA BADAN DEPAN (TM) --- */}
                <g className="cursor-pointer group">
                  {/* Seam Allowance Outer Path */}
                  {showSeamAllowance && (
                    <path
                      d="M 50,40 C 70,40 85,55 90,65 L 125,50 L 140,85 C 135,115 130,135 145,155 L 140,250 L 50,250 Z"
                      fill="none"
                      stroke="#B91C1C"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                      opacity="0.7"
                    />
                  )}

                  {/* Garis Pola Utama Badan Depan */}
                  <path
                    d="M 60,50 C 75,50 90,62 95,72 L 120,60 L 132,90 C 128,115 125,130 135,148 L 130,240 L 60,240 Z"
                    fill={selectedElement === "tm-depan" ? "#F5ECE6" : "#FAF6F0"}
                    stroke="#1C1C1C"
                    strokeWidth="2.2"
                    onClick={() => setSelectedElement("tm-depan")}
                    className="transition-all hover:fill-[#EFE8DC]"
                  />

                  {/* Kupnat Pinggang Depan */}
                  <path
                    d="M 90,240 L 95,150 L 100,240 Z"
                    fill={selectedElement === "kupnat-pinggang" ? "#D4AF37" : "#E8DFC5"}
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    onClick={(e) => { e.stopPropagation(); setSelectedElement("kupnat-pinggang"); }}
                    className="cursor-pointer hover:fill-[#D4AF37]"
                  />

                  {/* Kupnat Samping Depan */}
                  <path
                    d="M 132,180 L 102,160 L 130,195 Z"
                    fill={selectedElement === "kupnat-samping" ? "#D4AF37" : "#E8DFC5"}
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    onClick={(e) => { e.stopPropagation(); setSelectedElement("kupnat-samping"); }}
                    className="cursor-pointer hover:fill-[#D4AF37]"
                  />

                  {/* Grainline Arrow Depan */}
                  {showGrainline && (
                    <g onClick={(e) => { e.stopPropagation(); setSelectedElement("selvage-lipatan"); }}>
                      <line x1="75" y1="80" x2="75" y2="210" stroke="#15803D" strokeWidth="2" markerEnd="url(#arrow-gold)" markerStart="url(#arrow-gold)" />
                      <text x="80" y="145" fill="#15803D" fontSize="8" fontWeight="bold" fontFamily="monospace" transform="rotate(-90 80 145)">ARAH SERAT</text>
                    </g>
                  )}

                  {/* Label TM */}
                  <text x="63" y="140" fill="#1C1C1C" fontSize="9" fontWeight="bold" fontFamily="sans-serif" onClick={() => setSelectedElement("tm-depan")}>
                    TM (Lipatan)
                  </text>
                  <text x="80" y="44" fill="#1C1C1C" fontSize="10" fontWeight="bold" fontFamily="serif">Badan Depan</text>

                  {/* Kerung leher clickable zone */}
                  <circle cx="75" cy="55" r="7" fill="#B91C1C" opacity="0.25" className="hover:opacity-70 cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedElement("kerung-leher"); }} />
                  {/* Kerung lengan clickable zone */}
                  <circle cx="126" cy="115" r="7" fill="#B91C1C" opacity="0.25" className="hover:opacity-70 cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedElement("kerung-lengan"); }} />
                </g>

                {/* --- SISI KANAN: POLA BADAN BELAKANG (TB) --- */}
                <g className="cursor-pointer group">
                  {/* Seam Allowance Outer Path */}
                  {showSeamAllowance && (
                    <path
                      d="M 230,55 C 245,55 255,60 260,65 L 295,50 L 310,85 C 305,115 300,135 315,155 L 310,250 L 220,250 Z"
                      fill="none"
                      stroke="#1E40AF"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                      opacity="0.7"
                    />
                  )}

                  {/* Garis Pola Utama Badan Belakang */}
                  <path
                    d="M 235,62 C 250,62 260,65 265,72 L 290,60 L 302,90 C 298,115 295,130 305,148 L 300,240 L 230,240 Z"
                    fill={selectedElement === "tb-belakang" ? "#EAF0F6" : "#F4F6F9"}
                    stroke="#1C1C1C"
                    strokeWidth="2.2"
                    onClick={() => setSelectedElement("tb-belakang")}
                    className="transition-all hover:fill-[#DEE5EE]"
                  />

                  {/* Kupnat Belakang */}
                  <path
                    d="M 265,240 L 270,130 L 275,240 Z"
                    fill={selectedElement === "kupnat-pinggang" ? "#D4AF37" : "#CBD5E1"}
                    stroke="#1C1C1C"
                    strokeWidth="1.5"
                    onClick={(e) => { e.stopPropagation(); setSelectedElement("kupnat-pinggang"); }}
                    className="cursor-pointer hover:fill-[#D4AF37]"
                  />

                  {/* Grainline Arrow Belakang */}
                  {showGrainline && (
                    <g onClick={(e) => { e.stopPropagation(); setSelectedElement("selvage-lipatan"); }}>
                      <line x1="245" y1="80" x2="245" y2="210" stroke="#15803D" strokeWidth="2" markerEnd="url(#arrow-gold)" markerStart="url(#arrow-gold)" />
                      <text x="250" y="145" fill="#15803D" fontSize="8" fontWeight="bold" fontFamily="monospace" transform="rotate(-90 250 145)">ARAH SERAT</text>
                    </g>
                  )}

                  {/* Label TB */}
                  <text x="233" y="140" fill="#1C1C1C" fontSize="9" fontWeight="bold" onClick={() => setSelectedElement("tb-belakang")}>
                    TB (Belakang)
                  </text>
                  <text x="250" y="44" fill="#1C1C1C" fontSize="10" fontWeight="bold" fontFamily="serif">Badan Belakang</text>
                </g>

                {/* Notasi Ukuran */}
                {showMeasurements && (
                  <g fill="#666666" fontSize="8" fontWeight="bold" fontFamily="monospace">
                    <text x="60" y="260">1/4 Lingkar Badan + 1 cm</text>
                    <text x="230" y="260">1/4 Lingkar Badan - 1 cm</text>
                  </g>
                )}
              </svg>
            )}

            {/* 2. POLA LENGAN */}
            {activePiece === "lengan" && (
              <svg viewBox="0 0 400 300" className="w-full h-full select-none">
                <rect width="400" height="300" fill="#FAF9F5" />

                {showSeamAllowance && (
                  <path
                    d="M 90,120 C 130,40 270,40 310,120 L 290,260 L 110,260 Z"
                    fill="none"
                    stroke="#1C1C1C"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />
                )}

                <path
                  d="M 100,125 C 140,55 260,55 300,125 L 280,250 L 120,250 Z"
                  fill="#FFFFFF"
                  stroke="#1C1C1C"
                  strokeWidth="2.2"
                  className="hover:fill-[#F4F1EA] cursor-pointer"
                  onClick={() => setSelectedElement("puncak-lengan")}
                />

                <line x1="100" y1="125" x2="300" y2="125" stroke="#999999" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="200" y1="65" x2="200" y2="250" stroke="#999999" strokeWidth="1" strokeDasharray="3 3" />

                <path d="M 197,60 L 200,52 L 203,60 Z" fill="#D4AF37" onClick={() => setSelectedElement("puncak-lengan")} className="cursor-pointer" />
                <text x="175" y="44" fill="#1C1C1C" fontSize="9" fontWeight="bold" fontFamily="monospace">NOTCH BAHU</text>

                <path d="M 125,95 L 118,92 L 122,88 Z" fill="#B91C1C" />
                <text x="85" y="90" fill="#B91C1C" fontSize="8" fontWeight="bold">Depan (1 Takik)</text>

                <path d="M 275,95 L 282,92 L 278,88 Z" fill="#1E40AF" />
                <path d="M 278,100 L 285,97 L 281,93 Z" fill="#1E40AF" />
                <text x="285" y="90" fill="#1E40AF" fontSize="8" fontWeight="bold">Belakang (2 Takik)</text>

                {showGrainline && (
                  <g onClick={() => setSelectedElement("selvage-lipatan")}>
                    <line x1="200" y1="135" x2="200" y2="225" stroke="#15803D" strokeWidth="2" markerEnd="url(#arrow-gold)" markerStart="url(#arrow-gold)" />
                    <text x="205" y="180" fill="#15803D" fontSize="8" fontWeight="bold" fontFamily="monospace">SERAT MEMANJANG</text>
                  </g>
                )}

                {showMeasurements && (
                  <g fill="#666666" fontSize="8" fontFamily="monospace">
                    <text x="135" y="140">Garis Pangkal Lengan (Biceps)</text>
                    <text x="145" y="270">Garis Bukaan Pergelangan</text>
                  </g>
                )}
              </svg>
            )}

            {/* 3. POLA ROK A-LINE */}
            {activePiece === "rok" && (
              <svg viewBox="0 0 400 300" className="w-full h-full select-none">
                <rect width="400" height="300" fill="#FAF9F5" />

                {showSeamAllowance && (
                  <path
                    d="M 120,40 C 160,45 220,45 260,40 L 320,265 C 240,275 140,275 60,265 Z"
                    fill="none"
                    stroke="#1C1C1C"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />
                )}

                <path
                  d="M 130,50 C 170,54 210,54 250,50 L 305,250 C 235,260 145,260 75,250 Z"
                  fill="#FFFFFF"
                  stroke="#1C1C1C"
                  strokeWidth="2.2"
                  className="hover:fill-[#F4F1EA] cursor-pointer"
                  onClick={() => setSelectedElement("pinggang-rok")}
                />

                <path d="M 160,52 L 163,110 L 166,52 Z" fill="#D4AF37" stroke="#1C1C1C" strokeWidth="1.2" onClick={() => setSelectedElement("kupnat-pinggang")} className="cursor-pointer" />
                <path d="M 214,52 L 217,110 L 220,52 Z" fill="#D4AF37" stroke="#1C1C1C" strokeWidth="1.2" onClick={() => setSelectedElement("kupnat-pinggang")} className="cursor-pointer" />

                {showGrainline && (
                  <g onClick={() => setSelectedElement("selvage-lipatan")}>
                    <line x1="190" y1="120" x2="190" y2="220" stroke="#15803D" strokeWidth="2" markerEnd="url(#arrow-gold)" markerStart="url(#arrow-gold)" />
                    <text x="195" y="170" fill="#15803D" fontSize="8" fontWeight="bold" fontFamily="monospace">GRAINLINE</text>
                  </g>
                )}

                <text x="145" y="36" fill="#1C1C1C" fontSize="10" fontWeight="bold" fontFamily="serif" onClick={() => setSelectedElement("pinggang-rok")}>
                  Pinggang Rok (Waistline)
                </text>
                <text x="140" y="280" fill="#1C1C1C" fontSize="10" fontWeight="bold" fontFamily="serif" onClick={() => setSelectedElement("kelim-bawah")}>
                  Kelim Bawah Melengkung (Hem)
                </text>
              </svg>
            )}

            {/* 4. POLA KERAH */}
            {activePiece === "kerah" && (
              <svg viewBox="0 0 400 300" className="w-full h-full select-none">
                <rect width="400" height="300" fill="#FAF9F5" />

                <g onClick={() => setSelectedElement("daun-kerah")} className="cursor-pointer">
                  <path
                    d="M 80,60 L 320,60 L 305,120 L 95,120 Z"
                    fill="#FFFFFF"
                    stroke="#1C1C1C"
                    strokeWidth="2.2"
                    className="hover:fill-[#F4F1EA]"
                  />
                  <text x="135" y="95" fill="#1C1C1C" fontSize="11" fontWeight="bold" fontFamily="serif">Daun Kerah (Collar Leaf)</text>
                  <text x="85" y="50" fill="#666666" fontSize="8" fontFamily="monospace">PUNCAK LANCIP</text>
                  <text x="270" y="50" fill="#666666" fontSize="8" fontFamily="monospace">PUNCAK LANCIP</text>
                </g>

                <g onClick={() => setSelectedElement("kaki-kerah")} className="cursor-pointer">
                  <path
                    d="M 85,160 C 140,150 260,150 315,160 C 330,175 320,205 305,205 C 250,195 150,195 95,205 C 80,205 70,175 85,160 Z"
                    fill="#FDFCFB"
                    stroke="#1C1C1C"
                    strokeWidth="2.2"
                    className="hover:fill-[#F4F1EA]"
                  />
                  <text x="130" y="185" fill="#1C1C1C" fontSize="11" fontWeight="bold" fontFamily="serif">Kaki Kerah (Collar Stand)</text>
                  <circle cx="95" cy="182" r="3.5" fill="#1C1C1C" />
                  <line x1="300" y1="178" x2="300" y2="186" stroke="#1C1C1C" strokeWidth="2" />
                  <text x="65" y="225" fill="#666666" fontSize="8" fontFamily="monospace">KANCING</text>
                  <text x="275" y="225" fill="#666666" fontSize="8" fontFamily="monospace">LUBANG KANCING</text>
                </g>
              </svg>
            )}

            {/* 5. LAYOUT DI ATAS KAIN */}
            {activePiece === "layout" && (
              <svg viewBox="0 0 400 300" className="w-full h-full select-none" onClick={() => setSelectedElement("selvage-lipatan")}>
                <rect x="30" y="20" width="340" height="260" fill="#F4F1EA" stroke="#1C1C1C" strokeWidth="1.5" />
                
                <line x1="30" y1="20" x2="370" y2="20" stroke="#1E40AF" strokeWidth="3" strokeDasharray="6 3" />
                <text x="120" y="14" fill="#1E40AF" fontSize="9" fontWeight="bold" fontFamily="monospace">LIPATAN KAIN (FOLD LINE)</text>

                <line x1="30" y1="280" x2="370" y2="280" stroke="#1C1C1C" strokeWidth="3" />
                <text x="110" y="295" fill="#1C1C1C" fontSize="9" fontWeight="bold" fontFamily="monospace">TEPI TENUN KAIN (SELVAGE)</text>

                <rect x="40" y="20" width="80" height="130" fill="#FFFFFF" stroke="#1C1C1C" strokeWidth="1.2" />
                <text x="45" y="70" fill="#1C1C1C" fontSize="8" fontWeight="bold" fontFamily="serif">Badan Depan (TM)</text>
                <text x="45" y="85" fill="#666666" fontSize="7" fontFamily="monospace">MENEMPEL LIPATAN</text>

                <rect x="130" y="30" width="80" height="130" fill="#FFFFFF" stroke="#1C1C1C" strokeWidth="1.2" />
                <text x="135" y="80" fill="#1C1C1C" fontSize="8" fontWeight="bold" fontFamily="serif">Badan Belakang (TB)</text>
                <text x="135" y="95" fill="#666666" fontSize="7" fontFamily="monospace">2 LEMBAR (RITSLETING)</text>

                <rect x="220" y="30" width="75" height="110" fill="#FFFFFF" stroke="#1C1C1C" strokeWidth="1.2" />
                <text x="225" y="80" fill="#1C1C1C" fontSize="8" fontWeight="bold" fontFamily="serif">2x Lengan</text>

                <rect x="305" y="30" width="55" height="50" fill="#FFFFFF" stroke="#1C1C1C" strokeWidth="1.2" />
                <text x="310" y="55" fill="#1C1C1C" fontSize="8" fontWeight="bold" fontFamily="serif">Kerah</text>

                <rect x="40" y="160" width="60" height="60" fill="#FFFFFF" stroke="#1C1C1C" strokeWidth="1.2" />
                <text x="45" y="190" fill="#1C1C1C" fontSize="8" fontWeight="bold" fontFamily="serif">Saku Dada</text>

                <rect x="110" y="170" width="250" height="95" fill="#ECE8DE" stroke="#999999" strokeWidth="1" strokeDasharray="3 2" />
                <text x="180" y="220" fill="#777777" fontSize="8" fontStyle="italic">Sisa Kain / Lapisan Leher</text>
              </svg>
            )}

            <div className="absolute bottom-2 right-2 px-2 py-1 bg-[#1C1C1C] text-[#FDFCFB] text-[9px] font-mono tracking-wider flex items-center space-x-1 border border-[#333]">
              <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
              <span>KLIK ELEMEN UNTUK MEMBEDAH</span>
            </div>
          </div>

          {/* Quick Element Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 max-w-lg">
            {[
              { id: "tm-depan", label: "Tengah Muka (TM)" },
              { id: "tb-belakang", label: "Tengah Belakang (TB)" },
              { id: "kupnat-pinggang", label: "Kupnat Pinggang" },
              { id: "kupnat-samping", label: "Kupnat Samping" },
              { id: "kerung-leher", label: "Kerung Leher" },
              { id: "kerung-lengan", label: "Kerung Lengan" },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setSelectedElement(chip.id)}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider font-mono transition-all border ${
                  selectedElement === chip.id
                    ? "bg-[#1C1C1C] text-[#FDFCFB] border-[#1C1C1C] font-bold"
                    : "bg-white text-[#666666] border-[#E0DED7] hover:border-[#1C1C1C] hover:text-[#1C1C1C]"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Detail Inspection Panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[#FFFFFF] flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono font-semibold text-[#D4AF37] uppercase tracking-[0.25em] mb-1">
              <Info className="w-3.5 h-3.5" />
              <span>{currentInfo.subtitle}</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-serif italic font-bold text-[#1C1C1C] mb-3">
              {currentInfo.title}
            </h4>

            {currentInfo.formula && (
              <div className="mb-4 p-3 bg-[#FAF8F3] border border-[#E8E2D5] text-[#1C1C1C]">
                <div className="text-[9px] uppercase font-mono tracking-widest text-[#888888] mb-0.5">
                  Formula Perhitungan:
                </div>
                <div className="font-mono text-xs font-bold text-[#1C1C1C]">
                  {currentInfo.formula}
                </div>
              </div>
            )}

            <div className="p-4 bg-[#FDFCFB] border border-[#EAE8E3] text-xs sm:text-sm text-[#333333] leading-relaxed mb-4">
              {currentInfo.desc}
            </div>

            <div className="p-4 bg-[#1C1C1C] text-[#FDFCFB] border border-[#1C1C1C] text-xs">
              <div className="flex items-center space-x-1.5 font-bold mb-1.5 text-[#D4AF37] uppercase tracking-wider text-[10px] font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Kaidah Penjahit Haute Couture:</span>
              </div>
              <p className="leading-relaxed text-stone-300 text-xs">{currentInfo.tip}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EAE8E3] flex items-center justify-between text-xs text-[#777777]">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
              <span className="text-[11px] font-medium">Standar Presisi Pola Indonesia</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest bg-[#F4F1EA] px-2 py-0.5 text-[#1C1C1C]">
              1:1 SKALA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

