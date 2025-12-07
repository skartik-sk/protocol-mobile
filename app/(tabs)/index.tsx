import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '../../constants/colors';
import ModuleCard from '../../components/ui/ModuleCard';
import Marquee from '../../components/ui/Marquee';
import {
  Lock,
  Fingerprint,
  Shield,
  RefreshCw,
  Zap,
} from 'lucide-react-native';
import AppLogo from '@/utils/app-logo';

const HomeScreen = () => {
  const modules = [
    {
      id: 'vault',
      title: 'Standard Vault',
      description: 'DeFi Asset storage with simple deposit/withdraw cycles.',
      icon: <Lock size={24} strokeWidth={1.5} />,
      tags: ['Solana', 'Rust', 'PDA'],
      isNew: false,
    },
    {
      id: 'enclave-vault',
      title: 'Enclave Vault',
      description: 'Hardware-secured storage using Secp256r1 biometrics.',
      icon: <Fingerprint size={24} strokeWidth={1.5} />,
      tags: ['Passkeys', 'P-256'],
      isNew: false,
    },
    {
      id: 'escrow',
      title: 'Atomic Escrow',
      description: 'Trustless conditional asset transfers between parties.',
      icon: <Shield size={24} strokeWidth={1.5} />,
      tags: ['Anchor', 'SPL Token'],
      isNew: false,
    },
    {
      id: 'amm',
      title: 'Hydraulic AMM',
      description: 'Constant product liquidity pool with pressure dynamics.',
      icon: <RefreshCw size={24} strokeWidth={1.5} />,
      tags: ['DeFi', 'Math', 'Swap'],
      isNew: false,
    },
    {
      id: 'flash-loan',
      title: 'Flash Loan',
      description: 'Zero-collateral atomic borrowing with single-block repayment.',
      icon: <Zap size={24} strokeWidth={1.5} />,
      tags: ['Arbitrage', 'DeFi'],
      isNew: true,
    },
  ];

  const handleModulePress = (moduleId: string) => {
    router.push(`/modules/${moduleId}`);
  };

  return (
    

  
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerLeft}>SKARTIK.XYZ</Text>
            <Text style={styles.headerRight}>SOLANA_LABS</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>
              PROTO{'\n'}<Text style={styles.accentTitle}>COLS
          {/*<AppLogo/>*/}
              </Text>
            </Text>
          </View>
        </View>

        {/* Marquee */}
        <View style={styles.marqueeContainer}>
          <Marquee
            text="Building on Solana • Learning Rust • Shipping Code •"
            duration={12000}
            spacing={20}
            loop={true}
            textStyle={styles.marqueeText}
          />
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            An experimental playground for Web3 primitives.
          </Text>
          <Text style={styles.subDescription}>
            Select a module to inspect the architecture.
          </Text>
        </View>

        {/* Module Cards */}
        <View style={styles.modulesContainer}>
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              description={module.description}
              icon={module.icon}
              tags={module.tags}
              isNew={module.isNew}
              onPress={() => handleModulePress(module.id)}
            />
          ))}
        </View>
      </ScrollView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
        backgroundColor: colors.background,
  },
  header: {
    padding: 24,
    borderBottomWidth: 4,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  headerLeft: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.redAccent,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  headerRight: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  titleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    
  },
  mainTitle: {
    fontFamily: 'Archivo_900Black',
    fontSize: 60,
    color: colors.text,
    lineHeight: 51, // 0.85 of 60 for tight tracking
    letterSpacing: -2,
    fontWeight: '900',
  },
  accentTitle: {
    color: colors.redAccent,
  },
  marqueeContainer: {
    backgroundColor: colors.blueDark,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  marquee: {
    flexDirection: 'row',
  },
  marqueeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.background,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
    paddingHorizontal: 0, // Ensure space for the text to scroll
  },
  descriptionContainer: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 0,
  },
  description: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 18,
    color: colors.text,
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 8,
  },
  subDescription: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    lineHeight: 20,
  },
  modulesContainer: {
    padding: 24,
    paddingTop: 16,
    paddingBottom: 20, // Space for bottom navigation
  },
});

export default HomeScreen;