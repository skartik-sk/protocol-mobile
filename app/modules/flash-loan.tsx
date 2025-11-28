import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowRight, Zap } from 'lucide-react-native';
import { colors, animations } from '../../constants/colors';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const FlashLoanScreen = () => {
  const [amount, setAmount] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  // Animated values for zap flow
  const [step1Opacity] = useState(new Animated.Value(1));
  const [step2Opacity] = useState(new Animated.Value(0.2));
  const [step3Opacity] = useState(new Animated.Value(0.2));
  const [zapPosition] = useState(new Animated.Value(0));

  const handleBack = () => {
    router.back();
  };

  const handleExecute = () => {
    setIsExecuting(true);

    // Start zap flow animation
    Animated.sequence([
      Animated.timing(zapPosition, {
        toValue: 1,
        duration: animations.duration.zap,
        useNativeDriver: false,
      }),
      Animated.timing(zapPosition, {
        toValue: 2,
        duration: animations.duration.zap,
        useNativeDriver: false,
      }),
    ]).start();

    // Reset after execution
    setTimeout(() => {
      setIsExecuting(false);
      zapPosition.setValue(0);
    }, 2000);
  };

  useEffect(() => {
    if (isExecuting) {
      // Animate opacity changes during execution
      Animated.parallel([
        Animated.timing(step1Opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(step2Opacity, {
          toValue: 1,
          duration: 300,
          delay: 500,
          useNativeDriver: false,
        }),
        Animated.timing(step3Opacity, {
          toValue: 1,
          duration: 300,
          delay: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Reset to initial state
      step1Opacity.setValue(1);
      step2Opacity.setValue(0.2);
      step3Opacity.setValue(0.2);
      zapPosition.setValue(0);
    }
  }, [isExecuting]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowRight size={20} color={colors.redAccent} style={styles.backArrow} />
            <Text style={styles.backButtonText}>EXIT</Text>
          </TouchableOpacity>
          <View style={styles.statusIndicator}>
            <View style={styles.gaugeIcon}>
              <Zap size={16} color={colors.text} />
            </View>
            <Text style={styles.statusText}>FLASH_PROTO</Text>
          </View>
        </View>

        {/* Atomic Transaction Block */}
        <Card variant="default" size="large" style={styles.atomicBlock}>
          {/* Header Label */}
          <View style={styles.blockHeader}>
            <View style={styles.blockLabel}>
              <Text style={styles.blockLabelText}>ATOMIC_TRANSACTION_BLOCK</Text>
            </View>
          </View>

          {/* Transaction Steps */}
          <View style={styles.stepsContainer}>
            {/* Step 1: Borrow Liquidity */}
            <View
              style={[
                styles.step,
                isExecuting && styles.step1Active,
              ]}
            >
              <View style={styles.stepHeader}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>BORROW_LIQUIDITY</Text>
              </View>
              <View style={styles.step1Input}>
                <Input
                  label=""
                  size="medium"
                  variant="default"
                  placeholder="0.00 SOL"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="number-pad"
                  editable={!isExecuting}
                  style={styles.stepInput}
                />
              </View>
            </View>

            {/* Zap Flow Line 1-2 */}
            <View style={styles.zapContainer}>
              <Animated.View
                style={[
                  styles.zapLine,
                  {
                    opacity: step1Opacity,
                    backgroundColor: isExecuting ? colors.redAccent : colors.text,
                  },
                ]}
              />
            </View>

            {/* Step 2: Execute Strategy */}
            <View
              style={[
                styles.step,
                isExecuting && styles.step2Active,
              ]}
            >
              <View style={styles.stepHeader}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>EXECUTE_STRATEGY</Text>
              </View>
              <View style={styles.step2Content}>
                <Text style={styles.stepDescription}>
                  Arbitrage / Collateral Swap / Liquidation
                </Text>
              </View>
            </View>

            {/* Zap Flow Line 2-3 */}
            <View style={styles.zapContainer}>
              <Animated.View
                style={[
                  styles.zapLine,
                  {
                    opacity: step2Opacity,
                    backgroundColor: isExecuting ? colors.redAccent : colors.text,
                  },
                ]}
              />
            </View>

            {/* Step 3: Repay + Fee */}
            <View
              style={[
                styles.step,
                isExecuting && styles.step3Active,
              ]}
            >
              <View style={styles.stepHeader}>
                <View style={styles.stepHeaderRow}>
                  <Text style={styles.stepNumber}>3.</Text>
                  <Text style={styles.stepText}>REPAY + FEE</Text>
                  <Text style={styles.feeText}>FEE: 0.09%</Text>
                </View>
              </View>
              <View style={styles.step3Amount}>
                <Text style={styles.repaymentAmount}>
                  {amount ? (parseFloat(amount) * 1.0009).toFixed(4) : '0.0000'}
                </Text>
                <Text style={styles.repaymentUnit}> SOL</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Execute Button */}
        <View style={styles.executeContainer}>
          <Button
            title="INITIATE FLASH LOOP"
            variant="accentBackground"
            size="large"
            uppercase={true}
            tracking="widest"
            onPress={handleExecute}
            disabled={isExecuting}
            icon={
              <View style={styles.buttonIconContainer}>
                <Zap
                  size={20}
                  strokeWidth={2}
                  fill={colors.background}
                  color={colors.background}
                  style={isExecuting ? styles.zapIcon : undefined}
                />
              </View>
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.redAccentO10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: -8,
  },
  backArrow: {
    transform: [{ rotate: '180deg' }],
  },
  backButtonText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.redAccent,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gaugeIcon: {
    padding: 4,
    backgroundColor: colors.blueDarkO20,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },

  // Atomic Transaction Block
  atomicBlock: {
    marginHorizontal: 24,
    marginBottom: 100, // Space for bottom navigation
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  blockHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.blueDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  blockLabel: {
    alignItems: 'center',
  },
  blockLabelText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.background,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  stepsContainer: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  step: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 16,
    marginVertical: 8,
  },
  step1Active: {
    borderColor: colors.blueLight,
    backgroundColor: colors.blueLightO20,
  },
  step2Active: {
    borderColor: colors.blueLight,
    backgroundColor: colors.blueLightO20,
    opacity: 1,
  },
  step3Active: {
    borderColor: colors.blueLight,
    backgroundColor: colors.blueLightO20,
    opacity: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  stepNumber: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  stepText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  feeText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.text,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  step1Input: {
    marginBottom: 8,
  },
  stepInput: {
    fontSize: 20,
    fontWeight: '700',
  },
  step2Content: {
    opacity: 0.8,
  },
  stepDescription: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    opacity: 0.6,
    lineHeight: 16,
  },
  step3Amount: {
    flex: 1,
    alignItems: 'center',
  },
  repaymentAmount: {
    fontFamily: 'monospace',
    fontSize: 32,
    color: colors.text,
    fontWeight: '700',
  },
  repaymentUnit: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    marginTop: 4,
  },

  // Zap Flow
  zapContainer: {
    height: 32,
    position: 'relative',
  },
  zapLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 8,
    height: 2,
  },

  // Execute Button
  executeContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  buttonIconContainer: {
    position: 'relative',
    width: 24,
    height: 24,
  },
  zapIcon: {
    // This would be animated with Animated API
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
});

export default FlashLoanScreen;