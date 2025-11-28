import { colors } from './colors';

export const animations = {
  // Durations
  durations: {
    fast: 200,
    medium: 300,
    slow: 500,
    slower: 800,
    zap: 1000,
  },

  // Easing functions
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    brutalist: 'cubic-bezier(0.25, 0.8, 0.25, 1)', // From original CSS
  },

  // Zap flow animation (1s linear infinite)
  zapFlow: {
    duration: 1000,
    loop: true,
    easing: 'linear' as const,
  },

  // Card hover effects
  cardHover: {
    duration: 300,
    easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
  },

  // Button press effects
  buttonPress: {
    duration: 150,
    scale: 0.95,
  },

  // Marquee animation
  marquee: {
    duration: 15000, // 15s for scrolling
    loop: true,
    easing: 'linear' as const,
  },

  // Fade in/out
  fade: {
    duration: 300,
    easing: 'ease-in-out' as const,
  },

  // Slide animations
  slide: {
    duration: 300,
    easing: 'ease-out' as const,
  },

  // Scale animations
  scale: {
    duration: 200,
    easing: 'ease-in-out' as const,
  },

  // Pulse animation for status indicators
  pulse: {
    duration: 2000,
    loop: true,
    easing: 'ease-in-out' as const,
  },

  // Transform values
  transforms: {
    cardHover: {
      translateY: -4,
      translateX: 4,
      scale: 1.0,
    },
    cardPress: {
      translateY: 2,
      translateX: 2,
      scale: 0.95,
    },
    buttonPress: {
      scale: 0.95,
    },
    tabActive: {
      scale: 1.1,
    },
  },

  // Shadow configurations (equivalent to CSS box-shadow)
  shadows: {
    brutalist: {
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 8,
    },
    brutalistPressed: {
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 4,
    },
    brutalistAccent: {
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      shadowColor: '#c1121f',
      elevation: 8,
    },
  },
};