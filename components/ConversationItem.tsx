import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { ConversationItem as ConversationItemType } from '@/types';
import { Colors } from '@/constants/Colors';
import { useAppStore } from '@/stores/appStore';

interface ConversationItemProps {
  item: ConversationItemType;
  tabType: string;
  accentColor?: string;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  item,
  tabType,
  accentColor = Colors.primary,
}) => {
  const router = useRouter();
  const { isDark, setActiveConversation } = useAppStore();
  const theme = isDark ? Colors.dark : Colors.light;
  
  // Use Green for Chat tab (standard messaging), otherwise use the accent color
  const activeColor = tabType === 'chat' ? Colors.success : accentColor;
  
  const handlePress = () => {
    setActiveConversation(tabType as any, item.id);
    router.push(`/chat/${item.id}`);
  };

  // Request Layout (Masterpiece Glass Card)
  if (item.type === 'request') {
    return (
      <View style={[
        styles.requestCard, 
        { 
          shadowColor: accentColor,
          backgroundColor: 'transparent', // Let BlurView handle bg
        }
      ]}>
        <BlurView 
          intensity={Platform.OS === 'ios' ? 60 : 100} 
          tint={isDark ? 'dark' : 'light'}
          style={styles.blurContent}
        >
          <View style={styles.requestTop}>
            <Avatar source={item.avatar} size={64} style={{ borderRadius: 20 }} />
            <View style={styles.requestContent}>
              <View style={styles.requestHeaderRow}>
                 <Text style={[styles.reqName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
                 <View style={[styles.newBadge, { backgroundColor: accentColor }]}>
                   <Text style={styles.newBadgeText}>NEW</Text>
                 </View>
              </View>
              <Text style={[styles.reqRole, { color: theme.sub }]}>Product Designer @ Stripe</Text>
              <Text style={[styles.reqMutual, { color: theme.sub }]}>
                <Ionicons name="people" size={12} /> 12 mutual connections
              </Text>
            </View>
          </View>
          
          <View style={styles.requestActions}>
            <Button 
              title="Confirm" 
              onPress={() => {}} 
              color={accentColor}
              style={{ flex: 1, borderRadius: 16 }}
              textStyle={{ fontSize: 15 }}
            />
            <Button 
              title="Delete" 
              variant="secondary"
              color={theme.sub}
              onPress={() => {}} 
              style={{ flex: 1, borderRadius: 16, borderColor: theme.border }}
              textStyle={{ fontSize: 15 }}
            />
          </View>
        </BlurView>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        {item.type === 'note' ? (
          <View style={[styles.noteIcon, { backgroundColor: isDark ? '#262626' : '#F0F0F0' }]}>
            <Ionicons name="document-text" size={24} color={accentColor} />
          </View>
        ) : (
          <Avatar 
            source={item.avatar} 
            size={52} 
            style={tabType === 'groups' ? { borderRadius: 14 } : undefined} 
          />
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          {item.time && (
            <Text style={[
              styles.time, 
              { color: item.unread && item.unread > 0 ? activeColor : theme.sub }
            ]}>
              {item.time}
            </Text>
          )}
        </View>
        
        <View style={styles.row}>
          <Text 
            style={[
              styles.preview, 
              { 
                color: item.unread ? theme.text : theme.sub, 
                fontWeight: item.unread ? '500' : '400',
              }
            ]} 
            numberOfLines={1}
          >
            {item.lastMessage || 'No messages'}
          </Text>
          
          <View style={styles.metaRight}>
            
            {item.unread && item.unread > 0 && (
              <View style={[styles.badge, { backgroundColor: activeColor }]}>
                <Text style={styles.badgeText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  requestCard: {
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2, // Increased for glass depth
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden', // Essential for BlurView
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)', // Glass edge
  },
  blurContent: {
    padding: 20,
  },
  requestTop: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  requestContent: {
    flex: 1,
    justifyContent: 'center',
  },
  requestHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reqName: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 0.5,
  },
  reqRole: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  reqMutual: {
    fontSize: 12,
    opacity: 0.7,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 12,
  },
  avatarContainer: {
    marginRight: 14,
  },
  noteIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
  },
  preview: {
    fontSize: 14,
    flex: 1,
    marginRight: 16,
    lineHeight: 20,
  },
  sub: {
    fontSize: 14,
    marginTop: 2,
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badge: {
    backgroundColor: Colors.success, // Green badge
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  actions: { 
    flexDirection: 'row', 
    gap: 12,
    width: '100%',
  },
});
