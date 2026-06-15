import './pre-start' // Must be the first import
import logger from 'jet-logger'
import EnvVars from '@serv/declarations/major/EnvVars'
import server from './server'
import next from 'next'
import express from 'express'
import path from 'path'
// **** Start server **** /
const msg = 'Express server started on port: ' + EnvVars.port.toString()

if (EnvVars.nodeEnv == 'development') {
  const app = next({ dev: true, dir: './src' })
  const handle = app.getRequestHandler()
  app
    .prepare()
    .then(async () => {
      server.get('*', (req, res) => {
        return handle(req, res)
      })

      server.listen(EnvVars.port, () => logger.info(msg))
    })
    .catch((ex) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      logger.err(ex.stack)
      // eslint-disable-next-line no-process-exit
      process.exit(1)
    })
}
if (EnvVars.nodeEnv == 'production') {
  server.use(express.static(path.join(__dirname, '../../../out/next')))
  server.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../../../out/next/404.html'))
  })
  server.listen(EnvVars.port, () => logger.info(msg))
}
