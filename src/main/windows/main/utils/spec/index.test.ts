import fs from 'fs'
import { login } from './utils'

describe('login system', () => {
  test('test login function', async () => {
    jest.setTimeout(50000)
    const data = await login({
      password: process.env.password!,
      number: process.env.number!
    })
    fs.writeFileSync('result.json', JSON.stringify(data))
    expect(data.header.retCode).toEqual('0')

    expect(data).toHaveProperty('body')
  })
  test('test with invalid password', async () => {
    const data = await login({
      number: process.env.username!,
      password: 'invalid'
    })
    expect(data.header.retCode).not.toEqual('0')
  })
  test('test with invalid userName', async () => {
    const data = await login({
      number: 'invalid',
      password: 'invalid'
    })
    expect(data.header.retCode).toEqual('0')
  })
  test('test with empty data', async () => {
    const data = await login({
      number: '',
      password: ''
    })
    expect(data.header.retCode).toEqual('0')
  })
})
