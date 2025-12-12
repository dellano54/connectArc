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
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '@/stores/appStore';
import { Avatar } from '@/components/ui/Avatar';
import { Colors } from '@/constants/Colors';
import { Message } from '@/types';

export default function ChatDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isDark, messages, addMessage, contentData, currentTab, currentUser } = useAppStore();
  const theme = isDark ? Colors.dark : Colors.light;
  
  const [inputText, setInputText] = useState('');
  
  const tabData = contentData[currentTab];
  const conversation = tabData?.items.find((item) => item.id === id);

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
        {!isMe && (
          <View style={styles.avatarCol}>
             <Avatar source={conversation?.avatar || ''} size={32} />
          </View>
        )}
        <View style={{ flex: 1, alignItems: isMe ? 'flex-end' : 'flex-start' }}>
          <View style={styles.messageHeader}>
            <Text style={[styles.messageSender, { color: theme.sub }]}>
              {item.senderName} • {item.time}
            </Text>
          </View>
          <View
            style={[
              styles.messageBubble,
              isMe 
                ? { backgroundColor: Colors.primary, borderBottomRightRadius: 4 } 
                : { backgroundColor: theme.card, borderTopLeftRadius: 4 },
              !isMe && styles.shadow, // Add shadow to received messages
            ]}
          >
            {item.type === 'file' ? (
              <View style={styles.fileContainer}>
                <View style={[styles.fileIcon, isMe && styles.fileIconMe]}>
                  <Ionicons 
                    name="document" 
                    size={24} 
                    color={isMe ? 'white' : Colors.primary} 
                  />
                </View>
                <Text style={[styles.fileText, { color: isMe ? 'white' : theme.text }]}>
                  {item.text}
                </Text>
              </View>
            ) : (
              <Text style={[styles.messageText, { color: isMe ? 'white' : theme.text }]}>
                {item.text}
              </Text>
            )}
          </View>
          {isMe && item.read && (
            <View style={styles.readContainer}>
              <Ionicons name="checkmark-done" size={14} color={Colors.primary} />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Burned-in Watermark */}
      <View style={styles.watermarkContainer} pointerEvents="none">
        <Text style={[styles.watermarkText, { color: isDark ? '#1A1A1A' : '#EAEAEA' }]}>CA</Text>
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Professional Header */}
        <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={theme.text}
            />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
             <Text style={[styles.headerName, { color: theme.text }]} numberOfLines={1}>
                {conversation?.name || 'Chat'}
             </Text>
             <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: Colors.success }]} />
                <Text style={[styles.statusText, { color: theme.sub }]}>Active</Text>
             </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Ionicons name="call-outline" size={28} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Ionicons name="videocam-outline" size={28} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          data={[...messages].reverse()}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          inverted
        />

        {/* Input Area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : 30}
          style={{ width: '100%' }}
        >
          <View style={[styles.inputContainer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
            <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
              <Ionicons
                name="add"
                size={32}
                color={Colors.primary}
              />
            </TouchableOpacity>
            
            <View style={[styles.inputWrapper, { backgroundColor: theme.input }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Type a message..."
                placeholderTextColor={theme.sub}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
            </View>
            
            <TouchableOpacity
              style={[
                styles.sendBtn, 
                { backgroundColor: inputText.trim() ? Colors.primary : theme.input }
              ]}
              onPress={handleSend}
              disabled={!inputText.trim()}
              activeOpacity={0.8}
            >
              <Ionicons 
                name="send" 
                size={22} 
                color={inputText.trim() ? 'white' : theme.sub} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  watermarkContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  watermarkText: {
    fontSize: 200,
    fontWeight: '900',
    opacity: 0.4,
    transform: [{ rotate: '-20deg' }],
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  backBtn: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  iconBtn: {
    padding: 4,
  },
  messagesList: {
    padding: 20,
    paddingBottom: 24,
  },
  messageWrapper: {
    marginBottom: 24,
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  messageWrapperMe: {
    justifyContent: 'flex-end',
  },
  avatarCol: {
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  messageHeader: {
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  messageSender: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  messageBubble: {
    padding: 16,
    borderRadius: 20,
    maxWidth: '85%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
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
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIconMe: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  fileText: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  readContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 24, // Significant padding for soft keys
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  attachBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minHeight: 48,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});