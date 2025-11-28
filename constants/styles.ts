import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { scienceFont, fontSizes, fontWeights } from './fonts';

// Brutalist design system matching main.js
export const brutalist = StyleSheet.create({
  // Card styles matching main.js .card-hoverableing
  card: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.text,
    marginBottom: 16,
    shadowColor: colors.text,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  // Input styles matching main.js .input-brutalist
  input: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.text,
    color: colors.text,
    fontWeight: fontWeights.semiBold,
    borderRadius: 0,
    shadowColor: colors.text,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: fontSizes['3xl'],
  },

  // Button styles matching main.js brutalist buttons
  button: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: colors.text,
    backgroundColor: colors.text,
    color: colors.background,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.lg,
    textTransform: 'uppercase',
    letterSpacing: 2,
    shadowColor: colors.text,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  buttonPrimary: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },

  buttonSecondary: {
    backgroundColor: colors.background,
    borderColor: colors.text,
  },

  buttonAccent: {
    backgroundColor: colors.blueLight,
    borderColor: colors.text,
  },

  // Science font style for headings matching main.js .science-font
  scienceFont: {
    fontFamily: scienceFont.fontFamily,
    fontWeight: scienceFont.fontWeight,
    letterSpacing: scienceFont.letterSpacing,
    lineHeight: scienceFont.lineHeight,
  },

  // Container styles
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },

  // Border styles matching main.js
  border: {
    borderWidth: 2,
    borderColor: colors.text,
  },

  borderAccent: {
    borderWidth: 2,
    borderColor: colors.redAccent,
  },

  // Text styles
  text: {
    color: colors.text,
  },

  textAccent: {
    color: colors.redAccent,
  },

  textLight: {
    color: colors.blueLight,
  },

  // Background styles
  backgroundWithGrid: {
    backgroundColor: colors.background,
    // Note: backgroundImage with grid pattern needs to be implemented differently in React Native
  },

  // Header styles matching main.js
  header: {
    borderBottomWidth: 4,
    borderBottomColor: colors.text,
    padding: 24,
    backgroundColor: colors.background,
  },

  // Tab bar styles matching main.js
  tabBar: {
    backgroundColor: colors.background,
    borderTopWidth: 4,
    borderTopColor: colors.text,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 8,
    height: 80,
    elevation: 10,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  // Active/inactive states
  activeTab: {
    color: colors.redAccent,
  },

  inactiveTab: {
    color: colors.text,
    opacity: 0.6,
  },
});

// Animation styles matching main.js
export const animations = {
  // Card hover effect (simulated in React Native)
  cardHover: {
    transform: [{ translateY: -2 }, { translateX: 2 }],
    shadowColor: colors.redAccent,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },

  cardPressed: {
    transform: [{ translateY: 1 }, { translateX: 1 }],
    shadowColor: colors.text,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
};

// Utility functions for creating brutalist components
export const createBrutalistStyle = (overrides = {}) => ({
  ...brutalist.card,
  ...overrides,
});

export const createScienceTextStyle = (size: number = fontSizes['5xl'], overrides = {}) => ({
  ...brutalist.scienceFont,
  fontSize: size,
  ...overrides,
});

export const createBrutalistButtonStyle = (variant: 'primary' | 'secondary' | 'accent' = 'primary', overrides = {}) => ({
  ...brutalist.button,
  ...brutalist[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
  ...overrides,
});