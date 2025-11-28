import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../constants/colors';
import { fontSizes } from '../constants/fonts';

const { width, height } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    fontFamily: 'SpaceGrotesk_400Regular',
  },

  // App shell for max-width centered layout
  appShell: {
    flex: 1,
    maxWidth: 414, // Similar to max-w-md
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    position: 'relative',
  },

  // Safe area container
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Background grid pattern (equivalent to CSS background)
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    opacity: 0.03,
    // Note: In React Native, we'll create this with a component or SVG
  },

  // Header styles
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 4,
    borderBottomColor: colors.border,
    paddingHorizontal: 24, // p-6 equivalent
    paddingVertical: 16,
    zIndex: 10,
  },

  headerSticky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderBottomWidth: 4,
    borderBottomColor: colors.border,
    paddingHorizontal: 24,
    paddingVertical: 16,
    zIndex: 10,
  },

  // Bottom navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 4,
    borderTopColor: colors.border,
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Safe area spacer for mobile
  bottomSpacer: {
    height: 4,
    backgroundColor: colors.background,
    maxWidth: 414,
    width: '100%',
    alignSelf: 'center',
  },

  // Screen content container
  screenContent: {
    flex: 1,
    padding: 24, // p-6 equivalent
    paddingBottom: 100, // Space for bottom nav + content
  },

  screenContentCompact: {
    flex: 1,
    padding: 24,
  },

  // Card base styles (brutalist design)
  card: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 20, // p-5 equivalent
    marginBottom: 16,
  },

  cardHoverable: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 16,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },

  cardHoverableHover: {
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowColor: colors.redAccent,
    borderColor: colors.redAccent,
    transform: [{ translateY: -2 }, { translateX: 2 }],
    elevation: 12,
  },

  cardHoverablePressed: {
    transform: [{ translateY: 1 }, { translateX: 1 }],
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  // Button styles (brutalist)
  button: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  buttonPressed: {
    transform: [{ translateY: 2 }, { translateX: 2 }],
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  buttonPrimary: {
    backgroundColor: colors.blueLight,
    borderColor: colors.border,
  },

  buttonAccent: {
    backgroundColor: colors.background,
    borderColor: colors.redAccent,
    shadowColor: colors.redAccent,
  },

  buttonAccentBackground: {
    backgroundColor: colors.redAccent,
    borderColor: colors.redAccent,
    shadowColor: colors.border,
  },

  // Input styles
  input: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.border,
    color: colors.text,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: fontSizes['3xl'], // text-3xl equivalent
    borderRadius: 0,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowColor: colors.border,
    elevation: 2,
  },

  inputFocused: {
    backgroundColor: colors.blueLightO20,
    borderColor: colors.blueLight,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowColor: colors.border,
    elevation: 4,
  },

  inputSmall: {
    fontSize: fontSizes.xl, // text-xl equivalent
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  // Text styles
  text: {
    color: colors.text,
    fontFamily: 'SpaceGrotesk_400Regular',
  },

  textAccent: {
    color: colors.redAccent,
    fontFamily: 'SpaceGrotesk_400Regular',
  },

  textSecondary: {
    color: colors.blueLight,
    fontFamily: 'SpaceGrotesk_400Regular',
  },

  // Monospace text (font-mono equivalent) - using JetBrains Mono for pixel perfect brutalist design
  monoText: {
    fontFamily: 'JetBrainsMono_500Medium',
    color: colors.text,
    letterSpacing: 0.3,
  },

  monoTextSmall: {
    fontFamily: 'JetBrainsMono_400Regular',
    color: colors.text,
    fontSize: fontSizes.xs,
    letterSpacing: 0.1,
  },

  monoTextMedium: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    color: colors.text,
    fontSize: fontSizes.sm,
    letterSpacing: 0.3,
  },

  monoTextLarge: {
    fontFamily: 'JetBrainsMono_700Bold',
    color: colors.text,
    fontSize: fontSizes.base,
    letterSpacing: 0.5,
  },

  // Uppercase tracking text (uppercase tracking-wider)
  uppercaseTracking: {
    textTransform: 'uppercase',
    letterSpacing: 0.1,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },

  uppercaseTrackingWider: {
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },

  uppercaseTrackingWidest: {
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },

  // Science font (Archivo)
  scienceFont: {
    fontFamily: 'Archivo_900Black',
    letterSpacing: -0.5,
  },

  // Flexbox utilities
  row: {
    flexDirection: 'row',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  column: {
    flexDirection: 'column',
  },

  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  columnStart: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  // Spacing utilities
  gap1: { gap: 4 },
  gap2: { gap: 8 },
  gap3: { gap: 12 },
  gap4: { gap: 16 },
  gap6: { gap: 24 },
  gap8: { gap: 32 },

  // Border utilities
  borderLeft4: {
    borderLeftWidth: 4,
    borderLeftColor: colors.border,
  },

  borderLeft4Accent: {
    borderLeftWidth: 4,
    borderLeftColor: colors.redAccent,
  },

  borderBottom2: {
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },

  borderTop2: {
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },

  // Status indicators
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },

  statusDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blueLight,
  },

  statusDotAccent: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.redAccent,
  },

  // Hide scrollbar equivalent
  hideScrollbar: {
    // In React Native, we control this at the component level
    // This is mainly for FlatList, ScrollView components
  },

  // Selection style
  selection: {
    // This would be implemented with a custom text selection component
    // as React Native doesn't support ::selection
  },

  // Responsive utilities
  responsive: {
    // Width-based styles would be handled by Dimensions listener
    // or by using responsive libraries
  },

  // Animation classes
  animated: {
    // Animation styles would be applied via useSharedValue andAnimatedProps
  },
});

// Helper functions for responsive design
export const getResponsiveWidth = () => {
  const { width } = Dimensions.get('window');
  return width <= 414 ? '100%' : 414; // max-w-md behavior
};

export const getScreenHeight = () => {
  const { height } = Dimensions.get('window');
  return height;
};