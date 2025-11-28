import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold,
  Archivo_800ExtraBold,
  Archivo_900Black,
} from '@expo-google-fonts/archivo';
import {
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import {
  SpaceMono_400Regular,
  SpaceMono_700Bold,
} from '@expo-google-fonts/space-mono';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_600SemiBold,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';

export const fontConfig = {
  // Space Grotesk for main UI text
  spaceGrotesk: {
    light: { fontFamily: 'SpaceGrotesk_300Light', fontWeight: '300' as const },
    regular: { fontFamily: 'SpaceGrotesk_400Regular', fontWeight: '400' as const },
    medium: { fontFamily: 'SpaceGrotesk_500Medium', fontWeight: '500' as const },
    semiBold: { fontFamily: 'SpaceGrotesk_600SemiBold', fontWeight: '600' as const },
    bold: { fontFamily: 'SpaceGrotesk_700Bold', fontWeight: '700' as const },
  },

  // Archivo for display headings (Science Gothic alternative)
  archivo: {
    regular: { fontFamily: 'Archivo_400Regular', fontWeight: '400' as const },
    medium: { fontFamily: 'Archivo_500Medium', fontWeight: '500' as const },
    semiBold: { fontFamily: 'Archivo_600SemiBold', fontWeight: '600' as const },
    bold: { fontFamily: 'Archivo_700Bold', fontWeight: '700' as const },
    extraBold: { fontFamily: 'Archivo_800ExtraBold', fontWeight: '800' as const },
    black: { fontFamily: 'Archivo_900Black', fontWeight: '900' as const },
  },

  // Space Mono for monospace text (brutalist design)
  spaceMono: {
    regular: { fontFamily: 'SpaceMono_400Regular', fontWeight: '400' as const },
    bold: { fontFamily: 'SpaceMono_700Bold', fontWeight: '700' as const },
  },

  // JetBrains Mono for technical/monospace text (pixel perfect)
  jetbrainsMono: {
    regular: { fontFamily: 'JetBrainsMono_400Regular', fontWeight: '400' as const },
    medium: { fontFamily: 'JetBrainsMono_500Medium', fontWeight: '500' as const },
    semiBold: { fontFamily: 'JetBrainsMono_600SemiBold', fontWeight: '600' as const },
    bold: { fontFamily: 'JetBrainsMono_700Bold', fontWeight: '700' as const },
  },
};

export const fontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
  black: '900' as const,
};

export const fontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 30,
  '5xl': 36,
  '6xl': 48,
  '7xl': 60,
  '8xl': 72,
};

// Science font style matching main.js .science-font
export const scienceFont = {
  fontFamily: 'Archivo_800ExtraBold',
  fontWeight: fontWeights.extraBold,
  // Matching main.js: font-variation-settings: 'wdth' 110, 'wght' 800
  // In React Native, we'll simulate this with letterSpacing and fontWeight
  letterSpacing: -0.02,
  // Line height similar to main.js leading-none tracking-tighter
  lineHeight: 0.85,
};

export const typography = {
  // Display styles using Archivo
  display: {
    large: {
      fontSize: 72,
      fontFamily: 'Archivo_900Black',
      fontWeight: fontWeights.black,
      lineHeight: 72 * 0.85, // Tight tracking like original
      letterSpacing: -1,
    },
    medium: {
      fontSize: 48,
      fontFamily: 'Archivo_900Black',
      fontWeight: fontWeights.black,
      lineHeight: 48 * 0.85,
      letterSpacing: -0.5,
    },
    small: {
      fontSize: 36,
      fontFamily: 'Archivo_900Black',
      fontWeight: fontWeights.black,
      lineHeight: 36 * 0.85,
      letterSpacing: -0.3,
    },
  },

  // Heading styles
  heading: {
    large: {
      fontSize: fontSizes['4xl'],
      fontFamily: 'SpaceGrotesk_700Bold',
      fontWeight: fontWeights.bold,
      lineHeight: fontSizes['4xl'] * 1.2,
    },
    medium: {
      fontSize: fontSizes['2xl'],
      fontFamily: 'SpaceGrotesk_700Bold',
      fontWeight: fontWeights.bold,
      lineHeight: fontSizes['2xl'] * 1.2,
    },
    small: {
      fontSize: fontSizes.lg,
      fontFamily: 'SpaceGrotesk_600SemiBold',
      fontWeight: fontWeights.semiBold,
      lineHeight: fontSizes.lg * 1.2,
    },
  },

  // Body text using Space Grotesk
  body: {
    large: {
      fontSize: fontSizes.lg,
      fontFamily: 'SpaceGrotesk_400Regular',
      fontWeight: fontWeights.regular,
      lineHeight: fontSizes.lg * 1.5,
    },
    medium: {
      fontSize: fontSizes.base,
      fontFamily: 'SpaceGrotesk_400Regular',
      fontWeight: fontWeights.regular,
      lineHeight: fontSizes.base * 1.5,
    },
    small: {
      fontSize: fontSizes.sm,
      fontFamily: 'SpaceGrotesk_400Regular',
      fontWeight: fontWeights.regular,
      lineHeight: fontSizes.sm * 1.4,
    },
  },

  // Monospace/Code styles (font-mono equivalent) - using JetBrains Mono for pixel perfect rendering
  mono: {
    large: {
      fontSize: fontSizes.lg,
      fontFamily: 'JetBrainsMono_700Bold',
      fontWeight: fontWeights.bold,
      letterSpacing: 0.5,
    },
    medium: {
      fontSize: fontSizes.base,
      fontFamily: 'JetBrainsMono_600SemiBold',
      fontWeight: fontWeights.semiBold,
      letterSpacing: 0.3,
    },
    small: {
      fontSize: fontSizes.sm,
      fontFamily: 'JetBrainsMono_500Medium',
      fontWeight: fontWeights.medium,
      letterSpacing: 0.2,
    },
    tiny: {
      fontSize: fontSizes.xs,
      fontFamily: 'JetBrainsMono_400Regular',
      fontWeight: fontWeights.regular,
      letterSpacing: 0.1,
    },
  },
};