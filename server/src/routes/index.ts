import { Router } from 'express'
import { loginRouter } from './login'
import { dataRouter } from './data'

const router = Router()
router.use('/login', loginRouter)
router.use('/data', dataRouter)
export default router
