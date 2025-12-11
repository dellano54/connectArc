import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useAppStore } from '@/stores/appStore';
import { ConversationItem } from '@/components/ConversationItem';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { ProfileModal } from '@/components/modals/ProfileModal';
import { Colors } from '@/constants/Colors';

export default function NotesScreen() {
  const {
    isDark,
    contentData,
    currentUser,
    setCurrentTab,
    toggleTheme,
    setProfileModalVisible,
    isNoteModalVisible,
    setNoteModalVisible,
    createNote,
  } = useAppStore();

  const [noteTitle, setNoteTitle] = React.useState('');

  useEffect(() => {
    setCurrentTab('notes');
  }, []);

  const notesData = contentData.notes;
  const accentColor = Colors.rose.default;

  const handleCreateNote = () => {
    if (noteTitle.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      createNote(noteTitle.trim());
      setNoteTitle('');
    }
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <LinearGradient
        colors={isDark 
          ? ['rgba(244, 63, 94, 0.08)', 'transparent'] 
          : ['rgba(244, 63, 94, 0.12)', 'transparent']
        }
        style={styles.gradientTop}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, isDark && styles.headerDark]}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <View style={[styles.appIcon, { backgroundColor: accentColor }]}>
                <Ionicons name="document-text" size={26} color="white" />
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={[styles.headerTitle, isDark && styles.textDark]}>
                  {notesData.title}
                </Text>
                <Text style={[styles.headerSubtitle, isDark && styles.subtextDark]}>
                  {notesData.items.length} notes
                </Text>
              </View>
            </View>
            
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

        {/* Content */}
        <View style={styles.content}>
          {/* Create Note Button */}
          <TouchableOpacity
            style={[styles.createBtn, isDark && styles.createBtnDark]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setNoteModalVisible(true);
            }}
            activeOpacity={0.8}
          >
            <View style={[styles.createIconContainer, { backgroundColor: accentColor }]}>
              <Ionicons name="add" size={24} color="white" />
            </View>
            <Text style={[styles.createText, { color: accentColor }]}>
              Create New Note
            </Text>
          </TouchableOpacity>

          {/* Notes List */}
          <FlatList
            data={notesData.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ConversationItem
                item={item}
                accentColor={accentColor}
                tabType="notes"
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Profile Footer */}
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

        {/* Create Note Modal */}
        <Modal
          visible={isNoteModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setNoteModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}
          >
            <TouchableOpacity
              style={styles.modalBackground}
              activeOpacity={1}
              onPress={() => setNoteModalVisible(false)}
            >
              <BlurView
                intensity={isDark ? 80 : 100}
                tint={isDark ? 'dark' : 'light'}
                style={[styles.modalContent, isDark && styles.modalContentDark]}
                onStartShouldSetResponder={() => true}
              >
                <View style={styles.modalHeader}>
                  <View style={[styles.modalIcon, { backgroundColor: `${accentColor}15` }]}>
                    <Ionicons name="create" size={28} color={accentColor} />
                  </View>
                  <View style={styles.modalTitleContainer}>
                    <Text style={[styles.modalTitle, isDark && styles.textDark]}>
                      New Note
                    </Text>
                    <Text style={[styles.modalSubtitle, isDark && styles.subtextDark]}>
                      Start writing your thoughts
                    </Text>
                  </View>
                </View>

                <TextInput
                  style={[styles.noteInput, isDark && styles.noteInputDark]}
                  placeholder="Note title..."
                  placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
                  value={noteTitle}
                  onChangeText={setNoteTitle}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={handleCreateNote}
                />

                <View style={styles.modalActions}>
                  <Button
                    title="Cancel"
                    onPress={() => {
                      setNoteModalVisible(false);
                      setNoteTitle('');
                    }}
                    variant="ghost"
                    color={isDark ? Colors.dark.sub : Colors.light.sub}
                    style={{ flex: 1 }}
                  />
                  <Button
                    title="Create"
                    onPress={handleCreateNote}
                    color={accentColor}
                    style={{ flex: 1 }}
                  />
                </View>
              </BlurView>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>

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
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    opacity: 0.5,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
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
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
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
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 18,
    backgroundColor: 'rgba(244, 63, 94, 0.08)',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(244, 63, 94, 0.25)',
    marginBottom: 16,
  },
  createBtnDark: {
    backgroundColor: 'rgba(244, 63, 94, 0.12)',
    borderColor: 'rgba(244, 63, 94, 0.3)',
  },
  createIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  createText: {
    fontSize: 16,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 20,
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
  
  // Modal styles
  modalOverlay: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  modalContentDark: {
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.light.text,
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.light.sub,
    marginTop: 4,
  },
  noteInput: {
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 24,
  },
  noteInputDark: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: Colors.dark.text,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
});