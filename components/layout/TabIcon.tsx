import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface TabIconProps {
  icon: React.ReactNode;
  color?: string;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color = colors.text }) => {
  return (
    <View style={styles.iconContainer}>
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flex: 1,
    paddingVertical: 2,
  },
});

export default TabIcon;