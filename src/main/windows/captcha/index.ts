import './ipc'
import { BrowserWindowConstructorOptions, globalShortcut, shell } from 'electron'
import path from 'path'
import { isDev } from '@main/utils'
import { Context } from '@renderer/Captcha'
import { convertFunc } from '@main/utils/convert'
import { CaptchaWindow } from './window'
export async function createWindow(options: BrowserWindowConstructorOptions, preloadData: Context) {
  // Create the browser window.

  const win = new CaptchaWindow({
    ...options,
    resizable: false,
    maximizable: false,
    show: false,
    frame: false,
    width: 700,
    height: 500,
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

  if (isDev) {
    await win.loadURL(`${process.env['ELECTRON_RENDERER_URL'] as string}/captcha/index.html`)

    globalShortcut.register('Ctrl+Shift+I', () => {
      if (win.webContents.isDevToolsOpened()) {
        win.webContents.closeDevTools()
      } else {
        win.webContents.openDevTools()
      }
    })
  } else {
    await win.loadFile(path.join(__dirname, '../windows/Captcha/index.html'))
  }

  win.show()
  return win
}
