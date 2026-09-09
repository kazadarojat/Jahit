import React, { createContext, useContext, useState, useEffect } from "react";
import { AppThemeId, AppFontId, ThemeConfig, FontConfig } from "../types";

export const THEMES: Record<AppThemeId, ThemeConfig> = {
  "noir-gold": {
    id: "noir-gold",
    name: "Atelier Noir & Gold",
    tagline: "Elegansi Klasik Haute Couture Paris",
    category: "Editorial",
    previewColors: {
      primary: "#1C1C1C",
      accent: "#D4AF37",
      background: "#FDFCFB",
      surface: "#FFFFFF",
      text: "#1C1C1C",
    },
    cssVars: {
      bgApp: "#FDFCFB",
      bgSurface: "#FFFFFF",
      bgHeader: "#1C1C1C",
      textPrimary: "#1C1C1C",
      textSecondary: "#666666",
      accent: "#D4AF37",
      accentHover: "#B38F26",
      accentLight: "#FAF3DD",
      borderColor: "#EAE8E3",
      borderAccent: "#D4AF37",
      cardBg: "#FFFFFF",
      badgeBg: "#1C1C1C",
      badgeText: "#D4AF37",
      highlightBg: "#FAF8F3",
    },
  },
  "vintage-linen": {
    id: "vintage-linen",
    name: "Vintage Linen & Craft",
    tagline: "Nuansa Alami Serat Kain Linen & Terracotta",
    category: "Craft",
    previewColors: {
      primary: "#2C221E",
      accent: "#9C4124",
      background: "#F7F3EB",
      surface: "#FFFFFF",
      text: "#2C221E",
    },
    cssVars: {
      bgApp: "#F7F3EB",
      bgSurface: "#FFFFFF",
      bgHeader: "#2C221E",
      textPrimary: "#2C221E",
      textSecondary: "#6E5E57",
      accent: "#9C4124",
      accentHover: "#7E321B",
      accentLight: "#FAECE7",
      borderColor: "#E6DEC5",
      borderAccent: "#9C4124",
      cardBg: "#FFFFFF",
      badgeBg: "#2C221E",
      badgeText: "#E89B84",
      highlightBg: "#F0EAE1",
    },
  },
  "midnight-dark": {
    id: "midnight-dark",
    name: "Midnight Haute Couture",
    tagline: "Mode Gelap Pekat dengan Aksen Emas & Obsidian",
    category: "Dark",
    previewColors: {
      primary: "#0B0D11",
      accent: "#F5D061",
      background: "#0D0F14",
      surface: "#161922",
      text: "#F1F5F9",
    },
    cssVars: {
      bgApp: "#0D0F14",
      bgSurface: "#161922",
      bgHeader: "#07080B",
      textPrimary: "#F1F5F9",
      textSecondary: "#94A3B8",
      accent: "#F5D061",
      accentHover: "#E0B738",
      accentLight: "#262211",
      borderColor: "#282F3E",
      borderAccent: "#F5D061",
      cardBg: "#161922",
      badgeBg: "#242A38",
      badgeText: "#F5D061",
      highlightBg: "#11141C",
    },
  },
  "blueprint-navy": {
    id: "blueprint-navy",
    name: "Blueprint & Drafter",
    tagline: "Gaya Sketsa Meja Gambar Pola & Cyan Arsitektur",
    category: "Technical",
    previewColors: {
      primary: "#0A192F",
      accent: "#64FFDA",
      background: "#F4F7FC",
      surface: "#FFFFFF",
      text: "#0A192F",
    },
    cssVars: {
      bgApp: "#F4F7FC",
      bgSurface: "#FFFFFF",
      bgHeader: "#0A192F",
      textPrimary: "#0A192F",
      textSecondary: "#4A5D78",
      accent: "#0077CC",
      accentHover: "#005FA3",
      accentLight: "#E1F2FE",
      borderColor: "#D3E0EE",
      borderAccent: "#0077CC",
      cardBg: "#FFFFFF",
      badgeBg: "#0A192F",
      badgeText: "#64FFDA",
      highlightBg: "#EAF1F9",
    },
  },
  "rose-silk": {
    id: "rose-silk",
    name: "Rose Silk & Satin",
    tagline: "Sentuhan Sutra Mewah Nuansa Velvet & Rosé",
    category: "Romance",
    previewColors: {
      primary: "#4C0519",
      accent: "#E11D48",
      background: "#FFF8F8",
      surface: "#FFFFFF",
      text: "#330814",
    },
    cssVars: {
      bgApp: "#FFF8F8",
      bgSurface: "#FFFFFF",
      bgHeader: "#4C0519",
      textPrimary: "#330814",
      textSecondary: "#88485B",
      accent: "#E11D48",
      accentHover: "#BE123C",
      accentLight: "#FFE4E6",
      borderColor: "#FCE1E4",
      borderAccent: "#E11D48",
      cardBg: "#FFFFFF",
      badgeBg: "#4C0519",
      badgeText: "#FDA4AF",
      highlightBg: "#FFF1F2",
    },
  },
  "emerald-heritage": {
    id: "emerald-heritage",
    name: "Emerald & Songket Nusantara",
    tagline: "Mahakarya Tradisi Tekstil & Zamrud Kerajaan",
    category: "Heritage",
    previewColors: {
      primary: "#064E3B",
      accent: "#D97706",
      background: "#F5F8F5",
      surface: "#FFFFFF",
      text: "#062E24",
    },
    cssVars: {
      bgApp: "#F5F8F5",
      bgSurface: "#FFFFFF",
      bgHeader: "#064E3B",
      textPrimary: "#062E24",
      textSecondary: "#3F6456",
      accent: "#D97706",
      accentHover: "#B45309",
      accentLight: "#FEF3C7",
      borderColor: "#D9E6DD",
      borderAccent: "#D97706",
      cardBg: "#FFFFFF",
      badgeBg: "#064E3B",
      badgeText: "#FCD34D",
      highlightBg: "#EBF3EC",
    },
  },
};

export const FONTS: Record<AppFontId, FontConfig> = {
  "playfair-jakarta": {
    id: "playfair-jakarta",
    name: "Modern Atelier",
    headingFont: "Playfair Display",
    bodyFont: "Plus Jakarta Sans",
    headingFamily: "'Playfair Display', Georgia, serif",
    bodyFamily: "'Plus Jakarta Sans', sans-serif",
    description: "Kombinasi klasik elegan majalah Vogue dan kenyamanan membaca modern.",
    sampleHeading: "Konstruksi Pola Busana",
    sampleBody: "Pemotongan kain pada arah serat (grainline) menghasilkan jatuhnya busana yang sempurna.",
    vibe: "Editorial & Elegan",
  },
  "cinzel-inter": {
    id: "cinzel-inter",
    name: "Classic Couture",
    headingFont: "Cinzel",
    bodyFont: "Plus Jakarta Sans",
    headingFamily: "'Cinzel', 'Times New Roman', serif",
    bodyFamily: "'Plus Jakarta Sans', sans-serif",
    description: "Karakter mewah aristokrat butik adibusana dengan tipografi romawi.",
    sampleHeading: "ARSITEKTUR POLA DASAR",
    sampleBody: "Garis kupnat pinggang memberikan siluet proporsional anatomi tubuh.",
    vibe: "Aristokrat & Mewah",
  },
  "bodoni-outfit": {
    id: "bodoni-outfit",
    name: "Haute Bodoni",
    headingFont: "Bodoni Moda",
    bodyFont: "Outfit",
    headingFamily: "'Bodoni Moda', Georgia, serif",
    bodyFamily: "'Outfit', sans-serif",
    description: "Kontras ketebalan tinggi ala rumah mode ternama Italia & Paris.",
    sampleHeading: "Presisi Jahitan Kampuh",
    sampleBody: "Tingkat kerapatan setikan 10-12 SPI memberikan ketahanan prima pada busana.",
    vibe: "High-Fashion & Dramatis",
  },
  "syne-dmsans": {
    id: "syne-dmsans",
    name: "Contemporary Minimalist",
    headingFont: "Syne",
    bodyFont: "DM Sans",
    headingFamily: "'Syne', sans-serif",
    bodyFamily: "'DM Sans', sans-serif",
    description: "Desain avant-garde kontemporer yang bersih, segar, dan berani.",
    sampleHeading: "Eksplorasi Desain Tekstil",
    sampleBody: "Memahami interlining dan interfacing untuk kerah kemeja yang kokoh dan rapi.",
    vibe: "Avant-Garde & Bersih",
  },
  "space-mono": {
    id: "space-mono",
    name: "Technical Drafter",
    headingFont: "Space Grotesk",
    bodyFont: "Space Mono",
    headingFamily: "'Space Grotesk', sans-serif",
    bodyFamily: "'Space Mono', monospace",
    description: "Estetika teknik presisi tinggi penggaris skala dan rumus grading pola.",
    sampleHeading: "RUMUS_GRADING_V2.0",
    sampleBody: "L.Badan / 4 + 1cm untuk kelonggaran gerak pola depan (TM).",
    vibe: "Teknikal & Presisi",
  },
  "lora-worksans": {
    id: "lora-worksans",
    name: "Boutique Editorial",
    headingFont: "Lora",
    bodyFont: "Work Sans",
    headingFamily: "'Lora', serif",
    bodyFamily: "'Work Sans', sans-serif",
    description: "Gaya narasi hangat atelier penjahit independen dan buku panduan sastra.",
    sampleHeading: "Seni Jahit Tangan & Furing",
    sampleBody: "Teknik tusuk kelim sembunyi menjaga kehalusan tepi gaun pesta tanpa tampak benang.",
    vibe: "Hangat & Bersahabat",
  },
};

interface ThemeContextType {
  theme: AppThemeId;
  font: AppFontId;
  themeConfig: ThemeConfig;
  fontConfig: FontConfig;
  setTheme: (themeId: AppThemeId) => void;
  setFont: (fontId: AppFontId) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  resetToDefault: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppThemeId>(() => {
    const saved = localStorage.getItem("jahitpedia_theme");
    return (saved && saved in THEMES) ? (saved as AppThemeId) : "noir-gold";
  });

  const [font, setFontState] = useState<AppFontId>(() => {
    const saved = localStorage.getItem("jahitpedia_font");
    return (saved && saved in FONTS) ? (saved as AppFontId) : "playfair-jakarta";
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const themeConfig = THEMES[theme];
  const fontConfig = FONTS[font];

  const setTheme = (themeId: AppThemeId) => {
    setThemeState(themeId);
    localStorage.setItem("jahitpedia_theme", themeId);
  };

  const setFont = (fontId: AppFontId) => {
    setFontState(fontId);
    localStorage.setItem("jahitpedia_font", fontId);
  };

  const resetToDefault = () => {
    setTheme("noir-gold");
    setFont("playfair-jakarta");
  };

  // Apply CSS custom properties and font families to the document
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "midnight-dark";

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Set CSS Variables
    root.style.setProperty("--theme-bg-app", themeConfig.cssVars.bgApp);
    root.style.setProperty("--theme-bg-surface", themeConfig.cssVars.bgSurface);
    root.style.setProperty("--theme-bg-header", themeConfig.cssVars.bgHeader);
    root.style.setProperty("--theme-text-primary", themeConfig.cssVars.textPrimary);
    root.style.setProperty("--theme-text-secondary", themeConfig.cssVars.textSecondary);
    root.style.setProperty("--theme-accent", themeConfig.cssVars.accent);
    root.style.setProperty("--theme-accent-hover", themeConfig.cssVars.accentHover);
    root.style.setProperty("--theme-accent-light", themeConfig.cssVars.accentLight);
    root.style.setProperty("--theme-border", themeConfig.cssVars.borderColor);
    root.style.setProperty("--theme-border-accent", themeConfig.cssVars.borderAccent);
    root.style.setProperty("--theme-card-bg", themeConfig.cssVars.cardBg);
    root.style.setProperty("--theme-badge-bg", themeConfig.cssVars.badgeBg);
    root.style.setProperty("--theme-badge-text", themeConfig.cssVars.badgeText);
    root.style.setProperty("--theme-highlight-bg", themeConfig.cssVars.highlightBg);

    // Font variables
    root.style.setProperty("--app-heading-font", fontConfig.headingFamily);
    root.style.setProperty("--app-body-font", fontConfig.bodyFamily);

    // Apply directly to body styling for immediate visual responsiveness
    document.body.style.backgroundColor = themeConfig.cssVars.bgApp;
    document.body.style.color = themeConfig.cssVars.textPrimary;
    document.body.style.fontFamily = fontConfig.bodyFamily;
  }, [theme, font, themeConfig, fontConfig]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        font,
        themeConfig,
        fontConfig,
        setTheme,
        setFont,
        isModalOpen,
        setIsModalOpen,
        resetToDefault,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
