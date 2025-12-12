import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useAppStore } from '@/stores/appStore';
import { Colors } from '@/constants/Colors';

export default function SearchScreen() {
  const {
    isDark,
    setCurrentTab,
    toggleTheme,
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCurrentTab('search');
  }, []);

  const accentColor = Colors.primary;

  return (
    <View style={styles.container}>
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <BlurView 
          intensity={isDark ? 80 : 90} 
          tint={isDark ? 'dark' : 'light'} 
          style={[styles.headerBlur, { paddingTop: Platform.OS === 'android' ? 40 : 0 }]}
        >
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View>
                <Text style={[styles.headerTitle, isDark && styles.textDark]}>
                  Search
                </Text>
                <Text style={[styles.headerSubtitle, isDark && styles.subtextDark]}>
                  Find messages, files, and people
                </Text>
              </View>
              
              <TouchableOpacity
                style={styles.iconButton}
                onPress={toggleTheme}
              >
                <Ionicons
                  name={isDark ? 'moon' : 'sunny'}
                  size={20}
                  color={isDark ? Colors.dark.sub : Colors.light.sub}
                />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>

        {/* Content */}
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
              placeholder="Search..."
              placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={isDark ? Colors.dark.sub : Colors.light.sub}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && styles.subtextDark]}>RECENT</Text>
            <Text style={[styles.emptyText, isDark && styles.textDark]}>
              No recent searches.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDark && styles.subtextDark]}>SUGGESTED</Text>
            <TouchableOpacity style={[styles.suggestionItem, isDark && styles.suggestionItemDark]}>
              <Ionicons name="document-text" size={18} color={accentColor} style={styles.suggestionIcon} />
              <Text style={[styles.suggestionText, isDark && styles.textDark]}>Project Specs</Text>
            </TouchableOpacity>
             <TouchableOpacity style={[styles.suggestionItem, isDark && styles.suggestionItemDark]}>
              <Ionicons name="images" size={18} color={accentColor} style={styles.suggestionIcon} />
              <Text style={[styles.suggestionText, isDark && styles.textDark]}>Design Assets</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
  },
  headerBlur: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.light.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.light.sub,
    marginTop: 2,
  },
  textDark: {
    color: Colors.dark.text,
  },
  subtextDark: {
    color: Colors.dark.sub,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 32,
  },
  searchContainerDark: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    height: '100%',
  },
  searchInputDark: {
    color: Colors.dark.text,
  },
  clearBtn: {
    padding: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 11,
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
});
