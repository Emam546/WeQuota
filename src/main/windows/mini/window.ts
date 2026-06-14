import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

export class MiniWindow extends BrowserWindow {
  static MainWindow: MiniWindow | null = null
  constructor(options: BrowserWindowConstructorOptions) {
    super(options)
    if (!MiniWindow.MainWindow) {
      MiniWindow.MainWindow = this
      this.on('close', () => {
        MiniWindow.MainWindow = null
      })
    }
  }
}
