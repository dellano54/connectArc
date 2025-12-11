import { create } from 'zustand';
import { User, TabType, ConversationItem, Message } from '@/types';
import { CURRENT_USER, MOCK_CONTENT_DATA, MOCK_MESSAGES } from '@/constants/MockData';

interface AppState {
  // User
  currentUser: User;
  updateUser: (user: Partial<User>) => void;
  
  // Theme
  isDark: boolean;
  toggleTheme: () => void;
  
  // Navigation
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  
  // Content
  contentData: typeof MOCK_CONTENT_DATA;
  setActiveConversation: (tabType: TabType, itemId: string) => void;
  
  // Messages
  messages: Message[];
  addMessage: (message: Message) => void;
  
  // Modals
  isProfileModalVisible: boolean;
  isNoteModalVisible: boolean;
  setProfileModalVisible: (visible: boolean) => void;
  setNoteModalVisible: (visible: boolean) => void;
  
  // Notes
  createNote: (title: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // User
  currentUser: CURRENT_USER,
  updateUser: (userData) =>
    set((state) => ({
      currentUser: { ...state.currentUser, ...userData },
    })),
  
  // Theme
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  
  // Navigation
  currentTab: 'chat',
  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  // Content
  contentData: MOCK_CONTENT_DATA,
  setActiveConversation: (tabType, itemId) =>
    set((state) => {
      const newContentData = { ...state.contentData };
      newContentData[tabType].items = newContentData[tabType].items.map((item) => ({
        ...item,
        active: item.id === itemId,
      }));
      return { contentData: newContentData };
    }),
  
  // Messages
  messages: MOCK_MESSAGES,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  
  // Modals
  isProfileModalVisible: false,
  isNoteModalVisible: false,
  setProfileModalVisible: (visible) => set({ isProfileModalVisible: visible }),
  setNoteModalVisible: (visible) => set({ isNoteModalVisible: visible }),
  
  // Notes
  createNote: (title) =>
    set((state) => {
      const newNote: ConversationItem = {
        id: `n${Date.now()}`,
        name: title || 'Untitled Note',
        time: 'Just now',
        avatar: '',
        active: true,
        type: 'note',
      };
      
      const newContentData = { ...state.contentData };
      newContentData.notes.items = [
        newNote,
        ...newContentData.notes.items.map((item) => ({ ...item, active: false })),
      ];
      
      return {
        contentData: newContentData,
        currentTab: 'notes',
        isNoteModalVisible: false,
      };
    }),
}));