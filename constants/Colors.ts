import { ThemeColors } from '@/types';

// Modern, refreshed color palette inspired by the original
export const Colors: ThemeColors = {
  // Primary accent colors - slightly adjusted for better mobile visibility
  blue: { default: '#3B82F6', glow: 'rgba(59, 130, 246, 0.4)' },      // Brighter blue
  violet: { default: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.4)' },    // Softer violet
  teal: { default: '#14B8A6', glow: 'rgba(20, 184, 166, 0.4)' },      // Vibrant teal
  amber: { default: '#F59E0B', glow: 'rgba(245, 158, 11, 0.4)' },     // Same amber
  rose: { default: '#F43F5E', glow: 'rgba(244, 63, 94, 0.4)' },       // Punchier rose
  green: { default: '#10B981', glow: 'rgba(16, 185, 129, 0.4)' },     // Success green
  
  // Light theme - cleaner, more spacious
  light: {
    bg: '#FAFAFA',           // Softer white background
    card: 'rgba(255, 255, 255, 0.95)',
    text: '#0F172A',         // Deeper text for better contrast
    sub: '#64748B',          // Slate for secondary text
    border: 'rgba(226, 232, 240, 0.8)',
  },
  
  // Dark theme - deeper blacks, better contrast
  dark: {
    bg: '#0A0A0A',           // Near-black
    card: 'rgba(15, 15, 15, 0.95)',
    text: '#F8FAFC',         // Pure white text
    sub: '#94A3B8',          // Lighter gray for readability
    border: 'rgba(255, 255, 255, 0.1)',
  },
};

// Tab colors mapping
export const TabColors = {
  chat: Colors.blue.default,
  groups: Colors.violet.default,
  notes: Colors.rose.default,
  requests: Colors.teal.default,
  search: Colors.amber.default,
};

// Gradient definitions for backgrounds
export const Gradients = {
  blue: ['#3B82F6', '#60A5FA'],
  violet: ['#8B5CF6', '#A78BFA'],
  teal: ['#14B8A6', '#2DD4BF'],
  amber: ['#F59E0B', '#FBBF24'],
  rose: ['#F43F5E', '#FB7185'],
};