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
axios.defaults.headers.common = {}
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
    },
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.6',
        channelid: '702',
        'content-type': 'application/json',
        csrftoken: '1A53A74C26496BF1C4424AE4FA1E4EE09EECAC33BAF035F2',
        delegatorsubsid: '',
        deviceid: '2106173d825f920a2f2040f1234dfa2e24bb9a74c0e1bf9776829bab4143a65f',
        iscoporate: 'false',
        ismobile: 'false',
        isselfcare: 'true',
        languagecode: 'en-US',
        reqbodysign:
          '6a6d8ebf39942dcf7d898e068334f2fb99e036eac9363db02d3285648c8ef20c0f147eae487c6dc26ec1e5d3cad504e5adf09e68f42709801e4036251df47d3f',
        reqheadersign:
          '39f4a1d01a25bd3877176d62d3cbb2156914bc8f54a7fcb55448dd091b139a7ff5dcfced162bddba035bb115f0418337293d9c58eaba7bf56a23bc62e1e48075',
        'sec-ch-ua': '"Brave";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        systemtype: '',
        whitereqbodysign:
          '2f35f7bb4b07c0623690fd6a2d8c71991dc48878dbe8bb7de1d758aa858d8ed6e801754a747b5e01d9cc2c1665f2e4686d25f9cfcdd1256911c95306fef4eeab',
        whitereqheadersign:
          '40c223200a0193818f99b17c45d5b8c8dbaa9f22e2bc6cda4ee31a0f5ce0bdabf8b641c8ef164203f2fcd944c586871173444c83de914aa2b53de8e39865a3e0',
        'x-client-time': '1781282009527',
        'x-init-time': '1778730791216',
        Referer: 'https://my.te.eg/echannel/'
      }
    }
  )

  return { ...captchaData, data: data.data }
}
