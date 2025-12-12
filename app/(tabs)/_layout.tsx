import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/stores/appStore';
import { Colors, TabColors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const { isDark } = useAppStore();

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
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
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
          title: 'Teams',
          tabBarActiveTintColor: TabColors.groups,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "people" : "people-outline"} size={30} color={color} />
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