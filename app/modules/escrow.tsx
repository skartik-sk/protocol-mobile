import { router } from 'expo-router';
import { ArrowRight, ArrowRightLeft, Plus, Shield, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { colors } from '../../constants/colors';

interface EscrowData {
  id: number;
  maker: string;
  offerAmount: string;
  offerSymbol: string;
  requestAmount: string;
  requestSymbol: string;
}

const EscrowScreen = () => {
  const [isCreating, setIsCreating] = useState(false);

  const [activeEscrows, setActiveEscrows] = useState<EscrowData[]>([
    {
      id: 1,
      maker: '0x7A...B29',
      offerAmount: '5.0',
      offerSymbol: 'SOL',
      requestAmount: '850',
      requestSymbol: 'USDC'
    },
    {
      id: 2,
      maker: '0x9C...E11',
      offerAmount: '10K',
      offerSymbol: 'BONK',
      requestAmount: '0.5',
      requestSymbol: 'SOL'
    },
  ]);

  const [newEscrow, setNewEscrow] = useState({
    offerAmount: '',
    requestAmount: '',
    offerSymbol: 'SOL',
    requestSymbol: 'USDC',
  });

  const handleBack = () => {
    router.back();
  };

  const handleCreateEscrow = () => {
    setIsCreating(true);
    // Handle escrow creation logic here
    console.log('Create escrow:', newEscrow);
    setTimeout(() => setIsCreating(false), 1000);
  };

  const renderEscrowCard = ({ item }: { item: EscrowData }) => (
    <Card variant="default" size="medium" style={styles.escrowCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.makerText}>MAKER: {item.maker}</Text>
        <Text style={styles.statusText}>PENDING</Text>
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <View style={styles.lockedSection}>
          <Text style={styles.sectionLabel}>LOCKED</Text>
          <Text style={styles.amountText}>{item.offerAmount}</Text>
          <Text style={styles.symbolBadge}>{item.offerSymbol}</Text>
        </View>

        <View style={styles.swapArrowContainer}>
          <View style={styles.swapLine} />
          <View style={styles.swapArrowContainer}>
            <ArrowRightLeft size={14} color={colors.redAccent} style={styles.swapArrow} />
          </View>
        </View>

        <View style={styles.requestSection}>
          <Text style={styles.sectionLabel}>REQ</Text>
          <Text style={[styles.amountText, { color: colors.redAccent }]}>{item.requestAmount}</Text>
          <Text style={[styles.symbolBadge, { backgroundColor: colors.redAccentO10 }]}>
            {item.requestSymbol}
          </Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.actionButton}>
        <Shield size={16} color={colors.text} />
        <Text style={styles.actionButtonText}>Sign & Execute Swap</Text>
      </TouchableOpacity>
    </Card>
  );

  const renderNewEscrowForm = () => (
    <Card variant="default" size="large" style={styles.newEscrowCard}>
      <View style={styles.newEscrowHeader}>
        <View style={styles.newEscrowTitleContainer}>
          <Text style={styles.newEscrowTitle}>NEW CONTRACT</Text>
        </View>
        <TouchableOpacity onPress={() => setIsCreating(false)}>
          <X size={20} color={colors.redAccent} />
        </TouchableOpacity>
      </View>

      <View style={styles.escrowForm}>
        <View style={styles.escrowFormRow}>
          <View style={styles.escrowFormField}>
            <Text style={styles.escrowFormLabel}>YOU OFFER</Text>
            <Input
              size="medium"
              variant="default"
              placeholder="0.00"
              value={newEscrow.offerAmount}
              onChangeText={(text) => setNewEscrow(prev => ({ ...prev, offerAmount: text }))}
              style={styles.escrowInput}
            />
          </View>

          <View style={styles.escrowFormField}>
            <Text style={[styles.escrowFormLabel, { color: colors.redAccent }]}>YOU WANT</Text>
            <Input
              size="medium"
              variant="accent"
              placeholder="0.00"
              value={newEscrow.requestAmount}
              onChangeText={(text) => setNewEscrow(prev => ({ ...prev, requestAmount: text }))}
              style={styles.escrowInput}
            />
          </View>
        </View>

        <Button
          title="Mint Escrow Account"
          variant="secondary"
          size="medium"
          uppercase={true}
          onPress={handleCreateEscrow}
        />
      </View>
    </Card>
  );

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
            <View style={[styles.statusDot, { backgroundColor: colors.redAccent }]} />
            <Text style={styles.statusText}>ATOMIC_SWAP_V1</Text>
          </View>
        </View>

        {/* Create New Escrow Button */}
        {!isCreating ? (
          <View style={styles.createButtonContainer}>
            <Button
              title="Initialize New Escrow"
              variant="accent"
              size="large"
              uppercase={true}
              tracking="widest"
              onPress={() => setIsCreating(true)}
              icon={<Plus size={24} strokeWidth={3} />}
            />
          </View>
        ) : (
          renderNewEscrowForm()
        )}

        {/* Ledger Section */}
        <View style={styles.ledgerSection}>
          <View style={styles.ledgerHeader}>
            <Text style={styles.ledgerTitle}>PUBLIC LEDGER</Text>
            <Text style={styles.ledgerCount}>{activeEscrows.length} ORDERS ACTIVE</Text>
          </View>

          <View style={styles.escrowList}>
            {activeEscrows.map((item) => renderEscrowCard({ item }))}
          </View>
        </View>
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
  },
  statusText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },

  // Create Button
  createButtonContainer: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },

  // New Escrow Form
  newEscrowCard: {
    marginBottom: 16,
  },
  newEscrowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  newEscrowTitleContainer: {
    flex: 1,
  },
  newEscrowTitle: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 20,
    color: colors.text,
  },
  escrowForm: {
    gap: 16,
  },
  escrowFormRow: {
    flexDirection: 'row',
    gap: 16,
  },
  escrowFormField: {
    flex: 1,
  },
  escrowFormLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  escrowInput: {
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    backgroundColor: colors.blueDarkO5,
    fontSize: 20,
  },

  // Escrow Cards
  escrowCard: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    backgroundColor: colors.blueDarkO5,
  },
  makerText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.text,
    fontWeight: '700',
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  lockedSection: {
    flex: 1,
    alignItems: 'center',
  },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.text,
    opacity: 0.6,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  amountText: {
    fontFamily: 'Archivo_900Black',
    fontSize: 24,
    color: colors.text,
  },
  symbolBadge: {
    backgroundColor: colors.blueLightO20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  swapArrowContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    transform: [{ rotate: '-45deg' }],
  },
  swapArrow: {
    transform: [{ rotate: '45deg' }],
  },
  swapLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 16,
    width: 1,
    backgroundColor: colors.blueDarkO20,
    zIndex: 0,
  },
  requestSection: {
    flex: 1,
    alignItems: 'center',
  },
  actionButton: {
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: colors.border,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    color: colors.text,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },

  // Ledger Section
  ledgerSection: {
    flex: 1,
    paddingHorizontal: 24,
  },
  ledgerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    paddingBottom: 8,
    marginBottom: 16,
  },
  ledgerTitle: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 24,
    color: colors.text,
  },
  ledgerCount: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    opacity: 0.6,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
  },
  escrowList: {
    paddingBottom: 100, // Space for bottom navigation
  },
});

export default EscrowScreen;