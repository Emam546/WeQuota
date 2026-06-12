import { exec } from 'child_process'
import path from 'path'
import { ApiResponse } from '..'
import fs from 'fs'
import readline from 'readline'
import { login as __login, BodyData, EnterData } from '../login'

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
export async function login(data: EnterData): Promise<ApiResponse<BodyData>> {
  let infoToken = {}
  while (true) {
    const data1 = await __login({ ...data, ...infoToken })
    if (data1.status == 'Blocked') throw new Error('you have been blocked')
    if (data1.requireInteraction) {
      const imgCode = await askCaptcha(data1.captcha)
      infoToken = {
        imgCode,
        token: data1.token
      }
    } else return data1.data
  }
}
