import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  Animated,
  GestureResponderEvent,
} from 'react-native';
import { colors, animations } from '../../constants/colors';

interface ButtonProps {
  title: string;
  variant?: 'primary' | 'accent' | 'accentBackground' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  uppercase?: boolean;
  tracking?: 'normal' | 'wider' | 'widest';
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onPress,
  style,
  textStyle,
  icon,
  leftIcon,
  rightIcon,
  uppercase = false,
  tracking = 'normal',
}) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[`${variant}Button`],
    };

    if (pressed) {
      return {
        ...baseStyle,
        ...styles.buttonPressed,
        ...styles[`${variant}ButtonPressed`],
      };
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.buttonText,
      ...styles[`${size}Text`],
    };

    // Set text color based on button variant for proper contrast
    if (variant === 'primary' || variant === 'accentBackground') {
      baseStyle.color = colors.background; // White text on dark backgrounds
    } else {
      baseStyle.color = colors.text; // Dark text on light backgrounds
    }

    if (uppercase) {
      baseStyle.textTransform = 'uppercase';
      if (tracking === 'wider') {
        baseStyle.letterSpacing = 0.2;
      } else if (tracking === 'widest') {
        baseStyle.letterSpacing = 0.3;
      } else {
        baseStyle.letterSpacing = 0.1;
      }
    }

    if (disabled) {
      baseStyle.opacity = 0.5;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        styles[`${size}Button`],
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      onPressIn={disabled ? undefined : handlePressIn}
      onPressOut={disabled ? undefined : handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
      {icon && <View style={styles.iconCenter}>{icon}</View>}
      <Text style={[getTextStyle(), textStyle]}>
        {title}
      </Text>
      {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
  buttonDisabled: {
    opacity: 0.5,
  },

  // Variants
  primaryButton: {
     backgroundColor: colors.blueDark,
    
    borderColor: colors.border,
  },
  primaryButtonPressed: {
    backgroundColor: colors.blueDarkO10,
  },
  accentButton: {
    backgroundColor: colors.background,
    borderColor: colors.redAccent,
    shadowColor: colors.redAccent,
  },
  accentButtonPressed: {
    backgroundColor: colors.redAccentO10,
  },
  accentBackgroundButton: {
    backgroundColor: colors.redAccent,
    borderColor: colors.redAccent,
    shadowColor: colors.border,
  },
  accentBackgroundButtonPressed: {
    backgroundColor: colors.redDark,
  },
  secondaryButton: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  secondaryButtonPressed: {
    backgroundColor: colors.blueDarkO10,
  },

  // Sizes
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 32,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 60,
  },

  // Text styles
  buttonText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },

  // Icon positioning
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  iconCenter: {
    marginRight: 8,
  },
});

export default Button;