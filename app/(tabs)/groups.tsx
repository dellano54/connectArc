import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/stores/appStore';
import { ConversationItem } from '@/components/ConversationItem';
import { Colors, TabColors } from '@/constants/Colors';
import { Avatar } from '@/components/ui/Avatar';

export default function GroupsScreen() {
  const { isDark, contentData, setCurrentTab } = useAppStore();
  const theme = isDark ? Colors.dark : Colors.light;

  useEffect(() => { setCurrentTab('groups'); }, []);

  const renderPinnedTeam = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.pinnedCard, { backgroundColor: theme.card }]}>
      <Avatar source={item.avatar} size={48} style={{ borderRadius: 16, marginBottom: 12 }} />
      <Text style={[styles.pinnedName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
      <Text style={[styles.pinnedMembers, { color: theme.sub }]}>24 members</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={[styles.blob, { backgroundColor: TabColors.groups, opacity: isDark ? 0.15 : 0.08 }]} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Teams</Text>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: TabColors.groups }]}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={contentData.groups.items}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.pinnedSection}>
              <Text style={[styles.sectionTitle, { color: theme.sub }]}>PINNED</Text>
              <FlatList
                horizontal
                data={contentData.groups.items.slice(0, 3)} // Mock pinned
                renderItem={renderPinnedTeam}
                keyExtractor={(item) => `pinned-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
              />
              <Text style={[styles.sectionTitle, { color: theme.sub, paddingHorizontal: 24 }]}>ALL TEAMS</Text>
            </View>
          }
          renderItem={({ item }) => (
            <ConversationItem 
              item={item} 
              tabType="groups" 
              accentColor={TabColors.groups} 
            />
          )}
          contentContainerStyle={styles.list}
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
    top: -50,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 50 : 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 40, fontWeight: '800', letterSpacing: -1 },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  pinnedSection: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  pinnedCard: {
    width: 140,
    padding: 16,
    marginRight: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  pinnedName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  pinnedMembers: {
    fontSize: 12,
  },
  list: { paddingBottom: 100 },
});
