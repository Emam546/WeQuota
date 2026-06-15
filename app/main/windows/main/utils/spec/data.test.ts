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
  expect(res.header.retCode).toEqual('0')
  expect(res).toHaveProperty('body')
  if (hasProperty(res, 'body'))
    loginInfo = {
      ...res.body.subscriber,
      acctId: res.body.subscriber.custId,
      token: res.body.utoken
    }
})
describe('get Data system', () => {
  test('get billingInfo', async () => {
    const res = await getBalanceData(loginInfo, loginInfo.token)
    console.log(res)
    expect(res.header.retCode).toEqual('0')
    console.log(res)
  })
})
