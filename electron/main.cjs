const { app, BrowserWindow, session, ipcMain } = require('electron');
const path = require('path');

// Determine environment
const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Jigsi Karia Mega Matrix Gateway - Secure Terminal',
    backgroundColor: '#000000',
    show: false, // Don't show the window until it's ready to avoid flickering
    webPreferences: {
      // SECURITY HARDENING PREFERENCES:
      nodeIntegration: false,     // Disable Node.js APIs inside renderer processes (CRITICAL)
      contextIsolation: true,     // Isolate Electron APIs from website scripts (CRITICAL)
      sandbox: true,              // Run the renderer process inside a sandboxed chromium browser (CRITICAL)
      enableRemoteModule: false,  // Prevent remote modules from being executed (deprecated but safe to explicitly disable)
      webSecurity: true,          // Enforce Same-Origin policy and block mixed content (CRITICAL)
      allowRunningInsecureContent: false, // Inhibit HTTP requests on HTTPS/secure hosts (CRITICAL)
      preload: path.join(__dirname, 'preload.js'), // Use preload script for secure IPC bridging
    }
  });

  // Load target content
  if (isDev) {
    // In dev, connect to the local Vite dev server
    mainWindow.loadURL('http://localhost:3000');
    // Open devtools in development securely
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the static built index.html safely
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Optimize visual launch
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // --- SECURITY HARDENING HANDLERS ---

  // 1. Content Security Policy (CSP) Reinforcement
  // Securely injects a highly restrictive Content Security Policy headers on every request.
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; " +
          "script-src 'self' 'unsafe-inline'; " + // unsafe-inline allowed for Vite script triggers, keep secure in production build
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
          "font-src 'self' https://fonts.gstatic.com; " +
          "img-src 'self' data: https:; " +
          "connect-src 'self' ws://localhost:3000 http://localhost:3000 https://api.google.com; " + // Adjust for your APIs
          "frame-ancestors 'none';"
        ]
      }
    });
  });

  // 2. Navigation Restrictions (Block untrusted out-of-bounds navigation)
  // Ensures the webview does not load any arbitrary websites if clicked accidentally.
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    // Allow navigation only to localhost (dev) or secure files (prod)
    const isAllowedHost = isDev && parsedUrl.hostname === 'localhost';
    const isAllowedProtocol = parsedUrl.protocol === 'file:';

    if (!isAllowedHost && !isAllowedProtocol) {
      event.preventDefault();
      console.warn(`[Blocked Navigation]: Denied out-of-bounds navigation to: ${navigationUrl}`);
    }
  });

  // 3. Prevent Creation of New Windows (Bypasses Window Hijacking attempts)
  // Intercept window.open calls and open them in the default external system browser instead.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const { shell } = require('electron');
    // Open permitted links in native browser securely
    if (url.startsWith('https://') || url.startsWith('http://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' }; // Block opening new windows inside the app
  });
}

// 4. Secure Permissions Request Handler
// Reject any dangerous or unrequired background device permissions (Camera, Microphone, Geolocation, etc.)
app.on('ready', () => {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    // Restrict access to all background system permissions
    const allowedPermissions = []; // Add permissions if explicitly required (e.g. 'notifications')
    if (allowedPermissions.includes(permission)) {
      callback(true);
    } else {
      console.warn(`[Blocked Permission]: Auto-rejected request for permission: ${permission}`);
      callback(false);
    }
  });

  createMainWindow();
});

// App lifecycle
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// --- SECURE IPC LISTENER SCHEMAS ---
ipcMain.handle('get-app-version', async () => {
  return app.getVersion();
});

ipcMain.on('trigger-notification', (event, message) => {
  console.log(`[Notification Triggered]: ${message}`);
});

ipcMain.handle('query-system-status', async () => {
  return { status: 'ONLINE', integrity: 'HARDENED_CORE', secureMode: true };
});
