import './helpers/ipcMain'
import { app, BrowserWindow, Tray, Menu, nativeImage } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import path from 'path'
import { createWindow, showMainWindow } from './windows/main'
import { createMiniWindow, showMiniWindow } from './windows/mini'

// Check if app was started at login (auto-launch)
const loginItemSettings = app.getLoginItemSettings()
const isAutoStarted = loginItemSettings.openAtLogin && loginItemSettings.wasOpenedAtLogin

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.WeQuota')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  await createMiniWindow()
  if (!isAutoStarted) await createWindow({})
  // Create system tray
  const trayIcon = nativeImage.createFromPath(path.join(__dirname, '../../build/icon.ico'))
  const tray = new Tray(trayIcon.resize({ width: 16, height: 16 }))

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Main Window',
      click: () => {
        showMainWindow()
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit()
      }
    }
  ])

  tray.setToolTip('NetQuota - Monitor your data usage')
  tray.setContextMenu(contextMenu)

  // Double-click to toggle mini window
  tray.on('double-click', async () => {
    showMiniWindow()
  })
  // IPC test

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow({})
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
