import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/stores/appStore';

interface AvatarProps {
  source: string;
  size?: number;
  style?: ViewStyle;
  showStatus?: boolean;
  statusColor?: string;
  isNote?: boolean;
  noteIcon?: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 48,
  style,
  showStatus = false,
  statusColor = Colors.success,
  isNote = false,
  noteIcon,
}) => {
  const isDark = useAppStore((state) => state.isDark);
  const borderRadius = size * 0.28; // Slightly more rounded
  const borderColor = isDark ? Colors.dark.bg : Colors.light.bg;

  return (
    <View style={[{ width: size, height: size }, style]}>
      {isNote ? (
        <View
          style={[
            styles.noteContainer,
            {
              width: size,
              height: size,
              borderRadius,
            },
          ]}
        >
          {noteIcon}
        </View>
      ) : (
        <Image
          source={{ uri: source }}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius,
            },
          ]}
        />
      )}
      
      {showStatus && !isNote && (
        <View
          style={[
            styles.statusDot,
            {
              width: size * 0.28,
              height: size * 0.28,
              borderRadius: size * 0.14,
              backgroundColor: statusColor,
              borderWidth: size > 48 ? 3 : 2.5,
              borderColor: borderColor,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.light.border,
  },
  noteContainer: {
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(244, 63, 94, 0.2)',
  },
  statusDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    borderColor: 'white',
  },
});