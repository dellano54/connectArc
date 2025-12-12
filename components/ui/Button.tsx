import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { GlobalStyles } from '@/constants/Styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  color = Colors.primary,
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
}) => {
  const isPrimary = variant === 'primary';

  const Content = () => (
    <>
      {loading ? (
        <ActivityIndicator color={isPrimary ? 'white' : color} />
      ) : (
        <>
          {icon}
          <Text 
            style={[
              styles.text, 
              isPrimary ? { color: 'white' } : { color: color }, 
              textStyle
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </>
  );

  if (isPrimary && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        activeOpacity={0.8}
        style={[styles.container, style]}
      >
        <LinearGradient
          colors={Colors.gradients?.primary || [color, color]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, GlobalStyles.shadowMd]}
        >
          <Content />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'secondary' && { 
          backgroundColor: 'transparent', 
          borderWidth: 1, 
          borderColor: color 
        },
        variant === 'ghost' && { backgroundColor: 'transparent' },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <Content />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: '#E5E7EB', // Fallback for disabled
  },
});