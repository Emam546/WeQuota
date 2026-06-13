/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express'
import { getCaptcha, login } from '@main/windows/main/utils/login'

const router = Router()

// Get captcha
router.post('/captcha', async (req, res) => {
  try {
    const { number } = req.body
    if (!number) {
      return res.status(400).json({ error: 'Number is required' })
    }
    const captcha = await getCaptcha(number)
    res.json(captcha)
  } catch (error) {
    console.error('Captcha error:', error)
    res.status(500).json({ error: 'Failed to get captcha' })
  }
})

// Login
router.post('/', async (req, res) => {
  try {
    const args = Array.from(Object.values(req.body)) as any
    const result = await login.apply(null, args)
    res.json(result)
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

export { router as loginRouter }
