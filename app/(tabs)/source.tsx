import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GitBranch, ExternalLink } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import Card from '../../components/ui/Card';

const SourceScreen = () => {
  const handleGitHubPress = () => {
    Linking.openURL('https://github.com/skartik-sk');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <GitBranch size={32} color={colors.text} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>SOURCE</Text>
            <Text style={styles.subtitle}>Repository Access</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* GitHub Card */}
          <Card size="large" style={styles.githubCard}>
            <View style={styles.githubContent}>
              <GitBranch size={48} color={colors.text} />
              <Text style={styles.githubTitle}>OPEN SOURCE</Text>
              <Text style={styles.githubDescription}>
                All protocols are verifiable on-chain. Access the codebase to audit smart contracts.
              </Text>
              <TouchableOpacity
                style={styles.githubButton}
                onPress={handleGitHubPress}
              >
                <ExternalLink size={16} color={colors.background} />
                <Text style={styles.githubButtonText}>View GitHub</Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>COMMIT HASH</Text>
              <Text style={styles.statValue}>8f2a...91b</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>LICENSE</Text>
              <Text style={styles.statValue}>MIT / APACHE 2.0</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>STATUS</Text>
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={styles.statValue}>PASSING</Text>
              </View>
            </View>
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
  githubCard: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.blueDark,
    marginBottom: 24,
  },
  githubContent: {
    alignItems: 'center',
    width: '100%',
  },
  githubTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: colors.background,
    marginTop: 16,
    marginBottom: 8,
  },
  githubDescription: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.background,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  githubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  githubButtonText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 12,
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.1,
  },
  statsSection: {
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.blueDarkO20,
  },
  statLabel: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 0.1,
  },
  statValue: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 12,
    color: colors.text,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blueLight,
  },
});

export default SourceScreen;