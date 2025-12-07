import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import Card from '../../components/ui/Card';

const DocsScreen = () => {
  return (

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <FileText size={32} color={colors.text} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>MANUAL</Text>
            <Text style={styles.subtitle}>Technical Specifications</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Architecture Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Architecture</Text>
            <Text style={styles.sectionText}>
              This portfolio operates as a modular dApp using Solana's Sealevel runtime.
              Each module (Vault, AMM, etc.) represents a distinct smart contract interaction pattern.
            </Text>
          </View>

          {/* Modules Section */}
          <View style={styles.modulesSection}>
            <Text style={styles.sectionTitle}>MODULES</Text>

            <Card size="medium" style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>MODULE_01: VAULT</Text>
                <View style={styles.moduleTag}>
                  <Text style={styles.moduleTagText}>RUST</Text>
                </View>
              </View>
              <Text style={styles.moduleDescription}>
                Implements PDA (Program Derived Address) derivation for secure asset custody.
                Seeds: ['vault', authority_key]
              </Text>
            </Card>

            <Card size="medium" style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Text style={[styles.moduleTitle, { color: colors.blueLight }]}>MODULE_02: AMM</Text>
                <View style={[styles.moduleTag, { backgroundColor: colors.blueDark }]}>
                  <Text style={[styles.moduleTagText, { color: colors.background }]}>MATH</Text>
                </View>
              </View>
              <Text style={styles.moduleDescription}>
                Constant Product Formula X * Y = K.
                Includes slippage protection and dynamic fee adjustments based on volatility.
              </Text>
            </Card>

            <Card size="medium" style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleTitle}>MODULE_03: FLASH</Text>
                <View style={[styles.moduleTag, { backgroundColor: colors.blueDark }]}>
                  <Text style={[styles.moduleTagText, { color: colors.background }]}>CPI</Text>
                </View>
              </View>
              <Text style={styles.moduleDescription}>
                Utilizes CPI (Cross-Program Invocation) to borrow, execute instruction sets, and repay within a single atomic transaction slot.
              </Text>
            </Card>
          </View>
        </View>
      </ScrollView>

  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    borderBottomWidth: 4,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Archivo_900Black',
    fontSize: 36,
    color: colors.text,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.redAccent,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  content: {
    padding: 24,
    paddingBottom: 100, // Space for bottom navigation
  },
  section: {
    marginBottom: 32,
    paddingLeft: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.border,
  },
  sectionTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 8,
  },
  sectionText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 20,
  },
  modulesSection: {
    gap: 16,
  },
  moduleCard: {
    marginBottom: 16,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  moduleTitle: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.redAccent,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  moduleTag: {
    backgroundColor: colors.redAccent,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  moduleTagText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.background,
    letterSpacing: 0.1,
  },
  moduleDescription: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
    lineHeight: 16,
  },
});

export default DocsScreen;