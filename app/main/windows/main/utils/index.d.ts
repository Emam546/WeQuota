export type ApiResponse<T> =
  | {
      header: { retCode: '0' }
      body: T
    }
  | {
      header: {
        retCode: string
        description: string
        errorMsg: string
        errorNo: string
      }
    }
