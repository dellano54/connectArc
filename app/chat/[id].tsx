import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '@/stores/appStore';
import { Avatar } from '@/components/ui/Avatar';
import { Colors } from '@/constants/Colors';
import { Message } from '@/types';
import { DoodleBackground } from '@/components/ui/DoodleBackground';
import { LargeMonogramBackground } from '@/components/ui/LargeMonogramBackground';

const { width } = Dimensions.get('window');

// Emojis for the custom picker
const EMOJIS = ['😀','😃','😄','😁','😆','😅','😂','🤣','🥲','☺️','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👹','👺','🤡','💩','👻','💀','☠️','👽','👾','🤖','👋','👍','👎','👏','🫶','👐','🤲','🤝','🙏'];

export default function ChatDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isDark, messages, addMessage, contentData, currentUser } = useAppStore();
  const insets = useSafeAreaInsets();
  
  // Theme & Colors
  const theme = isDark ? Colors.dark : Colors.light;
  const inputBg = isDark ? '#1C1C1E' : '#FFFFFF';
  const inputBorder = isDark ? '#2C2C2E' : '#E5E5EA';
  // Professional "Slate" Blue
  const accentColor = isDark ? '#4A90E2' : '#007AFF'; 
  
  const [inputText, setInputText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const inputRef = useRef<TextInput>(null);
  const flatListRef = useRef<FlatList>(null);

  // Header Height Calculation
  const headerHeight = 60 + insets.top;

  // Find Conversation Logic
  let conversation;
  for (const tabKey in contentData) {
    if (Object.prototype.hasOwnProperty.call(contentData, tabKey)) {
      const tab = contentData[tabKey as keyof typeof contentData];
      const found = tab.items.find((item) => item.id === id);
      if (found) {
        conversation = found;
        break;
      }
    }
  }

  // --- ACTIONS ---

  const handleSend = () => {
    if (!inputText.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: inputText.trim(),
      sender: 'me',
      senderName: currentUser.name,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      read: false,
    };
    addMessage(newMessage);
    setInputText('');
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    if (showEmojiPicker) {
      inputRef.current?.focus();
      setShowEmojiPicker(false);
    } else {
      Keyboard.dismiss();
      setShowEmojiPicker(true);
      setShowAttachMenu(false);
    }
  };

  const handleInputFocus = () => {
    setShowEmojiPicker(false);
    setShowAttachMenu(false);
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputText((prev) => prev + emoji);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[styles.messageWrapper, isMe && styles.messageWrapperMe]}>
        {!isMe && (
          <View style={styles.avatarCol}>
             <Avatar source={conversation?.avatar || ''} size={28} />
          </View>
        )}
        <View style={{ flex: 1, alignItems: isMe ? 'flex-end' : 'flex-start' }}>
          <View style={[
              styles.messageBubble,
              isMe 
                ? { backgroundColor: accentColor, borderBottomRightRadius: 4 } 
                : { backgroundColor: theme.card, borderTopLeftRadius: 4 },
              !isMe && styles.shadow,
            ]}
          >
            <Text style={[styles.messageText, { color: isMe ? 'white' : theme.text }]}>
              {item.text}
            </Text>
            <Text style={[styles.messageTime, { color: isMe ? 'rgba(255,255,255,0.7)' : theme.sub }]}>
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderAttachmentItem = (icon: string, label: string, color: string, type: 'ionic' | 'material' = 'ionic') => (
    <TouchableOpacity style={styles.attachItem} onPress={() => { setShowAttachMenu(false); }}>
      <View style={[styles.attachIconCircle, { backgroundColor: color }]}>
        {type === 'ionic' ? (
          <Ionicons name={icon as any} size={26} color="white" />
        ) : (
          <MaterialIcons name={icon as any} size={26} color="white" />
        )}
      </View>
      <Text style={[styles.attachLabel, { color: theme.sub }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} translucent backgroundColor="transparent" />
      <LargeMonogramBackground monogram="ARC" fontFamily={Platform.OS === 'ios' ? 'System' : 'sans-serif'} textOpacity={0.03}/>
      <DoodleBackground />

      {/* HEADER */}
      <View style={[
        styles.header, 
        { 
          backgroundColor: theme.card, 
          paddingTop: insets.top, 
          height: headerHeight, 
          borderBottomColor: theme.border 
        }
      ]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerInfo} activeOpacity={0.7}>
            <Avatar source={conversation?.avatar || ''} size={38} />
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <Text style={[styles.headerName, { color: theme.text }]} numberOfLines={1}>
                {conversation?.name || 'Chat'}
              </Text>
              <Text style={[styles.headerStatus, { color: theme.sub }]}>Online</Text>
            </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIconBtn}><Ionicons name="videocam-outline" size={26} color={accentColor} /></TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}><Ionicons name="call-outline" size={24} color={accentColor} /></TouchableOpacity>
        </View>
      </View>

      {/* KEYBOARD HANDLING */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
      >
        
        <FlatList
          ref={flatListRef}
          data={[...messages].reverse()}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          inverted
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
          scrollEventThrottle={16}
          onScrollBeginDrag={() => {
            Keyboard.dismiss();
            setShowEmojiPicker(false);
            setShowAttachMenu(false);
          }}
        />

        {/* INPUT AREA */}
        <View style={[styles.inputContainer, { marginBottom: showEmojiPicker ? 0 : Math.max(insets.bottom, 10) }]}>
          
          {/* Main Bubble */}
          <View style={[styles.inputBubble, { backgroundColor: inputBg, borderColor: inputBorder }]}>
            
            <TouchableOpacity onPress={toggleEmojiPicker} style={styles.emojiBtn}>
               <Ionicons 
                 name={showEmojiPicker ? "close" : "happy-outline"} 
                 size={26} 
                 color={theme.sub} 
               />
            </TouchableOpacity>

            <TextInput
              ref={inputRef}
              style={[styles.input, { color: theme.text, maxHeight: 120 }]}
              placeholder="Message"
              placeholderTextColor={theme.sub}
              value={inputText}
              onChangeText={setInputText}
              multiline
              onFocus={handleInputFocus}
            />

            <View style={styles.rightActions}>
              <TouchableOpacity onPress={() => { Keyboard.dismiss(); setShowAttachMenu(true); }} style={styles.innerBtn}>
                <Ionicons name="attach" size={26} color={theme.sub} style={{ transform: [{ rotate: '45deg' }] }} />
              </TouchableOpacity>
              
              {!inputText && (
                 <TouchableOpacity style={styles.innerBtn}>
                   <Ionicons name="camera-outline" size={26} color={theme.sub} />
                 </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Floating Action Button */}
          <TouchableOpacity
            style={[styles.fabBtn, { backgroundColor: accentColor }]}
            onPress={inputText.trim() ? handleSend : undefined}
            activeOpacity={0.8}
          >
            <Ionicons
              name={inputText.trim() ? "send" : "mic"}
              size={22}
              color="white"
              style={{ marginLeft: inputText.trim() ? 2 : 0 }}
            />
          </TouchableOpacity>
        </View>

        {/* EMOJI PICKER */}
        {showEmojiPicker && (
          <View style={[styles.emojiPicker, { backgroundColor: theme.card, height: 280, paddingBottom: insets.bottom }]}>
            <FlatList 
              data={EMOJIS}
              numColumns={8}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleEmojiSelect(item)} style={styles.emojiItem}>
                  <Text style={{fontSize: 24}}>{item}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingVertical: 10 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

      </KeyboardAvoidingView>

      {/* ATTACHMENT MODAL */}
      <Modal
        transparent
        visible={showAttachMenu}
        animationType="fade"
        onRequestClose={() => setShowAttachMenu(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowAttachMenu(false)}>
            <View style={styles.modalOverlay}>
                <View style={[styles.attachSheet, { backgroundColor: theme.card, paddingBottom: insets.bottom + 20 }]}>
                    <View style={styles.attachRow}>
                        {renderAttachmentItem('document-text', 'Document', '#7F66FF')}
                        {renderAttachmentItem('camera', 'Camera', '#E05C8C')}
                        {renderAttachmentItem('image', 'Gallery', '#BF5AF2')}
                    </View>
                    <View style={styles.attachRow}>
                        {renderAttachmentItem('headset', 'Audio', '#FF9F0A')}
                        {renderAttachmentItem('location', 'Location', '#30D158')}
                        {renderAttachmentItem('person', 'Contact', '#0A84FF')}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically center items
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    zIndex: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
  },
  backBtn: { 
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 0,
    height: '100%',
  },
  headerName: { fontSize: 17, fontWeight: '700' },
  headerStatus: { fontSize: 12, marginTop: 1 },
  headerActions: { 
    flexDirection: 'row', 
    gap: 12, 
    paddingRight: 6,
    alignItems: 'center', // Vertically center action icons
  },
  headerIconBtn: { padding: 6 },
  
  // Messages
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  messageWrapper: {
    marginBottom: 16,
    flexDirection: 'row',
    gap: 8,
  },
  messageWrapperMe: { justifyContent: 'flex-end' },
  avatarCol: { justifyContent: 'flex-end' },
  messageBubble: {
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    maxWidth: '80%',
    minWidth: 60,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: { fontSize: 16, lineHeight: 22 },
  messageTime: { fontSize: 10, alignSelf: 'flex-end', marginTop: 4 },

  // Input Area
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Aligns container items to bottom
    paddingHorizontal: 8,
    paddingTop: 6,
    gap: 6,
  },
  inputBubble: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end', // ALIGN ICONS TO BOTTOM OF TEXT INPUT
    borderRadius: 24,
    borderWidth: 1,
    minHeight: 48, 
    paddingBottom: 0, // Padding handled by children
  },
  emojiBtn: {
    height: 48, // Fixed height to match single-line input
    width: 44,
    justifyContent: 'center', // Vertically center icon in its box
    alignItems: 'center',
    marginBottom: 0, // Aligned with bottom
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingTop: 12, // Symmetric padding
    paddingBottom: 12, // Symmetric padding
    paddingHorizontal: 4,
    textAlignVertical: 'center', 
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 6,
    height: 48, // Fixed height to match single-line input
    marginBottom: 0, // Aligned with bottom
  },
  innerBtn: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  // Attach Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  attachSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  attachRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  attachItem: { alignItems: 'center', width: 80 },
  attachIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  attachLabel: { fontSize: 12, fontWeight: '500' },

  // Emoji Picker
  emojiPicker: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  emojiItem: {
    width: width / 8,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});