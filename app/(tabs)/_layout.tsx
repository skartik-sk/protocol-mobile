import { Tabs } from 'expo-router';
import {  Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider ,SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { brutalist } from '../../constants/styles';
import {
  Home,
  FileText,
  Code,
  Info
} from 'lucide-react-native';
import TabIcon from '../../components/layout/TabIcon';

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}  >
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.redAccent,
            tabBarInactiveTintColor: colors.text,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <TabIcon icon={<Home size={size} color={color as string} />} />
              ),
            }}
          />
          <Tabs.Screen
            name="docs"
            options={{
              title: 'Docs',
              tabBarIcon: ({ color, size }) => (
                <TabIcon icon={<FileText size={size} color={color as string} />} />
              ),
            }}
          />
          <Tabs.Screen
            name="source"
            options={{
              title: 'Source',
              tabBarIcon: ({ color, size }) => (
                <TabIcon icon={<Code size={size} color={color as string} />} />
              ),
            }}
          />
          <Tabs.Screen
            name="about"
            options={{
              title: 'About',
              tabBarIcon: ({ color, size }) => (
                <TabIcon icon={<Info size={size} color={color as string} />} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
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