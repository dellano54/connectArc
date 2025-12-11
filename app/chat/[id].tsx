import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { useAppStore } from '@/stores/appStore';
import { Avatar } from '@/components/ui/Avatar';
import { Colors, TabColors } from '@/constants/Colors';
import { Message } from '@/types';

export default function ChatDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isDark, messages, addMessage, contentData, currentTab, currentUser } = useAppStore();
  
  const [inputText, setInputText] = useState('');
  
  const tabData = contentData[currentTab];
  const conversation = tabData?.items.find((item) => item.id === id);
  const accentColor = TabColors[currentTab] || Colors.blue.default;

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: inputText.trim(),
      sender: 'me',
      senderName: currentUser.name,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
      }),
      read: false,
    };
    
    addMessage(newMessage);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';
    
    return (
      <View style={[styles.messageWrapper, isMe && styles.messageWrapperMe]}>
        <View style={styles.messageHeader}>
          <Text style={[styles.messageSender, isDark && styles.textDark]}>
            {item.senderName}
          </Text>
          <Text style={[styles.messageTime, isDark && styles.subtextDark]}>
            {item.time}
          </Text>
        </View>
        <View
          style={[
            styles.messageBubble,
            isMe ? [styles.messageBubbleMe, { backgroundColor: accentColor }] : styles.messageBubbleOther,
            isDark && !isMe && styles.messageBubbleOtherDark,
          ]}
        >
          {item.type === 'file' ? (
            <View style={styles.fileContainer}>
              <View style={[styles.fileIcon, isMe && styles.fileIconMe]}>
                <Ionicons 
                  name="document-attach" 
                  size={22} 
                  color={isMe ? 'white' : accentColor} 
                />
              </View>
              <Text style={[styles.fileText, isMe && styles.messageTextMe]}>
                {item.text}
              </Text>
            </View>
          ) : (
            <Text style={[styles.messageText, isMe && styles.messageTextMe]}>
              {item.text}
            </Text>
          )}
        </View>
        {isMe && item.read && (
          <View style={styles.readContainer}>
            <Ionicons name="checkmark-done" size={14} color={accentColor} />
            <Text style={[styles.readText, { color: accentColor }]}>Read</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <BlurView
          intensity={isDark ? 60 : 80}
          tint={isDark ? 'dark' : 'light'}
          style={[styles.header, isDark && styles.headerDark]}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.back();
              }}
              activeOpacity={0.7}
            >
              <Ionicons
                name="chevron-back"
                size={26}
                color={isDark ? Colors.dark.text : Colors.light.text}
              />
            </TouchableOpacity>
            
            <View style={styles.headerCenter}>
              {currentTab === 'notes' ? (
                <Avatar
                  source=""
                  size={40}
                  isNote
                  noteIcon={<Ionicons name="document-text" size={20} color={Colors.rose.default} />}
                />
              ) : (
                <Avatar
                  source={conversation?.avatar || ''}
                  size={40}
                  showStatus
                  statusColor={Colors.green.default}
                />
              )}
              <View style={styles.headerInfo}>
                <Text style={[styles.headerName, isDark && styles.textDark]} numberOfLines={1}>
                  {conversation?.name || 'Chat'}
                </Text>
                {currentTab !== 'notes' && (
                  <View style={styles.statusRow}>
                    <View style={[styles.statusDot, { backgroundColor: Colors.green.default }]} />
                    <Text style={[styles.statusText, isDark && styles.subtextDark]}>
                      Active now
                    </Text>
                  </View>
                )}
              </View>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                <Ionicons
                  name="call"
                  size={22}
                  color={isDark ? Colors.dark.sub : Colors.light.sub}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={22}
                  color={isDark ? Colors.dark.sub : Colors.light.sub}
                />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>

        {/* Messages */}
        <FlatList
          data={[...messages].reverse()}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          inverted
        />

        {/* Input */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <BlurView
            intensity={isDark ? 80 : 95}
            tint={isDark ? 'dark' : 'light'}
            style={[styles.inputContainer, isDark && styles.inputContainerDark]}
          >
            <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
              <Ionicons
                name="add-circle"
                size={32}
                color={accentColor}
              />
            </TouchableOpacity>
            
            <View style={[styles.inputWrapper, isDark && styles.inputWrapperDark]}>
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="Message..."
                placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
            </View>
            
            <TouchableOpacity
              style={[styles.sendBtn, { backgroundColor: accentColor }]}
              onPress={handleSend}
              disabled={!inputText.trim()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-up" size={24} color="white" />
            </TouchableOpacity>
          </BlurView>
        </KeyboardAvoidingView>
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
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  headerDark: {
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    marginRight: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.light.text,
  },
  textDark: {
    color: Colors.dark.text,
  },
  subtextDark: {
    color: Colors.dark.sub,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.sub,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 4,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesList: {
    padding: 20,
    paddingBottom: 24,
  },
  messageWrapper: {
    marginBottom: 20,
    maxWidth: '80%',
  },
  messageWrapperMe: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 4,
    gap: 8,
  },
  messageSender: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.light.sub,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  messageTime: {
    fontSize: 11,
    color: Colors.light.sub,
  },
  messageBubble: {
    padding: 16,
    borderRadius: 20,
    maxWidth: '100%',
  },
  messageBubbleOther: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopLeftRadius: 6,
  },
  messageBubbleOtherDark: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  messageBubbleMe: {
    borderTopRightRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.light.text,
  },
  messageTextMe: {
    color: 'white',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIconMe: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  fileText: {
    fontSize: 14,
    color: Colors.light.text,
    flex: 1,
  },
  readContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
    gap: 4,
  },
  readText: {
    fontSize: 11,
    fontWeight: '700',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 12 : 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  inputContainerDark: {
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  attachBtn: {
    paddingBottom: 4,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
  },
  inputWrapperDark: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  input: {
    fontSize: 16,
    color: Colors.light.text,
    maxHeight: 80,
  },
  inputDark: {
    color: Colors.dark.text,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});