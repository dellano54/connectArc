import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Avatar } from '@/components/ui/Avatar';
import { ConversationItem as ConversationItemType } from '@/types';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/stores/appStore';

interface ConversationItemProps {
  item: ConversationItemType;
  accentColor: string;
  tabType: string;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  item,
  accentColor,
  tabType,
}) => {
  const router = useRouter();
  const { isDark, setActiveConversation } = useAppStore();
  
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveConversation(tabType as any, item.id);
    router.push(`/chat/${item.id}`);
  };

  if (item.type === 'request') {
    return (
      <View style={[styles.requestContainer, isDark && styles.requestContainerDark]}>
        <View style={styles.requestContent}>
          <Avatar source={item.avatar} size={56} />
          <View style={styles.requestInfo}>
            <Text style={[styles.requestName, isDark && styles.textDark]}>
              {item.name}
            </Text>
            <View style={styles.requestBadge}>
              <View style={[styles.requestDot, { backgroundColor: accentColor }]} />
              <Text style={[styles.requestLabel, { color: accentColor }]}>
                New Connection
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.requestActions}>
          <TouchableOpacity
            style={[styles.acceptButton, { backgroundColor: accentColor }]}
            onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark" size={18} color="white" />
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.declineButton, isDark && styles.declineButtonDark]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={18} color={isDark ? Colors.dark.sub : Colors.light.sub} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        item.active && [styles.activeContainer, { backgroundColor: `${accentColor}08` }],
        isDark && !item.active && styles.containerDark,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        {item.type === 'note' ? (
          <Avatar
            source=""
            size={56}
            isNote
            noteIcon={<Ionicons name="document-text" size={28} color={accentColor} />}
          />
        ) : (
          <Avatar source={item.avatar} size={56} showStatus statusColor={Colors.green.default} />
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text
            style={[styles.name, isDark && styles.textDark]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={[styles.time, { color: accentColor }]}>{item.time}</Text>
        </View>
        
        {item.lastMessage && (
          <Text
            style={[styles.lastMessage, isDark && styles.subtextDark]}
            numberOfLines={2}
          >
            {item.lastMessage}
          </Text>
        )}
        
        {item.type === 'note' && (
          <View style={styles.noteIndicator}>
            <Ionicons name="create-outline" size={14} color={isDark ? Colors.dark.sub : Colors.light.sub} />
            <Text style={[styles.noteLabel, isDark && styles.subtextDark]}>
              Tap to edit
            </Text>
          </View>
        )}
      </View>
      
      {item.unread && item.unread > 0 && (
        <View style={[styles.unreadBadge, { backgroundColor: accentColor }]}>
          <Text style={styles.unreadText}>{item.unread > 99 ? '99+' : item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  containerDark: {
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  activeContainer: {
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  avatarContainer: {
    marginRight: 14,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    flex: 1,
    letterSpacing: -0.3,
  },
  textDark: {
    color: Colors.dark.text,
  },
  time: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.light.sub,
    lineHeight: 20,
  },
  subtextDark: {
    color: Colors.dark.sub,
  },
  noteIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  noteLabel: {
    fontSize: 12,
    color: Colors.light.sub,
    fontWeight: '500',
  },
  unreadBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '800',
  },
  
  // Request styles
  requestContainer: {
    backgroundColor: 'rgba(20, 184, 166, 0.08)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(20, 184, 166, 0.2)',
  },
  requestContainerDark: {
    backgroundColor: 'rgba(20, 184, 166, 0.12)',
    borderColor: 'rgba(20, 184, 166, 0.25)',
  },
  requestContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  requestInfo: {
    marginLeft: 14,
    flex: 1,
  },
  requestName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 6,
  },
  requestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  requestDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  requestLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 10,
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  acceptText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  declineButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  declineButtonDark: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
});