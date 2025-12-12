import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { useAppStore } from '@/stores/appStore';
import { Background } from '@/components/ui/Background';

export default function RootLayout() {
  const isDark = useAppStore((state) => state.isDark);

  return (
    <View style={styles.container}>
      <Background />
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="chat/[id]" 
          options={{ 
            presentation: 'card',
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: 'transparent' }
          }} 
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});