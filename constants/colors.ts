export const colors = {
  // Primary colors from original design
  blueDark: '#003049',
  redAccent: '#c1121f',
  creme: '#fdf0d5',
  blueLight: '#669bbc',
  redDark: '#780000',
  white: '#fdf0d5',

  // Semantic colors
  background: '#fdf0d5',
  text: '#003049',
  accent: '#c1121f',
  border: '#003049',

  // Opacity variations
  blueDarkO5: 'rgba(0, 48, 73, 0.05)',
  blueDarkO10: 'rgba(0, 48, 73, 0.1)',
  blueDarkO20: 'rgba(0, 48, 73, 0.2)',
  blueDarkO50: 'rgba(0, 48, 73, 0.5)',
  redAccentO10: 'rgba(193, 18, 31, 0.1)',
  redAccentO20: 'rgba(193, 18, 31, 0.2)',
  blueLightO20: 'rgba(102, 155, 188, 0.2)',
  blueLightO10: 'rgba(102, 155, 188, 0.1)',

  // Status colors
  success: '#003049',
  warning: '#c1121f',
  error: '#780000',
  info: '#669bbc',

  // Interactive states
  active: '#c1121f',
  inactive: '#003049',
  disabled: 'rgba(0, 48, 73, 0.3)',

  // Surface colors
  surface: '#fdf0d5',
  surfaceSecondary: 'rgba(0, 48, 73, 0.05)',
  surfaceAccent: 'rgba(193, 18, 31, 0.1)',
} as const;

export type ColorKeys = keyof typeof colors;

export const animations = {
  duration: {
    fast: 200,
    medium: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
  },
} as const;