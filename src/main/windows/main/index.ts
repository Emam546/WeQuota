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
import { Context } from '@renderer/main'
export async function createWindow(
  options: BrowserWindowConstructorOptions,
  preloadData?: Context
) {
  // Create the browser window.

  const win = new BrowserWindow({
    ...options,
    resizable: false,
    maximizable: false,
    show: false,
    frame: false,
    width: 500,
    height: 700,
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

  // Create web content view for external site
  const webView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'), // optional
      sandbox: false,
      additionalArguments: [
        convertFunc(encodeURIComponent(JSON.stringify(preloadData || null)), 'data')
      ]
    }
  })
  win.contentView.addChildView(webView)

  // webView.setAutoResize({ width: true, height: true })
  webView.webContents.on('did-fail-load', async () => {
    if (isDev) {
      await webView.webContents.loadURL(
        `${process.env['ELECTRON_RENDERER_URL'] as string}/404.html`
      )
    } else await webView.webContents.loadFile(path.join(__dirname, '../windows/404.html'))
  })
  win.on('resize', () => {
    const bounds = win.getContentBounds()
    webView.setBounds({
      x: 0,
      y: titleBarView.getBounds().height,
      width: bounds.width,
      height: bounds.height - titleBarView.getBounds().height
    })
    titleBarView.setBounds({
      x: 0,
      y: 0,
      width: bounds.width,
      height: titleBarView.getBounds().height
    })
  })

  if (isDev) {
    await webView.webContents.loadURL(
      `${process.env['ELECTRON_RENDERER_URL'] as string}/main/index.html`
    )

    await titleBarView.webContents.loadURL(
      `${process.env['ELECTRON_RENDERER_URL'] as string}/frame/index.html`
    )
    globalShortcut.register('Ctrl+Shift+I', () => {
      if (webView.webContents.isDevToolsOpened()) {
        webView.webContents.closeDevTools()
      } else {
        webView.webContents.openDevTools()
      }
    })
  } else {
    await webView.webContents.loadFile(path.join(__dirname, '../windows/main/index.html'))
    await titleBarView.webContents.loadFile(path.join(__dirname, '../windows/frame/index.html'))
  }
  titleBarView.setBounds({
    x: 0,
    y: 0,
    width: win.getBounds().width,
    height: 30
  })
  webView.setBounds({
    x: 0,
    y: titleBarView.getBounds().height,
    width: win.getBounds().width,
    height: win.getBounds().height - titleBarView.getBounds().height
  })
  win.show()
  return win
}
