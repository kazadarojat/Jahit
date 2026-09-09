import { PatternLessonModule, PatternSymbol } from "../types";

export const PATTERN_SYMBOLS: PatternSymbol[] = [
  {
    id: "grainline",
    name: "Grainline (Arah Serat Kain)",
    indonesianName: "Arah Serat Lurus (Panah Ganda)",
    category: "Garis & Serat",
    description: "Tanda garis lurus dengan mata panah di kedua ujungnya. Menunjukkan bahwa garis ini harus diletakkan sejajar 100% dengan tepi kain (selvage).",
    importance: "Sangat krusial. Jika arah serat miring, pakaian akan melintir saat dipakai, kelim bawah tidak rata, dan bahan jatuh tidak simetris.",
    visualType: "grainline",
    exampleTip: "Ukur jarak dari kedua ujung panah ke tepi tenunan kain (selvage). Kedua titik harus memiliki angka jarak centimeter yang persis sama sebelum disemat jarum pentul."
  },
  {
    id: "fold",
    name: "Place on Fold (Lipatan Kain)",
    indonesianName: "Tanda TM/TB pada Lipatan Kain",
    category: "Tanda Lipatan & Potongan",
    description: "Simbol kurva panah atau tulisan 'Lipatan Kain' di sepanjang tepi pola. Menunjukkan bahwa tepi pola harus diletakkan tepat di pinggir lipatan kain.",
    importance: "Bagian ini TIDAK diberi kampuh pemotongan. Saat kain dibuka setelah digunting, akan terbentuk 1 potongan simetris yang utuh (seperti dada depan atau punggung belakang).",
    visualType: "fold",
    exampleTip: "Jangan pernah menggunting tepat di garis lipatan kain! Jika tergunting, bagian tengah baju Anda akan terbelah dua."
  },
  {
    id: "dart",
    name: "Dart (Kupnat / Lipit Kup)",
    indonesianName: "Kupnat Dada & Kupnat Pinggang",
    category: "Penyesuaian & Bentuk",
    description: "Bentuk segitiga atau wajik bertitik putus-putus. Berfungsi mengubah kain datar 2 dimensi menjadi melengkung mengikuti lekuk 3 dimensi tubuh (buah dada, pinggang, panggul).",
    importance: "Menciptakan siluet pakaian yang pas badan (fitted) dan tidak menggelembung kaku.",
    visualType: "dart",
    exampleTip: "Jahit dari dasar kupnat (sisi luar) menuju ke puncak kupnat (ujung segitiga). Di ujung puncak, jangan di-backstitch/kunci mesin, melainkan tinggalkan sisa benang 10 cm lalu ikat simpul tangan agar ujungnya halus tidak berpunuk."
  },
  {
    id: "notch",
    name: "Notch (Tanda Takik / Guntingan V)",
    indonesianName: "Tanda Penyesuaian Kerung & Sisi",
    category: "Tanda Lipatan & Potongan",
    description: "Segitiga kecil atau garis pendek di tepi pola (biasanya di kerung lengan, leher, atau garis pinggang).",
    importance: "Sebagai pemandu saat menyatukan dua helai kain. 1 Takik biasanya untuk badan depan, 2 Takik untuk badan belakang.",
    visualType: "notch",
    exampleTip: "Saat memotong kain, gunting notch ke arah LUAR kampuh (sekitar 3-4 mm) agar tidak merusak garis jahitan utama di dalam kampuh."
  },
  {
    id: "seam-allowance",
    name: "Seam Allowance (Garis Kampuh)",
    indonesianName: "Kelebihan Kain untuk Jahitan",
    category: "Garis & Serat",
    description: "Jarak antara garis pola bersih (stitching line) dengan garis tepi potong kain (cutting line).",
    importance: "Memberikan ruang untuk benang jahitan, obras, dan penyesuaian ukuran bila pakaian ingin dibesarkan kelak.",
    visualType: "seam-allowance",
    exampleTip: "Standar: Kerung leher & kerung lengan = 1.0 cm; Bahu & sisi samping = 1.5 - 2.0 cm; Kelim bawah rok/blus = 3.0 - 4.0 cm."
  },
  {
    id: "gather",
    name: "Gathering Line (Garis Kerut)",
    indonesianName: "Tanda Jahitan Kerut",
    category: "Penyesuaian & Bentuk",
    description: "Garis bergelombang atau tanda panah bertuliskan 'Kerut di antara tanda bintang'.",
    importance: "Menunjukkan area di mana dua baris jahitan renggang (basting stitch) harus dibuat lalu ditarik untuk menghasilkan ruffle/kerutan indah.",
    visualType: "gather",
    exampleTip: "Jahit 2 baris sejajar dengan jarak 0.5 cm pada kampuh, lalu tarik kedua benang atas secara bersamaan untuk kerutan merata."
  },
  {
    id: "zipper-mark",
    name: "Zipper Placement (Tanda Ritsleting)",
    indonesianName: "Batas Pembuka Ritsleting",
    category: "Aksesori",
    description: "Simbol gerigi kecil atau garis berhenti (stop mark) yang menunjukkan ujung bawah gigi ritsleting.",
    importance: "Menentukan sampai mana jahitan sisi/punggung ditutup permanen dan di mana ritsleting jepang/besi dipasang.",
    visualType: "zipper-mark",
    exampleTip: "Selalu lebihkan 2 cm di bawah tanda stopper ritsleting agar tarikan ritsleting tidak macet di sudut jahitan."
  },
  {
    id: "buttonhole",
    name: "Button & Buttonhole (Kancing & Lubang Kancing)",
    indonesianName: "Tanda Posisi Kancing & Bukaan",
    category: "Aksesori",
    description: "Garis horizontal bertanda huruf 'I' di kedua ujungnya (untuk lubang) dan tanda silang 'X' (untuk posisi kancing).",
    importance: "Memastikan kancing menutup baju dengan presisi tanpa celah yang menganga di area dada.",
    visualType: "buttonhole",
    exampleTip: "Kancing paling krusial pada kemeja/blus wanita adalah di titik puncak payudara (Apex). Pastikan ada 1 kancing tepat di garis ini agar dada tidak mengintip."
  }
];

export const PATTERN_LESSONS: PatternLessonModule[] = [
  {
    id: "modul-1",
    title: "Modul 1: Anatomi Pola Dasar Busana (Sistem Dressmaking)",
    subtitle: "Memahami bagian-bagian pola badan atas depan (TM) dan badan belakang (TB)",
    level: "Dasar",
    readTime: "10 menit",
    keyTakeaways: [
      "Perbedaan pola badan depan vs badan belakang",
      "Mengapa kerung leher depan lebih dalam daripada belakang",
      "Kupnat pinggang dan kupnat dada untuk kenyamanan lekuk tubuh",
      "Rumus perhitungan pola dasar sistem Indonesia (Porrie Mulhiawan / Soen)"
    ],
    contentSections: [
      {
        heading: "1. Mengenal Pola Badan Depan (Tengah Muka / TM)",
        explanation: "Pola badan depan dibuat lebih lebar sekitar 1 s.d 2 cm dibanding pola belakang karena memperhitungkan lekuk buah dada. Ciri khas utama pola depan adalah: kerung leher melengkung lebih dalam (turun 7 - 8 cm dari titik leher), kerung lengan lebih melengkung masuk di bagian ketiak, dan terdapat kupnat dada/sisi.",
        subpoints: [
          "Lebar Pola Depan = (1/4 Lingkar Badan) + 1 cm",
          "Pinggang Depan = (1/4 Lingkar Pinggang) + 1 cm + 3 cm (Kupnat)",
          "Turun Kerung Lengan Depan = (1/2 Lingkar Kerung Lengan) atau rumus tinggi dada"
        ],
        diagramType: "pattern-body"
      },
      {
        heading: "2. Mengenal Pola Badan Belakang (Tengah Belakang / TB)",
        explanation: "Pola badan belakang biasanya dibuat dengan garis kerung leher yang landai (hanya turun 1.5 s.d 2 cm) agar menempel rapi di tengkuk leher. Pola belakang juga memiliki kupnat tegak lurus yang membentang dari garis pinggang ke arah belikat.",
        subpoints: [
          "Lebar Pola Belakang = (1/4 Lingkar Badan) - 1 cm",
          "Pinggang Belakang = (1/4 Lingkar Pinggang) - 1 cm + 3 cm (Kupnat)",
          "Pundak Belakang dibuat 0.5 cm lebih panjang dari pundak depan lalu dikendorkan sedikit saat disatukan agar fleksibel saat bergerak"
        ]
      },
      {
        heading: "3. Garis-Garis Panduan pada Lembar Pola",
        explanation: "Saat melihat lembaran pola jahit, perhatikan jenis garis yang dipakai: Garis tebal solid menandakan garis potong atau garis bentuk final; garis strip-titik-strip menandakan sumbu simetri/lipatan; garis putus-putus pendek menandakan garis bantu ukur.",
        practicalExercise: "Latihan: Ambil pita ukur, ukur lingkar badan Anda, lalu bagi 4 dan tambahkan 1 cm. Itulah lebar kertas pola depan yang harus Anda siapkan!"
      }
    ]
  },
  {
    id: "modul-2",
    title: "Modul 2: Anatomi Pola Lengan & Kerung Lengan (Sleeve Drafting)",
    subtitle: "Cara membaca pola puncak lengan (sleeve cap) dan mencocokkan keliling kerung lengan",
    level: "Menengah",
    readTime: "12 menit",
    keyTakeaways: [
      "Memahami Puncak Lengan (Cap Height) dan Keliling Kerung Lengan",
      "Perbedaan lengkungan lengan depan (lebih cekung) vs lengan belakang (lebih cembung)",
      "Trik agar lengan tidak sempit saat tangan digerakkan ke depan"
    ],
    contentSections: [
      {
        heading: "1. Struktur Pola Lengan",
        explanation: "Pola lengan berbentuk seperti lonceng atau kubah simetris namun dengan lengkungan khusus. Titik tertinggi di tengah disebut 'Puncak Lengan' (Crown/Cap). Garis mendatar di bawah puncak adalah 'Lingkar Pangkal Lengan' (Biceps line).",
        subpoints: [
          "Tinggi Puncak Lengan = (1/4 Kerung Lengan Badan) + 1 s.d 2 cm",
          "Keliling lengkungan pola lengan harus lebih panjang 1.5 - 2.5 cm dibanding keliling kerung lengan badan. Selisih ini disebut 'Ease' (kelonggaran) yang akan diserap saat menjahit agar pundak membulat cantik."
        ],
        diagramType: "pattern-sleeve"
      },
      {
        heading: "2. Menemukan Tanda Depan & Belakang pada Pola Lengan",
        explanation: "Pola lengan yang baik memiliki tanda takik (notch): Sisi depan berlengkung lebih masuk ke dalam (agar tidak menjepit ketiak depan), sedangkan sisi belakang lebih cembung untuk memberi ruang saat punggung meregang.",
        subpoints: [
          "Takik 1 (Single Notch) = Dipasang ke kerung badan depan",
          "Takik 2 (Double Notch) = Dipasang ke kerung badan belakang",
          "Titik Puncak (Center Notch) = Dipasang tepat bertemu dengan jahitan sambungan bahu"
        ]
      }
    ]
  },
  {
    id: "modul-3",
    title: "Modul 3: Pola Rok & Bawahan (Skirts & Flare Drafting)",
    subtitle: "Dari Pola Rok Lurus (Span/Pencil), Rok A-Line, hingga Rok Lingkar (Circle Skirt)",
    level: "Dasar",
    readTime: "8 menit",
    keyTakeaways: [
      "Mengontrol kupnat pinggang rok agar tidak menggembung di panggul",
      "Cara mengembangkan rok lurus menjadi Rok A-Line elegan",
      "Rumus lingkaran (Radius = Lingkar Pinggang / 3.14 atau 6.28) untuk rok klok"
    ],
    contentSections: [
      {
        heading: "1. Pola Dasar Rok Suai (Pencil / Straight Skirt)",
        explanation: "Pola dasar rok terdiri dari pola depan dan belakang. Bagian atas dibentuk melengkung turun 1.5 cm di tengah muka dan ditutup dengan 1 atau 2 kupnat pinggang dengan panjang kupnat 10-12 cm.",
        subpoints: [
          "Tinggi Panggul standar = 18 - 20 cm dari garis pinggang",
          "Lebar Pola Rok Depan = (1/4 Lingkar Panggul) + 1 cm",
          "Lebar Pola Rok Belakang = (1/4 Lingkar Panggul) - 1 cm"
        ],
        diagramType: "pattern-skirt"
      },
      {
        heading: "2. Mengubah Pola Menjadi Rok A-Line",
        explanation: "Cukup buka pola dasar rok, tarik garis dari ujung bawah kupnat ke kelim bawah, lalu gunting garis tersebut dan tutup kupnat pinggang sebagian. Bawah rok akan otomatis melebar dengan jatuhan lipit yang alami tanpa perlu menarik garis miring sembarangan!",
        practicalExercise: "Latihan rumus Rok Setengah Lingkar: Jika pinggang 70 cm, Jari-jari lingkaran = (70 - 2) / 3.14 = 21.6 cm. Tarik busur radius 21.6 cm di sudut kain lipat!"
      }
    ]
  },
  {
    id: "modul-4",
    title: "Modul 4: Pola Kerah & Bukaan Busana (Collars & Plackets)",
    subtitle: "Pola Kerah Kemeja (Board Collar), Kerah Shanghai/Mandarin, dan Kerah Rebah (Peter Pan)",
    level: "Menengah",
    readTime: "11 menit",
    keyTakeaways: [
      "Perbedaan Daun Kerah (Collar Leaf) dan Kaki Kerah (Collar Stand / Band)",
      "Mencocokkan ukuran kerah dengan keliling lingkar leher badan baju",
      "Pemasangan kain keras (interfacing/viselin) pada pola kerah"
    ],
    contentSections: [
      {
        heading: "1. Anatomi Kerah Kemeja Klasik (2 Bagian)",
        explanation: "Kerah kemeja profesional terdiri dari dua pola: Kaki Kerah (Band/Stand) yang menempel ke leher baju, dan Daun Kerah (Collar Point) yang terlipat di atasnya.",
        subpoints: [
          "Panjang Pola Kaki Kerah = 1/2 Lingkar Leher Baju + 1.5 cm (lidah kancing)",
          "Pola daun kerah atas harus dipotong 2-3 mm lebih besar dari daun kerah bawah agar saat dibalik, jahitan sambungan tersembunyi di bawah kerah."
        ],
        diagramType: "pattern-collar"
      },
      {
        heading: "2. Pola Lapisan Leher (Facing / Serip / Depun)",
        explanation: "Untuk baju tanpa kerah (blus leher bulat atau V), dibuat pola lapisan leher selebar 3-4 cm yang menjiplak persis bentuk kerung leher badan. Lapisan ini dilapisi viselin tipis agar leher kokoh dan rapi.",
        subpoints: [
          "Facing dipotong searah serat kain badan",
          "Beri guntingan kecil (clipping) di kampuh melengkung sebelum dibalik ke bagian dalam"
        ]
      }
    ]
  },
  {
    id: "modul-5",
    title: "Modul 5: Layout Pola di Atas Kain & Pemotongan Presisi",
    subtitle: "Teknik melipat kain, efisiensi bahan, dan penambahan kampuh jahit",
    level: "Dasar",
    readTime: "9 menit",
    keyTakeaways: [
      "Cara melipat kain memanjang (Lengthwise Fold) vs melintang (Crosswise Fold)",
      "Aturan hemat kain: menyusun pola besar terlebih dahulu baru pola kecil",
      "Memastikan arah serat kain tidak meleset dengan bantuan penggaris"
    ],
    contentSections: [
      {
        heading: "1. Prinsip Utama Meletakkan Pola (Pattern Layout)",
        explanation: "Bentangkan kain di atas meja datar. Lipat kain dengan sisi baik kain (Right Side) saling berhadapan di dalam, dan sisi buruk (Wrong Side) di luar untuk memudahkan penandaan rader atau kapur jahit.",
        subpoints: [
          "Pola yang memerlukan tanda 'Lipatan Kain' diletakkan tepat menempel pada lipatan",
          "Pola yang berpasangan (seperti 2 badan depan kemeja, 2 lengan) dipotong sekaligus di atas 2 lapis kain",
          "Pola kecil (kerah, saku, ban pinggang) disisipkan di sela-sela sisa kain pola badan"
        ],
        diagramType: "fabric-layout"
      },
      {
        heading: "2. Menandai Garis Jahitan (Rader & Karbon Jahit)",
        explanation: "Gunakan kertas karbon jahit dan rader gerigi (atau kapur jahit segitiga) untuk mentransfer garis kupnat dan garis jahitan dari kertas pola ke lembaran kain lapis bawah dan lapis atas.",
        practicalExercise: "Gunakan rader bergigi halus untuk kain katun/linen, dan rader tumpul (tanpa gigi) untuk kain satin/sutra agar serat tidak koyak."
      }
    ]
  }
];
