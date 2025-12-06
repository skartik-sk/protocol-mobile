import { router } from 'expo-router';
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle2, Fingerprint, ScanFace } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import DonutChart from '../../components/ui/DonutChart';
import Input from '../../components/ui/Input';
import { colors } from '../../constants/colors';

const EnclaveVaultScreen = () => {
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Handle scan & deposit/withdraw logic here
    console.log(`${mode} amount:`, amount);
  };

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
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>ENCLAVE: ONLINE</Text>
          </View>
        </View>

        {/* Security Status Bar */}
        <View style={styles.securityBar}>
          <Text style={styles.securityBarText}>CURVE: SECP256R1</Text>
          <Text style={styles.securityBarId}>ID: 8f...2A</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.valueContainer}>
            <Text style={styles.valueLabel}>SECURE_BALANCE</Text>
            <Text style={styles.valueText}>
              8,102<Text style={styles.valueDecimal}>.00</Text>
            </Text>
            <Text style={styles.valueUnit}>
              <Text>ENCRYPTED</Text>
            </Text>
          </View>
          <View style={styles.chartContainer}>
            <DonutChart
              data={{ in: 8000, out: 500 }}
              label="SAFETY"
            />
            <Fingerprint size={24} color={colors.blueDark} style={styles.fingerprintOverlay} />
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
            <View style={styles.formHeader}>
              <Text style={styles.inputLabel}>
                {mode === 'deposit' ? 'INPUT_AMOUNT' : 'WITHDRAWAL_AMOUNT'} (SOL)
              </Text>
              <View style={styles.deviceVerified}>
                <CheckCircle2 size={10} color={colors.blueLight} />
                <Text style={styles.deviceVerifiedText}>DEVICE_VERIFIED</Text>
              </View>
            </View>

            <Input
              label={`${mode === 'deposit' ? 'INPUT_AMOUNT' : 'WITHDRAWAL_AMOUNT'} (SOL)`}
              size="large"
              variant="accent"
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              rightLabel="MAX"
              keyboardType="number-pad"
            />

            <Button
              title={`Scan & ${mode === 'deposit' ? 'Deposit' : 'Withdraw'}`}
              variant="accentBackground"
              size="large"
              uppercase={true}
              tracking="widest"
              onPress={handleSubmit}
              icon={<ScanFace size={24} strokeWidth={1.5} color={colors.background} />}
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
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blueLight,
  },
  statusText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.blueDark,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },

  // Security Bar
  securityBar: {
    backgroundColor: colors.blueDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.redAccent,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  securityBarText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.background,
    fontWeight: '600',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  securityBarId: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.background,
    opacity: 0.6,
  },

  // Stats Section
  statsSection: {
    flexDirection: 'row',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  valueContainer: {
    flex: 1,
    paddingLeft: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.border,
    paddingVertical: 8,
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
    fontSize: 64,
    color: colors.blueDark,
    lineHeight: 60,
  },
  valueDecimal: {
    fontSize: 32,
    color: colors.redAccent,
  },
  valueUnit: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.blueDark,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fingerprintOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    opacity: 0.2,
  },

  // Interface Card
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
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
    color: colors.text,
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

  // Form
  formContainer: {
    padding: 24,
    gap: 24,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.blueDark,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  deviceVerified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deviceVerifiedText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.blueLight,
    fontWeight: '600',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
});

export default EnclaveVaultScreen;