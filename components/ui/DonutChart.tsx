import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../constants/colors';

interface DonutChartProps {
  data: {
    in: number;
    out: number;
  };
  label?: string;
  size?: number;
  strokeWidth?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  label = "STATS",
  size = 120,
  strokeWidth = 18,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const total = data.in + data.out;
  const inOffset = circumference - (data.in / total) * circumference;
  const centerX = size / 2;
  const centerY = size / 2;

  // Calculate ratio properly
  const getRatio = () => {
    if (total === 0) return '0.0';
    if (data.out === 0) return '∞'; // Infinity if all in vault
    const ratio = data.in / data.out;
    if (ratio >= 10) return ratio.toFixed(0); // Show whole numbers for large ratios
    if (ratio >= 1) return ratio.toFixed(1);   // Show 1 decimal for ratios >= 1
    return ratio.toFixed(2);                    // Show 2 decimals for small ratios
  };

  return (
    <View style={styles.container}>
      {/* Background SVG for the donut chart */}
      <Svg width={size} height={size} style={styles.svg}>
        {/* Outer circle background */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke={colors.blueDark}
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.1}
        />

        {/* In flow segment (Vault - Blue) */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke={colors.blueDark}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={inOffset}
          strokeLinecap="round"
        />

        {/* Out flow segment (Wallet - Red) */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke={colors.redAccent}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${(data.out / total) * circumference} ${circumference}`}
          strokeDashoffset={-1 * ((data.in / total) * circumference)}
          strokeLinecap="round"
        />
      </Svg>

      {/* Center text overlay */}
      <View style={styles.centerText}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.ratioText}>{getRatio()}x</Text>
        <Text style={styles.subText}>
          {data.in.toFixed(1)} / {data.out.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svg: {
    transform: [{ rotate: '-90deg' }],
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: colors.blueDark,
    opacity: 0.6,
    textTransform: 'uppercase',
  },
  ratioText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: colors.blueDark,
    fontWeight: '700',
  },
  subText: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: colors.blueDark,
    opacity: 0.5,
    marginTop: 2,
  },
});

export default DonutChart;
