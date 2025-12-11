import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withDelay, 
  withSpring,
  FadeInDown 
} from 'react-native-reanimated';

interface AnimatedCardProps {
  children: React.ReactNode;
  index: number;
  style?: ViewStyle | ViewStyle[];
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, index, style }) => {
  // Using Layout Animation preset for entrance
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify().damping(12)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};