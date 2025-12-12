import { StyleSheet, Platform } from 'react-native';
import { Colors } from './Colors';

export const GlobalStyles = StyleSheet.create({
  // Soft floating shadows
  shadowSm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  shadowMd: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  shadowLg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 10,
  },
  
  // Color Glows (for active states)
  glowBlue: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  glowViolet: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  
  // High-End Glassmorphism
  glass: {
    backgroundColor: Platform.select({
      ios: 'rgba(255, 255, 255, 0.75)',
      android: 'rgba(255, 255, 255, 0.9)',
    }),
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
  },
  glassDark: {
    backgroundColor: Platform.select({
      ios: 'rgba(15, 15, 15, 0.75)',
      android: 'rgba(15, 15, 15, 0.95)',
    }),
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  
  // Text Styles
  heading: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});