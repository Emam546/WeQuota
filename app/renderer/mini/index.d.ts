export type Context = unknown
export namespace ApiRender {
  interface OnMethods {}
  interface OnceMethods {}
}
export namespace Api {
  interface OnMethods {}
  interface OnceMethods {}
  interface HandleMethods {
    showMiniWindow(data?: unknown): Promise<void>
    hideMiniWindow(): Promise<void>
    toggleMiniWindow(data?: unknown): Promise<void>
    closeMiniWindow(): Promise<void>
    showMainWindow(): void
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
