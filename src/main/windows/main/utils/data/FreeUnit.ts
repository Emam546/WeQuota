import makePostRequest from './utils'
export type BodyData = [
  {
    tabId: '7'
    freeUnitType: 'ADSL_USAGE_PREPAID'
    freeUnitTypeName: string
    tabName: string
    measureUnit: '1109'
    offerName: string
    total: number
    used: number
    remain: number
    actualRemain: number
    effectiveTime: number
    expireTime: number
    groupOrder: '6'
    iconImage: 'home'
    freeUnitTypeId: 'C_TED_Primary_Fixed_Data'
    originUnit: '1106'
    havePoint: false
    freeUnitBeanDetailList: [
      {
        initialAmount: number
        currentAmount: number
        measureUnit: '1109'
        effectiveTime: number
        expireTime: number
        expireTimeCz: number
        originType: string
        offeringName: string
        isGroup: false
        serviceNumber: `FBB${number}`
        itemCode: 'C_TED_Primary_Fixed_Data'
        remainingDaysForRenewal: number
      }
    ]
  }
]
// {
//     "header": {
//         "retCode": "0",
//         "validateResults": []
//     },
//     "body": [
//         {
//             "tabId": "7",
//             "freeUnitType": "ADSL_USAGE_PREPAID",
//             "freeUnitTypeName": "Home Internet",
//             "tabName": "Home Internet",
//             "measureUnit": "1109",
//             "offerName": "Super 1 speed (300 GB)",
//             "total": 300.00,
//             "used": 208.33,
//             "remain": 91.67,
//             "actualRemain": 91.67,
//             "effectiveTime": 1779634758000,
//             "expireTime": 1782162000000,
//             "groupOrder": "6",
//             "iconImage": "home",
//             "freeUnitTypeId": "C_TED_Primary_Fixed_Data",
//             "originUnit": "1106",
//             "havePoint": false,
//             "freeUnitBeanDetailList": [
//                 {
//                     "initialAmount": 300.00,
//                     "currentAmount": 91.67,
//                     "measureUnit": "1109",
//                     "effectiveTime": 1779634758000,
//                     "expireTime": 1782162000000,
//                     "expireTimeCz": 1782151200000,
//                     "originType": "Main Quota",
//                     "offeringName": "Super 1 speed (300 GB)",
//                     "isGroup": false,
//                     "serviceNumber": "FBB473862133",
//                     "itemCode": "C_TED_Primary_Fixed_Data",
//                     "remainingDaysForRenewal": 10
//                 }
//             ]
//         }
//     ]
// }
export interface Data {
  mainOfferId: string
  subscriberId: string
}
export default async function getQuotaData(info: Data, token: string) {
  const data = await makePostRequest<BodyData>(
    'https://my.te.eg/echannel/service/besapp/base/rest/busiservice/cz/cbs/bb/queryFreeUnit',
    {
      token: token,
      body: {
        ...info,
        groupId: '',
        needQueryPoint: true
      }
    }
  )

  return data
}
