import "react-native-get-random-values";
import { Stack, Tabs } from 'expo-router';
import {  Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider ,SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { brutalist } from '../constants/styles';
import {
  Home,
  FileText,
  Code,
  Info
} from 'lucide-react-native';
import TabIcon from '../components/layout/TabIcon';
import { AppProviders } from '@/utils/app-providers';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function TabLayout() {
  return (
     <AppProviders>

     <KeyboardProvider>
       
    <SafeAreaProvider>

      <SafeAreaView style={styles.container}>
        
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modules/vault" />
          <Stack.Screen name="modules/amm" />
          <Stack.Screen name="modules/escrow" />
          <Stack.Screen name="modules/flash-loan" />
          <Stack.Screen name="modules/enclave-vault" />
        </Stack>

      </SafeAreaView>
    </SafeAreaProvider>
     </KeyboardProvider>
     </AppProviders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBar: {
    ...brutalist.tabBar,
  },
  tabLabel: {
    fontFamily: 'JetBrainsMono_600SemiBold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    fontWeight: '600',
  },
});