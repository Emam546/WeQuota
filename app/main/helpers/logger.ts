/* eslint-disable no-console */
import { app } from 'electron'
import { jetLogger } from 'jet-logger'
import path from 'path'
import { isDev, isProd } from '../utils'
import fs from 'fs'
const logPath = path.join(app.getPath('userData'), './app.log')
//delete the content before the start
fs.writeFileSync(logPath, '')
export const logger = jetLogger({ filepath: logPath, mode: app.isPackaged ? 'file' : 'console' })
logger.info(process.env.NODE_ENV)
logger.info(`production ${isProd}`)
logger.info(`development ${isDev}`)
