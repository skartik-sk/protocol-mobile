import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';

export default function ModuleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Module Router</Text>
      <Text style={styles.subtitle}>Dynamic module loading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk_700Bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: colors.text,
    opacity: 0.7,
  },
});