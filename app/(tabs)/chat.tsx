import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/stores/appStore';
import { ConversationItem } from '@/components/ConversationItem';
import { Colors, TabColors } from '@/constants/Colors';
import { Avatar } from '@/components/ui/Avatar';

export default function ChatScreen() {
  const { isDark, contentData, setCurrentTab } = useAppStore();
  const theme = isDark ? Colors.dark : Colors.light;
  const [search, setSearch] = useState('');

  useEffect(() => { setCurrentTab('chat'); }, []);

  const renderActiveUser = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.activeUserItem}>
      <Avatar 
        source={item.avatar} 
        size={56} 
        showStatus 
        statusColor={Colors.success}
        style={{ borderWidth: 2, borderColor: theme.bg }}
      />
      <Text style={[styles.activeUserName, { color: theme.text }]} numberOfLines={1}>
        {item.name.split(' ')[0]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Background Art */}
      <View style={[styles.blob, { backgroundColor: TabColors.chat, opacity: isDark ? 0.1 : 0.05 }]} />
      
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Chats</Text>
          <TouchableOpacity 
            style={[styles.newChatBtn, { backgroundColor: TabColors.chat }]}
            activeOpacity={0.8}
          >
             <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
            <Ionicons name="search" size={20} color={theme.sub} />
            <TextInput 
              placeholder="Search messages..." 
              placeholderTextColor={theme.sub}
              value={search}
              onChangeText={setSearch}
              style={[styles.searchInput, { color: theme.text }]}
            />
          </View>
        </View>

        <FlatList
          data={contentData.chat.items}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.activeSection}>
              <FlatList
                horizontal
                data={contentData.chat.items} // Mock active users
                renderItem={renderActiveUser}
                keyExtractor={(item) => `active-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
              />
            </View>
          }
          renderItem={({ item }) => (
            <ConversationItem 
              item={item} 
              tabType="chat" 
              accentColor={TabColors.chat} 
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  blob: {
    position: 'absolute',
    top: -150,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 50 : 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { 
    fontSize: 40, 
    fontWeight: '800', 
    letterSpacing: -1,
  },
  newChatBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: TabColors.chat,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  activeSection: {
    marginBottom: 24,
  },
  activeUserItem: {
    alignItems: 'center',
    marginRight: 20,
    gap: 6,
  },
  activeUserName: {
    fontSize: 12,
    fontWeight: '500',
  },
  list: { 
    paddingBottom: 100, 
  },
});
