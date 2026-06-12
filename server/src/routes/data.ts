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
    const { mainOfferId, subscriberId, token } = req.body

    if (!mainOfferId || !subscriberId || !token) {
      return res.status(400).json({ error: 'mainOfferId, subscriberId, and token are required' })
    }

    const data = await getQuotaData({ mainOfferId, subscriberId }, token)
    res.json(data)
  } catch (error) {
    console.error('Quota data error:', error)
    res.status(500).json({ error: 'Failed to get quota data' })
  }
})

// Get balance data
router.post('/balance', async (req, res) => {
  try {
    const { acctId, token } = req.body

    if (!acctId || !token) {
      return res.status(400).json({ error: 'acctId and token are required' })
    }

    const data = await getBalanceData({ acctId }, token)
    res.json(data)
  } catch (error) {
    console.error('Balance data error:', error)
    res.status(500).json({ error: 'Failed to get balance data' })
  }
})

// Get billing usage data
router.post('/billing-usage', async (req, res) => {
  try {
    const { subscriberId, token } = req.body

    if (!subscriberId || !token) {
      return res.status(400).json({ error: 'subscriberId and token are required' })
    }

    const data = await getBillingData({ subscriberId }, token)
    res.json(data)
  } catch (error) {
    console.error('Billing usage error:', error)
    res.status(500).json({ error: 'Failed to get billing usage data' })
  }
})

// Get user info data
router.post('/info', async (req, res) => {
  try {
    const { custId, token } = req.body

    if (!custId || !token) {
      return res.status(400).json({ error: 'custId and token are required' })
    }

    const data = await getInfoData({ custId }, token)
    res.json(data)
  } catch (error) {
    console.error('User info error:', error)
    res.status(500).json({ error: 'Failed to get user info' })
  }
})

// Get subscriber data
router.post('/subscriber', async (req, res) => {
  try {
    const { subscriberId, token } = req.body

    if (!subscriberId || !token) {
      return res.status(400).json({ error: 'subscriberId and token are required' })
    }

    const data = await getSubscriberData({ subscriberId }, token)
    res.json(data)
  } catch (error) {
    console.error('Subscriber data error:', error)
    res.status(500).json({ error: 'Failed to get subscriber data' })
  }
})

export { router as dataRouter }
