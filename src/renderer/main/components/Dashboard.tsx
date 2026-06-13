import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { User, HardDrive, LogOut, RefreshCw, X } from 'lucide-react'
import UserInfo from './pages/UserInfo'
import UsageAndBalance from './pages/UsageAndBalance'
import { SecureStorage } from '../lib/storage'
import { DemoData } from '../types'

interface DashboardProps {
  onLogout: () => void
  demoData: DemoData
}

type Page = 'usage' | 'userInfo'

export default function Dashboard({ onLogout, demoData }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<Page>('usage')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleLogout = async () => {
    await SecureStorage.clearSession()
    onLogout()
  }

  const handlePageChange = (page: Page) => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4 lg:gap-6 ">
      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex flex-col gap-2 w-64 flex-shrink-0"
      >
        <div className="bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] border border-slate-200 p-4 flex flex-col gap-2">
          <button
            onClick={() => setCurrentPage('usage')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentPage === 'usage'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HardDrive size={18} />
            <span className="font-semibold text-sm">Usage & Balance</span>
          </button>

          <button
            onClick={() => setCurrentPage('userInfo')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentPage === 'userInfo'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User size={18} />
            <span className="font-semibold text-sm">User Info</span>
          </button>

          <div className="flex-1" />

          <button
            onClick={handleRefresh}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-all"
            disabled={isRefreshing}
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            <span className="font-semibold text-sm">Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Mobile/Tablet Top Navigation */}
      <div className="lg:hidden flex flex-col w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] border border-slate-200 p-2 mb-4 flex items-center justify-between flex-shrink-0"
        >
          <div className="flex gap-1">
            <button
              onClick={() => handlePageChange('usage')}
              className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-md transition-all ${
                currentPage === 'usage'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <HardDrive size={14} className="sm:size-16" />
              <span className="font-semibold text-xs hidden sm:inline">Usage</span>
            </button>

            <button
              onClick={() => handlePageChange('userInfo')}
              className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-md transition-all ${
                currentPage === 'userInfo'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <User size={14} className="sm:size-16" />
              <span className="font-semibold text-xs hidden sm:inline">User Info</span>
            </button>
          </div>

          <div className="flex gap-1">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 transition-all"
              disabled={isRefreshing}
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={14} />
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="bg-white w-64 h-full p-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-800">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handlePageChange('usage')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentPage === 'usage'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <HardDrive size={18} />
                    <span className="font-semibold text-sm">Usage & Balance</span>
                  </button>

                  <button
                    onClick={() => handlePageChange('userInfo')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentPage === 'userInfo'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <User size={18} />
                    <span className="font-semibold text-sm">User Info</span>
                  </button>

                  <div className="flex-1" />

                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-all"
                    disabled={isRefreshing}
                  >
                    <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                    <span className="font-semibold text-sm">Refresh</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={18} />
                    <span className="font-semibold text-sm">Logout</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-3">
        <AnimatePresence mode="wait">
          {currentPage === 'usage' && (
            <motion.div
              key="usage"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <UsageAndBalance
                usageData={demoData.usage}
                quotaData={demoData.quota}
                balanceData={demoData.balance}
              />
            </motion.div>
          )}

          {currentPage === 'userInfo' && (
            <motion.div
              key="userInfo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <UserInfo customerData={demoData.customer} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
