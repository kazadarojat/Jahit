import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Helper to initialize Google GenAI safely with User-Agent header
  const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "JahitPedia API", timestamp: new Date().toISOString() });
  });

  // AI Sewing & Pattern Assistant Endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history = [], context = "general" } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Pesan tidak boleh kosong" });
      }

      const ai = getAI();
      if (!ai) {
        // High quality fallback responses if API key is not yet configured
        return res.json({
          reply: generateSmartFallbackReply(message, context),
          source: "offline-knowledge-base",
        });
      }

      const systemInstruction = `Anda adalah "Guru Jahit & Ahli Pola Busana AI" dari JahitPedia, seorang master penjahit, perancang pola (pattern maker) profesional, dan instruktur tata busana berpengalaman di Indonesia.

Karakter & Gaya Anda:
- Ramah, mendidik, terstruktur, praktis, dan menggunakan istilah tata busana Indonesia yang tepat (seperti TM/Tengah Muka, TB/Tengah Belakang, Kerung Lengan, Kupnat, Kampuh, Obras, Bisban, Rader, Kain Serat Lurus/Bias, Ritsleting Jepang).
- Berikan langkah-langkah yang jelas, solusi troubleshoot jahit (misal benang kusut, jahitan loncat, kain berkerut), atau rumus pola yang mudah dipahami.
- Format teks rapi dengan bullet points, bold untuk istilah penting, dan langkah berurutan bila menjelaskan teknik.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [
          {
            text: `${systemInstruction}\n\nRiwayat Percakapan Sebelumnya: ${JSON.stringify(
              history.slice(-4)
            )}\n\nKonteks Halaman: ${context}\nPertanyaan Pengguna: ${message}`,
          },
        ],
      });

      const replyText = response.text || "Mohon maaf, saya belum bisa memproses pertanyaan ini saat ini. Silakan coba lagi.";
      return res.json({ reply: replyText, source: "gemini" });
    } catch (error: any) {
      console.error("Error in /api/gemini/chat:", error);
      const fallback = generateSmartFallbackReply(req.body.message || "", req.body.context || "general");
      return res.json({
        reply: fallback,
        source: "fallback-on-error",
        errorNote: error.message,
      });
    }
  });

  // AI Pattern Drafting & Fabric Calculator Endpoint
  app.post("/api/gemini/pattern-analysis", async (req, res) => {
    try {
      const { garmentType, userMeasurements, fabricType, designNotes } = req.body;
      const ai = getAI();

      if (!ai) {
        return res.json({
          analysis: generateFallbackPatternAnalysis(garmentType, userMeasurements, fabricType),
          source: "offline-template",
        });
      }

      const prompt = `Buatkan panduan pembuatan pola dan rincian kebutuhan kain untuk pakaian berikut:
- Jenis Pakaian: ${garmentType || "Blus Wanita / Kemeja"}
- Ukuran Badan: ${JSON.stringify(userMeasurements || {})}
- Jenis Kain yang Direncanakan: ${fabricType || "Katun Rayon"}
- Catatan Tambahan/Model: ${designNotes || "Model standar dengan kupnat pinggang"}

Berikan output berupa:
1. Rekomendasi Kebutuhan Kain (meter & lebar kain 115cm / 150cm).
2. Rumus & Angka Riil Pola Dasar (misal: 1/4 Lingkar Badan + 1cm = ... cm, Kerung Lengan, Turun Pinggang).
3. Urutan Pemotongan & Arah Serat Kain (Layout Pola di atas Kain).
4. Tips Jahit Khusus untuk jenis kain tersebut (ukuran jarum, tensi benang, jenis setrika).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      return res.json({
        analysis: response.text || "Gagal membuat kalkulasi pola.",
        source: "gemini",
      });
    } catch (error: any) {
      console.error("Error in /api/gemini/pattern-analysis:", error);
      return res.json({
        analysis: generateFallbackPatternAnalysis(
          req.body.garmentType,
          req.body.userMeasurements,
          req.body.fabricType
        ),
        source: "fallback-on-error",
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JahitPedia Server running on http://0.0.0.0:${PORT}`);
  });
}

// Helper smart offline fallback generator
function generateSmartFallbackReply(message: string, context: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("pola") || lower.includes("simbol") || lower.includes("tanda")) {
    return `### 📐 Panduan Memahami Tanda & Simbol Pola Jahit:

1. **Arah Serat (Grainline / Straight Grain - Tanda Panah Lurus):**
   - Garis panah lurus menunjukkan bahwa pola harus diletakkan sejajar dengan tepi kain (selvage) agar pakaian jatuh lurus, tidak melintir atau melar tidak rata.
2. **Tanda Lipatan Kain (Fold / TM - TB):**
   - Garis kurva panah atau tulisan "Lipatan Kain" berarti tepi pola diletakkan tepat pada lipatan bahan. Saat dipotong, bagian ini tidak diberi kampuh dan akan menjadi 1 helai utuh saat dibuka.
3. **Kupnat (Darts - Bentuk Segitiga):**
   - Berfungsi membentuk lekuk tubuh (dada/pinggang). Jahit dari dasar yang lebar menuju ujung runcing tanpa dikunci mati di ujung runcing (cukup ikat simpul manual agar tidak berkerut).
4. **Notch (Tanda Guntingan V kecil):**
   - Tanda kunci untuk mencocokkan potongan depan dan belakang (misal kerung lengan badan dengan puncak lengan). 1 takik = badan depan, 2 takik = badan belakang.
5. **Garis Kampuh (Seam Allowance):**
   - Standar kampuh jahit: **1.5 cm** untuk sambungan samping/bahu, **1 cm** untuk kerung lengan & leher, **3 - 4 cm** untuk kelim bawah (hem).`;
  }

  if (lower.includes("loncat") || lower.includes("putus") || lower.includes("kusut") || lower.includes("sarang burung") || lower.includes("macet")) {
    return `### 🧵 Solusi Masalah Jahitan & Mesin Jahit:

1. **Benang Bawah Menggumpal ("Sarang Burung" / Birdnesting):**
   - **Penyebab Utama:** Benang atas tidak terpasang dengan benar di piringan pengatur tegangan (tension disc) atau pelatuk benang (take-up lever) terlewat.
   - **Solusi:** Angkat sepatu jahit (presser foot), pasang ulang benang atas dari spul awal hingga ke jarum. Pastikan sekoci (bobbin case) bersih dari debu kain.
2. **Jahitan Loncat-Loncat (Skipped Stitches):**
   - **Penyebab:** Jarum tumpul/bengkok, salah tipe jarum (misal kain stretch pakai jarum katun biasa), atau jarum terpasang terbalik.
   - **Solusi:** Ganti jarum baru ukuran No. 11/14 (untuk katun) atau jarum *Ballpoint / Stretch* No. 11 (untuk jersey/kaos). Pasang sisi datar jarum menghadap ke belakang/sesuai petunjuk mesin.
3. **Kain Berkerut Saat Dijahit (Puckering):**
   - **Penyebab:** Tegangan benang atas terlalu kencang atau tarikan kain tidak seimbang.
   - **Solusi:** Kurangi angka tegangan benang (misal dari 5 turunkan ke 3-4) dan gunakan panjang setikan lebih renggang (2.5 - 3.0 mm).`;
  }

  if (lower.includes("kain") || lower.includes("meter") || lower.includes("kebutuhan")) {
    return `### 👗 Estimasi Kebutuhan Kain Standar (Lebar Kain 150 cm):

- **Blus Lengan Pendek:** 1.25 – 1.5 meter
- **Blus Lengan Panjang:** 1.5 – 1.75 meter
- **Kemeja Pria Lengan Panjang:** 1.75 – 2.0 meter
- **Rok A-Line / Rok Span Panjang:** 1.5 – 1.75 meter
- **Rok Setengah Lingkar (Midi/Maxi):** 2.0 – 2.5 meter
- **Rok Klok Penuh (Full Circle):** 3.0 – 3.5 meter
- **Celana Kulot Panjang:** 1.75 – 2.0 meter
- **Gamis / Dress Panjang Standar:** 2.5 – 3.0 meter (tambahkan 0.5m jika berfuring atau banyak ruffle/lipit).

*Tips:* Untuk kain lebar 115 cm (biasa pada batik/katun lokal), kalikan kebutuhan kain di atas dengan 1.3x sampai 1.5x.`;
  }

  return `### ✂️ Tips & Bimbingan Jahit dari JahitPedia:

Halo! Saya siap membantu belajar menjahit Anda:
- **Pola Dasar:** Mulai dari mengukur badan yang tepat (Lingkar Badan, Lingkar Pinggang, Panjang Punggung, Lebar Muka).
- **Simbol Pola:** Pelajari perbedaan garis putus-putus (garis bantu/lipatan), tanda panah serat kain lurus, serta tanda kupnat.
- **Urutan Menjahit Pakaian Standar:** 
  1. Jahit kupnat & saku (jika ada).
  2. Sambung garis bahu depan & belakang.
  3. Pasang kerah atau lapisan leher (facing).
  4. Pasang lengan ke kerung badan.
  5. Jahit sambungan sisi badan terus ke bawah lengan dalam 1 tarikan jahit.
  6. Penyelesaian kelim bawah (hemming) dan lubang/kancing.

Ada bagian tertentu yang ingin Anda tanyakan atau konsultasikan?`;
}

function generateFallbackPatternAnalysis(garmentType: string, measurements: any, fabricType: string): string {
  return `### 📋 Rancangan Pola & Kebutuhan Bahan: ${garmentType || "Busana Pilihan"}

#### 1. Estimasi Bahan & Alat:
- **Kebutuhan Kain:** 1.75 - 2.25 Meter (Lebar 150 cm) atau 2.5 - 3.0 Meter (Lebar 115 cm) jenis **${fabricType || "Katun / Rayon"}**.
- **Perlengkapan Tambahan:** Viselin / kain keras tipis 0.5m, benang jahit senada, ritsleting jepang 50cm (jika diperlukan), kancing 5-7 butir.
- **Jarum:** Ukuran No. 11 atau No. 14 (tipe Universal / Microtex).

#### 2. Rincian Ukuran & Rumus Pola Dasar (Sistem Indonesia):
- **Badan Depan (TM):**
  - Lebar Pola = (1/4 Lingkar Badan) + 1 cm
  - Lingkar Pinggang = (1/4 Lingkar Pinggang) + 1 cm + 3 cm (Kupnat)
  - Turun Kerung Leher = 7 - 8 cm
- **Badan Belakang (TB):**
  - Lebar Pola = (1/4 Lingkar Badan) - 1 cm
  - Lingkar Pinggang = (1/4 Lingkar Pinggang) - 1 cm + 3 cm (Kupnat)
  - Turun Kerung Leher = 1.5 - 2 cm
- **Lengan:**
  - Tinggi Puncak Lengan = (1/4 Kerung Lengan) + 1 s.d 2 cm
  - Panjang Lengan sesuai pengukuran dari pundak ke pergelangan.

#### 3. Kampuh Pemotongan Kain:
- Leher & Kerung Lengan: **1.0 cm**
- Sambungan Bahu & Sisi: **1.5 - 2.0 cm**
- Kelim Bawah Pakaian / Lengan: **3.0 - 4.0 cm**`;
}

startServer();
