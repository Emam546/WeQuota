import makePostRequest from './utils'
export interface BodyData {
  custId: string
  custCode: string
  custType: '1'
  custClass: '1'
  individualInfo: {
    firstName: string
    lastName: string
    gender: '1' | '2'
    birthday: number
  }
  certificationInfo: {
    certficateId: string
    certType: `1` | '2'
    certId: `${number}`
  }
  contactPersonList: [
    {
      contactPersonType: `${number}`
      officePhone: `${number}`
      priority: 0
    }
  ]
  addressInfoList: [
    {
      usageAddrId: `${number}`
      addrId: `${number}`
      addrClass: string
      addrType: `${number}`
      addr1: `${number}`
      addr3: `${number}`
      addr4: string
    }
  ]
  bankCards: []
}

export interface Data {
  custId: string
}
export default async function getUserInfoData(info: Data, token: string) {
  const data = await makePostRequest<BodyData>(
    'https://my.te.eg/echannel/service/besapp/base/rest/busiservice/v1/customer/getCustomerDetailInfo',
    {
      token,
      body: {
        custId: info.custId,
        includeAddrFlag: 'Y',
        includeContactPersonFlag: 'Y'
      }
    }
  )

  return data
}
