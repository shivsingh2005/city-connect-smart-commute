import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.aa6446c34d814662b2729498be06304f',
  appName: 'city-connect-smart-commute',
  webDir: 'dist',
  server: {
    url: 'https://aa6446c3-4d81-4662-b272-9498be06304f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    }
  }
};

export default config;