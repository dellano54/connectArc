import { Redirect } from 'expo-router';
import { useFonts } from 'expo-font';


export default function Index() {
  const [loaded] = useFonts({
    'BBH-Hegarty': require('@/assets/Montserrat-Black.ttf'),
  });

  if (!loaded) return null;
  return <Redirect href="/(tabs)/chat" />;
}