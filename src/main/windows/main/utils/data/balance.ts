import makePostRequest from './utils'
export interface BodyData {
  acctId: `${number}`
  balanceInfo: [
    {
      balanceType: 'C_MAIN_ACCOUNT'
      balanceTypeName: 'PPS_MainAccount'
      totalAmount: `${number}`
      depositFlag: 'Y' | 'N'
      refundFlag: '0' | '1'
      currencyId: '1046'
      balanceDetail: [
        {
          balanceInstanceId: `${number}`
          amount: `${number}`
          initialAmount: `${number}`
          effectiveTime: number
          expireTime: number
        }
      ]
    }
  ]
  creditInfo: [
    {
      totalCreditAmount: `${number}`
      totalUsageAmount: `${number}`
      totalRemainAmount: `${number}`
      currencyId: `${number}`
    }
  ]
  outstandingInfo: []
}

export interface Data {
  acctId: `${number}`
}
export default async function getBalanceData(
  info: Data,
  tokens: { token: string; utoken: string }
) {
  const data = await makePostRequest<BodyData, Data>(
    'https://my.te.eg/echannel/service/besapp/base/rest/busiservice/cbs/ar/queryBalance',
    {
      body: info,
      ...tokens
    }
  )

  return data
}
