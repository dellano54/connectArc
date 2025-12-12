import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/stores/appStore';
import { Colors, TabColors } from '@/constants/Colors';

export default function NotesScreen() {
  const { isDark, contentData, setCurrentTab, createNote, isNoteModalVisible, setNoteModalVisible } = useAppStore();
  const theme = isDark ? Colors.dark : Colors.light;
  const [noteTitle, setNoteTitle] = useState('');

  useEffect(() => { setCurrentTab('notes'); }, []);

  const renderNoteCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[
        styles.noteCard, 
        { 
          backgroundColor: theme.card,
          shadowColor: theme.text,
        }
      ]}
    >
      <View style={styles.noteHeader}>
        <Text style={[styles.noteTitle, { color: theme.text }]} numberOfLines={2}>{item.name}</Text>
        {isDark ? null : <Ionicons name="bookmark" size={16} color={TabColors.notes} />}
      </View>
      <Text style={[styles.notePreview, { color: theme.sub }]} numberOfLines={4}>
        Capture your thoughts, ideas, and inspiration here.
      </Text>
      <Text style={[styles.noteDate, { color: theme.sub }]}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={[styles.blob, { backgroundColor: TabColors.notes, opacity: isDark ? 0.12 : 0.08 }]} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Notes</Text>
          <TouchableOpacity onPress={() => setNoteModalVisible(true)} style={[styles.addBtn, { backgroundColor: TabColors.notes }]}>
             <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={contentData.notes.items}
          keyExtractor={(item) => item.id}
          renderItem={renderNoteCard}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
               <Text style={{ color: theme.sub }}>No notes yet</Text>
            </View>
          }
        />

        <Modal visible={isNoteModalVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setNoteModalVisible(false)}>
          <View style={[styles.modalContainer, { backgroundColor: theme.bg }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme.divider }]}>
              <TouchableOpacity onPress={() => setNoteModalVisible(false)}>
                <Text style={{ color: TabColors.notes, fontSize: 17 }}>Cancel</Text>
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: theme.text }]}>New Note</Text>
              <TouchableOpacity onPress={() => { if(noteTitle.trim()) { createNote(noteTitle); setNoteTitle(''); } }}>
                <Text style={{ color: TabColors.notes, fontSize: 17, fontWeight: '600' }}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Note Title"
                placeholderTextColor={theme.sub}
                value={noteTitle}
                onChangeText={setNoteTitle}
                autoFocus
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  blob: {
    position: 'absolute',
    bottom: -100,
    left: -50,
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
  list: { paddingBottom: 100, paddingHorizontal: 16 },
  columnWrapper: { justifyContent: 'space-between' },
  noteCard: {
    flex: 1,
    margin: 6,
    padding: 16,
    borderRadius: 20,
    minHeight: 160,
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  noteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  noteTitle: { fontSize: 18, fontWeight: '700', flex: 1, marginRight: 8 },
  notePreview: { fontSize: 13, lineHeight: 18, flex: 1 },
  noteDate: { fontSize: 11, fontWeight: '600', marginTop: 12, opacity: 0.6 },
  empty: { padding: 20, alignItems: 'center' },
  modalContainer: { flex: 1 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  modalTitle: { fontSize: 17, fontWeight: '600' },
  modalContent: { padding: 20 },
  input: { fontSize: 24, fontWeight: '700', paddingVertical: 10 },
});
