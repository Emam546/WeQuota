import makePostRequest from './utils'
export interface BodyData {
  lastCycle: {
    consumptionStartDate: '2026-05-24'
    consumptionEndDate: '2026-06-11'
    contentDownPercentage: number
    contentUpPercentage: number
    gamingPercentage: number
    othersPercentage: number
    socialPercentage: number
    streamingVideoPercentage: number
    webPercentage: number
    consumptionPercentage: 100
  }
  last7Days: {
    consumptionStartDate: '2026-06-05'
    consumptionEndDate: '2026-06-11'
    contentDownPercentage: number
    contentUpPercentage: number
    gamingPercentage: number
    othersPercentage: number
    socialPercentage: number
    streamingVideoPercentage: number
    webPercentage: number
    consumptionPercentage: 100
  }
}
// {
//     "header": {
//         "retCode": "0",
//         "validateResults": []
//     },
//     "body": {
//         "lastCycle": {
//             "consumptionStartDate": "2026-05-24",
//             "consumptionEndDate": "2026-06-11",
//             "contentDownPercentage": 4.64,
//             "contentUpPercentage": 0.18,
//             "gamingPercentage": 0.31,
//             "othersPercentage": 0.81,
//             "socialPercentage": 64.26,
//             "streamingVideoPercentage": 15.18,
//             "webPercentage": 14.63,
//             "consumptionPercentage": 100
//         },
//         "last7Days": {
//             "consumptionStartDate": "2026-06-05",
//             "consumptionEndDate": "2026-06-11",
//             "contentDownPercentage": 5.28,
//             "contentUpPercentage": 0.17,
//             "gamingPercentage": 0.24,
//             "othersPercentage": 0.74,
//             "socialPercentage": 68.76,
//             "streamingVideoPercentage": 9.32,
//             "webPercentage": 15.48,
//             "consumptionPercentage": 100
//         }
//     }
// }
export interface Data {
  subscriberId: `${number}`
}
export default async function getConsumptionDetails(
  info: Data,
  tokens: { token: string; utoken: string }
) {
  const data = await makePostRequest<BodyData, Data>(
    'https://my.te.eg/echannel/service/besapp/base/rest/busiservice/cz/v1/resource/getBillingUsage',
    {
      body: info,
      ...tokens
    }
  )

  return data
}
