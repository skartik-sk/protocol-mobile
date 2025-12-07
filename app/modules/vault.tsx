import { WalletUiButtonConnect } from '@/components/solana/wallet-ui-button-connect';
import { router } from 'expo-router';
import { ArrowDown, ArrowRight, ArrowUp, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import DonutChart from '../../components/ui/DonutChart';
import Input from '../../components/ui/Input';
import { colors } from '../../constants/colors';
import { useAuth } from '@/components/solana/auth-provider';
import { useAuthorization } from '@/components/solana/use-authorization';
import { ellipsify } from '@/utils/ellipsify';
import { WalletUiButtonDisconnect } from '@/components/solana/wallet-ui-button-disconnect';
import { useGetBalance } from '@/hooks/use-get-balance';
import { useWalletUi } from '@/components/solana/use-wallet-ui';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

import { ActivityIndicator } from 'react-native'
import { lamportsToSol, lamportsToSolDecimal, lamportsToSolDigit } from '@/utils/lamports-to-sol'
import { getVaultaddress, useDepositVault,useWithdrawVault } from '@/hooks/use-vault';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

function UserBalance({ address }: { address: PublicKey }) {
  const query = useGetBalance({ address })

  return (
      <View style={styles.statusIndicator}>
        <Text style={styles.statusText}> { query.isLoading ? <ActivityIndicator /> : query.data ? lamportsToSol(query.data) : '0'} SOL</Text>
      </View>
  )
}

function VaultBalance({ address }: { address: PublicKey }) {
  const query = useGetBalance({  address: getVaultaddress({address}) })

  return (
<>
        <Text style={styles.valueText}> { query.isLoading ? <ActivityIndicator /> : query.data ? lamportsToSolDigit(query.data) : '0'} </Text>
         <Text style= {styles.valueDecimal}>.{query.isLoading ? <ActivityIndicator /> : query.data ? lamportsToSolDecimal(query.data) : '0'}</Text>
</>
  )
}

function VaultStats({ address }: { address: PublicKey }) {
  const userBalanceQuery = useGetBalance({ address })
  const vaultBalanceQuery = useGetBalance({ address: getVaultaddress({ address }) })

  const userBalance = userBalanceQuery.data || 0
  const vaultBalance = vaultBalanceQuery.data || 0

  const userBalanceSOL = userBalance / LAMPORTS_PER_SOL
  const vaultBalanceSOL = vaultBalance / LAMPORTS_PER_SOL

  if (userBalanceQuery.isLoading || vaultBalanceQuery.isLoading) {
    return (
      <View style={styles.chartContainer}>
        <ActivityIndicator size="large" color={colors.blueDark} />
      </View>
    )
  }

  return (
    <View style={styles.chartContainer}>
      <DonutChart
        data={{ 
          in: vaultBalanceSOL,   // Blue - Locked in vault
          out: userBalanceSOL    // Red - Available in wallet
        }}
        label="DISTRIBUTION"
      />
    </View>
  )
}

const ClassicVaultScreen = () => {
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const {isAuthenticated,signOut}=useAuth();
  const { account } = useWalletUi()
  const depositVault = useDepositVault()
  const withdrawVault = useWithdrawVault()

  const { selectedAccount } = useAuthorization()
  
  // Get balances for MAX button
  const userBalanceQuery = useGetBalance({ address: account?.publicKey! })
  const vaultBalanceQuery = useGetBalance({ 
    address: account ? getVaultaddress({ address: account.publicKey }) : new PublicKey('11111111111111111111111111111111')
  })

  const handleBack = () => {
    router.back();
  };

  // Handle MAX button click
  const handleMaxClick = () => {
    if (!account) return;

    if (mode === 'deposit') {
      // For INJECT: use user wallet balance (minus small fee for transaction)
      const userBalance = userBalanceQuery.data || 0;
      const maxDeposit = Math.max(0, (userBalance / LAMPORTS_PER_SOL) - 0.001); // Leave 0.001 SOL for fees
      setAmount(maxDeposit.toFixed(6).replace(/\.?0+$/, '')); // Remove trailing zeros
    } else {
      // For EJECT: use vault balance
      const vaultBalance = vaultBalanceQuery.data || 0;
      const maxWithdraw = vaultBalance / LAMPORTS_PER_SOL;
      setAmount(maxWithdraw.toFixed(6).replace(/\.?0+$/, '')); // Remove trailing zeros
    }
  };

  const handleSubmit = () => {
    if (!account) return;
    if (!selectedAccount) return;
    if (!amount) return;
    
    if (mode === 'deposit') {
      depositVault
          .mutateAsync({amount:Number(amount)})
          .then(() => {
            console.log(`Deposited ${amount} SOL to vault`)
            setAmount(''); // Clear input after success
          })
          .catch((err) => console.log(`Error depositing`, err))
    } else {
      withdrawVault
           .mutateAsync({amount:Number(amount)})
           .then(() => {
             console.log(`Withdrew ${amount} SOL from vault`)
             setAmount(''); // Clear input after success
           })
           .catch((err) => console.log(`Error withdrawing`, err))
    }
  }

  const { disconnect } = useWalletUi()

  return (
    <KeyboardAwareScrollView 
           style={styles.scrollView} 
           showsVerticalScrollIndicator={false}
           bottomOffset={Platform.OS === 'ios' ? 100 : 0}
           contentContainerStyle={styles.scrollContent}
         >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowRight size={20} color={colors.redAccent} style={styles.backArrow} />
            <Text style={styles.backButtonText}>EXIT</Text>
          </TouchableOpacity>
        
          {isAuthenticated?
            <View >
              
          <View style={styles.statusIndicator}>
            
           {account?
            <Pressable onPress={() => disconnect()}>
              <UserBalance address={account.publicKey}/> 
            </Pressable> : null} 
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>DEV_NET</Text>
            </View>
            <View style={styles.statusIndicator}>
              <Text style={styles.statusText}> {ellipsify(selectedAccount?.publicKey.toString())}</Text>
            </View>
          </View>:
            <WalletUiButtonConnect/>
          }
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.valueContainer}>
            <Text style={styles.valueLabel}>TOTAL_VALUE_LOCKED</Text>
            {account?<VaultBalance address={account.publicKey}/> : null} 
            <Text style={styles.valueUnit}>SOL </Text>
          </View>
          {account ? <VaultStats address={account.publicKey} /> : (
            <View style={styles.chartContainer}>
              <DonutChart data={{ in: 0, out: 0 }} label="CONNECT" />
            </View>
          )}
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
              onRightLabelPress={handleMaxClick}
              keyboardType="decimal-pad"
            />

            {/* Show balance info */}
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>
                {mode === 'deposit' ? 'Available in wallet:' : 'Available in vault:'}
              </Text>
              <Text style={styles.balanceValue}>
                {mode === 'deposit' 
                  ? `${((userBalanceQuery.data || 0) / LAMPORTS_PER_SOL).toFixed(4)} SOL`
                  : `${((vaultBalanceQuery.data || 0) / LAMPORTS_PER_SOL).toFixed(4)} SOL`
                }
              </Text>
            </View>

            <Button
              title={mode === 'deposit' ? 'CONFIRM DEPOSIT' : 'INITIATE WITHDRAWAL'}
              variant={mode === 'deposit' ? 'primary' : 'accentBackground'}
              size="large"
              uppercase={true}
              tracking="widest"
              onPress={handleSubmit}
              disabled={depositVault.isPending || withdrawVault.isPending}
            />
          </View>
        </Card>
         </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
     flexGrow: 1,
     paddingBottom: 20,
   },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 24,
  },
  backArrow: {
    transform: [{ rotate: '180deg' }],
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
    justifyContent: 'flex-end',
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
    marginBottom: 10,
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
    gap: 16,
  },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  balanceLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: colors.text,
    opacity: 0.6,
  },
  balanceValue: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: colors.blueDark,
    fontWeight: '700',
  },
});

export default ClassicVaultScreen;
