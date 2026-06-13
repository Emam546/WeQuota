import { ConvertToIpCHandleMainFunc, ConvertToIpCMainFunc } from '@shared/api'
import { Api as ApiMain } from '@renderer/main'
import { ObjectEntries } from '@utils/index'
import { BrowserWindow, ipcMain } from 'electron'
import { login } from './utils/login'
import { createWindow as createCaptchaWindow } from '../captcha'
import {
  getBalanceData,
  getBillingData,
  getInfoData,
  getQuotaData,
  getSubscriberData
} from './utils/data'

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
  login: async (_, data) => await login(data),
  solveCaptcha: async function (e, image: string, token, number: string) {
    const main = BrowserWindow.fromWebContents(e.sender)
    if (!main) throw new Error('undefined window')
    const win = await createCaptchaWindow({ parent: main }, { captcha: image, token, number })
    main.on('close', () => {
      if (!win.isDestroyed()) win.close()
    })
    return await new Promise((res) => {
      win.on('close', () => {
        res(null)
      })
      win.on('captcha', (code) => {
        res(code)
      })
    })
  },
  getBalanceData: function (_, ...args) {
    return getBalanceData(...args)
  },
  getBillingData: function (_, ...args) {
    return getBillingData(...args)
  },
  getInfoData: function (_, ...args) {
    return getInfoData(...args)
  },
  getQuotaData: function (_, ...args) {
    return getQuotaData(...args)
  },
  getSubscriberData: function (_, ...args) {
    return getSubscriberData(...args)
  }
}
export const HandleOnceMethods: HandelOnceMethodsType = {}
// ObjectEntries(OnMethods).forEach(([key, val]) => {
//   ipcMain.on(key, val)
// })
ObjectEntries(HandleMethods).forEach(([key, val]) => {
  ipcMain.handle(key, val)
})
