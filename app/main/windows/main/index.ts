import './ipc'
import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  globalShortcut,
  nativeImage,
  shell,
  WebContentsView
} from 'electron'
import path from 'path'
import { isDev } from '@main/utils'
import { convertFunc } from '@main/utils/convert'
import { Context } from '@src/index'
import { MainWindow } from './window'
import { isProd } from '../../utils'
import serve from 'electron-serve'

const appServe = serve({
  directory: path.join(__dirname, '../next')
})
export async function createWindow(
  options: BrowserWindowConstructorOptions,
  preloadData?: Context
) {
  // Create the browser window.

  const win = new MainWindow({
    ...options,
    resizable: true,
    maximizable: true,
    show: false,
    frame: false,
    width: 500,
    height: 700,
    icon: 'build/icon.ico',

    webPreferences: {
      ...options.webPreferences,
      sandbox: false,

      preload: path.join(__dirname, '../preload/index.js'),
      additionalArguments: [
        convertFunc(encodeURIComponent(JSON.stringify(preloadData || null)), 'data')
      ]
    }
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  const titleBarView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'), // optional
      sandbox: false,
      additionalArguments: [convertFunc(encodeURIComponent(JSON.stringify(null)), 'data')]
    }
  })
  win.contentView.addChildView(titleBarView)

  // webView.setAutoResize({ width: true, height: true })
  win.webContents.on('did-fail-load', async () => {
    if (isDev) {
      await win.webContents.loadURL(`${process.env['ELECTRON_RENDERER_URL'] as string}/404.html`)
    } else await win.webContents.loadFile(path.join(__dirname, '../windows/404.html'))
  })
  win.on('resize', () => {
    titleBarView.webContents.send('onToggleWindowState', win.isMaximized())
  })
  win.on('resize', () => {
    const bounds = win.getContentBounds()

    titleBarView.setBounds({
      x: 0,
      y: 0,
      width: bounds.width,
      height: titleBarView.getBounds().height
    })
  })
  if (isProd && appServe) {
    await appServe(win)
    win.webContents.on('devtools-opened', () => {
      win.webContents.closeDevTools()
    })
    await titleBarView.webContents.loadFile(path.join(__dirname, '../windows/frame/index.html'))
  } else if (isDev) {
    await win.loadURL(`http://localhost:3000`)
    await titleBarView.webContents.loadURL(
      `${process.env['ELECTRON_RENDERER_URL'] as string}/frame/index.html`
    )

    win.webContents.on('did-fail-load', () => {
      win.webContents.reloadIgnoringCache()
    })
    globalShortcut.register('Ctrl+Shift+I', () => {
      if (win.webContents.isDevToolsOpened()) {
        win.webContents.closeDevTools()
      } else {
        win.webContents.openDevTools()
      }
    })
  } else throw new Error('Unrecognized environment')
  titleBarView.setBounds({
    x: 0,
    y: 0,
    width: win.getBounds().width,
    height: 30
  })
  win.setBounds({
    x: 0,
    y: titleBarView.getBounds().height,
    width: win.getBounds().width,
    height: win.getBounds().height - titleBarView.getBounds().height
  })
  win.show()
  win.maximize()
  return win
}
export function showMainWindow() {
  if (MainWindow.MainWindow) {
    const mainWindow = MainWindow.MainWindow
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }
    mainWindow.show()
    mainWindow.focus()
    mainWindow.maximize()
  } else createWindow({})
}
