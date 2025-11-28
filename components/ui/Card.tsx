import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { colors, animations } from '../../constants/colors';

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  hoverable?: boolean;
  pressed?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  hoverable = false,
  pressed = false,
  onPress,
  style,
  contentStyle,
  ...touchableOpacityProps
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleHoverIn = () => {
    if (hoverable) {
      setIsHovered(true);
    }
  };

  const handleHoverOut = () => {
    if (hoverable) {
      setIsHovered(false);
    }
  };

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.card,
      ...styles[`${variant}Card`],
      ...styles[`${size}Card`],
    };

    if (hoverable && isPressed) {
      return {
        ...baseStyle,
        ...styles.cardHoverablePressed,
      };
    }

    if (pressed) {
      return {
        ...baseStyle,
        ...styles.cardPressed,
      };
    }

    if (hoverable && isHovered) {
      return {
        ...baseStyle,
        ...styles.cardHoverableHover,
      };
    }

    if (hoverable) {
      return {
        ...baseStyle,
        ...styles.cardHoverable,
      };
    }

    return baseStyle;
  };

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[getCardStyle(), style]}
      onPress={onPress}
      onPressIn={onPress ? handlePressIn : undefined}
      onPressOut={onPress ? handlePressOut : undefined}
      onHoverIn={hoverable ? handleHoverIn : undefined}
      onHoverOut={hoverable ? handleHoverOut : undefined}
      activeOpacity={0.8}
      {...(onPress ? touchableOpacityProps : {})}
    >
      <View style={[styles.cardContent, contentStyle]}>
        {children}
      </View>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
  },
  cardHoverable: {
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    backgroundColor: colors.background,
  },
  cardHoverableHover: {
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowColor: colors.redAccent,
    shadowRadius: 0,
    elevation: 12,
    transform: [{ translateY: -2 }, { translateX: 2 }],
    borderColor: colors.redAccent,
    backgroundColor: colors.background,
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
    backgroundColor: colors.background,
  },
  cardPressed: {
    transform: [{ translateY: 2 }, { translateX: 2 }],
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  // Variants
  defaultCard: {
    borderColor: colors.border,
  },
  accentCard: {
    borderColor: colors.redAccent,
    backgroundColor: colors.surfaceAccent,
  },
  secondaryCard: {
    borderColor: colors.blueDarkO20,
    backgroundColor: colors.blueDarkO5,
  },

  // Sizes
  smallCard: {
    padding: 8,
  },
  mediumCard: {
    padding: 16,
  },
  largeCard: {
    padding: 20,
  },

  cardContent: {
    flex: 1,
  },
});

export default Card;