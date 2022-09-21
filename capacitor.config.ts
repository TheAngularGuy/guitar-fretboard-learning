import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mustaphaAOUAS.FretboardLearning',
  appName: 'Fretboard-learning',
  webDir: 'www',
  bundledWebRuntime: false,

  plugins: {
    SplashScreen: {
      launchShowDuration: 30000,
      launchAutoHide: false,
      useDialog: false,
      backgroundColor: '#40413e',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
    },
  },
};

export default config;
