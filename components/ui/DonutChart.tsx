import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../constants/colors';
import { globalStyles } from '../../styles/global';

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

        {/* In flow segment */}
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

        {/* Out flow segment (red) */}
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
        <Text style={styles.ratioText}>
          +{total > 0 ? (data.in / data.out).toFixed(1) : '0.0'}x
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
    // Rotating -90deg for the donut chart
    transform: [{ rotate: '-90deg' }],
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.blueDark,
    opacity: 0.6,
  },
  ratioText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: colors.blueDark,
    fontWeight: '700',
  },
});

export default DonutChart;