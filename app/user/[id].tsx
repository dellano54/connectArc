import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Re-added
import { useAppStore } from '@/stores/appStore'; // Re-added
import { Colors } from '@/constants/Colors'; // Re-added
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const { isDark } = useAppStore();
  const theme = isDark ? Colors.dark : Colors.light;
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.back();
                }}
                activeOpacity={0.7}
            >
                <Ionicons
                name="arrow-back"
                size={28}
                color={theme.text}
                />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>User Profile</Text>
        </View>
        <View style={styles.content}>
          <Text style={[styles.userIdText, { color: theme.text }]}>
            Displaying profile for user ID: {id}
          </Text>
          <Text style={{color: theme.sub, marginTop: 10}}>
            (This is a placeholder screen for demonstration purposes.)
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Placeholder
  },
  backBtn: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userIdText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
