import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '@/stores/appStore';
import { ConversationItem } from '@/components/ConversationItem';
import { Avatar } from '@/components/ui/Avatar';
import { Colors } from '@/constants/Colors';

export default function RequestsScreen() {
  const {
    isDark,
    contentData,
    currentUser,
    setCurrentTab,
    toggleTheme,
    setProfileModalVisible,
  } = useAppStore();

  useEffect(() => {
    setCurrentTab('requests');
  }, []);

  const requestsData = contentData.requests;
  const accentColor = Colors.teal.default;

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <LinearGradient
        colors={['rgba(13, 148, 136, 0.15)', 'transparent']}
        style={[styles.blob, { top: -100, left: -50 }]}
      />

      <View style={[styles.header, isDark && styles.headerDark]}>
        <View style={styles.headerContent}>
          <View style={[styles.logoContainer, { backgroundColor: accentColor }]}>
            <Text style={styles.logo}>CA</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerTitle, { color: accentColor }]}>
              {requestsData.title}
            </Text>
            <Text style={[styles.headerSubtitle, isDark && styles.subtextDark]}>
              {requestsData.items.length} pending
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.themeBtn} onPress={toggleTheme}>
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={20}
            color={isDark ? Colors.dark.sub : Colors.light.sub}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={requestsData.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationItem
            item={item}
            accentColor={accentColor}
            tabType="requests"
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="checkmark-circle"
              size={64}
              color={isDark ? Colors.dark.sub : Colors.light.sub}
            />
            <Text style={[styles.emptyText, isDark && styles.textDark]}>
              No pending requests
            </Text>
            <Text style={[styles.emptySubtext, isDark && styles.subtextDark]}>
              You're all caught up!
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={[styles.footer, isDark && styles.footerDark]}
        onPress={() => setProfileModalVisible(true)}
      >
        <Avatar source={currentUser.avatar} size={40} />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, isDark && styles.textDark]}>
            {currentUser.name}
          </Text>
          <Text style={[styles.userRole, isDark && styles.subtextDark]}>
            {currentUser.role}
          </Text>
        </View>
        <Ionicons
          name="settings-outline"
          size={20}
          color={isDark ? Colors.dark.sub : Colors.light.sub}
        />
      </TouchableOpacity>
    </SafeAreaView>
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
  blob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  headerDark: {
    borderBottomColor: Colors.dark.border,
    backgroundColor: 'rgba(10,10,10,0.8)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logo: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.light.sub,
    marginTop: 2,
  },
  subtextDark: {
    color: Colors.dark.sub,
  },
  textDark: {
    color: Colors.dark.text,
  },
  themeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.light.sub,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  footerDark: {
    borderTopColor: Colors.dark.border,
    backgroundColor: 'rgba(10,10,10,0.8)',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.text,
  },
  userRole: {
    fontSize: 10,
    color: Colors.light.sub,
    marginTop: 2,
  },
});