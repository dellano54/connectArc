import { registerRootComponent } from 'expo';

// Import the app entry from the `app` folder (lowercase) to avoid casing issues on TypeScript
import App from './app/index';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
