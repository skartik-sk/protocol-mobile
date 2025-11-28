import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowRight, ArrowDown, ArrowUp } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import DonutChart from '../../components/ui/DonutChart';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const ClassicVaultScreen = () => {
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log(`${mode} amount:`, amount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowRight size={20} color={colors.redAccent} />
            <Text style={styles.backButtonText}>EXIT</Text>
          </TouchableOpacity>
          <View style={styles.statusIndicator}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>MAIN_NET</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.valueContainer}>
            <Text style={styles.valueLabel}>TOTAL_VALUE_LOCKED</Text>
            <Text style={styles.valueText}>
              4,280<Text style={styles.valueDecimal}>.55</Text>
            </Text>
            <Text style={styles.valueUnit}>SOL / USDC</Text>
          </View>
          <View style={styles.chartContainer}>
            <DonutChart
              data={{ in: 6500, out: 2220 }}
              label="NET FLOW"
            />
          </View>
        </View>

        {/* Main Interface */}
        <Card variant="default" size="large" style={styles.interfaceCard}>
          {/* Mode Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                mode === 'deposit' && styles.activeTab,
              ]}
              onPress={() => setMode('deposit')}
            >
              <ArrowDown size={16} color={mode === 'deposit' ? colors.background : colors.text} />
              <Text style={[
                styles.tabText,
                mode === 'deposit' && styles.activeTabText,
              ]}>
                Inject
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                mode === 'withdraw' && styles.activeTabAccent,
              ]}
              onPress={() => setMode('withdraw')}
            >
              <ArrowUp size={16} color={mode === 'withdraw' ? colors.background : colors.redAccent} />
              <Text style={[
                styles.tabText,
                mode === 'withdraw' && styles.activeTabTextAccent,
              ]}>
                Eject
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Input
              label={mode === 'deposit' ? 'INPUT_AMOUNT' : 'WITHDRAWAL_AMOUNT'}
              size="large"
              variant={mode === 'deposit' ? 'default' : 'accent'}
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              rightLabel="MAX"
              keyboardType="number-pad"
            />

            <Button
              title={mode === 'deposit' ? 'CONFIRM DEPOSIT' : 'INITIATE WITHDRAWAL'}
              variant={mode === 'deposit' ? 'primary' : 'accentBackground'}
              size="large"
              uppercase={true}
              tracking="widest"
              onPress={handleSubmit}
            />
          </View>
        </Card>
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
    padding: 24,
    marginBottom: 24,
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
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blueDark,
  },
  statusText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.blueDark,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  statsSection: {
    flexDirection: 'row',
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.border,
  },
  valueLabel: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.blueDark,
    opacity: 0.6,
    marginBottom: 4,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  valueText: {
    fontFamily: 'Archivo_900Black',
    fontSize: 72,
    color: colors.blueDark,
    lineHeight: 60,
  },
  valueDecimal: {
    fontSize: 32,
    color: colors.redAccent,
  },
  valueUnit: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.blueDark,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interfaceCard: {
    marginHorizontal: 24,
    marginBottom: 100, // Space for bottom navigation
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: colors.blueDark,
  },
  activeTabAccent: {
    backgroundColor: colors.redAccent,
  },
  tabText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.blueDark,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  activeTabText: {
    color: colors.background,
  },
  activeTabTextAccent: {
    color: colors.background,
  },
  formContainer: {
    padding: 24,
    gap: 24,
  },
});

export default ClassicVaultScreen;