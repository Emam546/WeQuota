import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { useCredentials } from '@renderer/utils/useCredentials'

export default function App() {
  const { getQuery, handleLogin, handleLogout, isLoadingCredentials } = useCredentials()
  if (getQuery.isLoading || isLoadingCredentials) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-12 h-12 mb-4 bg-purple-200 rounded-full"></div>
          <div className="w-24 h-4 bg-purple-100 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen bg-[#F1F5F9] relative overflow-hidden font-sans tracking-tight flex flex-col">
      {/* Background decoration to match the new blue theme */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-slate-200 rounded-full blur-[100px] opacity-20"></div>
      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
        {getQuery.isSuccess && getQuery.data ? (
          <Dashboard
            onLogout={handleLogout}
            refresh={getQuery.refetch}
            isRefreshing={getQuery.isRefetching}
            demoData={getQuery.data}
          />
        ) : (
          <Login
            error={getQuery.error}
            onLogin={async (data, password, save) => {
              await handleLogin(data, password, save)
            }}
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 py-2 text-center pointer-events-none shrink-0">
        <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-60">
          NetQuota Desktop v1.2.0
        </span>
      </div>
    </div>
  )
}

// function _LoginContainer({ onLogin }: { onLogin: (u: string) => void }) {
//   return
// }
