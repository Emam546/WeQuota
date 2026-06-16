/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IpcMainEvent, IpcMainInvokeEvent } from 'electron'
type ConvertToIpCMainFunc<T extends (...args: any) => any> = (
  event: IpcMainEvent,
  ...args: Parameters<T>
) => void
type ExcludeFirst<T extends any[]> = T extends [unknown, ...infer Rest] ? Rest : never
type ConvertFromIpCMainFunc<T extends (event: IpcMainEvent, ...args: any) => any> = (
  ...args: ExcludeFirst<Parameters<T>>
) => ReturnType<T>
type ConvertToIpCHandleMainFunc<T extends (...args: any[]) => any> = (
  event: IpcMainInvokeEvent,
  ...args: Parameters<T>
) => ReturnType<T>
export namespace ApiMain {
  interface OnMethods {
    log(...args: any[]): void
    error(error: unknown): void
    setTitle(name: string): void
    closeWindow(): void

    setContentHeight(height: number): void
    setContentWidth(width: number): void
    center(): void
    alert(message: string, title: string): void
    confirm(message: string, title: string): void
    minimizeWindow(): void
    hideWindow(): void
    ToggleWindowMaximizeState(): void
    quitApp(): void
  }
  interface OnceMethods {}
  interface HandleMethods {
    clearCredentials(): void
    saveCredentials(username: string, data: unknown): void
    getCredentials<T>(): unknown
    saveFile(data: Buffer, filename: string): Promise<boolean>
  }
  interface HandleOnceMethods {}
}
