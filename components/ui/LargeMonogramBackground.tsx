import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useAppStore } from '@/stores/appStore';
import { Colors } from '@/constants/Colors';

interface LargeMonogramBackgroundProps {
  monogram: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  textOpacity?: number;
  fontFamily?: string;
}

export const LargeMonogramBackground: React.FC<LargeMonogramBackgroundProps> = ({
  monogram,
  style,
  textStyle,
  textOpacity = 0.08,
  fontFamily,
}) => {
  const { isDark } = useAppStore();
  const theme = isDark ? Colors.dark : Colors.light;

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container, style]}>
      <Text
        style={[
          styles.monogramText,
          {
            color: theme.text,
            opacity: textOpacity,
            fontFamily: fontFamily || 'System',
          },
          textStyle,
        ]}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {monogram}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    pointerEvents: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },

  monogramText: {
    fontSize: 180,
    letterSpacing: 8,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Montserrat-Black',
    transform: [{ translateY: 40 }],
  },
});
