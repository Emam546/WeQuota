import { motion } from 'motion/react'
import { HardDrive, Wallet, TrendingUp, Maximize2, X, Loader2, WifiOff } from 'lucide-react'
import { DemoData } from '../../../src/types'
import style from './style.module.scss'
import classNames from 'classnames'

interface MiniUsageProps {
  data: DemoData | null
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
  onOpenMain: () => void
  onClose: () => void
}

export default function MiniUsage({
  data,
  isLoading: isDataLoading = false,
  error,
  onRetry,
  onOpenMain,
  onClose
}: MiniUsageProps) {
  const isLoading = isDataLoading || !data
  const hasError = error || (!data && !isDataLoading)

  const { quota, balance } = data || { quota: { body: [] }, balance: { body: { balanceInfo: [] } } }

  const quotaData = quota.body[0] // Get first quota item
  const balanceInfo = balance.body.balanceInfo[0] // Get first balance info

  const usagePercent = quotaData ? ((quotaData.used / quotaData.total) * 100).toFixed(0) : '0'
  const balanceAmount = balanceInfo ? balanceInfo.totalAmount : '0'

  return (
    <div className="w-full h-full font-sans text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div
        className={classNames(
          style['frame-drag'],
          'flex items-center justify-between px-3 py-2 border-b bg-white/10 backdrop-blur-sm border-white/10'
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-lg">
            <HardDrive size={14} className="text-white" />
          </div>
          <span className="text-xs font-semibold">NetQuota</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenMain}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            title="Open Main Window"
          >
            <Maximize2 size={14} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {hasError ? (
          // Error State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 space-y-3"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20">
              <WifiOff size={24} className="text-red-400" />
            </div>
            <div className="text-sm text-center text-white/80">No connection</div>
            {error}
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 text-xs text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            )}
          </motion.div>
        ) : isLoading ? (
          // Loading State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 space-y-4"
          >
            <Loader2 size={48} className="text-blue-500 animate-spin" />
            <div className="text-sm text-white/60">Loading usage data...</div>
          </motion.div>
        ) : (
          <>
            {/* Usage Gauge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - parseFloat(usagePercent) / 100)}`}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold">{usagePercent}%</span>
                  <span className="text-[10px] text-white/60">Used</span>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Data Used */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-3 border rounded-lg bg-white/10 backdrop-blur-sm border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive size={12} className="text-blue-400" />
                  <span className="text-[10px] text-white/60">Data Used</span>
                </div>
                <div className="text-sm font-bold">{quotaData?.used.toFixed(2) || '0'} GB</div>
                <div className="text-[10px] text-white/40">of {quotaData?.total || 0} GB</div>
              </motion.div>

              {/* Balance */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-3 border rounded-lg bg-white/10 backdrop-blur-sm border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Wallet size={12} className="text-green-400" />
                  <span className="text-[10px] text-white/60">Balance</span>
                </div>
                <div className="text-sm font-bold">{parseFloat(balanceAmount) / 10000}</div>
                <div className="text-[10px] text-white/40">Available</div>
              </motion.div>
            </div>

            {/* Remaining Days */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-3 border rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={12} className="text-purple-400" />
                  <span className="text-[10px] text-white/60">Renewal in</span>
                </div>
                <span className="text-sm font-bold">
                  {quotaData?.freeUnitBeanDetailList[0]?.remainingDaysForRenewal || 0} days
                </span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
