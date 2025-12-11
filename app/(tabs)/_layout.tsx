import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/stores/appStore';
import { Colors, TabColors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const { isDark, currentTab } = useAppStore();
  
  const getTabColor = (routeName: string) => {
    return TabColors[routeName as keyof typeof TabColors] || Colors.blue.default;
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: getTabColor(currentTab),
        tabBarInactiveTintColor: isDark ? '#555' : '#999',
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          height: 72,
          borderRadius: 36,
          backgroundColor: isDark ? 'rgba(15, 15, 15, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 10,
          paddingBottom: 0, // Reset default padding
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={isDark ? 60 : 80} 
            tint={isDark ? 'dark' : 'light'} 
            style={StyleSheet.absoluteFill} 
          />
        ),
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
              <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={24} color={color} />
              {focused && <View style={[styles.activeDot, { backgroundColor: color }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
              <Ionicons name={focused ? "people" : "people-outline"} size={26} color={color} />
              {focused && <View style={[styles.activeDot, { backgroundColor: color }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
              <Ionicons name={focused ? "book" : "book-outline"} size={24} color={color} />
              {focused && <View style={[styles.activeDot, { backgroundColor: color }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
              <Ionicons name={focused ? "person-add" : "person-add-outline"} size={24} color={color} />
              {focused && <View style={[styles.activeDot, { backgroundColor: color }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
              <Ionicons name={focused ? "search" : "search-outline"} size={24} color={color} />
              {focused && <View style={[styles.activeDot, { backgroundColor: color }]} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});