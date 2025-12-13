# ConnectArc Mobile App - Complete Project Documentation

## Project Overview

**ConnectArc** is a modern React Native mobile application built with Expo that provides a comprehensive messaging, social networking, and collaboration platform. The app features a sleek, glassmorphism-based UI with dark mode support, real-time messaging, group collaboration, note-taking, and a network discovery system.

**Project Name:** connectarc-mobile  
**Version:** 1.0.0  
**Build Tool:** Expo (~54.0.27)  
**UI Framework:** React Native 0.81.5  
**State Management:** Zustand 5.0.9  
**TypeScript Version:** 5.9.2  

---

## Technology Stack

### Core Dependencies
- **Expo 54.0.27** - React Native framework for iOS/Android development
- **React 19.1.0** - UI library
- **React Native 0.81.5** - Native mobile framework
- **Expo Router 6.0.17** - File-based navigation system (similar to Next.js)
- **TypeScript 5.9.2** - Type safety and better IDE support

### UI & Animations
- **React Native Reanimated 4.1.1** - High-performance animations and gesture handling
- **Expo Blur 15.0.8** - Glass effect and blur components
- **Expo Linear Gradient 15.0.8** - Gradient background support
- **Expo Vector Icons 15.0.3** - Ionicons icon library
- **Shopify Flash List 2.0.2** - Optimized scrollable list rendering
- **BlurView (expo-blur)** - Glassmorphism effects

### Features & Permissions
- **Expo Image Picker 17.0.9** - Photo/camera access for profile avatars
- **Expo Haptics 15.0.8** - Haptic feedback for interactions
- **Expo Status Bar 3.0.9** - Status bar management
- **Expo Linking 8.0.10** - Deep linking support
- **React Native Safe Area Context 5.6.0** - Safe area handling
- **React Native Screens 4.16.0** - Native screen handling

### State & Utilities
- **Zustand 5.0.9** - Lightweight state management (app theme, user data, messages, modals)
- **date-fns 4.1.0** - Date formatting utilities
- **Babel 54.0.0** - JavaScript transpilation with module-resolver plugin

### Development
- **React Refresh 0.18.0** - Fast refresh support
- **React Native Worklets 0.5.1** - Worklet support for Reanimated
- **babel-plugin-module-resolver 5.0.2** - Path aliasing (@/)

---

## Project Structure

```
e:\conn/
├── app/                          # App navigation & screens (Expo Router)
│   ├── _layout.tsx              # Root layout with Stack navigation
│   ├── index.tsx                # Root redirect to /(tabs)/chat
│   ├── (tabs)/                  # Tab-based navigation container
│   │   ├── _layout.tsx          # Tab router layout (Tabs navigation)
│   │   ├── chat.tsx             # Messages/conversations screen
│   │   ├── groups.tsx           # Groups/communities screen
│   │   ├── notes.tsx            # Notes editor & list screen
│   │   ├── profile.tsx          # User profile & settings screen
│   │   ├── requests.tsx         # Network/connection requests screen
│   │   └── search.tsx           # Global search screen
│   ├── chat/
│   │   └── [id].tsx             # Dynamic chat detail screen
│   └── user/
│       └── [id].tsx             # User profile detail screen
├── components/                   # Reusable UI components
│   ├── ConversationItem.tsx     # Conversation/message item with glass design
│   ├── modals/
│   │   └── ProfileModal.tsx     # Edit profile modal with blur background
│   └── ui/
│       ├── AnimatedCard.tsx     # Animated card component with entrance animation
│       ├── Avatar.tsx           # Avatar with optional status indicator
│       ├── Background.tsx       # Linear gradient background
│       ├── Button.tsx           # Primary/secondary/ghost button variants
│       ├── DoodleBackground.tsx # Image-based background texture
│       └── LargeMonogramBackground.tsx # Large background text (CA watermark)
├── constants/                    # App constants & themes
│   ├── Colors.ts                # Theme colors (light/dark), gradients, tab colors
│   ├── MockData.ts              # Mock user, conversations, messages
│   └── Styles.ts                # Global StyleSheet (shadows, glassmorphism, typography)
├── stores/                       # State management
│   └── appStore.ts              # Zustand store (user, theme, messages, modals, notes)
├── types/                        # TypeScript type definitions
│   └── index.ts                 # User, Message, ConversationItem, TabConfig, ThemeColors
├── assets/                       # App assets (icons, splashes, images)
├── app.json                      # Expo app configuration
├── babel.config.js              # Babel configuration with module-resolver
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies & scripts
├── index.ts                     # App entry point
└── expo-env.d.ts               # Expo type definitions
```

---

## Key Features

### 1. **Tab-Based Navigation**
Five main tabs accessible via bottom tab bar:
- **Chats (Blue #276EF1)** - Direct messages with users
- **Groups (Purple #800080)** - Group conversations and communities
- **Notes (Red #FF0000)** - Note-taking and capture
- **Network (Green #008000)** - Connection requests and suggested users
- **Profile (Pink #EC4899)** - User profile, settings, theme toggle

### 2. **Chat System**
- Active users carousel at the top with status indicators
- Search messaging functionality
- Dynamic chat detail screen with full message history
- Message bubbles with sender info and timestamps
- Haptic feedback on message send
- File attachment support and display
- Conversation list with unread message badges

### 3. **Message Features**
- Real-time message display in conversation threads
- Message sender identification with avatars
- Read/unread status tracking
- File attachment type detection and icons
- Time-based message grouping
- Different bubble styling for sent vs received messages

### 4. **Groups & Communities**
- Pinned groups section with carousel
- Group member count display
- Group-specific conversations
- Group discovery and pinning functionality
- Section-based list organization

### 5. **Note-Taking**
- Grid layout note display (2 columns)
- Quick note creation modal
- Note metadata (title, created time)
- Visual note indicators with custom icons
- Empty state handling

### 6. **Network & Connections**
- People suggestion cards with professional details
- Online status indicators
- Connection request management (Confirm/Delete actions)
- Mutual connections count display
- Role and affiliation display
- QR code scanner floating action button
- See all suggestions functionality

### 7. **Profile Management**
- User avatar with camera/photo picker access
- Profile picture upload and editing
- User bio, role, name editing
- Dark/Light theme toggle switch
- Privacy & support settings
- Notifications management
- Logout functionality
- Image editing with aspect ratio locking

### 8. **Theme System**
- **Light Mode**: Light gray backgrounds (#F9F9F9), white cards, high-contrast text
- **Dark Mode**: True black backgrounds (#000000), dark gray cards (#161616), light text
- **Tab Colors**: Different accent colors per tab for visual distinction
- **Glassmorphism**: Blur effects and semi-transparent overlays throughout

---

## Detailed File Documentation

### App Structure (`app/` directory)

#### **_layout.tsx** (Root Layout)
- Root Stack navigation with slide animations
- Transparent background for custom Background component
- Status bar styling based on theme
- Defines routes: (tabs) tab group and chat/[id] detail screen

#### **index.tsx** (Root Entry)
- Redirect component that routes to /(tabs)/chat
- Landing point before navigation initialization

#### **(tabs)/_layout.tsx** (Tab Router)
- Tabs navigation configuration
- 5 visible tabs + 1 hidden tab (search)
- Tab bar styling with platform-specific padding
- Inactive/active color configuration
- Tab labels and icons from Ionicons
- Platform-specific font families (System for iOS, Roboto for Android)

#### **chat.tsx** (Chats Screen)
- Active users horizontal carousel
- Search bar with text input and icon
- FlatList of conversations with ConversationItem
- Large monogram background watermark ("CA")
- Background blob animation
- Pull-to-refresh ready
- Unread message badges with tab color

#### **groups.tsx** (Groups Screen)
- Pinned groups carousel section
- All groups list view
- Group member count badges
- Background blob with purple color
- Add group FAB button
- Section titles (PINNED, ALL GROUPS)

#### **notes.tsx** (Notes Screen)
- Grid-based note display (2 columns)
- Note creation modal
- Modal with text input for note title
- Save/Cancel buttons in modal header
- Note card with title, preview, and date
- Empty state message
- Create Note FAB button

#### **requests.tsx** (Network/Requests Screen)
- Suggested users carousel with detailed cards
- User role and company display
- "Connect" button with tab color
- Online status indicator badge
- Pending requests list section
- See All suggestions link
- QR code scanner FAB (bottom right)
- Multiple background blobs for visual effect
- Floating Action Button for QR scanning

#### **profile.tsx** (Profile Screen)
- User avatar with camera edit button
- User name, role, email display
- Dark mode toggle with Switch component
- Preferences section (Dark Mode, Notifications)
- Account section (Privacy, Help & Support)
- Logout button at bottom
- ScrollView for long content
- Modal-style image picker integration

#### **search.tsx** (Search Screen)
- Blur header with gradient tint
- Global search input
- Clear search button
- Recent searches section
- Theme-aware text styling
- Search icon from Ionicons
- Theme toggle button in header

#### **chat/[id].tsx** (Chat Detail Screen)
- Dynamic route parameter [id] for conversation
- FlatList of messages
- Message bubble styling (me vs other)
- Avatar display for received messages
- Sender name and timestamp
- File attachment display with icon
- TextInput for message composition
- Send button with text validation
- Haptic feedback on send
- Monogram background watermark
- Keyboard avoiding view for input
- StatusBar styling

#### **user/[id].tsx** (User Profile Detail)
- Dynamic route parameter [id] for user
- Placeholder screen for user profile details
- Back navigation button
- User ID display
- Scaffold for future profile information

### Component Structure (`components/` directory)

#### **ConversationItem.tsx** (Conversation Item Component)
- **Props**: item (ConversationItem), tabType (string), accentColor (string)
- **Features**:
  - Touch handler for navigation to chat detail
  - Avatar component integration
  - Name, last message, time display
  - Unread badge with count
  - Different styling for different item types
  - Request card variant with blur background
  - Action buttons for requests (Confirm, Delete)
  - New badge for request items
  - Mutual connections indicator for requests
  - Note icon for note-type items

#### **ProfileModal.tsx** (Profile Edit Modal)
- Modal with fade animation
- Blur background
- Keyboard aware positioning
- Form fields: name, role, email, bio, avatar
- Avatar picker with image selection
- Save/Cancel buttons
- Modal header with icon
- Input fields with placeholders
- Responsive design

### UI Components (`components/ui/` directory)

#### **Avatar.tsx** (Avatar Component)
- **Props**: source (string), size (number), style, showStatus, statusColor, isNote, noteIcon
- Circular image display
- Configurable size with responsive border radius
- Optional online status dot (green by default)
- Support for note icons instead of images
- Border color matches background theme
- Relative positioning for status indicator

#### **Button.tsx** (Button Component)
- **Variants**: primary, secondary, ghost
- **Props**: title, onPress, variant, color, style, textStyle, disabled, loading, icon
- Primary variant with linear gradient
- Secondary variant with transparent background and border
- Ghost variant for minimal styling
- Loading state with ActivityIndicator
- Support for icon elements
- Disabled state styling
- Touch feedback with activeOpacity

#### **Background.tsx** (Background Component)
- Linear gradient implementation
- Theme-aware gradient selection
- Absolute positioning behind all content
- Light/dark theme support

#### **LargeMonogramBackground.tsx** (Monogram Background)
- **Props**: monogram (string), style, textStyle, textOpacity, fontFamily
- Large background text display
- Configurable opacity for watermark effect
- Custom font family support (default: Avenir-Heavy)
- Centered positioning
- Pointer events disabled for interactivity
- Font size auto-adjustment

#### **DoodleBackground.tsx** (Doodle Background)
- ImageBackground component
- Repeat resize mode
- Low opacity for subtle texture
- Absolute positioning

#### **AnimatedCard.tsx** (Animated Card)
- **Props**: children, index, style
- Reanimated FadeInDown entrance animation
- Staggered animation with index-based delay
- Spring physics animation
- Zero index delay support

### Constants (`constants/` directory)

#### **Colors.ts** (Theme & Color System)
- **Primary Colors**:
  - Primary Blue: #276EF1 (Uber-like professional blue)
  - Accent: #276EF1
  - Success: #05A357 (Green for online status)
  - Warning: #FFC043 (Orange)
  - Danger: #E11900 (Red)

- **Light Theme**:
  - Background: #F9F9F9 (Light gray)
  - Card: #FFFFFF (Pure white)
  - Text: #000000 (Black)
  - Subtext: #5E5E5E (Dark gray)
  - Border: #E8E8E8
  - Input: #EEEEEE

- **Dark Theme**:
  - Background: #000000 (True black)
  - Card: #161616 (Dark gray)
  - Text: #FFFFFF (White)
  - Subtext: #A6A6A6 (Light gray)
  - Border: #262626
  - Input: #262626

- **Tab Colors**:
  - Chat: #276EF1 (Blue)
  - Groups: #800080 (Purple)
  - Notes: #FF0000 (Red)
  - Requests: #008000 (Green)
  - Profile: #EC4899 (Pink)

- **Gradients**:
  - Primary: Blue to darker blue
  - Light: Light gray to light gray
  - Dark: Black to black

#### **MockData.ts** (Mock Data)
- **Current User**: Jordan Smith (Design Director)
- **Mock Conversations**:
  - 6 chat items (with avatars, messages, unread counts)
  - 4 group items (with member indicators)
  - 3 note items (title-based)
  - 3 connection request items
  - 4 suggested users

- **Mock Messages**: Initial conversation thread with Dev Team
  - Message objects with text, sender, timestamp
  - File attachment example
  - Read status indicators

#### **Styles.ts** (Global Styles)
- **Shadow System**:
  - shadowSm: Light shadow (4px offset, 6px blur)
  - shadowMd: Medium shadow (10px offset, 12px blur)
  - shadowLg: Large shadow (20px offset, 25px blur)

- **Glass Morphism**:
  - glass: Light semi-transparent glass effect
  - glassDark: Dark semi-transparent glass effect

- **Color Glows**:
  - glowBlue: Blue shadow glow
  - glowViolet: Violet shadow glow

- **Typography**:
  - heading: Bold letter spacing (-0.5)
  - Platform-specific fonts

### State Management (`stores/appStore.ts`)

#### **Zustand Store Structure**
```typescript
interface AppState {
  // User Management
  currentUser: User
  updateUser(userData: Partial<User>)
  
  // Theme
  isDark: boolean
  toggleTheme()
  
  // Navigation
  currentTab: TabType
  setCurrentTab(tab: TabType)
  
  // Content Data
  contentData: Record<TabType, TabConfig>
  setActiveConversation(tabType: TabType, itemId: string)
  
  // Messages
  messages: Message[]
  addMessage(message: Message)
  
  // Modals
  isProfileModalVisible: boolean
  isNoteModalVisible: boolean
  setProfileModalVisible(visible: boolean)
  setNoteModalVisible(visible: boolean)
  
  // Notes
  createNote(title: string)
}
```

- **Initialization**: Uses mock data from MockData.ts
- **User State**: Stores current logged-in user with update capability
- **Theme State**: Global dark mode toggle
- **Content State**: All conversations organized by tab
- **Message State**: Chat messages array with append functionality
- **Modal State**: Visibility toggles for profile and note modals
- **Note Creation**: Creates new note with timestamp and adds to notes list

### Types (`types/index.ts`)

#### **TabType**
```typescript
type TabType = 'chat' | 'groups' | 'notes' | 'requests' | 'search' | 'profile'
```

#### **User Interface**
```typescript
interface User {
  id: string
  name: string
  role: string
  email: string
  bio: string
  avatar: string
}
```

#### **ConversationItem Interface**
```typescript
interface ConversationItem {
  id: string
  name: string
  time: string
  avatar: string
  active: boolean
  type?: 'chat' | 'group' | 'note' | 'request'
  lastMessage?: string
  unread?: number
}
```

#### **Message Interface**
```typescript
interface Message {
  id: string
  text: string
  sender: 'me' | 'other'
  senderName: string
  time: string
  read?: boolean
  type?: 'text' | 'image' | 'file'
}
```

#### **TabConfig Interface**
```typescript
interface TabConfig {
  title: string
  colorClass: string
  bgColor: string
  watermark: string
  items: ConversationItem[]
}
```

#### **ThemeColors Interface**
```typescript
interface ThemeColors {
  primary: string
  accent: string
  success: string
  warning: string
  danger: string
  light: { bg, card, text, sub, border, divider, input }
  dark: { bg, card, text, sub, border, divider, input }
  gradients?: { primary: string[], light: string[], dark: string[] }
}
```

---

## Navigation Hierarchy

### **Expo Router File Structure**
```
/(tabs)               → Bottom tab navigation
├── chat             → Chat messages list
├── groups           → Groups/communities list
├── notes            → Notes grid view
├── requests         → Connection requests & suggestions
├── profile          → User profile & settings
└── search           → Search screen (hidden: href: null)

/chat/[id]           → Dynamic chat detail screen
/user/[id]           → Dynamic user profile screen
```

### **Navigation Flow**
1. App starts → Index redirects to /(tabs)/chat
2. User can tap any tab to switch between screens
3. Tapping conversation item navigates to /chat/[conversationId]
4. Profile picture in profile tab can trigger ProfileModal
5. Back button on detail screens returns to parent tab

---

## Color Theme Implementation

### **Light Theme Usage**
```typescript
const theme = isDark ? Colors.dark : Colors.light;
// Then use theme.bg, theme.text, theme.sub, etc.
```

### **Tab-Specific Accent Colors**
- Each tab has a unique color for visual identity
- Used for badges, buttons, and accent elements
- Maintains consistency across all screens

### **Gradient System**
- Primary gradient for buttons and headers
- Background gradient for app background
- Platform-specific adjustments

---

## Key Implementation Patterns

### **Theme Management**
- Single source of truth: `useAppStore().isDark`
- All components respond to theme changes reactively
- Colors computed inline or stored in component state
- Platform-specific font families and shadow styles

### **Message Display**
- Messages sorted by ID from store
- Sender differentiation: 'me' vs 'other'
- Avatar only shown for received messages
- Different bubble colors and alignment

### **Modal Management**
- Profile and Note modals controlled via Zustand store
- Blur background for modal overlay
- Keyboard avoiding view for input
- Close handler dismisses modal and clears form

### **Animation Strategy**
- Entrance animations with staggered delays
- Reanimated for performant gesture handling
- Spring physics for natural motion
- Slide and fade animations between screens

### **List Optimization**
- FlatList with keyExtractor for performance
- Flash List for high-performance rendering
- Horizontal scrolls for carousels
- Content container styling for spacing

---

## Platform Considerations

### **iOS**
- Safe area handling with SafeAreaView
- Status bar light content in dark mode
- Custom fonts via fontFamily prop
- Blur intensity: 60 for iOS, 100 for Android
- Tab bar height: 100px with 24px bottom padding
- Platform.OS === 'ios' checks throughout

### **Android**
- Elevation for shadow effects (replaces shadowOpacity)
- Roboto font family default
- Tab bar height: 84px with 10px bottom padding
- Different padding/margin calculations
- Blur intensity: 100
- Proper status bar color handling

### **Responsive Design**
- Flexible layouts using flex
- Column wrapper for grid layouts
- Platform-specific dimensions
- Padding adjustments for notches

---

## Installation & Setup

### **Prerequisites**
- Node.js and npm installed
- Expo CLI installed globally: `npm install -g expo-cli`
- iOS simulator or Android emulator (or physical device)

### **Installation Steps**
```bash
# 1. Navigate to project directory
cd e:\conn

# 2. Install dependencies
npm install

# 3. Configure Python environment (if needed)
# Required for certain native modules

# 4. Start development server
npm start
```

### **Running on Different Platforms**
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web (Preview)
npm run web

# Expo Go (Mobile)
# Scan QR code with Expo Go app
npm start
```

---

## Build Configuration

### **app.json (Expo Configuration)**
- App name: ConnectArc
- Slug: connectarc-mobile
- Version: 1.0.0
- Orientation: Portrait
- Icon & Splash: Assets included
- New Architecture enabled
- iOS bundle ID: com.connectarc.mobile
- Android package: com.connectarc.mobile
- Permissions: CAMERA, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE
- Plugins: expo-router, expo-image-picker
- Deep linking scheme: connectarc

### **Babel Configuration**
- Preset: babel-preset-expo
- Plugins:
  - module-resolver (path aliasing)
  - react-native-reanimated/plugin

### **TypeScript Configuration**
- Extends expo/tsconfig.base
- Path alias: @/* maps to root
- Includes all .ts and .tsx files

---

## Dependencies Summary

### **Production Dependencies** (24 total)
- @expo/vector-icons: 15.0.3
- @shopify/flash-list: 2.0.2
- babel-preset-expo: 54.0.0
- date-fns: 4.1.0
- expo: 54.0.27
- expo-blur: 15.0.8
- expo-haptics: 15.0.8
- expo-image-picker: 17.0.9
- expo-linear-gradient: 15.0.8
- expo-linking: 8.0.10
- expo-router: 6.0.17
- expo-status-bar: 3.0.9
- react: 19.1.0
- react-native: 0.81.5
- react-native-reanimated: 4.1.1
- react-native-safe-area-context: 5.6.0
- react-native-screens: 4.16.0
- zustand: 5.0.9

### **Dev Dependencies** (6 total)
- @types/react: 19.2.0
- babel-plugin-module-resolver: 5.0.2
- typescript: 5.9.2
- react-refresh: 0.18.0
- react-native-worklets: 0.5.1

---

## Features in Detail

### **Real-time Messaging** (Chat Tab)
- Conversation list with active users
- Search functionality for messages
- Message history with sender avatars
- Unread message indicators
- Quick access to active conversations

### **Group Collaboration** (Groups Tab)
- Pinned groups section
- All groups directory
- Member count and activity indicators
- Group management features

### **Note Taking** (Notes Tab)
- Quick note creation
- Grid-based note display
- Search and organization
- Note metadata preservation

### **Network Discovery** (Requests Tab)
- Connection request management
- People suggestions with details
- Mutual connections display
- Online status indicators
- QR code connection option

### **Profile Management** (Profile Tab)
- User profile editing
- Avatar upload with image picker
- Theme preference management
- Privacy controls
- Account settings

---

## Future Enhancement Opportunities

1. **Backend Integration**
   - Replace mock data with API endpoints
   - Real-time Firebase/WebSocket sync
   - User authentication system

2. **Advanced Messaging**
   - Message encryption
   - Voice/video calling
   - Video message support
   - Message reactions and replies

3. **Rich Media**
   - Image gallery in messages
   - Document sharing
   - Video streaming
   - File management

4. **Social Features**
   - User discovery algorithm
   - Recommendation engine
   - Trending topics
   - Social graph visualization

5. **Performance**
   - Offline message queue
   - Message synchronization
   - Cache optimization
   - Bundle size reduction

6. **Analytics**
   - User engagement tracking
   - Feature usage analytics
   - Performance monitoring
   - Crash reporting

7. **Accessibility**
   - Screen reader support
   - High contrast mode
   - Text size adjustment
   - Voice control integration

---

## Summary

ConnectArc is a well-structured, professionally designed mobile application that demonstrates:
- Modern React Native patterns and best practices
- Effective state management with Zustand
- Beautiful UI design with glassmorphism
- Comprehensive type safety with TypeScript
- File-based routing with Expo Router
- Performance-optimized list rendering
- Cross-platform compatibility (iOS/Android)
- Mock data for development and demonstration

The codebase is modular, maintainable, and ready for backend integration and feature expansion.
