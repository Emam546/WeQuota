/**
 * PRODUCTION ELECTRON MAIN PROCESS
 * 
 * This file contains the logic for:
 * 1. System Tray integration
 * 2. Auto-start on Windows boot
 * 3. Window management
 */

import { app, BrowserWindow, Tray, Menu, nativeImage } from 'electron';
import path from 'path';
import AutoLaunch from 'electron-auto-launch';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

// Initialize Auto-Launch for Windows
const netQuotaAutoLauncher = new AutoLaunch({
  name: 'NetQuota',
  path: process.execPath,
});

function createTray() {
  // Use a professional icon for the tray
  const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/icon.png'));
  tray = new Tray(icon);
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show Widget', click: () => mainWindow?.show() },
    { label: 'Refresh Data', click: () => mainWindow?.webContents.send('refresh-data') },
    { type: 'separator' },
    { label: 'Settings', click: () => mainWindow?.show() },
    { label: 'Quit', click: () => {
        app.quit();
    }}
  ]);

  tray.setToolTip('NetQuota Internet Manager');
  tray.setContextMenu(contextMenu);

  // Toggle show/hide on click
  tray.on('click', () => {
    if (mainWindow?.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow?.show();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 500,
    frame: false, // Frameless for custom title bar
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true, // Run primarily in tray
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the Vite build (index.html)
  mainWindow.loadFile('dist/index.html');

  // Handle close to hide into tray instead of quitting
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow?.hide();
    }
    return false;
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();

  // Enable Auto-Launch on startup
  netQuotaAutoLauncher.enable();

  netQuotaAutoLauncher.isEnabled()
    .then((isEnabled: boolean) => {
      if (!isEnabled) netQuotaAutoLauncher.enable();
    })
    .catch((err: any) => {
      console.error('Failed to enable auto-launch:', err);
    });
});
