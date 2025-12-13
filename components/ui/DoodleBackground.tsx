import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '@/stores/appStore';
import { Colors } from '@/constants/Colors';

interface DoodleBackgroundProps {
  children?: React.ReactNode;
}

const ICON_NAMES = [
  'heart-outline',
  'star-outline',
  'leaf-outline',
  'flower-outline',
  'sparkles-outline',
  'happy-outline',
  'checkmark-circle-outline',
  'ellipse-outline',
  'moon-outline',
  'sunny-outline',
  'cloud-outline',
  'thunderstorm-outline',
  'rainy-outline',
  'snow-outline',
  'water-outline',
  'flame-outline',
  'bug-outline',
  'paw-outline',
  'shield-outline',
  'key-outline',
];

interface IconDoodle {
  id: string;
  icon: string;
  left: number;
  top: number;
  rotation: number;
  opacity: number;
}

// Generate doodles once at module load time - cached globally
let cachedDoodles: IconDoodle[] | null = null;

const generateDoodles = (): IconDoodle[] => {
  // Return cached doodles if already generated
  if (cachedDoodles) {
    return cachedDoodles;
  }

  const doodles: IconDoodle[] = [];
  const centerRadius = 25;
  const count = 120; // Increased from 60 for better packing
  const minDistance = 5; // Grid spacing

  // Simple grid-based placement with randomization (no collision detection)
  const gridSize = Math.ceil(Math.sqrt(count));
  let doodleIndex = 0;

  for (let row = 0; row < gridSize && doodleIndex < count; row++) {
    for (let col = 0; col < gridSize && doodleIndex < count; col++) {
      // Grid position with randomization
      const baseLeft = (col / gridSize) * 100;
      const baseTop = (row / gridSize) * 100;
      const left = baseLeft + (Math.random() - 0.5) * minDistance * 2;
      const top = baseTop + (Math.random() - 0.5) * minDistance * 2;

      // Skip center area (CA)
      const distanceFromCenter = Math.sqrt(
        Math.pow((left - 50) / 50, 2) + Math.pow((top - 50) / 50, 2)
      );

      if (distanceFromCenter > centerRadius / 100) {
        doodles.push({
          id: `doodle-${doodleIndex}`,
          icon: ICON_NAMES[Math.floor(Math.random() * ICON_NAMES.length)],
          left: Math.max(0, Math.min(100, left)),
          top: Math.max(0, Math.min(100, top)),
          rotation: Math.random() * 360,
          opacity: 0.08 + Math.random() * 0.1,
        });
        doodleIndex++;
      }
    }
  }

  // Cache the doodles for reuse
  cachedDoodles = doodles;
  return doodles;
};

export const DoodleBackground: React.FC<DoodleBackgroundProps> = ({ children }) => {
  const isDark = useAppStore((state) => state.isDark);
  const theme = isDark ? Colors.dark : Colors.light;
  // Get cached doodles - only generated once on app load
  const doodles = generateDoodles();

  return (
    <View style={styles.container}>
      <DoodleRenderer doodles={doodles} theme={theme} />
      {children}
    </View>
  );
};

// Separate memoized component that never re-renders
interface DoodleRendererProps {
  doodles: IconDoodle[];
  theme: any;
}

const DoodleRenderer = React.memo(({ doodles, theme }: DoodleRendererProps) => (
  <>
    {doodles.map((doodle) => (
      <View
        key={doodle.id}
        style={[
          styles.doodleIcon,
          {
            left: `${doodle.left}%`,
            top: `${doodle.top}%`,
            transform: [{ rotate: `${doodle.rotation}deg` }],
          },
        ]}
      >
        <Ionicons
          name={doodle.icon as any}
          size={24}
          color={theme.text}
          style={{ opacity: doodle.opacity }}
        />
      </View>
    ))}
  </>
));

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    pointerEvents: 'none',
  },
  doodleIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
