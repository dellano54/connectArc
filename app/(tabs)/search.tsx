import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '@/stores/appStore';
import { Avatar } from '@/components/ui/Avatar';
import { ProfileModal } from '@/components/modals/ProfileModal';
import { Colors } from '@/constants/Colors';

export default function SearchScreen() {
  const {
    isDark,
    contentData,
    currentUser,
    setCurrentTab,
    toggleTheme,
    setProfileModalVisible,
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCurrentTab('search');
  }, []);

  const searchData = contentData.search;
  const accentColor = Colors.amber.default;

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <LinearGradient
        colors={['rgba(245, 158, 11, 0.15)', 'transparent']}
        style={[styles.blob, { top: -100, right: -50 }]}
      />

      <View style={[styles.header, isDark && styles.headerDark]}>
        <View style={styles.headerContent}>
          <View style={[styles.logoContainer, { backgroundColor: accentColor }]}>
            <Text style={styles.logo}>CA</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerTitle, { color: accentColor }]}>
              {searchData.title}
            </Text>
            <Text style={[styles.headerSubtitle, isDark && styles.subtextDark]}>
              Search the network
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

      <View style={styles.content}>
        <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
          <Ionicons
            name="search"
            size={20}
            color={isDark ? Colors.dark.sub : Colors.light.sub}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, isDark && styles.searchInputDark]}
            placeholder="Search ConnectArc Network..."
            placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearBtn}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={isDark ? Colors.dark.sub : Colors.light.sub}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.recentSection}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
            RECENT
          </Text>
          <Text style={[styles.emptyText, isDark && styles.subtextDark]}>
            No recent searches in ConnectArc
          </Text>
        </View>

        <View style={styles.suggestionSection}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
            SUGGESTIONS
          </Text>
          <TouchableOpacity
            style={[styles.suggestionItem, isDark && styles.suggestionItemDark]}
          >
            <Ionicons
              name="trending-up"
              size={20}
              color={accentColor}
              style={styles.suggestionIcon}
            />
            <Text style={[styles.suggestionText, isDark && styles.textDark]}>
              Trending topics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.suggestionItem, isDark && styles.suggestionItemDark]}
          >
            <Ionicons
              name="people"
              size={20}
              color={accentColor}
              style={styles.suggestionIcon}
            />
            <Text style={[styles.suggestionText, isDark && styles.textDark]}>
              Find people
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.suggestionItem, isDark && styles.suggestionItemDark]}
          >
            <Ionicons
              name="documents"
              size={20}
              color={accentColor}
              style={styles.suggestionIcon}
            />
            <Text style={[styles.suggestionText, isDark && styles.textDark]}>
              Browse files
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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

      <ProfileModal />
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
  content: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.bg,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchContainerDark: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 14,
    color: Colors.light.text,
  },
  searchInputDark: {
    color: Colors.dark.text,
  },
  clearBtn: {
    padding: 4,
  },
  recentSection: {
    marginBottom: 32,
  },
  suggestionSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.light.sub,
    letterSpacing: 1,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.light.sub,
    fontStyle: 'italic',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    marginBottom: 8,
  },
  suggestionItemDark: {
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
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