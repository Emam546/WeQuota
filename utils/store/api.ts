/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from '@main/windows/main/utils'
import { throwError } from '@utils/errors'
import { hasProperty, ObjectEntries } from '@utils/index'
import { DemoData } from '@src/types'
import { Api } from '@src/index'
import axios from 'axios'
const FunctionData: Api.HandleMethods = {
  login: async (...data) => {
    return (await axios.post('/api/login', { ...data })).data
  },
  getBalanceData: async (...data) => {
    return (await axios.post('/api/data/balance', { ...data })).data
  },
  getBillingData: async (...data) => {
    return (await axios.post('/api/data/billing-usage', { ...data })).data
  },
  getInfoData: async (...data) => {
    return (await axios.post('/api/data/info', { ...data })).data
  },
  getQuotaData: async (...data) => {
    return (await axios.post('/api/data/quota', { ...data })).data
  },
  getSubscriberData: async (...data) => {
    return (await axios.post('/api/data/subscriber', { ...data })).data
  },

  solveCaptcha: function (
    image: string,
    token: string,
    number: string
  ): Promise<{ token: string; imgCode: string } | null> {
    return new Promise((resolve) => {
      const event = new CustomEvent('show-captcha', {
        detail: { image, token, number, resolve }
      })
      window.dispatchEvent(event)
    })
  },
  enableAutoLaunch: function (): Promise<boolean> {
    throw new Error('Function not implemented.')
  },
  disableAutoLaunch: function (): Promise<boolean> {
    throw new Error('Function not implemented.')
  },
  isAutoLaunchEnabled: function (): Promise<boolean> {
    throw new Error('Function not implemented.')
  },
  isAutoStarted: function (): Promise<boolean> {
    throw new Error('Function not implemented.')
  }
}
export function getFunctionInvoke<K extends keyof Api.HandleMethods>(
  key: K,
  ...params: Api.HandleMethods[K] extends (...args: infer P) => any ? P : never
): ReturnType<Api.HandleMethods[K]> {
  if (window.Environment == 'desktop') return window.api.invoke(key, ...params) as any
  const fn = FunctionData[key] as (...args: unknown[]) => unknown
  return fn(...params) as any
}
export async function login(data: Parameters<ApiMain.HandleMethods['login']>[0]) {
  let infoToken: { imgCode: string; token: string } | null = null
  while (true) {
    const result = await getFunctionInvoke('login', { ...data, ...infoToken })
    if (result.status == 'Blocked') throw new Error('You have been blocked')

    if (result.requireInteraction) {
      const res = await getFunctionInvoke(
        'solveCaptcha',
        result.captcha,
        result.token,
        `0${data.number}`
      )
      if (!res) throw new Error('unsolved captcha')
      infoToken = res
      continue
    }
    if (result.data.header.retCode != '0')
      throw throwError(result.data.header.errorNo!, result.data.header.errorMsg)
    if (hasProperty(result.data, 'body')) return result.data.body
    throw new Error('no data in the response')
  }
}
export interface LoginData {
  utoken: string
  token: string
  acctId: `${number}`
  custId: `${number}`
  subscriberId: `${number}`
}
export async function getData({
  token,
  custId,
  subscriberId,
  acctId: acctId,
  utoken
}: LoginData): Promise<DemoData> {
  const funcs: Record<keyof DemoData, Promise<ApiResponse<unknown>>> = {
    usage: getFunctionInvoke('getBillingData', { subscriberId }, { token, utoken }),
    quota: getFunctionInvoke('getQuotaData', { subscriberId, mainOfferId: '' }, { token, utoken }),
    balance: getFunctionInvoke('getBalanceData', { acctId }, { token, utoken }),
    customer: getFunctionInvoke('getInfoData', { custId }, { token, utoken })
  }
  const objEntries = ObjectEntries(funcs)
  const acc = {}
  for (let i = 0; i < objEntries.length; i++) {
    const result = await objEntries[i][1]
    if (hasProperty(result, 'body')) acc[objEntries[i][0]] = result
    else throw throwError(result.header.errorNo, result.header.errorMsg)
  }
  return acc as DemoData
}
