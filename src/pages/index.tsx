import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { User, HardDrive, LogOut, RefreshCw, X } from 'lucide-react'
import UserInfo from '../components/pages/UserInfo'
import UsageAndBalance from '../components/pages/UsageAndBalance'
import { useCredentials } from '@utils/useCredentials'
import { useRouter } from 'next/router'
type Page = 'usage' | 'userInfo'

export default function Dashboard() {
  const { getQuery, handleLogout, isLoadingCredentials, credentials } = useCredentials()
  const [currentPage, setCurrentPage] = useState<Page>('usage')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const router = useRouter()
  useEffect(() => {
    if (!isLoadingCredentials && !credentials) router.replace('/login')
  }, [isLoadingCredentials, credentials])
  useEffect(() => {
    if (getQuery.isFetching && !getQuery.isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRefreshing(true)
    } else if (isRefreshing) {
      const timeoutId = setTimeout(() => {
        setRefreshKey((prev) => prev + 1)
        setIsRefreshing(false)
      }, 1000)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [getQuery.isFetching])
  const demoData = getQuery.data
  // Show NoInternet if there's an error or no data
  useEffect(() => {
    if (getQuery.isError) router.replace('/login')
  }, [getQuery.isError])
  const handlePageChange = (page: Page) => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false)
  }
  const refresh = () => getQuery.refetch()
  return (
    <div className="flex flex-col w-full h-full gap-4 lg:flex-row lg:gap-6 ">
      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-col hidden w-64 gap-2 lg:flex shrink-0"
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
            <span className="text-sm font-semibold">Usage & Balance</span>
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
            <span className="text-sm font-semibold">User Info</span>
          </button>

          <div className="flex-1" />

          <button
            onClick={refresh}
            className="flex items-center gap-3 px-4 py-3 transition-all rounded-lg text-slate-600 hover:bg-slate-100"
            disabled={isRefreshing}
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
            <span className="text-sm font-semibold">Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 transition-all rounded-lg hover:bg-red-50"
          >
            <LogOut size={18} />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Mobile/Tablet Top Navigation */}
      <div className="flex flex-col w-full lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] border border-slate-200 p-2 mb-4 flex items-center justify-between shrink-0"
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
              <span className="hidden text-xs font-semibold sm:inline">Usage</span>
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
              <span className="hidden text-xs font-semibold sm:inline">User Info</span>
            </button>
          </div>

          <div className="flex gap-1">
            <button
              onClick={refresh}
              className="flex items-center gap-2 px-2 py-2 transition-all rounded-md sm:px-3 text-slate-600 hover:bg-slate-100"
              disabled={isRefreshing}
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 py-2 text-red-600 transition-all rounded-md sm:px-3 hover:bg-red-50"
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
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="w-64 h-full p-4 bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-800">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-100"
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
                    <span className="text-sm font-semibold">Usage & Balance</span>
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
                    <span className="text-sm font-semibold">User Info</span>
                  </button>

                  <div className="flex-1" />

                  <button
                    onClick={refresh}
                    className="flex items-center gap-3 px-4 py-3 transition-all rounded-lg text-slate-600 hover:bg-slate-100"
                    disabled={isRefreshing}
                  >
                    <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                    <span className="text-sm font-semibold">Refresh</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 transition-all rounded-lg hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-semibold">Logout</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 px-3 overflow-x-hidden overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentPage === 'usage' && demoData && (
            <motion.div
              key={`usage-${refreshKey}`}
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

          {currentPage === 'userInfo' && demoData && (
            <motion.div
              key={`userInfo-${refreshKey}`}
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
