import { InteractiveVideo } from "../types";

export const VIDEO_TUTORIALS: InteractiveVideo[] = [
  {
    id: "video-pola-dasar",
    title: "Masterclass: Cara Praktis Membaca & Menggambar Pola Dasar Baju Wanita",
    instructor: "Ibu Deswita (Master Tailor & Instruktur Busana)",
    duration: "18:45",
    category: "Pola & Pemotongan",
    difficulty: "Pemula",
    youtubeEmbedId: "dQw4w9WgXcQ", // Safe fallback embed code with interactive video simulator
    overview: "Tutorial visual komprehensif mengupas tuntas cara membaca kertas pola, memahami tanda TM/TB, arah serat kain lurus, dan rumus dasar mengukur badan agar baju pas sempurna di tubuh tanpa berkerut di ketiak.",
    materialsUsed: [
      "Kertas Payung / Kertas Pola Cokelat",
      "Penggaris Pola Lengkung (Penggaris Panggul & Kerung Lengan)",
      "Pita Ukur Metlin",
      "Pensil 2B & Spidol Merah-Biru (Merah = Depan, Biru = Belakang)"
    ],
    milestones: [
      {
        timeSeconds: 30,
        timeLabel: "00:30",
        title: "Pengenalan Anatomi Lembar Pola",
        description: "Mengetahui perbedaan garis potong, garis jahit, dan arti warna merah (pola badan depan) vs biru (pola badan belakang).",
        keyTechnique: "Identifikasi Garis Pola",
        quizQuestion: {
          question: "Dalam konvensi tata busana Indonesia, garis pola berwarna merah umumnya menandakan...",
          options: [
            "Pola Badan Depan (Tengah Muka / TM)",
            "Pola Badan Belakang (Tengah Belakang / TB)",
            "Lapisan Kerah",
            "Garis Obras"
          ],
          correctIndex: 0,
          explanation: "Warna merah secara universal dalam tata busana Indonesia digunakan untuk menandai pola bagian depan, sedangkan warna biru untuk pola bagian belakang."
        }
      },
      {
        timeSeconds: 210,
        timeLabel: "03:30",
        title: "Memahami Arah Serat Kain (Grainline Arrow)",
        description: "Mengapa meletakkan tanda panah serat kain sejajar dengan tepi tenunan kain (selvage) sangat penting agar pakaian tidak melintir.",
        keyTechnique: "Pengukuran Paralel Grainline",
        quizQuestion: {
          question: "Apa yang terjadi jika memotong pola miring dari arah serat kain (grainline) tanpa sengaja?",
          options: [
            "Baju akan lebih cepat selesai dijahit",
            "Pakaian akan melintir saat dipakai dan jatuhan kain tidak rata",
            "Kain menjadi tahan air",
            "Tidak berpengaruh apa-apa"
          ],
          correctIndex: 1,
          explanation: "Arah serat lurus menahan gravitasi kain. Jika miring, benang pakan dan lusi meregang asimetris sehingga baju melintir dan kelim bergelombang."
        }
      },
      {
        timeSeconds: 450,
        timeLabel: "07:30",
        title: "Teknik Menghitung & Menggambar Kupnat",
        description: "Rumus menentukan titik puncak payudara (Apex) dan lebar kupnat pinggang 3 cm.",
        keyTechnique: "Pemberian Kupnat Lekuk Tubuh"
      },
      {
        timeSeconds: 680,
        timeLabel: "11:20",
        title: "Menggambar Kerung Lengan (Armhole) yang Pas",
        description: "Menggunakan penggaris lengkung kerung lengan agar bagian ketiak tidak menusuk dan tidak sempit saat tangan diangkat.",
        keyTechnique: "Kelengkungan Kerung Lengan Depan vs Belakang"
      },
      {
        timeSeconds: 980,
        timeLabel: "16:20",
        title: "Menambahkan Kampuh & Tanda Takik (Notches)",
        description: "Memberikan jarak kampuh 1.5 cm di bahu/sisi, 1 cm di leher/kerung lengan, dan guntingan notch pemandu jahitan.",
        keyTechnique: "Seam Allowance & Notching"
      }
    ]
  },
  {
    id: "video-mesin-jahit",
    title: "Panduan Pengoperasian Mesin Jahit Rumah Tangga & Setting Tegangan Benang",
    instructor: "Pak Hendra (Teknisi & Instruktur Menjahit)",
    duration: "14:20",
    category: "Dasar Mesin",
    difficulty: "Pemula",
    youtubeEmbedId: "dQw4w9WgXcQ",
    overview: "Belajar mengoperasikan mesin jahit portable/klasik: memasang spul sekoci, alur benang atas ke pelatuk (take-up lever), mengatur setikan lurus/zigzag, dan mengatasi benang kusut 'sarang burung' seketika.",
    materialsUsed: [
      "Mesin Jahit Portable / High Speed",
      "Benang Jahit Spun Polyester",
      "Kain Perca Katun untuk Uji Coba Jahitan",
      "Spul & Sekoci"
    ],
    milestones: [
      {
        timeSeconds: 20,
        timeLabel: "00:20",
        title: "Menggulung Spul & Memasang ke Dalam Sekoci",
        description: "Cara memasukkan benang ke celah pegas sekoci hingga terdengar bunyi 'klik'.",
        keyTechnique: "Pemasangan Bobbin & Bobbin Case"
      },
      {
        timeSeconds: 190,
        timeLabel: "03:10",
        title: "Alur Benang Atas Menuju Jarum Jahit",
        description: "Langkah krusial: selalu angkat sepatu jahit (presser foot) saat memasukkan benang agar piringan pengatur tensi terbuka.",
        keyTechnique: "Threading Path & Tension Disc",
        quizQuestion: {
          question: "Mengapa sepatu jahit (presser foot) HARUS dalam posisi terangkat saat memasang benang atas?",
          options: [
            "Agar jarum tidak bergerak",
            "Agar piringan penegang (tension disc) terbuka sehingga benang masuk sempurna ke jalurnya",
            "Agar lampu mesin jahit menyala",
            "Agar pedal gas tidak terinjak"
          ],
          correctIndex: 1,
          explanation: "Saat sepatu diangkat, piringan tensi merenggang. Jika sepatu turun, piringan menjepit sehingga benang hanya lewat di luar dan menyebabkan sarang burung di bawah kain!"
        }
      },
      {
        timeSeconds: 380,
        timeLabel: "06:20",
        title: "Menyesuaikan Tegangan Benang (Tension Dial)",
        description: "Membaca keseimbangan jahitan: benang atas dan bawah harus mengunci tepat di tengah ketebalan kain.",
        keyTechnique: "Perfect Balanced Stitch"
      },
      {
        timeSeconds: 610,
        timeLabel: "10:10",
        title: "Latihan Jahit Lurus, Belokan 90 Derajat, dan Kurva Melengkung",
        description: "Teknik menancapkan jarum di sudut sebelum memutar kain (Pivot Needle).",
        keyTechnique: "Corner Pivoting"
      }
    ]
  },
  {
    id: "video-ritsleting-jepang",
    title: "Teknik Menjahit Ritsleting Jepang (Invisible Zipper) Rapi Tanpa Celah",
    instructor: "Ibu Deswita",
    duration: "11:15",
    category: "Teknik Halus",
    difficulty: "Menengah",
    youtubeEmbedId: "dQw4w9WgXcQ",
    overview: "Rahasia memasang ritsleting jepang pada gaun atau rok agar benar-benar tersembunyi rata dan jahitan pinggang kiri-kanan sejajar presisi.",
    materialsUsed: [
      "Sepatu Jahit Ritsleting Jepang (Plastik / Besi Alur)",
      "Ritsleting Jepang 50 cm",
      "Kain Utama & Kain Keras Tipis Penstabil Kampuh"
    ],
    milestones: [
      {
        timeSeconds: 15,
        timeLabel: "00:15",
        title: "Menyetrika Gigi Ritsleting Jepang",
        description: "Membuka gulungan gigi ritsleting dengan setrika suhu rendah agar jarum bisa menjahit sedekat mungkin ke jalur gigi.",
        keyTechnique: "Zipper Coil Pre-Pressing"
      },
      {
        timeSeconds: 180,
        timeLabel: "03:00",
        title: "Pemberian Viselin Tipis di Kampuh Ritsleting",
        description: "Mencegah kain bergelombang atau melar saat dijahit ritsleting.",
        keyTechnique: "Stabilizing Seam Allowance"
      },
      {
        timeSeconds: 360,
        timeLabel: "06:00",
        title: "Menjahit Gigi Ritsleting dengan Sepatu Khusus",
        description: "Memasukkan gigi ritsleting ke dalam alur terowongan sepatu jahit dan melaju perlahan.",
        keyTechnique: "Invisible Zipper Foot Stitching"
      },
      {
        timeSeconds: 520,
        timeLabel: "08:40",
        title: "Menutup Sisa Jahitan Bawah Ritsleting",
        description: "Mengganti dengan sepatu ritsleting biasa untuk menutup sambungan belahan bawah tanpa kerut.",
        keyTechnique: "Lower Seam Closing"
      }
    ]
  }
];
