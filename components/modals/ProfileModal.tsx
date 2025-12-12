import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';

export const ProfileModal = () => {
  const {
    isProfileModalVisible,
    setProfileModalVisible,
    currentUser,
    updateUser,
    isDark,
  } = useAppStore();

  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.bio);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  React.useEffect(() => {
    if (isProfileModalVisible) {
      setName(currentUser.name);
      setRole(currentUser.role);
      setEmail(currentUser.email);
      setBio(currentUser.bio);
      setAvatar(currentUser.avatar);
    }
  }, [isProfileModalVisible, currentUser]);

  const handleSave = () => {
    updateUser({ name, role, email, bio, avatar });
    setProfileModalVisible(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <Modal
      visible={isProfileModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setProfileModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setProfileModalVisible(false)}
        >
          <BlurView
            intensity={isDark ? 80 : 100}
            tint={isDark ? 'dark' : 'light'}
            style={[styles.modalContent, isDark && styles.modalContentDark]}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.header}>
              <View style={styles.headerTitleContainer}>
                <View style={[styles.headerIcon, { backgroundColor: isDark ? 'rgba(37, 99, 235, 0.2)' : '#DBEAFE' }]}>
                  <Ionicons name="person-circle" size={24} color={Colors.primary} />
                </View>
                <View>
                  <Text style={[styles.title, isDark && styles.textDark]}>Edit Profile</Text>
                  <Text style={[styles.subtitle, isDark && styles.subtextDark]}>Update your workspace identity</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setProfileModalVisible(false)}
                style={styles.closeBtn}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={isDark ? Colors.dark.sub : Colors.light.sub}
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.avatarSection}>
                <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                  <Image 
                    source={{ uri: avatar }} 
                    style={[
                      styles.avatar, 
                      { borderColor: isDark ? Colors.dark.bg : Colors.light.bg }
                    ]} 
                  />
                  <View 
                    style={[
                      styles.editBadge, 
                      { borderColor: isDark ? Colors.dark.bg : Colors.light.bg }
                    ]}
                  >
                    <Ionicons name="camera" size={16} color="white" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDark && styles.subtextDark]}>DISPLAY NAME</Text>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                    placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDark && styles.subtextDark]}>EMAIL ADDRESS</Text>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Enter your email"
                    placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDark && styles.subtextDark]}>ROLE / JOB TITLE</Text>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    value={role}
                    onChangeText={setRole}
                    placeholder="Enter your role"
                    placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDark && styles.subtextDark]}>BIO</Text>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark, styles.textArea]}
                    value={bio}
                    onChangeText={setBio}
                    multiline
                    numberOfLines={3}
                    placeholder="Tell us about yourself"
                    placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
                  />
                </View>
              </View>

              <View style={styles.actions}>
                <Button
                  title="Cancel"
                  onPress={() => setProfileModalVisible(false)}
                  variant="ghost"
                  color={isDark ? Colors.dark.sub : Colors.light.sub}
                  style={{ flex: 1 }}
                />
                <Button
                  title="Save Changes"
                  onPress={handleSave}
                  color={Colors.primary}
                  style={{ flex: 1 }}
                />
              </View>
            </ScrollView>
          </BlurView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    maxHeight: '90%',
  },
  modalContentDark: {
    borderColor: 'rgba(255,255,255,0.1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.light.text,
  },
  textDark: {
    color: Colors.dark.text,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.light.sub,
    marginTop: 2,
  },
  subtextDark: {
    color: Colors.dark.sub,
  },
  closeBtn: {
    padding: 4,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 24,
    borderWidth: 3,
  },
  editBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.light.sub,
    letterSpacing: 1,
    marginLeft: 4,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputDark: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: Colors.dark.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
});