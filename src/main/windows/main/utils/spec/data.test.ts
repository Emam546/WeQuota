import fs from 'fs'
import { login } from './utils'
import { hasProperty } from '@utils/index'
import {
  getBalanceData,
  getBillingData,
  getInfoData,
  getQuotaData,
  getSubscriberData
} from '../data'
let loginInfo: {
  subscriberId: `${number}`
  acctId: `${number}`
  custId: `${number}`
  token: string
}
beforeAll(async () => {
  const res = await login({ password: process.env.password!, number: process.env.number! })
  console.log(res.header)
  expect(res.header.retCode).toEqual('0')
  expect(loginInfo).toHaveProperty('body')
  if (hasProperty(res, 'body'))
    loginInfo = {
      ...res.body.subscriber,
      acctId: res.body.subscriber.accountId,
      token: res.body.utoken
    }
})
describe('get Data system', () => {
  test('get billingInfo', async () => {
    const res = await getBalanceData(loginInfo, loginInfo.token)
    expect(res.header.retCode).toEqual('0')
    console.log(res)
  })
})
