/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserWindow } from 'electron'

export class CaptchaWindow extends BrowserWindow {
  on(event: 'captcha', listener: (data: { imgCode: string; token: string }) => void): this
  on(event: string | symbol, listener: (...args: any[]) => void): this
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    return super.on(event as any, listener as any)
  }
}
