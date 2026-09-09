export type AppTab =
  | "guides"           // Panduan Langkah Demi Langkah
  | "pattern-lessons"  // Pelajaran Cara Memahami Pola Jahit
  | "video-tutorials"  // Video Tutorial Interaktif
  | "sewing-simulator" // Simulator Mesin Jahit & Setikan
  | "pattern-calc"     // Kalkulator Pola & Ukuran Badan
  | "ai-consultant"    // Asisten & Konsultan Jahit AI
  | "glossary-quiz";   // Kamus Busana & Kuis Interaktif

export interface StepGuide {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  details: string[];
  tips?: string;
  warning?: string;
  diagramSvgType?: "machine-thread" | "pattern-cut" | "dart-stitch" | "zipper-install" | "seam-types" | "collar-sew" | "sleeve-cap" | "hem-fold";
  imageNote?: string;
  completed?: boolean;
}

export interface SewingProject {
  id: string;
  title: string;
  subtitle: string;
  category: "Pemula" | "Menengah" | "Mahir" | "Teknik Khusus";
  duration: string;
  difficulty: "Mudah" | "Sedang" | "Tantangan";
  fabricRequirement: string;
  toolsNeeded: string[];
  description: string;
  tags: string[];
  thumbnailColor: string;
  steps: StepGuide[];
  videoTutorialId?: string;
  relatedPatternId?: string;
}

export interface PatternSymbol {
  id: string;
  name: string;
  indonesianName: string;
  category: "Garis & Serat" | "Tanda Lipatan & Potongan" | "Penyesuaian & Bentuk" | "Aksesori";
  description: string;
  importance: string;
  visualType: "grainline" | "fold" | "dart" | "notch" | "seam-allowance" | "gather" | "zipper-mark" | "buttonhole" | "lengthen-shorten";
  exampleTip: string;
}

export interface PatternLessonModule {
  id: string;
  title: string;
  subtitle: string;
  level: "Dasar" | "Menengah" | "Lanjutan";
  readTime: string;
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    explanation: string;
    subpoints?: string[];
    diagramType?: "pattern-body" | "pattern-sleeve" | "pattern-skirt" | "pattern-collar" | "fabric-layout" | "grading-demo";
    practicalExercise?: string;
  }[];
}

export interface VideoMilestone {
  timeSeconds: number;
  timeLabel: string;
  title: string;
  description: string;
  keyTechnique: string;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface InteractiveVideo {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  category: "Dasar Mesin" | "Pola & Pemotongan" | "Menjahit Pakaian" | "Teknik Halus";
  difficulty: "Pemula" | "Menengah" | "Mahir";
  youtubeEmbedId: string;
  overview: string;
  materialsUsed: string[];
  milestones: VideoMilestone[];
}

export interface BodyMeasurementProfile {
  name: string;
  gender: "Wanita" | "Pria" | "Anak";
  unit: "cm" | "inch";
  lingkarBadan: number;       // Bust / Chest
  lingkarPinggang: number;     // Waist
  lingkarPanggul: number;      // Hips
  lebarBahu: number;           // Shoulder Width
  panjangPunggung: number;     // Back Length
  lebarPunggung: number;       // Back Width
  panjangDada: number;         // Front Length
  lebarMuka: number;           // Front Width
  lingkarKerungLengan: number; // Armhole
  panjangLengan: number;       // Sleeve Length
  lingkarLeher: number;        // Neck Circumference
  panjangBaju: number;         // Garment Length
  panjangRokCelana: number;    // Skirt/Pants Length
}

export interface GlossaryItem {
  term: string;
  pronunciation?: string;
  category: "Istilah Pola" | "Teknik Jahit" | "Jenis Kain" | "Alat & Mesin";
  definition: string;
  usageExample: string;
  tips?: string;
}

export interface QuizItem {
  id: string;
  question: string;
  category: "Simbol Pola" | "Teknik Jahit" | "Troubleshooting Mesin" | "Kain & Bahan";
  options: string[];
  correctIndex: number;
  explanation: string;
  badgeEarned?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  source?: string;
}

export type GarmentModelType = 
  | "dress-aline"
  | "blouse-peplum"
  | "kemeja-casual"
  | "rok-lingkar"
  | "gaun-malam"
  | "tunik-modest";

export type SewingAssemblyStep = 
  | "step1-darts"
  | "step2-shoulders"
  | "step3-collar"
  | "step4-sleeves"
  | "step5-side-seams"
  | "step6-zipper"
  | "step7-hemming";

export type GarmentSimulationStage = 
  | "pattern-design"
  | "fabric-cutting"
  | "sewing-assembly"
  | "mannequin-fitting";

export interface GarmentSimulationConfig {
  modelId: GarmentModelType;
  modelName: string;
  category: "Dress" | "Blouse" | "Kemeja" | "Rok" | "Couture" | "Modest";
  measurements: {
    bust: number;
    waist: number;
    hip: number;
    garmentLength: number;
    sleeveLength: number;
    shoulderWidth: number;
  };
  collarStyle: "shanghai" | "peter-pan" | "shirt-collar" | "v-neck" | "round-neck";
  sleeveStyle: "long-straight" | "puff-sleeve" | "short-sleeve" | "sleeveless";
  dartStyle: "side-bust" | "waist-darts" | "princess-line";
  
  // Fabric choices
  fabricId: string;
  fabricName: string;
  fabricTexture: "smooth-cotton" | "shiny-silk" | "rustic-linen" | "floral-lace" | "structured-denim" | "flowy-rayon" | "soft-wool" | "matte-denim";
  fabricColor: string;
  seamAllowance: number; // in cm (1.0, 1.5, 2.0)
  
  // Completed stages
  currentStage: GarmentSimulationStage;
  isPatternCut: boolean;
  sewnParts: (SewingAssemblyStep | string)[];
  
  // Mannequin fitting
  mannequinView?: "front" | "side" | "back" | "angle" | "runway";
  activeAssemblyStep?: SewingAssemblyStep;
}

export type AppThemeId = 
  | "noir-gold"
  | "vintage-linen"
  | "midnight-dark"
  | "blueprint-navy"
  | "rose-silk"
  | "emerald-heritage";

export type AppFontId = 
  | "playfair-jakarta"
  | "cinzel-inter"
  | "bodoni-outfit"
  | "syne-dmsans"
  | "space-mono"
  | "lora-worksans";

export interface ThemeConfig {
  id: AppThemeId;
  name: string;
  tagline: string;
  category: "Editorial" | "Craft" | "Dark" | "Technical" | "Romance" | "Heritage";
  previewColors: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  cssVars: {
    bgApp: string;
    bgSurface: string;
    bgHeader: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentHover: string;
    accentLight: string;
    borderColor: string;
    borderAccent: string;
    cardBg: string;
    badgeBg: string;
    badgeText: string;
    highlightBg: string;
  };
}

export interface FontConfig {
  id: AppFontId;
  name: string;
  headingFont: string;
  bodyFont: string;
  headingFamily: string;
  bodyFamily: string;
  description: string;
  sampleHeading: string;
  sampleBody: string;
  vibe: string;
}
