import { hasProperty } from '@utils/index'
import axios from 'axios'
interface BodyData {
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

export type ApiResponse =
  | {
      header: { retCode: '0' }
      body: BodyData
    }
  | {
      header: {
        retCode: string
        description: string
        errorMsg: string
        errorNo: string
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
      data: ApiResponse
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

  const data = await axios.post<ApiResponse>(
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
        'accept-language': 'en-US,en;q=0.5',
        channelid: '702',
        'content-type': 'application/json',
        csrftoken: '',
        delegatorsubsid: '',
        deviceid: 'eaa7c75b54309f7abb94f5d90dac903fbf8c3e2ecdae1497102ba4c54ed8c4d3',
        iscoporate: 'false',
        ismobile: 'false',
        isselfcare: 'true',
        languagecode: 'en-US',
        'sec-ch-ua': '"Brave";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        systemtype: '',
        whitereqbodysign:
          'f23f0e8b17df31b36bf4aff9b15d0f630b1cf1bac723398e40f87c2320faa9958ddd0ea455ab3f3c9b6ba0622c522e96fd7499602337fb43a592037f4dada86f',
        whitereqheadersign:
          'f940ee23731bd27c7b34db7a5bebcb0b0403161096d9f7cf8a0e5492527600de554e53ff67818f31bb82c95d70a21b61e4c7aa7e06ca896db38c897922060e6a',
        'x-client-time': '1781255915698',
        'x-init-time': '1778730791216',
        cookie:
          'dtCookie=v_4_srv_51_sn_0375A8396A41707A006A4C46CF619C86_perc_100000_ol_0_mul_1_app-3A6032d7aeebe38554_1; TS016876e8=01eb1995cf947a6895e9faf306b50dbae2b111da7d472750d604306a79df009356527ec942079a2e6a701f6a1d517a0ddcf3f9738d; echannelweb_route=651adbbb787b70a4a1087eb7ee2e62a9; echannelapp_route=61a404981e0a5ad4737f923a760c39d7; TS01fa9144=010aa23b1dc6f92c23b870f44e566378a4e889d481ad236c401b8f542d28abccb50e695b95040c4339004d182528278b4de2f7fc77211f50f6196d37f40e45074d413e23848e47814afb5da47387d8b46eafc35240; TS01bba117=010aa23b1d084f0a1fbb50caa246efccdf649dff951beee353cbcde470602c9b2b8ef7300bdd149ab359ae0196e85aa2e7cce9c11631018a1086f24c02027c2cce4f59ee631af9893151deb6086ced75dec9b13a408a437f3b85d4c33ed546eeea6036bb49',
        Referer: 'https://my.te.eg/echannel/'
      }
    }
  )

  return { ...captchaData, data: data.data }
}
