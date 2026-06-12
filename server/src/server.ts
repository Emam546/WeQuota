import cookieParser from 'cookie-parser'
import 'express-async-errors'
import morgan from 'morgan'
import helmet from 'helmet'
import express, { NextFunction, Request, Response } from 'express'
import baseRoute from './routes'
import logger from 'jet-logger'
import EnvVars from '@serv/declarations/major/EnvVars'
import HttpStatusCodes from '@serv/declarations/major/HttpStatusCodes'
import { NodeEnvs } from '@serv/declarations/enums'
import { RouteError } from '@serv/declarations/classes'
import path from 'path'

// **** Init express **** //

const app = express()

// **** Set basic express settings **** //
//Cross origins

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(EnvVars.cookieProps.secret))

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'))
}
const reactBuildPath = path.join(__dirname, '../../out/windows')
app.use(express.static(reactBuildPath))
// Security
if (EnvVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet())
}

// **** Add API routes **** //

// Add APIs
app.use('/api', baseRoute)

// Setup error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  logger.err(err, true)
  let status = HttpStatusCodes.BAD_REQUEST
  if (err instanceof RouteError) status = err.status

  return res.status(status).json({ msg: 'error', status: false, error: err.message })
})
app.get('*', (req, res) => {
  res.sendFile(path.join(reactBuildPath, 'main/index.html'))
})
export default app
