import { hasProperty } from '@utils/index'
import axios from 'axios'
import { ApiResponse } from '.'
export interface BodyData {
  utoken: string
  loginId: string
  loginType: '0'
  token: string
  uToken: string
  needChangePwd: 'Y' | 'N' // "N" | "Y" ممكن تضيقها لو حابب

  customer: {
    custId: string
    custName: string
    custGender: string
    custCode: string
    custType: string
    custClass: string

    individualInfo: {
      firstName: string
      lastName: string
      gender: string
      birthday: number // timestamp (ms)
    }

    contactPersonList: unknown[] // ممكن تخصصها لو عرفت الشكل
    addressInfoList: unknown[]
    bankCards: unknown[]
  }
  subscriber: {
    subscriberId: `${number}`
    custId: `${number}`
    accountId: `${number}`
    primaryOfferingId: string
    servNumber: string
    paymentType: string
    state: '2'
    statusDetail: string
    status: '2'
    networkType: '4'
    firstContactChannel: string
    firstContactNumber: string
    writtenLang: string
    voiceRoaming: '0'
    smsRoaming: '3'
    dataRoaming: '3'
    isDelegatorSubs: 'Y' | 'N'
  }
}

export type CaptchaData =
  | {
      captcha: string
      requireInteraction: true
      status: 'Success'
      token: string
    }
  | { captcha: null; requireInteraction: false; status: 'Success'; token: string }
  | { status: 'Blocked' }
export type EnterData =
  | {
      number: string
      password: string
      imgCode: string
      token: string
    }
  | {
      number: string
      password: string
    }
export type Response =
  | {
      captcha: string
      requireInteraction: true
      status: 'Success'
      token: string
    }
  | {
      captcha: null
      requireInteraction: false
      status: 'Success'
      token: string
      data: ApiResponse<BodyData>
    }
  | {
      status: 'Blocked'
    }
export async function getCaptcha(number: string) {
  const captcha = await axios.post<CaptchaData>(
    'https://captcha.te.eg/api/Captcha/GenerateCaptcha',
    {
      merchantName: 'E-Care',
      serviceName: 'Login',
      identifier: `${number}`
    }
  )
  return captcha.data
}
export async function login(info: EnterData): Promise<Response> {
  let captchaData: CaptchaData
  let imgCode = ''
  if (!hasProperty(info, 'token')) {
    const captcha = await getCaptcha(`0${info.number}`)
    if (captcha.status == 'Blocked') return captcha
    if (captcha.requireInteraction) return captcha
    captchaData = captcha
  } else {
    imgCode = info.imgCode
    captchaData = { captcha: null, status: 'Success', token: info.token, requireInteraction: false }
  }

  const data = await axios.post<ApiResponse<BodyData>>(
    'https://my.te.eg/echannel/service/besapp/base/rest/busiservice/v1/auth/userAuthenticate',
    {
      acctId: `FBB${info.number}`,
      password: info.password,
      appLocale: 'en-US',
      isSelfcare: 'Y',
      isMobile: 'N',
      imgCode: imgCode ?? '',
      imgCacheKey: captchaData.token
    }
  )

  return { ...captchaData, data: data.data }
}
