import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jigsikaria.matrixgateway',
  appName: 'Jigsi Karia Mega Matrix Gateway',
  webDir: 'dist',
  server: {
    // SECURITY HARDENING CONFIGS:
    // Force HTTPS scheme to prevent Cleartext HTTP vulnerabilities on Android/iOS (CRITICAL)
    androidScheme: 'https',
    iosScheme: 'https',
    allowNavigation: [] // Strict allowlist of URLs the webview can navigate to. Leave empty to restrict to bundled local code.
  },
  android: {
    // Disable mixed HTTP/HTTPS content to prevent SSL downgrade attacks
    allowMixedContent: false,
    // Enable captured screenshots or screen sharing securely if required
    captureInput: true
  }
};

export default config;
