import React from 'react';
import { View, StyleSheet } from 'react-native';

interface GridBackgroundProps {
  children: React.ReactNode;
  gridSize?: number;
  opacity?: number;
}

const GridBackground: React.FC<GridBackgroundProps> = ({
  children,
  gridSize = 20,
  opacity = 0.03,
}) => {
  return (
    <View style={styles.container}>
      {/* Grid background overlay - in React Native we'll use SVG to create the grid */}
      <View style={styles.gridOverlay} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 48, 73, 0.03)',
    // Note: In a production app, you might want to use react-native-svg to create
    // actual grid lines. For now, we'll use a subtle background color.
    // To create a real grid pattern, you would need to:
    // 1. Import react-native-svg
    // 2. Create repeating vertical and horizontal lines
    // 3. Position them absolutely
    opacity: 0.03,
  },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
});

export default GridBackground;