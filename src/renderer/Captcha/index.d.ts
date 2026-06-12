import { CaptchaData } from '@main/windows/main/utils/login'

export interface Context {
  captcha: string
  token: string
  number: string
}
export namespace ApiRender {
  interface OnMethods {}
  interface OnceMethods {}
}
export namespace Api {
  interface OnMethods {}
  interface OnceMethods {}
  interface HandleMethods {
    code(code: string, token: string): void
    cancel(): void
    refreshCaptcha(number: string): Promise<CaptchaData>
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
