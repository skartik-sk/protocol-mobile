import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info, Fingerprint, Linkedin, Twitter } from 'lucide-react-native';
import { colors } from '../../constants/colors';
import Card from '../../components/ui/Card';

const AboutScreen = () => {
  const handleLinkedInPress = () => {
    Linking.openURL('https://linkedin.com/in/skartik-sk');
  };

  const handleTwitterPress = () => {
    Linking.openURL('https://x.com/skartik_sk');
  };

  return (
   
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Info size={32} color={colors.text} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>OPERATOR</Text>
            <Text style={styles.subtitle}>Singupalli Kartik</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Profile Stats */}
          <View style={styles.statsGrid}>
            <Card size="small" style={styles.statCard}>
              <Text style={styles.statLabel}>ROLE</Text>
              <Text style={styles.statValue}>FULL STACK DEV</Text>
            </Card>
            <Card size="small" style={styles.statCard}>
              <Text style={styles.statLabel}>FOCUS</Text>
              <Text style={[styles.statValue, { color: colors.redAccent }]}>SOLANA / RUST</Text>
            </Card>
          </View>

          {/* Experience Timeline */}
          <View style={styles.timelineSection}>
            <Text style={styles.sectionTitle}>MISSION LOG</Text>
            <View style={styles.timeline}>
              <View style={styles.timelineItem}>
                <View style={[styles.timelineDot, { backgroundColor: colors.redAccent }]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>GROWTH SQUARE</Text>
                  <Text style={styles.timelineDate}>NOV 2024 - PRESENT</Text>
                  <Text style={styles.timelineDescription}>
                    Technical Team Manager. Overseeing student leaderboard dev & managing engineering teams.
                  </Text>
                </View>
              </View>
              <View style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>AARAMBH LABS</Text>
                  <Text style={styles.timelineDate}>SEP 2024 - MAR 2025</Text>
                  <Text style={styles.timelineDescription}>
                    Blockchain Developer. Built Next.js/Rust/Solana on-chain solutions.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>MEDALS</Text>
            <View style={styles.achievementsGrid}>
              <View style={styles.achievement}>
                <Text style={styles.achievementText}>ETHIndia Prize</Text>
              </View>
              <View style={styles.achievement}>
                <Text style={styles.achievementText}>Solana Radar Sidetrack</Text>
              </View>
              <View style={styles.achievement}>
                <Text style={styles.achievementText}>1730+ LeetCode</Text>
              </View>
            </View>
          </View>

          {/* Contact Grid */}
          <View style={styles.contactSection}>
            <TouchableOpacity
              style={[styles.contactButton, { backgroundColor: '#0077b5' }]}
              onPress={handleLinkedInPress}
            >
              <Linkedin size={16} color={colors.background} />
              <Text style={styles.contactButtonText}>LinkedIn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactButton, { backgroundColor: '#000000' }]}
              onPress={handleTwitterPress}
            >
              <Twitter size={16} color={colors.background} />
              <Text style={styles.contactButtonText}>X / Twitter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
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
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.text,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 0.1,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    color: colors.text,
    textTransform: 'uppercase',
  },
  timelineSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: colors.text,
    borderLeftWidth: 4,
    borderLeftColor: colors.redAccent,
    paddingLeft: 12,
    marginBottom: 16,
  },
  timeline: {
    position: 'relative',
    borderLeftWidth: 2,
    borderLeftColor: colors.blueDarkO20,
    marginLeft: 8,
    paddingLeft: 24,
  },
  timelineItem: {
    marginBottom: 24,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -28,
    top: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.blueDark,
    borderWidth: 2,
    borderColor: colors.background,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  timelineDate: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.text,
    opacity: 0.6,
    marginBottom: 8,
  },
  timelineDescription: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 20,
  },
  achievementsSection: {
    marginBottom: 32,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  achievement: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.blueDarkO5,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  achievementText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 12,
    color: colors.text,
    textTransform: 'uppercase',
  },
  contactSection: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  contactButtonText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 10,
    color: colors.background,
    textTransform: 'uppercase',
  },
});

export default AboutScreen;