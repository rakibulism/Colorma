// OKLCH Color Space utilities for perceptually uniform color generation

// Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : { r: 0, g: 0, b: 0 };
}

// Convert RGB to linear RGB
function toLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

// Calculate relative luminance
function getLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const rLinear = toLinear(r);
  const gLinear = toLinear(g);
  const bLinear = toLinear(b);
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

// Calculate contrast ratio between two colors
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Convert RGB to OKLCH
function rgbToOklch(r: number, g: number, b: number): { l: number; c: number; h: number } {
  // Convert to linear sRGB
  const rLin = toLinear(r);
  const gLin = toLinear(g);
  const bLin = toLinear(b);

  // Convert to OKLab
  const l = 0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin;
  const m = 0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin;
  const s = 0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  // Convert to LCh
  const C = Math.sqrt(a * a + b_ * b_);
  let h = Math.atan2(b_, a) * (180 / Math.PI);
  if (h < 0) h += 360;

  return { l: L, c: C, h };
}

// Convert OKLCH to RGB
function oklchToRgb(l: number, c: number, h: number): { r: number; g: number; b: number } {
  // Convert to OKLab
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  let r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  let bVal = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  // Convert from linear to sRGB
  const fromLinear = (c: number) => {
    if (c <= 0.0031308) return 12.92 * c;
    return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };

  r = Math.max(0, Math.min(1, fromLinear(r)));
  g = Math.max(0, Math.min(1, fromLinear(g)));
  bVal = Math.max(0, Math.min(1, fromLinear(bVal)));

  return { r, g, b: bVal };
}

// Convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Convert hex to OKLCH
export function hexToOklch(hex: string): { l: number; c: number; h: number } {
  const { r, g, b } = hexToRgb(hex);
  return rgbToOklch(r, g, b);
}

// Convert OKLCH to hex
export function oklchToHex(l: number, c: number, h: number): string {
  const { r, g, b } = oklchToRgb(l, c, h);
  return rgbToHex(r, g, b);
}

// Adapt existing colors to a new theme while maintaining color relationships
export function adaptColorsToTheme(
  colors: {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    accent: string;
  },
  targetTheme: 'light' | 'dark'
): {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
} {
  if (targetTheme === 'dark') {
    // Convert to dark theme: invert lightness while keeping hue/chroma
    const textOklch = hexToOklch(colors.text);
    const bgOklch = hexToOklch(colors.background);
    const primaryOklch = hexToOklch(colors.primary);
    const secondaryOklch = hexToOklch(colors.secondary);
    const accentOklch = hexToOklch(colors.accent);

    // Background: was light, make it dark
    const background = oklchToHex(
      0.15 + Math.random() * 0.10, // 15-25% lightness
      bgOklch.c,
      bgOklch.h
    );

    // Text: was dark, make it light
    const text = oklchToHex(
      0.85 + Math.random() * 0.10, // 85-95% lightness
      textOklch.c,
      textOklch.h
    );

    // Primary: increase lightness for visibility on dark bg
    const primary = oklchToHex(
      0.60 + Math.random() * 0.15, // 60-75% lightness
      primaryOklch.c,
      primaryOklch.h
    );

    // Secondary: darken significantly
    const secondary = oklchToHex(
      0.25 + Math.random() * 0.15, // 25-40% lightness
      secondaryOklch.c,
      secondaryOklch.h
    );

    // Accent: increase lightness
    const accent = oklchToHex(
      0.55 + Math.random() * 0.15, // 55-70% lightness
      accentOklch.c,
      accentOklch.h
    );

    // Verify and adjust contrasts
    const textBgContrast = getContrastRatio(text, background);
    const finalText = textBgContrast < 7 ? oklchToHex(0.9, textOklch.c, textOklch.h) : text;

    const primaryBgContrast = getContrastRatio(primary, background);
    const finalPrimary = primaryBgContrast < 3 ? oklchToHex(0.65, primaryOklch.c, primaryOklch.h) : primary;

    const accentBgContrast = getContrastRatio(accent, background);
    const finalAccent = accentBgContrast < 3 ? oklchToHex(0.60, accentOklch.c, accentOklch.h) : accent;

    return {
      text: finalText,
      background,
      primary: finalPrimary,
      secondary,
      accent: finalAccent,
    };
  } else {
    // Convert to light theme
    const textOklch = hexToOklch(colors.text);
    const bgOklch = hexToOklch(colors.background);
    const primaryOklch = hexToOklch(colors.primary);
    const secondaryOklch = hexToOklch(colors.secondary);
    const accentOklch = hexToOklch(colors.accent);

    // Background: was dark, make it light
    const background = oklchToHex(
      0.95 + Math.random() * 0.05, // 95-100% lightness
      bgOklch.c,
      bgOklch.h
    );

    // Text: was light, make it dark
    const text = oklchToHex(
      0.15 + Math.random() * 0.15, // 15-30% lightness
      textOklch.c,
      textOklch.h
    );

    // Primary: decrease lightness for visibility on light bg
    const primary = oklchToHex(
      0.35 + Math.random() * 0.15, // 35-50% lightness
      primaryOklch.c,
      primaryOklch.h
    );

    // Secondary: lighten significantly
    const secondary = oklchToHex(
      0.85 + Math.random() * 0.1, // 85-95% lightness
      secondaryOklch.c,
      secondaryOklch.h
    );

    // Accent: decrease lightness
    const accent = oklchToHex(
      0.45 + Math.random() * 0.15, // 45-60% lightness
      accentOklch.c,
      accentOklch.h
    );

    // Verify and adjust contrasts
    const textBgContrast = getContrastRatio(text, background);
    const finalText = textBgContrast < 7 ? oklchToHex(0.2, textOklch.c, textOklch.h) : text;

    const primaryBgContrast = getContrastRatio(primary, background);
    const finalPrimary = primaryBgContrast < 3 ? oklchToHex(0.35, primaryOklch.c, primaryOklch.h) : primary;

    const accentBgContrast = getContrastRatio(accent, background);
    const finalAccent = accentBgContrast < 3 ? oklchToHex(0.45, accentOklch.c, accentOklch.h) : accent;

    return {
      text: finalText,
      background,
      primary: finalPrimary,
      secondary,
      accent: finalAccent,
    };
  }
}

// Generate a random accessible color palette
export function generateAccessiblePalette(theme: 'light' | 'dark' = 'light'): {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
} {
  // Generate base hue
  const baseHue = Math.random() * 360;
  
  if (theme === 'dark') {
    // Dark theme: Dark background, light text
    // Background: Dark color (low lightness, low chroma)
    const bgLightness = 0.15 + Math.random() * 0.10; // 15-25% lightness
    const bgChroma = 0.01 + Math.random() * 0.02; // Very low chroma
    const background = oklchToHex(bgLightness, bgChroma, baseHue);

    // Text: Light color (high lightness) - ensure high contrast with background
    const textLightness = 0.85 + Math.random() * 0.10; // 85-95% lightness
    const textChroma = 0.02 + Math.random() * 0.03;
    const text = oklchToHex(textLightness, textChroma, baseHue);

    // Verify text/background contrast
    const textBgContrast = getContrastRatio(text, background);
    let finalText = text;
    if (textBgContrast < 7) {
      // Force to a very light color if contrast is insufficient
      finalText = oklchToHex(0.9, 0.02, baseHue);
    }

    // Primary: Bright saturated color
    const primaryHue = baseHue;
    const primaryLightness = 0.60 + Math.random() * 0.15; // 60-75%
    const primaryChroma = 0.15 + Math.random() * 0.1; // Good saturation
    const primary = oklchToHex(primaryLightness, primaryChroma, primaryHue);

    // Secondary: Dark tinted color
    const secondaryHue = (baseHue + 20 + Math.random() * 20) % 360;
    const secondaryLightness = 0.25 + Math.random() * 0.15; // 25-40%
    const secondaryChroma = 0.04 + Math.random() * 0.04; // Low chroma
    const secondary = oklchToHex(secondaryLightness, secondaryChroma, secondaryHue);

    // Accent: Vibrant contrasting color
    const accentHue = (baseHue + 30 + Math.random() * 60) % 360;
    const accentLightness = 0.55 + Math.random() * 0.15; // 55-70%
    const accentChroma = 0.15 + Math.random() * 0.1; // High saturation
    const accent = oklchToHex(accentLightness, accentChroma, accentHue);

    // Verify primary/background contrast (should be at least 3:1 for large text)
    const primaryBgContrast = getContrastRatio(primary, background);
    let finalPrimary = primary;
    if (primaryBgContrast < 3) {
      // Brighten primary
      finalPrimary = oklchToHex(0.65, 0.15, primaryHue);
    }

    // Verify accent/background contrast
    const accentBgContrast = getContrastRatio(accent, background);
    let finalAccent = accent;
    if (accentBgContrast < 3) {
      // Brighten accent
      finalAccent = oklchToHex(0.60, 0.15, accentHue);
    }

    return {
      text: finalText,
      background,
      primary: finalPrimary,
      secondary,
      accent: finalAccent,
    };
  } else {
    // Light theme: Light background, dark text (original logic)
    // Background: Light color (high lightness, low chroma)
    const bgLightness = 0.95 + Math.random() * 0.05; // 95-100% lightness
    const bgChroma = 0.01 + Math.random() * 0.02; // Very low chroma
    const background = oklchToHex(bgLightness, bgChroma, baseHue);

    // Text: Dark color (low lightness) - ensure high contrast with background
    const textLightness = 0.15 + Math.random() * 0.15; // 15-30% lightness
    const textChroma = 0.02 + Math.random() * 0.03;
    const text = oklchToHex(textLightness, textChroma, baseHue);

    // Verify text/background contrast
    const textBgContrast = getContrastRatio(text, background);
    let finalText = text;
    if (textBgContrast < 7) {
      // Force to a very dark color if contrast is insufficient
      finalText = oklchToHex(0.2, 0.02, baseHue);
    }

    // Primary: Medium-dark saturated color
    const primaryHue = baseHue;
    const primaryLightness = 0.35 + Math.random() * 0.15; // 35-50%
    const primaryChroma = 0.15 + Math.random() * 0.1; // Good saturation
    const primary = oklchToHex(primaryLightness, primaryChroma, primaryHue);

    // Secondary: Light tinted color (complementary to primary)
    const secondaryHue = (baseHue + 20 + Math.random() * 20) % 360;
    const secondaryLightness = 0.85 + Math.random() * 0.1; // 85-95%
    const secondaryChroma = 0.04 + Math.random() * 0.04; // Low chroma
    const secondary = oklchToHex(secondaryLightness, secondaryChroma, secondaryHue);

    // Accent: Vibrant contrasting color
    const accentHue = (baseHue + 30 + Math.random() * 60) % 360;
    const accentLightness = 0.45 + Math.random() * 0.15; // 45-60%
    const accentChroma = 0.15 + Math.random() * 0.1; // High saturation
    const accent = oklchToHex(accentLightness, accentChroma, accentHue);

    // Verify primary/background contrast (should be at least 3:1 for large text)
    const primaryBgContrast = getContrastRatio(primary, background);
    let finalPrimary = primary;
    if (primaryBgContrast < 3) {
      // Darken primary
      finalPrimary = oklchToHex(0.35, 0.15, primaryHue);
    }

    // Verify accent/background contrast
    const accentBgContrast = getContrastRatio(accent, background);
    let finalAccent = accent;
    if (accentBgContrast < 3) {
      // Darken accent
      finalAccent = oklchToHex(0.45, 0.15, accentHue);
    }

    return {
      text: finalText,
      background,
      primary: finalPrimary,
      secondary,
      accent: finalAccent,
    };
  }
}

// Check if a color combination is accessible
export function isAccessible(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  const contrast = getContrastRatio(foreground, background);
  return level === 'AAA' ? contrast >= 7 : contrast >= 4.5;
}