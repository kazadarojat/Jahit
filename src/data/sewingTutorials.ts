import { SewingProject } from "../types";

export const SEWING_PROJECTS: SewingProject[] = [
  {
    id: "rok-aline-pemula",
    title: "Membuat Rok A-Line Feminin Pemula",
    subtitle: "Proyek pertama terbaik: belajar ukur badan, kupnat, ritsleting jepang, dan kelim",
    category: "Pemula",
    duration: "2 - 3 Jam",
    difficulty: "Mudah",
    fabricRequirement: "1.5 Meter Kain Katun / Linen / Drill Ringan (Lebar 150 cm)",
    toolsNeeded: [
      "Mesin Jahit & Jarum Universal No. 11/14",
      "Sepatu Ritsleting Jepang (Invisible Zipper Foot)",
      "Ritsleting Jepang 20 - 25 cm senada",
      "Kain Keras (Viselin) 0.25 meter untuk Ban Pinggang",
      "Pita Ukur, Kapur Jahit, Rader & Kertas Karbon Jahit",
      "Gunting Kain & Jarum Pentul"
    ],
    description: "Panduan lengkap dari nol membuat rok A-line cantik yang nyaman dipakai sehari-hari. Anda akan mempraktikkan cara menjahit kupnat pinggang yang rata, memasang ritsleting jepang yang tersembunyi rapi, menyatukan ban pinggang berlapis viselin, dan penyelesaian kelim bawah.",
    tags: ["Rok", "Pemula", "Kupnat", "Ritsleting Jepang", "Ban Pinggang"],
    thumbnailColor: "from-rose-500/20 to-amber-500/10",
    videoTutorialId: "video-rok-aline",
    relatedPatternId: "modul-3",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Mengambil Ukuran & Memotong Pola Rok",
        instruction: "Ukur Lingkar Pinggang, Lingkar Panggul (turun 18 cm dari pinggang), dan Panjang Rok yang diinginkan.",
        details: [
          "Siapkan 1 helai Pola Depan (diletakkan pada Lipatan Kain) dan 2 helai Pola Belakang (dengan kampuh ritsleting 2 cm di TB).",
          "Tambahkan kampuh jahit: Pinggang 1.0 cm, Sisi Samping 1.5 cm, Tengah Belakang 2.0 cm, Kelim Bawah 3.5 cm.",
          "Gunting kain dengan gunting tajam tanpa mengangkat kain tinggi-tinggi dari meja."
        ],
        tips: "Semati jarum pentul setiap 10 cm sebelum menggunting agar lapisan kain bawah tidak bergeser.",
        diagramSvgType: "pattern-cut"
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Menandai & Menjahit Kupnat Depan & Belakang",
        instruction: "Jahit 2 kupnat pada badan depan dan 2 kupnat pada badan belakang.",
        details: [
          "Lipat kain tepat di sumbu tengah kupnat dengan sisi baik kain saling berhadapan.",
          "Semati jarum pentul melintang pada garis jahit kupnat.",
          "Mulai menjahit dari bagian atas pinggang (dasar kupnat yang lebar) menuju ujung runcing (puncak kupnat).",
          "Di ujung runcing, kurangi kecepatan dan biarkan jarum keluar perlahan. Jangan di-backstitch, sisakan benang 8 cm lalu ikat simpul manual."
        ],
        tips: "Setrika kupnat badan depan mengarah ke arah Tengah Muka (TM), dan kupnat belakang mengarah ke Tengah Belakang (TB).",
        diagramSvgType: "dart-stitch"
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Memasang Ritsleting Jepang di Tengah Belakang",
        instruction: "Pasang ritsleting jepang pada belahan tengah belakang sebelum menyatukan sisi rok.",
        details: [
          "Buka ritsleting, setrika gigi ritsleting perlahan dengan suhu rendah agar giginya terbuka tegak.",
          "Letakkan ritsleting dengan sisi baik menghadap sisi baik kain belakang.",
          "Gunakan Sepatu Ritsleting Jepang, posisikan jarum sedekat mungkin ke jalur gigi ritsleting tanpa menabrak gigi plastiknya.",
          "Jahit dari atas ke bawah hingga batas stopper, lalu ulangi untuk sisi sebelahnya."
        ],
        warning: "Pastikan garis pinggang kiri dan kanan sejajar sempurna saat ritsleting ditutup! Periksa sebelum menjahit jahitan permanen.",
        diagramSvgType: "zipper-install"
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Menjahit Sisi Samping & Merapikan Kampuh (Obras)",
        instruction: "Satukan rok depan dan rok belakang pada garis pinggul dan sisi rok.",
        details: [
          "Temukan sisi baik rok depan dan rok belakang, satukan dengan jarum pentul di garis sisi.",
          "Jahit dengan kampuh 1.5 cm dari atas pinggang lurus ke kelim bawah.",
          "Selesaikan tepi kain dengan mesin obras atau tusuk zigzag pada mesin jahit rumah tangga.",
          "Buka kampuh dan setrika pipih (pressed open) dari sisi dalam agar jahitan jatuh halus."
        ],
        diagramSvgType: "seam-types"
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "Memasang Ban Pinggang Berpelapis Viselin",
        instruction: "Pasang ban pinggang selebar 3 - 4 cm yang telah diberi perekat kain keras.",
        details: [
          "Potong kain ban pinggang selebar (2 x lebar jadi + 2 cm kampuh) dan panjang (Lingkar Pinggang + 4 cm untuk lidah hak).",
          "Rekatkan viselin pada separuh lebar ban pinggang menggunakan setrika panas sedang.",
          "Jahit ban pinggang ke pinggang rok dengan kampuh 1 cm, lalu lipat ke bagian dalam dan tindas rapi dari sisi luar (stitch in the ditch).",
          "Pasang kancing kait (hak rok) di ujung ban pinggang tepat di atas ritsleting."
        ]
      },
      {
        id: "step-6",
        stepNumber: 6,
        title: "Penyelesaian Kelim Bawah (Hemming)",
        instruction: "Ratakan bagian bawah rok dan selesaikan keliman rok.",
        details: [
          "Obras tepi bawah rok.",
          "Lipat kelim selebar 3 cm ke arah dalam, setrika garis lipatan agar tajam dan rapi.",
          "Jahit kelim menggunakan tusuk som/flanel tangan (untuk hasil mewah tanpa garis jahit luar) atau jahit mesin lurus 0.2 cm dari tepi lipatan obras.",
          "Setrika akhir seluruh rok dengan uap air."
        ],
        diagramSvgType: "hem-fold"
      }
    ]
  },
  {
    id: "blus-kasual-wanita",
    title: "Membuat Blus Kasual Lengan Pendek (Casual Blouse)",
    subtitle: "Belajar pola badan dasar, lapisan leher leher bulat (facing), dan jahit lengan",
    category: "Pemula",
    duration: "3 - 4 Jam",
    difficulty: "Mudah",
    fabricRequirement: "1.5 Meter Katun Rayon / Katun Jepang / Linen Halus",
    toolsNeeded: [
      "Mesin Jahit & Benang Katun Senada",
      "Viselin Tipis 0.3 meter untuk Facing Leher",
      "Kapur Jahit & Rader",
      "Gunting Zigzag / Mesin Obras",
      "Pita Ukur & Jarum Pentul"
    ],
    description: "Proyek pembuatan baju atasan wanita santai yang nyaman. Mempelajari cara membuat pola dasar blus, memotong kain searah serat, menjahit lapisan kerung leher yang rata tanpa gelembung, dan memasang kerung lengan dengan teknik ease yang presisi.",
    tags: ["Blus", "Atasan", "Facing Leher", "Lengan", "Pemula"],
    thumbnailColor: "from-sky-500/20 to-teal-500/10",
    videoTutorialId: "video-blus-basic",
    relatedPatternId: "modul-1",
    steps: [
      {
        id: "step-b1",
        stepNumber: 1,
        title: "Persiapan Pola Badan, Lengan & Facing Leher",
        instruction: "Gunting potongan kain: 1 Badan Depan (Lipatan TM), 1 Badan Belakang (Lipatan TB atau 2 potong dengan bukaan kancing belakang), 2 Lengan, dan Facing Leher Depan-Belakang.",
        details: [
          "Beri kampuh 1.0 cm pada lingkar leher dan kerung lengan.",
          "Beri kampuh 1.5 cm pada bahu dan garis sisi samping.",
          "Beri kampuh 3.0 cm pada kelim bawah blus dan ujung lengan.",
          "Rekatkan viselin tipis pada potongan facing leher."
        ],
        diagramSvgType: "pattern-cut"
      },
      {
        id: "step-b2",
        stepNumber: 2,
        title: "Menjahit Kupnat Sisi & Menyambung Garis Bahu",
        instruction: "Jahit kupnat samping dada (jika ada) lalu satukan bahu depan dan belakang.",
        details: [
          "Jahit kupnat dada dari sisi samping mengarah ke puncak payudara, setrika kupnat mengarah ke bawah.",
          "Satukan garis pundak depan dan pundak belakang sisi baik bertemu sisi baik.",
          "Jahit dengan kampuh 1.5 cm, obras tepi kampuh dan setrika membuka."
        ],
        diagramSvgType: "seam-types"
      },
      {
        id: "step-b3",
        stepNumber: 3,
        title: "Memasang Lapisan Kerung Leher (Facing / Serip)",
        instruction: "Satukan facing leher depan dan belakang di bagian bahu, lalu jahit ke kerung leher blus.",
        details: [
          "Sambung bahu facing leher, obras tepi luar facing.",
          "Pasang facing ke lingkar leher blus (sisi baik bertemu sisi baik), jahit sekeliling leher dengan kampuh 1.0 cm.",
          "Gunting takik-takik kecil (clipping) di sepanjang kampuh leher melengkung setiap jarak 1.5 cm (jangan sampai tergunting benang jahit).",
          "Tindas tepi jahitan (understitching) selebar 1-2 mm pada sisi facing agar lapisan tidak mencuat keluar."
        ],
        tips: "Understitching adalah rahasia profesional penjahit agar lapisan leher selalu terlipat rapi ke dalam!",
        diagramSvgType: "collar-sew"
      },
      {
        id: "step-b4",
        stepNumber: 4,
        title: "Memasang Lengan ke Kerung Lengan Badan",
        instruction: "Pasang pola lengan ke kerung badan sebelum menutup sisi samping baju.",
        details: [
          "Jahit setikan renggang (basting) di puncak kepala lengan antara takik depan dan takik belakang.",
          "Tarik sedikit benang atas untuk membentuk kubah lengan yang pas dengan kerung badan.",
          "Cocokkan titik tengah puncak lengan dengan sambungan jahitan bahu baju, semat jarum pentul.",
          "Jahit keliling kerung lengan dengan kampuh 1.0 cm, lalu obras bersamaan."
        ],
        diagramSvgType: "sleeve-cap"
      },
      {
        id: "step-b5",
        stepNumber: 5,
        title: "Menjahit Sisi Badan & Sisi Lengan Sekaligus",
        instruction: "Tutup sisi blus dalam satu tarikan jahitan dari ujung lengan hingga ke bawah blus.",
        details: [
          "Cocokkan titik pertemuan jahitan ketiak depan dan belakang agar membentuk persilangan tanda tambah (+) yang rapi.",
          "Jahit lurus dengan kampuh 1.5 cm dari manset lengan terus menyusuri ketiak hingga kelim bawah blus.",
          "Obras sambungan sisi samping lalu setrika ke arah belakang."
        ],
        diagramSvgType: "seam-types"
      },
      {
        id: "step-b6",
        stepNumber: 6,
        title: "Kelim Bawah Blus & Ujung Lengan",
        instruction: "Selesaikan kelim keliling ujung lengan dan bagian bawah blus.",
        details: [
          "Lipat kelim lengan selebar 2.5 cm (lipat dua kali 1 cm + 1.5 cm) lalu jahit tindas lurus.",
          "Lipat kelim bawah blus selebar 3 cm, setrika rapi lalu jahit kelim.",
          "Lakukan pengepresan akhir dengan setrika uap."
        ],
        diagramSvgType: "hem-fold"
      }
    ]
  },
  {
    id: "kemeja-santai-unisex",
    title: "Membuat Kemeja Santai (Camp Collar / Cuban Shirt)",
    subtitle: "Menguasai pembuatan kerah rebah kemeja, plaket kancing, saku tempel & kelim lengkung",
    category: "Menengah",
    duration: "4 - 6 Jam",
    difficulty: "Sedang",
    fabricRequirement: "2.0 Meter Linen / Katun Rami / Viscose Twill (Lebar 150 cm)",
    toolsNeeded: [
      "Mesin Jahit & Sepatu Lubang Kancing",
      "Kain Keras (Viselin Kerah & Plaket) 0.5 Meter",
      "Kancing Kemeja 5 - 6 Butir",
      "Pendedel Benang (Seam Ripper)",
      "Pita Ukur, Kapur Jahit & Setrika Uap"
    ],
    description: "Panduan menjahit kemeja model kerah santai (camp collar) yang sedang tren untuk pria dan wanita. Mempelajari struktur kerah kemeja terintegrasi, plaket kancing depan, saku tempel dada yang presisi, dan pas bahu (yoke) kemeja.",
    tags: ["Kemeja", "Kerah", "Kancing", "Saku Tempel", "Menengah"],
    thumbnailColor: "from-amber-500/20 to-emerald-500/10",
    videoTutorialId: "video-kemeja-basic",
    relatedPatternId: "modul-4",
    steps: [
      {
        id: "step-k1",
        stepNumber: 1,
        title: "Memotong Pola Kemeja & Menempelkan Kain Keras",
        instruction: "Gunting badan depan kiri & kanan (dengan kelebihan plaket kancing 3.5 cm), badan belakang, pas bahu (yoke 2 lapis), daun kerah (2 lapis), lengan (2 helai), dan saku tempel.",
        details: [
          "Rekatkan viselin pada plaket kancing depan kiri & kanan.",
          "Rekatkan viselin tebal sedang pada 1 helai daun kerah (kerah atas).",
          "Rekatkan viselin pada bibir saku tempel."
        ],
        diagramSvgType: "pattern-cut"
      },
      {
        id: "step-k2",
        stepNumber: 2,
        title: "Membuat & Memasang Saku Tempel di Dada Kiri",
        instruction: "Jahit saku tempel sebelum menyatukan potongan badan.",
        details: [
          "Lipat bibir atas saku 2.5 cm, jahit tindas.",
          "Lipat kampuh sisi samping dan bawah saku ke arah dalam selebar 1 cm, setrika agar terbentuk pola kotak yang kaku.",
          "Posisikan saku pada tanda dada kiri badan depan (turun sekitar 18 - 20 cm dari bahu).",
          "Jahit tindas tepi saku selebar 2 mm dari pinggir, beri jahitan segitiga penguat di sudut atas bibir saku."
        ]
      },
      {
        id: "step-k3",
        stepNumber: 3,
        title: "Menyatukan Pas Bahu (Yoke) dengan Metode Burrito",
        instruction: "Satukan badan depan dan belakang kemeja diapit oleh 2 lapis pas bahu (yoke).",
        details: [
          "Jahit badan belakang di antara Yoke Luar dan Yoke Dalam.",
          "Gulung badan baju ke dalam (seperti burrito), lalu jahit pundak depan di antara kedua yoke.",
          "Tarik baju keluar melalui lubang leher untuk menghasilkan sambungan bahu yang bersih tanpa tiras jahitan terlihat di luar maupun di dalam!"
        ],
        tips: "Metode Burrito adalah standar kemeja tailor kelas dunia."
      },
      {
        id: "step-k4",
        stepNumber: 4,
        title: "Menjahit & Memasang Kerah Camp Collar",
        instruction: "Jahit daun kerah dan pasang ke leher kemeja.",
        details: [
          "Satukan daun kerah atas dan daun kerah bawah (sisi baik bertemu), jahit 3 sisinya dengan kampuh 0.8 cm.",
          "Pangkas sudut kerah (clip corners), balik dan setrika tajam, lalu jahit tindas tepinya.",
          "Sisipkan daun kerah di antara badan kemeja dan lipatan plaket depan, jahit sekeliling leher belakang.",
          "Tutup kampuh leher belakang dengan pita serip atau lipatan yoke dalam."
        ],
        diagramSvgType: "collar-sew"
      },
      {
        id: "step-k5",
        stepNumber: 5,
        title: "Pemasangan Lengan & Jahitan Samping Kemeja",
        instruction: "Pasang lengan ke kerung badan, jahit sisi kemeja menggunakan kampuh pipih atau obras.",
        details: [
          "Sambung kepala lengan ke kerung badan dengan kampuh 1 cm.",
          "Jahit sisi samping badan terus menyambung ke lengan kemeja.",
          "Selesaikan kelim ujung lengan dengan lipatan manset sederhana."
        ],
        diagramSvgType: "sleeve-cap"
      },
      {
        id: "step-k6",
        stepNumber: 6,
        title: "Membuat Lubang Kancing & Memasang Kancing",
        instruction: "Tandai posisi 5 - 6 lubang kancing pada plaket depan kiri (atau kanan untuk pria).",
        details: [
          "Tandai jarak antar lubang kancing sekitar 8 - 9 cm secara merata menggunakan kapur jahit.",
          "Gunakan sepatu lubang kancing otomatis 4-langkah pada mesin jahit.",
          "Buka lubang kancing dengan pendedel benang (beri jarum pentul di ujung lubang sebagai penahan agar pendedel tidak bablas merobek kain).",
          "Jahit kancing pada plaket pasangannya menggunakan benang ganda yang kuat."
        ]
      }
    ]
  },
  {
    id: "celana-kulot-karet",
    title: "Membuat Celana Kulot Panjang Pinggang Karet",
    subtitle: "Pola pesak selangkangan nyaman, saku samping tersembunyi, dan ban karet elastis",
    category: "Pemula",
    duration: "2.5 - 3.5 Jam",
    difficulty: "Mudah",
    fabricRequirement: "2.0 Meter Katun Linen / Twill / Rayon Crinkle (Lebar 150 cm)",
    toolsNeeded: [
      "Mesin Jahit & Obras",
      "Karet Elastis Lebar 3.5 - 4 cm (Panjang = Lingkar Pinggang - 10 cm)",
      "Peniti Besar (untuk memasukkan karet)",
      "Pita Ukur, Gunting & Kapur Jahit"
    ],
    description: "Celana kulot longgar yang nyaman dan modis. Proyek terbaik untuk memahami cara kerja garis pesak (crotch line) celana, memasang saku samping fungsional di garis jahitan (in-seam pocket), dan memasang ban pinggang elastis tanpa melilit.",
    tags: ["Celana", "Kulot", "Karet Pinggang", "Saku Samping", "Pemula"],
    thumbnailColor: "from-indigo-500/20 to-purple-500/10",
    videoTutorialId: "video-kulot-basic",
    relatedPatternId: "modul-3",
    steps: [
      {
        id: "step-c1",
        stepNumber: 1,
        title: "Memotong Pola Celana Depan, Belakang & Daun Saku",
        instruction: "Gunting 2 helai Celana Depan, 2 helai Celana Belakang (pesak belakang lebih panjang dan miring ke atas), dan 4 lembar Daun Saku.",
        details: [
          "Beri kampuh 1.5 cm di sisi samping dan bagian dalam paha (inseam).",
          "Beri kampuh 1.0 cm di garis lengkung pesak.",
          "Beri kelonggaran 6 cm di bagian pinggang atas untuk rumah karet (casing).",
          "Beri kampuh 4 cm di kelim bawah pipa celana."
        ],
        diagramSvgType: "pattern-cut"
      },
      {
        id: "step-c2",
        stepNumber: 2,
        title: "Memasang Saku Samping Tersembunyi (In-Seam Pocket)",
        instruction: "Jahit daun saku ke sisi luar celana depan dan belakang sebelum menyambung celana.",
        details: [
          "Posisikan daun saku 8 cm di bawah garis pinggang pada sisi luar celana depan dan belakang (sisi baik bertemu).",
          "Jahit dengan kampuh 1 cm, lalu tindas (understitch) pada daun saku.",
          "Satukan celana depan dan belakang, jahit sekeliling kantong saku dan lanjutkan menyusuri garis sisi celana."
        ]
      },
      {
        id: "step-c3",
        stepNumber: 3,
        title: "Menjahit Bagian Dalam Paha (Inseam) Masing-Masing Kaki",
        instruction: "Jahit paha dalam untuk membentuk 2 pipa celana terpisah.",
        details: [
          "Lipat kaki kanan (sisi baik bertemu), jahit dari selangkangan ke ujung pipa bawah celana.",
          "Ulangi hal yang sama untuk kaki kiri.",
          "Obras kampuh dan setrika membuka."
        ]
      },
      {
        id: "step-c4",
        stepNumber: 4,
        title: "Menyatukan Garis Pesak (Crotch Line)",
        instruction: "Satukan kedua pipa celana di sepanjang lengkungan selangkangan dalam satu jahitan lengkung kontinu.",
        details: [
          "Balik satu pipa celana ke sisi baik, lalu masukkan ke dalam pipa celana satunya yang masih berada di sisi buruk (kaki kanan masuk ke dalam kaki kiri).",
          "Cocokkan titik persilangan jahitan paha bawah di tengah persis.",
          "Jahit melengkung dari pinggang belakang, melewati selangkangan, hingga pinggang depan.",
          "Beri jahitan penguat ganda (2 kali jalan) di bagian titik paling bawah selangkangan agar tidak robek saat duduk."
        ]
      },
      {
        id: "step-c5",
        stepNumber: 5,
        title: "Membuat Rumah Karet Pinggang & Memasukkan Karet",
        instruction: "Lipat ban pinggang ke dalam dan masukkan karet elastis.",
        details: [
          "Obras tepi pinggang atas, lipat ke dalam selebar 4.5 cm lalu setrika.",
          "Jahit keliling lingkaran pinggang dengan menyisakan bukaan celah 4 cm di belakang.",
          "Sematkan peniti besar di ujung karet elastis, masukkan karet menyusuri terowongan pinggang hingga keluar di sisi celah satunya.",
          "Tumpuk kedua ujung karet selebar 2 cm, jahit zigzag bolak-balik agar terkunci kokoh.",
          "Tutup celah jahitan 4 cm, lalu ratakan kerutan karet dan jahit tindas di tengah karet sambil ditarik kencang agar karet tidak terpelintir saat dicuci."
        ]
      },
      {
        id: "step-c6",
        stepNumber: 6,
        title: "Kelim Bawah Pipa Celana Kulot",
        instruction: "Selesaikan bagian bawah celana kulot.",
        details: [
          "Lipat kelim bawah 4 cm (lipat 1 cm + 3 cm), setrika rapi.",
          "Jahit lurus sekeliling pipa kaki kiri dan kanan.",
          "Setrika uap akhir."
        ],
        diagramSvgType: "hem-fold"
      }
    ]
  }
];
