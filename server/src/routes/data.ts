/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express'
import {
  getBalanceData,
  getBillingData,
  getInfoData,
  getQuotaData,
  getSubscriberData
} from '@main/windows/main/utils/data'

const router = Router()

// Get quota data
router.post('/quota', async (req, res) => {
  try {
    const args = Array.from(Object.values(req.body)) as any
    const data = await getQuotaData.apply(null, args)
    res.json(data)
  } catch (error) {
    console.error('Quota data error:', error)
    res.status(500).json({ error: 'Failed to get quota data' })
  }
})

// Get balance data
router.post('/balance', async (req, res) => {
  try {
    const args = Array.from(Object.values(req.body)) as any
    const data = await getBalanceData.apply(null, args)
    res.json(data)
  } catch (error) {
    console.error('Balance data error:', error)
    res.status(500).json({ error: 'Failed to get balance data' })
  }
})

// Get billing usage data
router.post('/billing-usage', async (req, res) => {
  try {
    const args = Array.from(Object.values(req.body)) as any
    const data = await getBillingData.apply(null, args)

    res.json(data)
  } catch (error) {
    console.error('Billing usage error:', error)
    res.status(500).json({ error: 'Failed to get billing usage data' })
  }
})

// Get user info data
router.post('/info', async (req, res) => {
  try {
    const args = Array.from(Object.values(req.body)) as any
    const data = await getInfoData.apply(null, args)

    res.json(data)
  } catch (error) {
    console.error('User info error:', error)
    res.status(500).json({ error: 'Failed to get user info' })
  }
})

// Get subscriber data
router.post('/subscriber', async (req, res) => {
  try {
    const args = Array.from(Object.values(req.body)) as any
    const data = await getSubscriberData.apply(null, args)

    res.json(data)
  } catch (error) {
    console.error('Subscriber data error:', error)
    res.status(500).json({ error: 'Failed to get subscriber data' })
  }
})

export { router as dataRouter }
