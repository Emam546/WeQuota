import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { LogOut, RefreshCw, Settings, Info } from 'lucide-react'
import Gauge from './Gauge'
import { SecureStorage } from '../lib/storage'

interface WidgetProps {
  onLogout: () => void
  username: string
}

export default function Widget({ onLogout, username }: WidgetProps) {
  const [used, setUsed] = useState(25.9)
  const [total, setTotal] = useState(35.0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const remaining = Math.max(0, total - used)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate updating data
    setTimeout(() => {
      setUsed((prev) => Math.min(prev + Math.random() * 0.5, total))
      setIsRefreshing(false)
    }, 1000)
  }

  const handleLogout = async () => {
    await SecureStorage.clearSession()
    onLogout()
  }

  return (
    <div className="w-[300px] bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-200 font-sans">
      {/* Mini Title Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200">
        <span className="text-[12px] font-semibold text-slate-500">Quota Mini</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
        </div>
      </div>

      <div className="p-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Gauge value={used} total={total} size={200} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center mt-6">
            <span className="text-3xl font-bold text-blue-600 tracking-tighter">
              {((used / total) * 100).toFixed(0)}%
            </span>
          </div>
        </motion.div>

        <div className="mt-4 w-full text-center">
          <div className="usage-stats w-full">
            <div className="text-[11px] uppercase tracking-[0.05em] text-slate-500 font-bold mb-1">
              Current Usage
            </div>
            <div className="text-xl font-bold text-slate-800">{used.toFixed(1)} GB</div>

            <div className="h-1 bg-slate-100 rounded-full my-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(used / total) * 100}%` }}
                className="h-full bg-blue-600"
              />
            </div>

            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              {total.toFixed(1)} GB Monthly Limit
            </div>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          className="mt-6 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-md transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          disabled={isRefreshing}
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Account Info Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight truncate max-w-[120px]">
            {username}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-[10px] text-blue-600 font-bold uppercase hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
