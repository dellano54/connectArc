import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/stores/appStore';

export const Background = () => {
  const isDark = useAppStore((state) => state.isDark);
  
  // Use defined gradients or fallback to solid bg with a calculated fade
  const gradientColors = isDark 
    ? Colors.gradients?.dark || [Colors.dark.bg, Colors.dark.bg]
    : Colors.gradients?.light || [Colors.light.bg, Colors.light.bg];

  return (
    <LinearGradient
      colors={gradientColors as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});