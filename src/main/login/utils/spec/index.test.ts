import fs from 'fs'
import { login as __login, ApiResponse, EnterData } from '..'
import readline from 'readline'
import path from 'path'
import { exec } from 'child_process'
export async function askCaptcha(base64Image: string): Promise<string> {
  console.log('\nCaptcha:')

  const imageData = base64Image.replace(/^data:image\/\w+;base64,/, '')

  const imagePath = path.join(process.cwd(), 'captcha.png')

  fs.writeFileSync(imagePath, Buffer.from(imageData, 'base64'))

  exec(`start "" "${imagePath}"`)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question('Enter captcha: ', (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}
async function login(data: EnterData): Promise<ApiResponse> {
  let imgCode = ''
  while (true) {
    const data1 = await __login({ ...data, imgCode })
    if (data1.status == 'Blocked') throw new Error('you have been blocked')
    if (data1.requireInteraction) {
      imgCode = await askCaptcha(data1.captcha)
    } else return data1.data
  }
}
describe('login system', () => {
  test('test login function', async () => {
    const data = await login({
      password: process.env.password!,
      number: process.env.number!
    })
    fs.writeFileSync('result.json', JSON.stringify(data))
    expect(data.body).not.toBeUndefined()
  })
  test('test with invalid password', async () => {
    const data = await login({
      number: process.env.username!,
      password: 'invalid'
    })
    expect(data.header.errorNo).not.toBeUndefined()
  })
  test('test with invalid userName', async () => {
    const data = await login({
      number: 'invalid',
      password: 'invalid'
    })
    expect(data.header.errorNo).not.toBeUndefined()
  })
  test('test with empty data', async () => {
    const data = await login({
      number: '',
      password: ''
    })
    expect(data.header.errorNo).not.toBeUndefined()
  })
})
