import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

const BackgroundPattern: React.FC = () => {
  const dots = [];
  const gridSize = 20; // Grid size from original design

  // Generate grid dots
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      dots.push({
        left: x,
        top: y,
      });
    }
  }

  return (
    <View style={styles.backgroundPattern}>
      {/* Grid pattern using positioned dots */}
      {dots.map((dot, index) => (
        <View
          key={index}
          style={[
            styles.gridDot,
            {
              left: dot.left,
              top: dot.top,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    opacity: 0.03, // Subtle grid effect
    pointerEvents: 'none',
  },
  gridDot: {
    position: 'absolute',
    width: 1,
    height: 1,
    backgroundColor: colors.text,
    opacity: 0.1,
  },
});

export default BackgroundPattern;