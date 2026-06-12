import { ConvertToIpCHandleMainFunc, ConvertToIpCMainFunc } from '@shared/api'
import { Api as ApiMain } from '@renderer/Captcha'
import { ObjectEntries } from '@utils/index'
import { BrowserWindow, ipcMain } from 'electron'
import { CaptchaData, getCaptcha } from '../main/utils/login'

type OnMethodsType = {
  [K in keyof ApiMain.OnMethods]: ConvertToIpCMainFunc<ApiMain.OnMethods[K]>
}
type OnceMethodsType = {
  [K in keyof ApiMain.OnceMethods]: ConvertToIpCMainFunc<ApiMain.OnceMethods[K]>
}
type HandelMethodsType = {
  [K in keyof ApiMain.HandleMethods]: ConvertToIpCHandleMainFunc<ApiMain.HandleMethods[K]>
}
type HandelOnceMethodsType = {
  [K in keyof ApiMain.HandleOnceMethods]: ConvertToIpCHandleMainFunc<ApiMain.HandleOnceMethods[K]>
}
export const OnMethods: OnMethodsType = {}
export const OnceMethods: OnceMethodsType = {}
export const HandleMethods: HandelMethodsType = {
  code: function (
    event: Electron.CrossProcessExports.IpcMainInvokeEvent,
    code: string,
    token
  ): void {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    win.emit('captcha', { imgCode: code, token })
    win.close()
  },
  cancel: function (event: Electron.CrossProcessExports.IpcMainInvokeEvent): void {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    win.emit('captcha', null)
    win.close()
  },
  refreshCaptcha: async function (_, number: string): Promise<CaptchaData> {
    return await getCaptcha(number)
  }
}
export const HandleOnceMethods: HandelOnceMethodsType = {}
// ObjectEntries(OnMethods).forEach(([key, val]) => {
//   ipcMain.on(key, val)
// })
ObjectEntries(HandleMethods).forEach(([key, val]) => {
  ipcMain.handle(key, val)
})
