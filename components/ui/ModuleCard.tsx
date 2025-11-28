import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import Card from './Card';
import { colors } from '../../constants/colors';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  onPress: () => void;
  isNew?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  tags,
  onPress,
  isNew = false,
}) => {
  return (
    <Card
      variant="default"
      size="large"
      hoverable={true}
      onPress={onPress}
      style={styles.moduleCard}
      contentStyle={styles.moduleCardContent}
    >
      {/* Version badge */}
      <View style={styles.versionBadge}>
        {isNew && <Text style={styles.newBadge}>NEW</Text>}
        <Text style={styles.versionText}>V.1.0</Text>
      </View>

      {/* Header with icon and arrow */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <ArrowRight
          size={20}
          color={colors.redAccent}
          style={styles.arrowIcon}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  moduleCard: {
    marginBottom: 16,
    overflow: 'hidden',
  },
  moduleCardContent: {
    position: 'relative',
  },

  versionBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.blueDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  },
  newBadge: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 10,
    color: colors.background,
    textTransform: 'uppercase',
    letterSpacing: 0.1,
    backgroundColor: colors.redAccent,
    paddingHorizontal: 4,
  },
  versionText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.background,
    textTransform: 'uppercase',
    letterSpacing: 0.1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  iconContainer: {
    backgroundColor: colors.blueLightO20,
    borderWidth: 1,
    borderColor: colors.blueLight,
    padding: 12,
  },
  arrowIcon: {
    opacity: 0,
    transform: [{ translateX: -16 }],
  },

  title: {
    fontFamily: 'Archivo_900Black',
    fontSize: 24,
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    lineHeight: 28,
    marginBottom: 8,
  },

  description: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: 16,
    maxWidth: '90%',
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.redAccent,
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 10,
    color: colors.redAccent,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
});

export default ModuleCard;