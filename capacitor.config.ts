import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.puls8.app',
  appName: 'Puls8',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
