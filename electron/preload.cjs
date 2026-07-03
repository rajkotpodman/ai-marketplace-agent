const { contextBridge, ipcRenderer } = require('electron');

// Expose a highly restricted, secure bridge of APIs to the renderer process.
// Never expose whole modules like child_process, fs, or raw ipcRenderer.
contextBridge.exposeInMainWorld('electronAPI', {
  // Expose a method to query the app version securely
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),

  // Secure unidirectional IPC (Renderer -> Main)
  sendNotification: (message) => ipcRenderer.send('trigger-notification', message),

  // Secure bidirectional IPC (Renderer <-> Main) with safe channel allowlist
  querySystemStatus: () => ipcRenderer.invoke('query-system-status'),

  // Listen to secure main process events with callback validation
  onStatusUpdate: (callback) => {
    const subscription = (event, ...args) => callback(...args);
    ipcRenderer.on('status-update', subscription);
    return () => {
      ipcRenderer.removeListener('status-update', subscription);
    };
  }
});
