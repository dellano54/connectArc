import React from 'react';
import { View, ViewStyle } from 'react-native';

interface AnimatedCardProps {
  children: React.ReactNode;
  index: number;
  style?: ViewStyle | ViewStyle[];
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, style }) => {
  return (
    <View style={style}>
      {children}
    </View>
  );
};