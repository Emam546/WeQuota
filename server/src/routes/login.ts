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
    const { number, password, imgCode, token } = req.body

    if (!number || !password) {
      return res.status(400).json({ error: 'Number and password are required' })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loginData: any = {
      number,
      password
    }

    if (imgCode && token) {
      loginData.imgCode = imgCode
      loginData.token = token
    }

    const result = await login(loginData)
    res.json(result)
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

export { router as loginRouter }
