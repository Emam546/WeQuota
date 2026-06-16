import { ConvertToIpCHandleMainFunc, ConvertToIpCMainFunc } from '@shared/api'
import { Api as ApiMain } from '@renderer/mini'
import { ipcMain } from 'electron'
import { ObjectEntries } from '@utils/index'
import { showMiniWindow, hideMiniWindow, toggleMiniWindow, closeMiniWindow } from '.'
import { showMainWindow } from '../main'

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
  async showMiniWindow() {
    showMiniWindow()
  },
  async hideMiniWindow() {
    hideMiniWindow()
  },
  async toggleMiniWindow() {
    toggleMiniWindow()
  },
  async closeMiniWindow() {
    closeMiniWindow()
  },
  showMainWindow: function (): void {
    showMainWindow()
  }
}
export const HandleOnceMethods: HandelOnceMethodsType = {}
// ObjectEntries(OnMethods).forEach(([key, val]) => {
//   ipcMain.on(key, val)
// })
ObjectEntries(HandleMethods).forEach(([key, val]) => {
  ipcMain.handle(key, val)
})
