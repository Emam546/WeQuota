/* eslint-disable no-console */
import { app } from 'electron'
import { jetLogger } from 'jet-logger'
import path from 'path'
import { isDev, isProd } from '../utils'
import fs from 'fs'
const logDir = app.getPath('userData')
const logPath = path.join(logDir, 'app.log')
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}
console.log(logPath)
//delete the content before the start
fs.writeFileSync(logPath, '')
export const logger = jetLogger({
  filepath: logPath,
  filepathDatetimeParam: false,
  timestamp: false,
  mode: app.isPackaged ? 'file' : 'console'
})
logger.info(process.env.NODE_ENV)
logger.info(`production ${isProd}`)
logger.info(`development ${isDev}`)
