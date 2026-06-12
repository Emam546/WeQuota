import { motion } from 'motion/react'
import { PieChart, Wallet, TrendingUp, Clock, HardDrive } from 'lucide-react'
import GaugeChart from '../Gauge'
import { UsageResponse, QuotaResponse, BalanceResponse } from '../../types'

interface UsageAndBalanceProps {
  usageData: UsageResponse
  quotaData: QuotaResponse
  balanceData: BalanceResponse
}

export default function UsageAndBalance({
  usageData,
  quotaData,
  balanceData
}: UsageAndBalanceProps) {
  const { lastCycle, last7Days } = usageData.body
  const quota = quotaData.body[0]
  const balance = balanceData.body.balanceInfo[0]
  const credit = balanceData.body.creditInfo[0]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: string) => {
    return (parseFloat(amount) / 100).toFixed(2)
  }

  const usageCategories = [
    { name: 'Social', value: last7Days.socialPercentage, color: 'bg-blue-500' },
    { name: 'Streaming', value: last7Days.streamingVideoPercentage, color: 'bg-purple-500' },
    { name: 'Web', value: last7Days.webPercentage, color: 'bg-green-500' },
    { name: 'Content Down', value: last7Days.contentDownPercentage, color: 'bg-orange-500' },
    { name: 'Gaming', value: last7Days.gamingPercentage, color: 'bg-red-500' },
    { name: 'Others', value: last7Days.othersPercentage, color: 'bg-gray-500' }
  ]

  const remainingDays = quota.freeUnitBeanDetailList[0]?.remainingDaysForRenewal || 0

  return (
    <div className="w-full space-y-4 sm:space-y-6 font-sans">
      {/* Desktop: Side-by-side layout for Quota and Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Quota Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <HardDrive size={16} className="sm:size-20 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-sm sm:text-lg">{quota.offerName}</h2>
                <p className="text-blue-100 text-[10px] sm:text-xs">{quota.tabName}</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="relative">
                <GaugeChart value={quota.used} total={quota.total} size={window.innerWidth < 640 ? 140 : 180} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center mt-3 sm:mt-4">
                  <span className="text-xl sm:text-2xl font-bold text-blue-600 tracking-tighter">
                    {((quota.used / quota.total) * 100).toFixed(0)}%
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Used</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="text-center">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Total
                </div>
                <div className="text-sm sm:text-lg font-bold text-slate-800">{quota.total} GB</div>
              </div>
              <div className="text-center">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Used
                </div>
                <div className="text-sm sm:text-lg font-bold text-blue-600">{quota.used.toFixed(2)} GB</div>
              </div>
              <div className="text-center">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Remaining
                </div>
                <div className="text-sm sm:text-lg font-bold text-green-600">{quota.remain.toFixed(2)} GB</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="sm:size-16 text-blue-600" />
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-600">Renewal in</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-blue-600">{remainingDays} days</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Wallet size={16} className="sm:size-20 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-sm sm:text-lg">Account Balance</h2>
                <p className="text-green-100 text-[10px] sm:text-xs">{balance.balanceTypeName}</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Total Balance
                </div>
                <div className="text-lg sm:text-xl font-bold text-green-600">
                  {formatCurrency(balance.totalAmount)}
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Account ID
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800">{balanceData.body.acctId}</div>
              </div>

              {credit.totalCreditAmount !== '0' && (
                <>
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                      Total Credit
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800">
                      {formatCurrency(credit.totalCreditAmount)}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                      Credit Used
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800">
                      {formatCurrency(credit.totalUsageAmount)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Usage Breakdown Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200"
      >
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <PieChart size={16} className="sm:size-20 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm sm:text-lg">Usage Breakdown</h2>
              <p className="text-purple-100 text-[10px] sm:text-xs">Last 7 Days</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-3 sm:mb-4">
            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
              Period
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800">
              {formatDate(last7Days.consumptionStartDate)} - {formatDate(last7Days.consumptionEndDate)}
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {usageCategories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-700">{category.name}</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-600">{category.value.toFixed(2)}%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`h-full ${category.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Last Cycle Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200"
      >
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <TrendingUp size={16} className="sm:size-20 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm sm:text-lg">Last Cycle</h2>
              <p className="text-orange-100 text-[10px] sm:text-xs">Previous billing period</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-3 sm:mb-4">
            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
              Period
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800">
              {formatDate(lastCycle.consumptionStartDate)} - {formatDate(lastCycle.consumptionEndDate)}
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {usageCategories.map((category) => {
              const lastCycleValue =
                category.name === 'Social'
                  ? lastCycle.socialPercentage
                  : category.name === 'Streaming'
                    ? lastCycle.streamingVideoPercentage
                    : category.name === 'Web'
                      ? lastCycle.webPercentage
                      : category.name === 'Content Down'
                        ? lastCycle.contentDownPercentage
                        : category.name === 'Gaming'
                          ? lastCycle.gamingPercentage
                          : lastCycle.othersPercentage

              const diff = category.value - lastCycleValue
              const isPositive = diff > 0

              return (
                <div key={category.name} className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-700">{category.name}</span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-600">{lastCycleValue.toFixed(2)}%</span>
                    {diff !== 0 && (
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold ${isPositive ? 'text-red-500' : 'text-green-500'}`}
                      >
                        {isPositive ? '+' : ''}
                        {diff.toFixed(2)}%
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
