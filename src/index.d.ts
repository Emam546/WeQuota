import { login } from '@main/windows/main/utils/login'
import {
  getBalanceData,
  getBillingData,
  getInfoData,
  getQuotaData,
  getSubscriberData
} from '@main/windows/main/utils/data'

export type Context = unknown
export namespace ApiRender {
  interface OnMethods {}
  interface OnceMethods {}
}
export namespace Api {
  interface OnMethods {}
  interface OnceMethods {}
  interface HandleMethods {
    login: typeof login
    getBalanceData: typeof getBalanceData
    getBillingData: typeof getBillingData
    getInfoData: typeof getInfoData
    getQuotaData: typeof getQuotaData
    getSubscriberData: typeof getSubscriberData
    solveCaptcha(
      image: string,
      token: string,
      number: string
    ): Promise<{ token: string; imgCode: string } | null>
    enableAutoLaunch(): Promise<boolean>
    disableAutoLaunch(): Promise<boolean>
    isAutoLaunchEnabled(): Promise<boolean>
    isAutoStarted(): Promise<boolean>
  }
  interface HandleOnceMethods {}
}

declare global {
  namespace ApiMain {
    interface OnMethods extends Api.OnMethods {}
    interface OnceMethods extends Api.OnceMethods {}
    interface HandleMethods extends Api.HandleMethods {}
    interface HandleOnceMethods extends Api.HandleOnceMethods {}
    namespace Render {
      interface OnMethods extends ApiRender.OnMethods {}
      interface OnceMethods extends ApiRender.OnceMethods {}
    }
  }
  interface Window {
    context: Context
  }
}
