import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  rightLabel?: string;
  onRightLabelPress?: () => void;
  variant?: 'default' | 'accent';
  size?: 'small' | 'medium' | 'large';
}

const Input: React.FC<InputProps> = ({
  label,
  rightLabel,
  onRightLabelPress,
  variant = 'default',
  size = 'medium',
  style,
  ...props
}) => {
  const inputHeight = size === 'small' ? 40 : size === 'medium' ? 48 : 56;
  const fontSize = size === 'small' ? 14 : size === 'medium' ? 16 : 18;

  const borderColor = variant === 'accent' ? colors.redAccent : colors.border;
  const focusColor = variant === 'accent' ? colors.redAccent : colors.blueDark;

  return (
    <View style={styles.container}>
      {(label || rightLabel) && (
        <View style={styles.labelContainer}>
          {label && <Text style={styles.label}>{label}</Text>}
          {rightLabel && onRightLabelPress && (
            <TouchableOpacity onPress={onRightLabelPress} style={styles.rightLabelButton}>
              <Text style={[styles.rightLabel, variant === 'accent' && styles.rightLabelAccent]}>
                {rightLabel}
              </Text>
            </TouchableOpacity>
          )}
          {rightLabel && !onRightLabelPress && (
            <Text style={[styles.rightLabel, variant === 'accent' && styles.rightLabelAccent]}>
              {rightLabel}
            </Text>
          )}
        </View>
      )}
      <TextInput
        style={[
          styles.input,
          {
            height: inputHeight,
            fontSize,
            borderColor,
          },
          style,
        ]}
        placeholderTextColor={colors.text + '50'}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  rightLabelButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.blueDarkO20,
    borderRadius: 4,
  },
  rightLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: colors.blueDark,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  rightLabelAccent: {
    color: colors.redAccent,
  },
  input: {
    fontFamily: 'monospace',
    color: colors.text,
    backgroundColor: colors.background,
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontWeight: '600',
  },
});

export default Input;
