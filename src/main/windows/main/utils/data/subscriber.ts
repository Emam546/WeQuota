import makePostRequest from './utils'
export interface BodyData {
  subscriberList: [
    {
      subscriberId: `${number}`
      custId: `${number}`
      accountId: `${number}`
      primaryOfferingId: '710007'
      primaryOfferingName: 'WE IOE ADSL Primary Prepaid'
      servNumber: `FBB${number}`
      mobileNumber: `${number}`
      numberServiceType: '3'
      paymentType: '0'
      statusDetail: '00000000'
      activeDate: number
      effDate: number
      expDate: number
      status: '2'
      networkType: '3'
      statusTime: number
      createTime: number
      writtenLang: '2063'
      subscriberLabels: []
      isDelegatorSubs: 'Y' | 'N'
      usingCustId: number
      fixedCustomerNo: '78469061'
    }
  ]
  totalRecord: 0
}

export interface Data {
  subscriberId: `${number}`
}
export default async function getSubscriberData(
  info: Data,
  tokens: { token: string; utoken: string }
) {
  const data = await makePostRequest<BodyData, Data>(
    'https://my.te.eg/echannel/service/besapp/base/rest/busiservice/cz/v1/customer/querySubscribers',
    {
      body: info,
      ...tokens
    }
  )

  return data
}
