import { User, ConversationItem, Message, TabConfig } from '@/types';

export const CURRENT_USER: User = {
  id: '1',
  name: 'Jordan Smith',
  role: 'Design Director',
  email: 'jordan@connectarc.com',
  bio: 'Crafting beautiful digital experiences.',
  avatar: 'https://i.pravatar.cc/150?u=jordan',
};

export const MOCK_CONTENT_DATA: Record<string, TabConfig> = {
  chat: {
    title: 'Messages',
    colorClass: 'text-blue',
    bgColor: '#3B82F6',
    watermark: 'MSG',
    items: [
      { id: '1', name: 'Dev Team', time: 'now', avatar: 'https://i.pravatar.cc/150?u=dev', active: true, lastMessage: "Latest sprint updates are ready...", unread: 2 },
      { id: '2', name: 'Maya Chen', time: '5m', avatar: 'https://i.pravatar.cc/150?u=maya', active: false, lastMessage: 'Can we sync on the prototype?' },
      { id: '3', name: 'Alex Rivera', time: '1h', avatar: 'https://i.pravatar.cc/150?u=alex', active: false, lastMessage: 'Thanks for the feedback!' },
      { id: '4', name: 'Design Guild', time: '3h', avatar: 'https://i.pravatar.cc/150?u=guild', active: false, lastMessage: 'New Figma components added' },
      { id: '5', name: 'Sam Park', time: '1d', avatar: 'https://i.pravatar.cc/150?u=sam', active: false, lastMessage: 'Let\'s catch up soon' },
      { id: '6', name: 'Taylor Swift', time: '2d', avatar: 'https://i.pravatar.cc/150?u=taylor', active: false, lastMessage: 'Meeting notes shared' },
    ],
  },
  groups: {
    title: 'Communities',
    colorClass: 'text-violet',
    bgColor: '#8B5CF6',
    watermark: 'GRP',
    items: [
      { id: 'g1', name: 'Product Squad', time: '2m', avatar: 'https://i.pravatar.cc/150?u=prod', active: true, type: 'group', unread: 5 },
      { id: 'g2', name: 'Engineering', time: '30m', avatar: 'https://i.pravatar.cc/150?u=eng', active: false, type: 'group', unread: 12 },
      { id: 'g3', name: 'Creative Hub', time: '2h', avatar: 'https://i.pravatar.cc/150?u=creative', active: false, type: 'group' },
      { id: 'g4', name: 'Remote Work', time: '1d', avatar: 'https://i.pravatar.cc/150?u=remote', active: false, type: 'group' },
    ],
  },
  notes: {
    title: 'My Notes',
    colorClass: 'text-rose',
    bgColor: '#F43F5E',
    watermark: 'NOTE',
    items: [
      { id: 'n1', name: 'Design System Ideas', time: '5m', avatar: '', active: true, type: 'note' },
      { id: 'n2', name: 'Meeting Notes - Q4', time: '2h', avatar: '', active: false, type: 'note' },
      { id: 'n3', name: 'Project Roadmap', time: '1d', avatar: '', active: false, type: 'note' },
    ],
  },
  requests: {
    title: 'Connection Requests',
    colorClass: 'text-teal',
    bgColor: '#14B8A6',
    watermark: 'REQ',
    items: [
      { id: 'r1', name: 'Chris Martinez', time: 'NEW', avatar: 'https://i.pravatar.cc/150?u=chris', active: false, type: 'request' },
      { id: 'r2', name: 'Priya Patel', time: 'NEW', avatar: 'https://i.pravatar.cc/150?u=priya', active: false, type: 'request' },
      { id: 'r3', name: 'James Wilson', time: 'NEW', avatar: 'https://i.pravatar.cc/150?u=james', active: false, type: 'request' },
    ],
  },
  search: {
    title: 'Search',
    colorClass: 'text-amber',
    bgColor: '#F59E0B',
    watermark: 'FIND',
    items: [],
  },
};

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    text: "Hey team! I've finished the new component library. Would love your thoughts on the design patterns we're using.",
    sender: 'other',
    senderName: 'Dev Team',
    time: '2:30 PM',
  },
  {
    id: 'm2',
    text: 'This looks amazing! The consistency across components is exactly what we needed. Great work! 🎉',
    sender: 'me',
    senderName: 'Jordan Smith',
    time: '2:35 PM',
    read: true,
  },
  {
    id: 'm3',
    text: "I've attached the updated documentation. Check it out when you have a moment.",
    sender: 'other',
    senderName: 'Dev Team',
    time: '2:37 PM',
    type: 'file',
  },
  {
    id: 'm4',
    text: 'Perfect timing! I was just about to ask for that. Will review it this afternoon.',
    sender: 'me',
    senderName: 'Jordan Smith',
    time: '2:40 PM',
    read: true,
  },
];