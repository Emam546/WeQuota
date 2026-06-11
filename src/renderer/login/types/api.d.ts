import { login } from '@main/login/utils'

export type Context = unknown
export namespace ApiRender {
  interface OnMethods {}
  interface OnceMethods {}
}
export namespace ApiMain {
  interface OnMethods {}
  interface OnceMethods {}
  interface HandleMethods {
    login: typeof login
  }
  interface HandleOnceMethods {}
}
