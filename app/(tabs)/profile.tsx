import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/stores/appStore';
import { Colors, TabColors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const { isDark, currentUser, setCurrentTab, toggleTheme, updateUser } = useAppStore();
  const theme = isDark ? Colors.dark : Colors.light;

  useEffect(() => { setCurrentTab('profile'); }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) updateUser({ avatar: result.assets[0].uri });
  };

  const SettingRow = ({ label, icon, value, type = 'arrow', onPress, last }: any) => (
    <TouchableOpacity 
      style={[styles.row, last && { borderBottomWidth: 0 }]} 
      onPress={type === 'switch' ? () => onPress(!value) : onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowLeft}>
        <View style={[styles.iconBox, { backgroundColor: isDark ? '#262626' : '#F0F0F0' }]}>
           <Ionicons name={icon} size={20} color={theme.text} />
        </View>
        <Text style={[styles.rowLabel, { color: theme.text }]}>{label}</Text>
      </View>
      {type === 'arrow' && <Ionicons name="chevron-forward" size={18} color={theme.sub} />}
      {type === 'switch' && <Switch value={value} onValueChange={onPress} trackColor={{ true: TabColors.profile }} />}
    </TouchableOpacity>
  );

  const StatItem = ({ label, value }: any) => (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.sub }]}>{label}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={[styles.blob, { backgroundColor: TabColors.profile, opacity: isDark ? 0.12 : 0.08 }]} />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
              <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
              <View style={styles.editBadge}>
                <Ionicons name="camera" size={14} color="white" />
              </View>
            </TouchableOpacity>
            <Text style={[styles.name, { color: theme.text }]}>{currentUser.name}</Text>
            <Text style={[styles.email, { color: theme.sub }]}>{currentUser.role}</Text>
            
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>PREFERENCES</Text>
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <SettingRow label="Dark Mode" icon="moon" type="switch" value={isDark} onPress={toggleTheme} />
              <SettingRow label="Notifications" icon="notifications" type="arrow" onPress={() => {}} last />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>ACCOUNT</Text>
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <SettingRow label="Privacy" icon="lock-closed" onPress={() => {}} />
              <SettingRow label="Help & Support" icon="help-circle" onPress={() => {}} last />
            </View>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={() => Alert.alert('Log Out', 'Confirm?')}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  blob: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
  },
  content: { paddingVertical: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 32, marginTop: Platform.OS === 'android' ? 40 : 10 },
  avatarContainer: { position: 'relative', marginBottom: 16, shadowColor: TabColors.profile, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: 'white' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: TabColors.profile, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'white' },
  name: { fontSize: 28, fontWeight: '800', marginBottom: 4 },
  email: { fontSize: 16, fontWeight: '500', opacity: 0.8, marginBottom: 24 },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 12, fontWeight: '600', marginTop: 2, opacity: 0.6, textTransform: 'uppercase' },
  statDivider: { width: 1, height: 24 },
  sectionContainer: { marginBottom: 24, paddingHorizontal: 20 },
  sectionHeader: { fontSize: 12, fontWeight: '700', color: '#888', marginBottom: 12, marginLeft: 12, letterSpacing: 1 },
  card: { borderRadius: 20, overflow: 'hidden', paddingVertical: 4 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(0,0,0,0.05)' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  rowLabel: { fontSize: 16, fontWeight: '600' },
  logoutBtn: { marginTop: 8, alignItems: 'center' },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: '700' },
});