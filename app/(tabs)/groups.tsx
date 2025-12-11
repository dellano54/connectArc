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
import { useAppStore } from '@/stores/appStore';
import { ConversationItem } from '@/components/ConversationItem';
import { Avatar } from '@/components/ui/Avatar';
import { ProfileModal } from '@/components/modals/ProfileModal';
import { Colors } from '@/constants/Colors';

export default function GroupsScreen() {
  const {
    isDark,
    contentData,
    currentUser,
    setCurrentTab,
    toggleTheme,
    setProfileModalVisible,
  } = useAppStore();

  useEffect(() => {
    setCurrentTab('groups');
  }, []);

  const groupsData = contentData.groups;
  const accentColor = Colors.violet.default;

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>

      <View style={[styles.header, isDark && styles.headerDark]}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerTitle, { color: accentColor }]}>
              {groupsData.title}
            </Text>
            <Text style={[styles.headerSubtitle, isDark && styles.subtextDark]}>
              {groupsData.items.length} groups
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
        data={groupsData.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationItem
            item={item}
            accentColor={accentColor}
            tabType="groups"
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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