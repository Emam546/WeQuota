import { ApiResponse } from '@main/windows/main/utils'
import { throwError } from '@renderer/utils/errors'
import { hasProperty, ObjectEntries } from '@utils/index'
import { DemoData } from '../types'

export async function login(data: Parameters<ApiMain.HandleMethods['login']>[0]) {
  let infoToken: { imgCode: string; token: string } | null = null
  while (true) {
    const result = await window.api.invoke('login', { ...data, ...infoToken })
    if (result.status == 'Blocked') throw new Error('You have been blocked')

    if (result.requireInteraction) {
      const res = await window.api.invoke(
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
  token: string
  acctId: `${number}`
  custId: `${number}`
  subscriberId: `${number}`
}
export async function getData({
  token,
  subscriberId,
  acctId: acctId
}: {
  token: string
  subscriberId: `${number}`
  acctId: `${number}`
  custId: `${number}`
}): Promise<DemoData> {
  const funcs: Record<keyof DemoData, Promise<ApiResponse<unknown>>> = {
    usage: window.api.invoke('getBillingData', { subscriberId }, token),
    quota: window.api.invoke('getQuotaData', { subscriberId, mainOfferId: '' }, token),
    balance: window.api.invoke('getBalanceData', { acctId }, token),
    customer: window.api.invoke('getInfoData', { custId: acctId }, token)
  }
  const d = ObjectEntries(funcs)
  const acc = {}
  for (let i = 0; i < d.length; i++) {
    while (true) {
      const result = await funcs[i][1]
      if (hasProperty(result, 'body')) acc[funcs[i][1]] = result
      else throw throwError(result.header.errorNo, result.header.errorMsg)
    }
  }
  return acc as DemoData
}
