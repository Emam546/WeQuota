export interface Context {
  title: string
  icon_link: string
}
export namespace ApiRender {
  interface OnMethods {}
  interface OnceMethods {}
}
export namespace Api {
  interface OnMethods {}
  interface OnceMethods {}
  interface HandleMethods {}
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
