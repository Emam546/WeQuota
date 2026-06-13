/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { SecureStorage } from './lib/storage'
import { useQuery } from '@tanstack/react-query'
import { login, getData, LoginData } from './api'
import { BodyData as LoginBodyData } from '@main/windows/main/utils/login'
interface SavedData extends LoginData {
  userName: string
  password: string
}
interface Credentials extends SavedData {
  saved: boolean
}
export default function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(null)
  const getQuery = useQuery({
    queryKey: ['dashboard', credentials?.userName],
    queryFn: async () => {
      if (!credentials) throw new Error('undefined state should not be triggered')
      try {
        return await getData({ ...credentials! })
      } catch (error) {
        window.log(error)
        const data = await login({
          number: credentials.userName,
          password: credentials.password
        })
        return await getData(await handleLogin(data, credentials!.password, credentials.saved))
      }
    },
    retry: 0,
    enabled: credentials != null,
    retryOnMount: false,
    staleTime: 10 * 60 * 1000
  })
  useEffect(() => {
    SecureStorage.getSavedCredentials<SavedData>().then((saved) => {
      if (saved.success) if (saved.data) setCredentials({ ...saved.data, saved: true })
    })
  }, [])
  const handleLogin = async (data: LoginBodyData, password: string, save: boolean) => {
    const credentials: Credentials = {
      subscriberId: data.subscriber.subscriberId,
      utoken: data.uToken,
      acctId: data.subscriber.accountId,
      custId: data.subscriber.custId,
      password: password,
      token: data.token,
      userName: data.subscriber.servNumber.slice(3),
      saved: save
    }
    if (save) await SecureStorage.saveCredentials(data.subscriber.servNumber.slice(3), credentials)
    setCredentials(credentials)
    return credentials
  }

  const handleLogout = async () => {
    await SecureStorage.clearSession()
    setCredentials(null)
  }

  if (getQuery.isLoading) {
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
              setCredentials(await handleLogin(data, password, save))
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
