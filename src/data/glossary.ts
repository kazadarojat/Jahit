import { GlossaryItem, QuizItem } from "../types";

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: "TM (Tengah Muka)",
    pronunciation: "Tengah Muka / Center Front (CF)",
    category: "Istilah Pola",
    definition: "Garis tengah vertikal pada pola badan depan pakaian yang membagi tubuh depan menjadi dua sisi simetris (kiri dan kanan).",
    usageExample: "Pola depan blus diletakkan dengan garis TM tepat menempel di lipatan kain.",
    tips: "Jika baju berkancing depan, garis TM adalah titik temu kancing saat dipasang."
  },
  {
    term: "TB (Tengah Belakang)",
    pronunciation: "Tengah Belakang / Center Back (CB)",
    category: "Istilah Pola",
    definition: "Garis tengah vertikal pada pola badan belakang pakaian (sepanjang tulang belakang tubuh).",
    usageExample: "Ritsleting gaun biasanya dipasang pada sambungan garis TB.",
    tips: "Beri kampuh 2 s.d 2.5 cm pada TB jika akan dipasang ritsleting."
  },
  {
    term: "Kampuh (Seam Allowance)",
    category: "Teknik Jahit",
    definition: "Kelebihan kain di luar garis batas jahitan yang berfungsi sebagai ruang jahitan dan pengaman pinggiran kain.",
    usageExample: "Tambahkan kampuh 1.5 cm di sisi badan dan 3 cm pada kelim bawah rok.",
    tips: "Gunakan penggaris kampuh khusus agar lebar kampuh di seluruh pola konsisten."
  },
  {
    term: "Kupnat / Lipit Kup (Dart)",
    category: "Istilah Pola",
    definition: "Lipatan berbentuk segitiga atau wajik yang dijahit menyempit untuk membentuk lekukan tubuh alami (dada, pinggang, panggul).",
    usageExample: "Jahit kupnat pinggang depan sepanjang 12 cm dengan lebar dasar 3 cm.",
    tips: "Ujung runcing kupnat jangan dikunci maju-mundur di mesin, cukup ikat simpul benang sisa secara manual agar tidak berpunuk."
  },
  {
    term: "Kerung Lengan (Armhole / Kerung)",
    category: "Istilah Pola",
    definition: "Lubang melengkung pada badan baju tempat menyambungkan dan memasang lengan baju.",
    usageExample: "Kerung lengan depan dibuat lebih melengkung masuk ke dalam sekitar 1.5 cm dibanding kerung belakang.",
    tips: "Gunakan penggaris lengkung kerung (armhole curve ruler) untuk garis busur yang mulus."
  },
  {
    term: "Obras (Serging / Overlock)",
    category: "Teknik Jahit",
    definition: "Jahitan anyaman benang di sepanjang tepi tiras kain untuk mencegah benang kain bertiras atau terurai.",
    usageExample: "Setelah menyambung bahu, segera obras kedua tepi kampuh bersamaan atau terpisah.",
    tips: "Bisa diganti dengan tusuk zigzag (stitch width 3.5-4.0) jika belum memiliki mesin obras."
  },
  {
    term: "Kelim (Hem)",
    category: "Teknik Jahit",
    definition: "Penyelesaian tepi bawah pakaian, rok, celana, atau ujung lengan dengan cara melipat kain ke dalam lalu menjahitnya.",
    usageExample: "Kelim bawah rok dilipat selebar 3 cm lalu disom menggunakan jarum tangan.",
    tips: "Gunakan tusuk som (blind hem) untuk hasil pakaian formal yang tidak memperlihatkan benang jahit di bagian luar."
  },
  {
    term: "Rader & Karbon Jahit (Tracing Wheel & Tracing Paper)",
    category: "Alat & Mesin",
    definition: "Alat roda bergerigi atau tumpul bersama kertas karbon warna khusus kain untuk menjiplak garis pola kertas ke permukaan kain.",
    usageExample: "Gunakan rader bergigi tajam untuk kain katun tebal, dan rader tumpul (polos) untuk kain sutra/satin agar serat kain tidak rusak."
  },
  {
    term: "Arah Serat Kain (Grainline / Straight Grain)",
    category: "Istilah Pola",
    definition: "Arah memanjang tenunan benang kain yang sejajar dengan tepi tenunan pabrik (selvage).",
    usageExample: "Pastikan tanda panah grainline di pola kertas sejajar 100% dengan tepi kain selvage sebelum menggunting."
  },
  {
    term: "Serong Kain (Bias)",
    category: "Istilah Pola",
    definition: "Arah potongan kain miring 45 derajat terhadap serat lurus tenunan kain. Memiliki elastisitas alami paling lentur.",
    usageExample: "Pita bisban untuk leher dipotong pada arah serong kain (bias) agar dapat melengkung mulus mengikuti kerung leher tanpa berkerut."
  },
  {
    term: "Spul & Sekoci (Bobbin & Bobbin Case)",
    category: "Alat & Mesin",
    definition: "Gulungan benang kecil (spul) dan wadah rumah logam/plastik (sekoci) tempat benang bawah mesin jahit berada.",
    usageExample: "Pastikan tarikan benang dari sekoci tidak terlalu kencang atau longgar saat benang ditarik perlahan."
  },
  {
    term: "Viselin / Kain Keras (Interfacing)",
    category: "Jenis Kain",
    definition: "Kain pelapis berperekat di satu sisinya yang disetrika pada bagian tertentu pakaian (kerah, manset, saku, ban pinggang) agar kokoh dan berstruktur.",
    usageExample: "Gunakan viselin tipis untuk kerung leher blus dan kain keras tebal berperekat untuk kerah kemeja."
  },
  {
    term: "Katun Rayon (Rayon Cotton)",
    category: "Jenis Kain",
    definition: "Kain berbahan serat selulosa yang sangat adem, ringan, dan jatuh lembut (drapey), sangat populer untuk daster, gamis, dan blus santai.",
    usageExample: "Kain rayon menyusut pada pencucian pertama, selalu cuci dan setrika kain sebelum digunting!",
    tips: "Gunakan jarum jahit ukuran No. 11 (Microtex atau Universal) dan gunting yang sangat tajam."
  },
  {
    term: "Linen",
    category: "Jenis Kain",
    definition: "Kain serat alami rami dengan tekstur serat khas, berpori sejuk, tahan lama, dan berkarakter sedikit kaku elegan.",
    usageExample: "Sangat ideal untuk kemeja santai, blazer kasual, dan celana kulot.",
    tips: "Gunakan jarum ukuran No. 14 dan setrika suhu tinggi dengan semprotan uap air."
  }
];

export const QUIZ_ITEMS: QuizItem[] = [
  {
    id: "quiz-1",
    category: "Simbol Pola",
    question: "Apa arti dari simbol garis lurus dengan panah di kedua ujungnya pada lembaran pola jahit?",
    options: [
      "Tanda di mana ritsleting harus dipasang",
      "Arah serat kain (Grainline) yang harus sejajar dengan tepi kain tenun (selvage)",
      "Garis yang harus digunting menjadi dua bagian",
      "Tanda kerutan kain"
    ],
    correctIndex: 1,
    explanation: "Simbol panah ganda adalah 'Grainline' (Arah Serat). Garis ini wajib diletakkan sejajar dengan tepi tenunan kain agar pakaian jatuh lurus, tidak melintir dan tidak menggelembung saat dipakai."
  },
  {
    id: "quiz-2",
    category: "Simbol Pola",
    question: "Bagian pola pakaian yang memiliki tanda 'Place on Fold' (Lipatan Kain) berarti...",
    options: [
      "Harus diberi kampuh ekstra 3 cm",
      "Diletakkan menempel tepat di pinggir lipatan kain dan TIDAK diberi kampuh potong",
      "Kain harus dilipat zigzag",
      "Harus disetrika sebelum digunting"
    ],
    correctIndex: 1,
    explanation: "Tanda 'Lipatan Kain' (TM/TB Lipatan) menandakan bahwa potongan tersebut akan menjadi 1 helai utuh simetris saat kain dibuka, sehingga pinggirannya menempel di lipatan dan tidak boleh digunting atau diberi kampuh."
  },
  {
    id: "quiz-3",
    category: "Teknik Jahit",
    question: "Berapa standar lebar kampuh jahit (seam allowance) untuk sambungan sisi samping badan dan pundak pada pola pakaian umum?",
    options: [
      "0.5 cm",
      "1.5 cm hingga 2.0 cm",
      "5.0 cm",
      "8.0 cm"
    ],
    correctIndex: 1,
    explanation: "Standar industri kampuh jahit untuk sisi samping dan bahu adalah 1.5 cm s.d 2.0 cm. Sedangkan untuk kerung leher & lengan adalah 1.0 cm, dan kelim bawah 3.0 - 4.0 cm."
  },
  {
    id: "quiz-4",
    category: "Troubleshooting Mesin",
    question: "Saat menjahit, benang bagian bawah menggumpal tebal dan kusut ('sarang burung' / birdnesting). Apa penyebab paling sering?",
    options: [
      "Jarum terlalu tajam",
      "Benang atas belum terpasang sempurna di piringan pengatur tegangan (tension disc) atau pelatuk belum terlewati",
      "Kain terlalu tebal",
      "Mesin terlalu cepat dijalankan"
    ],
    correctIndex: 1,
    explanation: "Gumpalan benang di bawah kain selalu disebabkan oleh HILANGNYA TEGANGAN PADA BENANG ATAS. Pasang ulang benang atas dari awal dengan sepatu jahit dalam posisi terangkat."
  },
  {
    id: "quiz-5",
    category: "Teknik Jahit",
    question: "Untuk membuat pita bisban leher yang melengkung mulus tanpa berkerut, kain harus dipotong pada sudut...",
    options: [
      "Serat lurus (90 derajat)",
      "Serong kain / Bias (45 derajat)",
      "Serat pakan mendatar (180 derajat)",
      "Bebas sembarang arah"
    ],
    correctIndex: 1,
    explanation: "Kain yang dipotong pada arah serong (bias 45°) memiliki daya regang elastis alami sehingga bisa melengkung dengan lentur dan rata mengikuti kerung leher atau lubang ketiak."
  },
  {
    id: "quiz-6",
    category: "Kain & Bahan",
    question: "Sebelum memotong kain berbahan serat alami seperti Katun Rayon atau Linen, langkah penting apa yang harus dilakukan?",
    options: [
      "Diberi lilin jahit",
      "Dicuci terlebih dahulu (pre-wash) dan disetrika karena kain mengalami penyusutan (shrinkage)",
      "Disemprot parfum",
      "Digunting tanpa diukur"
    ],
    correctIndex: 1,
    explanation: "Kain serat alami (terutama rayon dan linen) menyusut hingga 5-10% pada pencucian pertama. Selalu cuci dan setrika sebelum memotong pola agar baju tidak kekecilan setelah pertama kali dicuci!"
  }
];
