import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';

export const ProfileModal: React.FC = () => {
  const {
    isDark,
    currentUser,
    updateUser,
    isProfileModalVisible,
    setProfileModalVisible,
  } = useAppStore();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [role, setRole] = useState(currentUser.role);
  const [bio, setBio] = useState(currentUser.bio);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isProfileModalVisible) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setRole(currentUser.role);
      setBio(currentUser.bio);
      setAvatar(currentUser.avatar);
    }
  }, [isProfileModalVisible, currentUser]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant photo library access');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate network delay
    setTimeout(() => {
      updateUser({
        name,
        email,
        role,
        bio,
        avatar,
      });
      
      setIsSaving(false);
      setProfileModalVisible(false);
      
      // Show success feedback (you could add a toast here)
      Alert.alert('Success', 'Profile updated successfully');
    }, 800);
  };

  return (
    <Modal
      visible={isProfileModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setProfileModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setProfileModalVisible(false)}
        >
          <View
            style={[styles.modalContent, isDark && styles.modalContentDark]}
            onStartShouldSetResponder={() => true}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="person" size={24} color={Colors.blue.default} />
                  </View>
                  <View>
                    <Text style={[styles.title, isDark && styles.textDark]}>
                      Edit Profile
                    </Text>
                    <Text style={[styles.subtitle, isDark && styles.subtextDark]}>
                      Update your workspace identity
                    </Text>
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

              {/* Avatar */}
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={pickImage}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: avatar }}
                  style={styles.avatar}
                />
                <View style={styles.avatarOverlay}>
                  <Ionicons name="camera" size={32} color="white" />
                  <Text style={styles.avatarOverlayText}>CHANGE</Text>
                </View>
              </TouchableOpacity>

              {/* Form */}
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDark && styles.textDark]}>
                    DISPLAY NAME
                  </Text>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your name"
                    placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDark && styles.textDark]}>
                    EMAIL ADDRESS
                  </Text>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="your.email@company.com"
                    placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDark && styles.textDark]}>
                    ROLE / JOB TITLE
                  </Text>
                  <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    value={role}
                    onChangeText={setRole}
                    placeholder="Your role"
                    placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDark && styles.textDark]}>
                    BIO
                  </Text>
                  <TextInput
                    style={[styles.input, styles.textArea, isDark && styles.inputDark]}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Tell us about yourself"
                    placeholderTextColor={isDark ? Colors.dark.sub : Colors.light.sub}
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </View>

              {/* Actions */}
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
                  color={Colors.blue.default}
                  loading={isSaving}
                  style={{ flex: 1 }}
                />
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
  },
  modalContentDark: {
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
  },
  textDark: {
    color: Colors.dark.text,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.light.sub,
    marginTop: 4,
  },
  subtextDark: {
    color: Colors.dark.sub,
  },
  closeBtn: {
    padding: 4,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: Colors.light.border,
  },
  avatarOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOverlayText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 1,
  },
  form: {
    gap: 16,
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
    backgroundColor: Colors.light.bg,
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputDark: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: Colors.dark.text,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
});