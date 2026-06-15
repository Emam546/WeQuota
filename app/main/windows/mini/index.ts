import './ipc'
import { BrowserWindowConstructorOptions, globalShortcut, screen } from 'electron'
import path from 'path'
import { isDev } from '@main/utils'
import { Context } from 'vm'
import { convertFunc } from '@main/utils/convert'
import { MiniWindow } from './window'
const MARGIN = 20
export async function createMiniWindow(
  options?: BrowserWindowConstructorOptions,
  preloadData?: Context
) {
  const win = new MiniWindow({
    width: 280,
    height: 380,
    resizable: false,
    maximizable: false,
    minimizable: true,
    frame: false,
    // transparent: true,
    skipTaskbar: true,
    show: false,

    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      additionalArguments: [
        convertFunc(encodeURIComponent(JSON.stringify(preloadData || null)), 'data')
      ]
    },
    ...options
  })

  if (isDev) {
    await win.webContents.loadURL(
      `${process.env['ELECTRON_RENDERER_URL'] as string}/mini/index.html`
    )
    globalShortcut.register('Ctrl+Shift+I', () => {
      if (win.webContents.isDevToolsOpened()) {
        win.webContents.closeDevTools()
      } else {
        win.webContents.openDevTools()
      }
    })
  } else {
    await win.webContents.loadFile(path.join(__dirname, '../windows/mini/index.html'))
  }

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width: screenWidth } = primaryDisplay.workAreaSize

  const [windowWidth, windowHeight] = win.getSize()

  win.setPosition(
    screenWidth - windowWidth - MARGIN, // right
    MARGIN // top
  )
  return win
}

export function closeMiniWindow() {
  const miniWindow = MiniWindow.MainWindow
  if (!MiniWindow.MainWindow) return
  if (miniWindow && !miniWindow.isDestroyed()) {
    miniWindow.close()
  }
}

export async function showMiniWindow() {
  const miniWindow = MiniWindow.MainWindow
  if (!MiniWindow.MainWindow) {
    await createMiniWindow()
    return showMiniWindow()
  }
  if (miniWindow && !miniWindow.isDestroyed()) {
    if (miniWindow.isMinimized()) {
      miniWindow.restore()
    }
    miniWindow.show()
    miniWindow.focus()
  }
}

export function hideMiniWindow() {
  const miniWindow = MiniWindow.MainWindow
  if (!MiniWindow.MainWindow) return
  if (miniWindow && !miniWindow.isDestroyed()) {
    miniWindow.hide()
  }
}

export function toggleMiniWindow() {
  const miniWindow = MiniWindow.MainWindow
  if (!MiniWindow.MainWindow) return
  if (miniWindow && !miniWindow.isDestroyed()) {
    if (miniWindow.isVisible()) {
      hideMiniWindow()
    } else {
      showMiniWindow()
    }
  }
}
