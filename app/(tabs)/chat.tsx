import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useAppStore } from '@/stores/appStore';
import { ConversationItem } from '@/components/ConversationItem';
import { Avatar } from '@/components/ui/Avatar';
import { ProfileModal } from '@/components/modals/ProfileModal';
import { Colors } from '@/constants/Colors';

export default function ChatScreen() {
  const {
    isDark,
    contentData,
    currentUser,
    setCurrentTab,
    toggleTheme,
    setProfileModalVisible,
  } = useAppStore();

  useEffect(() => {
    setCurrentTab('chat');
  }, []);

  const chatData = contentData.chat;
  const accentColor = Colors.blue.default;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      
      <SafeAreaView style={styles.safeArea}>
        {/* Modern Header */}
        <View style={[styles.header, isDark && styles.headerDark]}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <View style={styles.headerTextContainer}>
                <Text style={[styles.headerTitle, isDark && styles.textDark]}>
                  {chatData.title}
                </Text>
                <Text style={[styles.headerSubtitle, isDark && styles.subtextDark]}>
                  {chatData.items.filter(i => i.unread).length} unread
                </Text>
              </View>
            </View>
            
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={toggleTheme}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={isDark ? 'moon' : 'sunny'}
                  size={22}
                  color={isDark ? Colors.dark.sub : Colors.light.sub}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Conversation List */}
        <FlatList
          data={chatData.items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConversationItem
              item={item}
              accentColor={accentColor}
              tabType="chat"
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* User Profile Card */}
        <BlurView
          intensity={isDark ? 60 : 80}
          tint={isDark ? 'dark' : 'light'}
          style={[styles.footer, isDark && styles.footerDark]}
        >
          <TouchableOpacity
            style={styles.profileCard}
            onPress={() => setProfileModalVisible(true)}
            activeOpacity={0.8}
          >
            <Avatar source={currentUser.avatar} size={48} />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, isDark && styles.textDark]}>
                {currentUser.name}
              </Text>
              <Text style={[styles.profileRole, isDark && styles.subtextDark]}>
                {currentUser.role}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={isDark ? Colors.dark.sub : Colors.light.sub}
            />
          </TouchableOpacity>
        </BlurView>

        <ProfileModal />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.bg,
  },
  containerDark: {
    backgroundColor: Colors.dark.bg,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headerDark: {
    backgroundColor: 'transparent',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.light.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.light.sub,
    marginTop: 2,
    fontWeight: '500',
  },
  subtextDark: {
    color: Colors.dark.sub,
  },
  textDark: {
    color: Colors.dark.text,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  listContent: {
    padding: 20,
    paddingTop: 8,
  },
  footer: {
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 8 : 16,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  footerDark: {
    borderColor: 'rgba(255,255,255,0.08)',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  profileRole: {
    fontSize: 13,
    color: Colors.light.sub,
    marginTop: 2,
  },
});