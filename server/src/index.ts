import './pre-start' // Must be the first import
import logger from 'jet-logger'
import EnvVars from '@serv/declarations/major/EnvVars'
import server from './server'
import next from 'next'

// **** Start server **** //
const dev = EnvVars.nodeEnv == 'development'
const app = next({ dev, dir: './src' })
const handle = app.getRequestHandler()
app
  .prepare()
  .then(async () => {
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    const msg = 'Express server started on port: ' + EnvVars.port.toString()
    server.listen(EnvVars.port, () => logger.info(msg))
  })
  .catch((ex) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    logger.err(ex.stack)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })
