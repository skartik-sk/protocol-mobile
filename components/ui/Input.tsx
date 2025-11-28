import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../constants/colors';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'accent';
  rightLabel?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  size = 'medium',
  variant = 'default',
  rightLabel,
  placeholder,
  value,
  onChangeText,
  style,
  inputStyle,
  labelStyle,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  ...textInputProps
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const getContainerStyle = (): ViewStyle => {
    return [
      styles.container,
      styles[`${size}Container`],
      variant === 'accent' && styles.accentContainer,
      style,
    ];
  };

  const getInputStyle = (): TextStyle => {
    return [
      styles.input,
      styles[`${size}Input`],
      variant === 'accent' && styles.accentInput,
      focused && styles.inputFocused,
      variant === 'accent' && focused && styles.accentInputFocused,
      inputStyle,
    ];
  };

  const getLabelStyle = (): TextStyle => {
    return [
      styles.label,
      styles[`${size}Label`],
      variant === 'accent' && styles.accentLabel,
      labelStyle,
    ];
  };

  return (
    <View style={getContainerStyle()}>
      {label && (
        <Text style={getLabelStyle()}>
          {label}
        </Text>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          style={getInputStyle()}
          placeholder={placeholder}
          placeholderTextColor={colors.blueDarkO20}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          selectionColor={colors.redAccent}
          autoCapitalize="none"
          autoCorrect={false}
          {...textInputProps}
        />

        {rightLabel && (
          <Text style={styles.rightLabel}>
            {rightLabel}
          </Text>
        )}
      </View>

      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  smallContainer: {
    marginBottom: 8,
  },
  largeContainer: {
    marginBottom: 24,
  },
  mediumContainer: {
    marginBottom: 16,
  },
  accentContainer: {
    // Accent variant specific styles
  },

  label: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 10,
    color: colors.blueDark,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  smallLabel: {
    fontSize: 8,
    marginBottom: 2,
  },
  largeLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  mediumLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  accentLabel: {
    color: colors.redAccent,
  },

  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.border,
    color: colors.text,
    fontFamily: 'SpaceGrotesk_600SemiBold',
    borderRadius: 0,
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 18, // text-3xl equivalent
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowColor: colors.border,
    elevation: 2,
  },
  smallInput: {
    fontSize: 14, // text-xl equivalent
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 40,
  },
  largeInput: {
    fontSize: 24,
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: 80,
  },
  mediumInput: {
    fontSize: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 60,
  },
  accentInput: {
    borderColor: colors.redAccent,
    color: colors.redAccent,
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
  accentInputFocused: {
    backgroundColor: colors.redAccentO10,
    borderColor: colors.redAccent,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowColor: colors.redAccent,
    elevation: 4,
  },

  rightLabel: {
    position: 'absolute',
    right: 16,
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 10,
    color: colors.blueDarkO50,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },

  errorText: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 12,
    color: colors.redAccent,
    marginTop: 4,
  },
});

export default Input;