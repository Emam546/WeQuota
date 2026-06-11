import axios from 'axios'
export type ApiResponse = {
  header: { retCode: string; errorNo?: string }
  body: {
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
      subscriberId: string
      custId: string
      accountId: string
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
}
type CaptchaData =
  | {
      captcha: string
      requireInteraction: true
      status: 'Success'
      token: string
    }
  | { captcha: null; requireInteraction: false; status: 'Success'; token: string }
  | { status: 'Blocked' }
export interface EnterData {
  number: string
  password: string
  imgCode?: string
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
      data: ApiResponse
    }
  | {
      status: 'Blocked'
    }
export async function login({ number, password, imgCode }: EnterData): Promise<Response> {
  const captcha = await axios.post<CaptchaData>(
    'https://captcha.te.eg/api/Captcha/GenerateCaptcha',
    {
      merchantName: 'E-Care',
      serviceName: 'Login',
      identifier: `0${number}`
    }
  )
  if (captcha.data.status == 'Blocked') return captcha.data
  if (!captcha.data.requireInteraction) {
    const data = await axios.post<ApiResponse>(
      'https://my.te.eg/echannel/service/besapp/base/rest/busiservice/v1/auth/userAuthenticate',
      {
        acctId: `FBB${number}`,
        password: password,
        appLocale: 'en-US',
        isSelfcare: 'Y',
        isMobile: 'N',
        imgCode: imgCode ?? '',
        imgCacheKey: captcha.data.token
      }
    )

    return { ...captcha.data, data: data.data }
  }
  return captcha.data
}
