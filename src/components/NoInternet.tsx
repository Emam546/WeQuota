import { motion } from 'motion/react'
import { WifiOff, RefreshCw } from 'lucide-react'

interface NoInternetProps {
  onRetry?: () => void
  isRetrying?: boolean
}

export default function NoInternet({ onRetry, isRetrying = false }: NoInternetProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full shadow-lg bg-gradient-to-br from-red-500 to-orange-500"
        >
          <WifiOff size={48} className="text-white" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-2xl font-bold text-slate-800"
        >
          No Internet Connection
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 text-slate-600"
        >
          Please check your internet connection and try again. We couldn&apos;t fetch your usage data.
        </motion.p>

        {/* Retry Button */}
        {onRetry && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw size={18} />
                Retry
              </>
            )}
          </motion.button>
        )}

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 mt-8 bg-white border rounded-lg shadow-sm border-slate-200"
        >
          <h3 className="mb-2 text-sm font-semibold text-slate-700">Troubleshooting Tips:</h3>
          <ul className="space-y-1 text-xs text-left text-slate-600">
            <li>• Check your network cables and modem</li>
            <li>• Restart your router or modem</li>
            <li>• Try connecting to a different network</li>
            <li>• Disable VPN if enabled</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}
