import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/stores/appStore';
import { ConversationItem } from '@/components/ConversationItem';
import { Colors, TabColors } from '@/constants/Colors';
import { Avatar } from '@/components/ui/Avatar';

const { width } = Dimensions.get('window');

const SUGGESTIONS = [
  { id: 's1', name: 'Sarah Connor', role: 'UX Researcher', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: 's2', name: 'John Wick', role: 'Security Engineer', avatar: 'https://i.pravatar.cc/150?u=john' },
  { id: 's3', name: 'Ripley', role: 'Operations Lead', avatar: 'https://i.pravatar.cc/150?u=ripley' },
  { id: 's4', name: 'Neo', role: 'Software Architect', avatar: 'https://i.pravatar.cc/150?u=neo' },
];

export default function RequestsScreen() {
  const { isDark, contentData, setCurrentTab } = useAppStore();
  const theme = isDark ? Colors.dark : Colors.light;

  useEffect(() => { setCurrentTab('requests'); }, []);

  const renderSuggestion = ({ item }: { item: typeof SUGGESTIONS[0] }) => (
    <View style={[styles.suggestionCard, { backgroundColor: theme.card, shadowColor: theme.text }]}>
      <View style={styles.suggestionAvatarContainer}>
        <Avatar source={item.avatar} size={70} style={{ borderRadius: 24 }} />
        <View style={styles.onlineBadge} />
      </View>
      <Text style={[styles.suggName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
      <Text style={[styles.suggRole, { color: theme.sub }]} numberOfLines={1}>{item.role}</Text>
      <TouchableOpacity style={[styles.connectBtn, { borderColor: TabColors.requests }]}>
        <Text style={[styles.connectBtnText, { color: TabColors.requests }]}>Connect</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Background Art - Digital Blobs */}
      <View 
        style={[
          styles.blob, 
          { 
            backgroundColor: TabColors.requests, 
            opacity: isDark ? 0.12 : 0.08,
            top: -120, right: -80,
          }
        ]} 
      />
      <View 
        style={[
          styles.blob, 
          { 
            backgroundColor: TabColors.groups, // Violet
            opacity: isDark ? 0.08 : 0.05,
            bottom: -100, left: -100,
            width: 400, height: 400, borderRadius: 200,
          }
        ]} 
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: theme.text }]}>Network</Text>
            <Text style={[styles.subtitle, { color: theme.sub }]}>Grow your circle</Text>
          </View>
          <TouchableOpacity 
            style={[styles.searchBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={contentData.requests.items}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View>
              {/* Suggestions Section */}
              <View style={styles.sectionHeaderRow}>
                <Text style={[styles.sectionTitle, { color: theme.sub }]}>PEOPLE YOU MIGHT KNOW</Text>
                <TouchableOpacity>
                  <Text style={{ color: TabColors.requests, fontWeight: '600', fontSize: 12 }}>See all</Text>
                </TouchableOpacity>
              </View>
              
              <FlatList
                horizontal
                data={SUGGESTIONS}
                renderItem={renderSuggestion}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.suggestionsList}
                style={{ marginBottom: 24 }}
              />

              {/* Pending Section Header */}
              <View style={styles.sectionHeaderRow}>
                <Text style={[styles.sectionTitle, { color: theme.sub }]}>PENDING ({contentData.requests.items.length})</Text>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <ConversationItem 
              item={item} 
              tabType="requests" 
              accentColor={TabColors.requests} 
            />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
               <Ionicons name="people-outline" size={64} color={theme.sub} style={{ opacity: 0.3, marginBottom: 16 }} />
               <Text style={{ color: theme.sub, fontSize: 16 }}>No pending requests</Text>
            </View>
          }
        />
        
        {/* Floating Action Button */}
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: TabColors.requests, shadowColor: TabColors.requests }]}
          activeOpacity={0.8}
        >
          <Ionicons name="qr-code-outline" size={28} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  blob: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    transform: [{ scaleX: 1.2 }],
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 50 : 20,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { 
    fontSize: 42, 
    fontWeight: '900', 
    letterSpacing: -1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  searchBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  suggestionsList: {
    paddingHorizontal: 16,
  },
  suggestionCard: {
    width: 160,
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 24,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  suggestionAvatarContainer: {
    marginBottom: 12,
    position: 'relative',
  },
  onlineBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: TabColors.requests,
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderColor: 'white',
  },
  suggName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  suggRole: {
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  connectBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  connectBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  list: { 
    paddingBottom: 100,
  },
  empty: { 
    padding: 40, 
    alignItems: 'center',
    marginTop: 40,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
});