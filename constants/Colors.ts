import { ThemeColors } from '@/types';

// Professional Palette from Insp
export const Colors: ThemeColors = {
  // Brand Accents with Glows
  blue: { default: '#2563EB', glow: 'rgba(37, 99, 235, 0.5)' },
  violet: { default: '#7C3AED', glow: 'rgba(124, 58, 237, 0.5)' },
  teal: { default: '#0D9488', glow: 'rgba(13, 148, 136, 0.5)' },
  amber: { default: '#F59E0B', glow: 'rgba(245, 158, 11, 0.5)' },
  rose: { default: '#E11D48', glow: 'rgba(225, 29, 72, 0.5)' },
  green: { default: '#10B981', glow: 'rgba(16, 185, 129, 0.5)' },
  
  // Light Theme (Clean & Airy)
  light: {
    bg: '#F3F4F6',
    card: 'rgba(255, 255, 255, 0.85)',
    text: '#111827',
    sub: '#6B7280',
    border: 'rgba(229, 231, 235, 0.6)',
  },
  
  // Dark Theme (Deep & Premium)
  dark: {
    bg: '#000000',
    card: 'rgba(15, 15, 15, 0.85)',
    text: '#F9FAFB',
    sub: '#A3A3A3',
    border: 'rgba(255, 255, 255, 0.12)',
  },
};

export const TabColors = {
  chat: Colors.blue.default,
  groups: Colors.violet.default,
  notes: Colors.rose.default,
  requests: Colors.teal.default,
  search: Colors.amber.default,
};