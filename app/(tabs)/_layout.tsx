import { Tabs } from 'expo-router';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '@/stores/appStore';
import { Colors, TabColors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const { isDark } = useAppStore();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarInactiveTintColor: isDark ? '#666' : '#999',
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: isDark ? '#262626' : '#F0F0F0',
          height: Platform.OS === 'ios' ? 100 : 84,
          paddingTop: 18,
          paddingBottom: Platform.OS === 'ios' ? 20 : Math.max(10, insets.bottom),
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 8,
          fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chats',
          tabBarActiveTintColor: TabColors.chat,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarActiveTintColor: TabColors.groups,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarActiveTintColor: TabColors.notes,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "document-text" : "document-text-outline"} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Network',
          tabBarActiveTintColor: TabColors.requests,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "globe" : "globe-outline"} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'You',
          tabBarActiveTintColor: TabColors.profile,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={30} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen name="search" options={{ href: null }} />
    </Tabs>
  );
}