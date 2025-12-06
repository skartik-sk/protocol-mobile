import { router } from 'expo-router';
import { ArrowDown, Droplets, Settings } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { colors } from '../../constants/colors';

const AMMScreen = () => {
  const [slippage, setSlippage] = useState(0.5);
  const [amountIn, setAmountIn] = useState('');

  const simulatedPriceImpact = useMemo(() => {
    return amountIn ? (parseFloat(amountIn) * 0.8).toFixed(2) : '0.00';
  }, [amountIn]);

  const estimatedOutput = useMemo(() => {
    return amountIn ? (parseFloat(amountIn) * 145.2).toFixed(2) : '0.00';
  }, [amountIn]);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Handle swap logic here
    console.log(`Swap ${amountIn} SOL with ${slippage}% slippage`);
  };

  const renderCurve = () => {
    const points = [];
    for (let i = 10; i <= 90; i += 5) {
      points.push(`${i},${1000 / i}`);
    }
    const simulatedX = 30 + (amountIn ? Math.min(40, parseFloat(amountIn) * 5) : 0);
    const simulatedY = 1000 / simulatedX;

    return points.map((point, index) => {
      const [x, y] = point.split(',').map(Number);
      return { x, y };
    });
  };

  const curvePoints = renderCurve();
  const simulatedX = 30 + (amountIn ? Math.min(40, parseFloat(amountIn) * 5) : 0);
  const simulatedY = 1000 / simulatedX;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowDown size={20} color={colors.redAccent} style={styles.backArrow} />
            <Text style={styles.backButtonText}>EXIT</Text>
          </TouchableOpacity>
          <View style={styles.statusIndicator}>
            <View style={styles.gaugeIcon}>
              <Settings size={16} color={colors.text} />
            </View>
            <Text style={styles.statusText}>FLUID_AMM_V1</Text>
          </View>
        </View>

        {/* Equilibrium State Visualization */}
        <View style={styles.equilibriumContainer}>
          <View style={styles.equilibriumHeader}>
            <Text style={styles.equilibriumLabel}>EQUILIBRIUM_STATE (K)</Text>
            <Text style={styles.priceImpact}>PRICE_IMPACT: {simulatedPriceImpact}%</Text>
          </View>

          {/* Simple curve visualization using View */}
          <View style={styles.curveContainer}>
            {curvePoints.map((point, index) => (
              <View
                key={index}
                style={[
                  styles.curvePoint,
                  {
                    left: `${(point.x / 100) * 100}%`,
                    top: `${(1 - point.y / 1000) * 100}%`,
                  },
                ]}
              />
            ))}

            {/* Current point indicator */}
            <View
              style={[
                styles.currentPoint,
                {
                  left: `${(simulatedX / 100) * 100}%`,
                  top: `${(1 - simulatedY / 1000) * 100}%`,
                },
              ]}
            />

            {/* Line from initial to current point */}
            <View
              style={[
                styles.curveLine,
                {
                  left: '30%',
                  top: '66.7%',
                  width: `${((simulatedX - 30) / 100) * 100}%`,
                  height: `${Math.abs(simulatedY - 333.3) / 1000 * 100}%`,
                  transform: simulatedY < 333.3 ? [{ translateY: `${Math.abs(simulatedY - 333.3) / 1000 * 100}%` }] : [],
                },
              ]}
            />
          </View>
        </View>

        {/* Swap Interface */}
        <View style={styles.swapContainer}>
          {/* Input Pool */}
          <View style={styles.poolCard}>
            <View style={styles.poolHeader}>
              <Text style={styles.poolLabel}>RESERVOIR_A (SOL)</Text>
              <Text style={styles.poolBalance}>BAL: 14.2</Text>
            </View>
            <Input
              size="large"
              variant="default"
              placeholder="0.0"
              value={amountIn}
              onChangeText={setAmountIn}
              keyboardType="number-pad"
              style={styles.inputLarge}
            />
            <View style={styles.arrowContainer}>
              <ArrowDown size={16} color={colors.text} />
            </View>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Output Pool */}
          <View style={styles.poolCard}>
            <View style={styles.poolHeader}>
              <Text style={[styles.poolLabel, { color: colors.blueLight }]}>RESERVOIR_B (USDC)</Text>
              <Text style={styles.poolBalance}>EST. OUTPUT</Text>
            </View>
            <Text style={styles.outputAmount}>
              {estimatedOutput}
            </Text>
          </View>
        </View>

        {/* Slippage Control */}
        <View style={styles.slippageContainer}>
          <View style={styles.slippageHeader}>
            <Text style={styles.slippageLabel}>
              <View style={styles.gaugeIcon}>
                <Settings size={14} />
              </View>
              VALVE TOLERANCE
            </Text>
          </View>

          <View style={styles.slippageButtons}>
            {[0.1, 0.5, 1.0].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.slippageButton,
                  slippage === value && styles.slippageButtonActive,
                ]}
                onPress={() => setSlippage(value)}
              >
                <Text style={[
                  styles.slippageButtonText,
                  slippage === value && styles.slippageButtonTextActive,
                ]}>
                  {value}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.actionContainer}>
          <Button
            title="PRESSURIZE & SWAP"
            variant="accentBackground"
            size="large"
            uppercase={true}
            tracking="widest"
            onPress={handleSubmit}
            icon={
              <Droplets
                size={20}
                strokeWidth={2}
                color={colors.background}
                style={amountIn ? styles.bounceIcon : undefined}
              />
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

  // Equilibrium State
  equilibriumContainer: {
    height: 128,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.blueDarkO5,
    marginBottom: 24,
    marginHorizontal: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  equilibriumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    zIndex: 1,
  },
  equilibriumLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.text,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  priceImpact: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.redAccent,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  curveContainer: {
    flex: 1,
    margin: 16,
    position: 'relative',
  },
  curvePoint: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text,
    opacity: 0.2,
  },
  currentPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.redAccent,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  curveLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: colors.redAccent,
    opacity: 0.6,
    borderRadius: 1,
  },

  // Swap Interface
  swapContainer: {
    flexDirection: 'column',
    gap: 8,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  poolCard: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 16,
    position: 'relative',
  },
  poolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  poolLabel: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  poolBalance: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    opacity: 0.5,
  },
  inputLarge: {
    fontSize: 48,
    paddingVertical: 16,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 6,
    left: 16,
    zIndex: 1,
    backgroundColor: colors.background,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outputAmount: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 48,
    color: colors.text,
    opacity: 0.9,
  },
  spacer: {
    height: 8,
  },
  bounceIcon: {
    // Animation would be added with Animated API
  },

  // Slippage Control
  slippageContainer: {
    borderTopWidth: 2,
    borderTopColor: colors.border,
    paddingVertical: 16,
    marginHorizontal: 24,
  },
  slippageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  slippageLabel: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  slippageButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  slippageButton: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  slippageButtonActive: {
    backgroundColor: colors.redAccent,
    borderColor: colors.redAccent,
  },
  slippageButtonText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  slippageButtonTextActive: {
    color: colors.background,
  },

  // Action
  actionContainer: {
    marginHorizontal: 24,
    marginBottom: 100, // Space for bottom navigation
  },
});

export default AMMScreen;