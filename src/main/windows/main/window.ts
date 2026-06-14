import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

export class MainWindow extends BrowserWindow {
  static MainWindow: MainWindow | null = null
  constructor(options: BrowserWindowConstructorOptions) {
    super(options)
    if (!MainWindow.MainWindow) {
      MainWindow.MainWindow = this
      this.on('close', () => {
        MainWindow.MainWindow = null
      })
    }
  }
}
