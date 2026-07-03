import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
                            tailwindcss(),
                            VitePWA({
                              registerType: 'autoUpdate',
                              includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
                              manifest: {
                                name: 'Terminator Matrix Application',
                                short_name: 'Terminator',
                                description: 'Matrix style terminal application',
                                theme_color: '#000000',
                                background_color: '#000000',
                                display: 'standalone',
                                icons: [
                                  {
                                    src: './icon-192.png',
                                    sizes: '192x192',
                                    type: 'image/png'
                                  },
                                  {
                                    src: './icon-512.png',
                                    sizes: '512x512',
                                    type: 'image/png',
                                    purpose: 'any maskable'
                                  }
                                ]
                              },
                              workbox: {
                                cleanupOutdatedCaches: true,
                                skipWaiting: true,
                                clientsClaim: true,
                              }
                            })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      sourcemap: true,
      outDir: 'dist',
    }
  };
});
