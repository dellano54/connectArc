import { ThemeColors } from '@/types';

export const Colors: ThemeColors & { gradients: { primary: string[], light: string[], dark: string[] } } = {
  // Professional "Uber-like" Blue
  primary: '#276EF1', 
  
  light: {
    bg: '#F9F9F9',           // Light Gray for contrast with white cards
    card: '#FFFFFF',         // Pure White Cards
    text: '#000000',         // High contrast Black
    sub: '#5E5E5E',          // Dark Gray for secondary text
    border: '#E8E8E8',       
    divider: 'transparent',
    input: '#EEEEEE',
  },
  
  dark: {
    bg: '#000000',           // True Black
    card: '#161616',         // Dark Gray Cards
    text: '#FFFFFF',         
    sub: '#A6A6A6',          
    border: '#262626',       
    divider: 'transparent',
    input: '#262626',
  },

  accent: '#276EF1',         
  success: '#05A357',
  warning: '#FFC043',
  danger: '#E11900',
  
  gradients: {
    primary: ['#276EF1', '#1952C4'], 
    light: ['#F9F9F9', '#F9F9F9'],   
    dark: ['#000000', '#000000'],    
  }
};

export const TabColors = {
  chat: Colors.primary,      // Blue
  groups: '#8B5CF6',         // Violet
  notes: '#F59E0B',          // Amber
  requests: '#10B981',       // Emerald
  profile: '#EC4899',        // Pink
};
