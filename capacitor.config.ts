import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'BSAwan',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '792844258848-87m9r8009lump5mbjf62m5m5r17khvhm.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
