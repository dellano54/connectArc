export type TabType = 'chat' | 'groups' | 'notes' | 'requests' | 'search';

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  bio: string;
  avatar: string;
}

export interface ConversationItem {
  id: string;
  name: string;
  time: string;
  avatar: string;
  active: boolean;
  type?: 'chat' | 'group' | 'note' | 'request';
  lastMessage?: string;
  unread?: number;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  senderName: string;
  time: string;
  read?: boolean;
  type?: 'text' | 'image' | 'file';
}

export interface TabConfig {
  title: string;
  colorClass: string;
  bgColor: string;
  watermark: string;
  items: ConversationItem[];
}

export interface ThemeColors {
  primary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  light: {
    bg: string;
    card: string;
    text: string;
    sub: string;
    border: string;
    divider: string;
    input: string;
  };
  dark: {
    bg: string;
    card: string;
    text: string;
    sub: string;
    border: string;
    divider: string;
    input: string;
  };
  gradients?: {
    primary: string[];
    light: string[];
    dark: string[];
  };
}