import { throwError } from '@renderer/utils/errors'

export async function login(data: Parameters<ApiMain.HandleMethods['login']>[0]) {
  let infoToken: { imgCode: string; token: string } | null = null
  while (true) {
    const result = await window.api.invoke('login', { ...data, ...infoToken })
    if (result.status == 'Blocked') throw new Error('You have been blocked')
    console.log(result)
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
      throw throwError(result.data.header.errorNo!, result.data.errorMsg)
    return result.data
  }
}
