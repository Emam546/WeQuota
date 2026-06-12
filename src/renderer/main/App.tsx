/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { SecureStorage } from './lib/storage'
import { useMutation } from '@tanstack/react-query'
import { login, getData, LoginData } from './api'
import { demoData } from './data/demoData'
import { BodyData as LoginBodyData } from '@main/windows/main/utils/login'
import { DemoData } from './types'
interface SavedData extends LoginData {
  password: string
}

type SessionType = { isLoggedIn: true; data: DemoData } | { isLoggedIn: false }
export default function App() {
  const [session, setSession] = useState<SessionType>({
    isLoggedIn: false
  })
  const getDashBoardData = useMutation({
    mutationFn: (data: LoginData) => {
      return getData(data)
    }
  })
  const currentLoading = useRef(false)
  const mutateLogin = useMutation({ mutationFn: login })
  const handleLogin = async (data: LoginBodyData, password: string, save: boolean) => {
    console.log('login success')
    if (save)
      SecureStorage.saveCredentials(data.subscriber.servNumber.slice(3), {
        subscriberId: data.subscriber.subscriberId,
        token: data.uToken,
        acctId: data.subscriber.accountId,
        custId: data.subscriber.custId,
        password: password
      } as SavedData)
    const savedData = await getDashBoardData.mutateAsync({
      subscriberId: data.subscriber.subscriberId,
      token: data.uToken,
      acctId: data.subscriber.accountId,
      custId: data.subscriber.custId
    })
    setSession({ data: savedData, isLoggedIn: true })
  }
  useEffect(() => {
    // Check for saved session on mount
    const checkSession = async () => {
      currentLoading.current = true
      const saved = await SecureStorage.getSavedCredentials<SavedData>()
      if (saved.success) {
        console.log('loaded', saved)
        getDashBoardData
          .mutateAsync({ ...saved.data! })
          .then((data) => {
            setSession({
              isLoggedIn: true,
              data
            })
          })
          .catch(async () => {
            console.log('login')
            const data = await mutateLogin.mutateAsync({
              number: saved.username!,
              password: saved.data!.password
            })
            handleLogin(data, saved.data!.password, true)
          })
          .finally(() => {
            currentLoading.current = false
          })
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect

    if (!currentLoading.current) checkSession()
  }, [])

  const handleLogout = async () => {
    await SecureStorage.clearSession()
    setSession({
      isLoggedIn: false
    })
  }

  if (getDashBoardData.isPending || mutateLogin.isPending) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-purple-200 rounded-full mb-4"></div>
          <div className="h-4 w-24 bg-purple-100 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen bg-[#F1F5F9] relative overflow-hidden font-sans tracking-tight flex flex-col">
      {/* Background decoration to match the new blue theme */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-slate-200 rounded-full blur-[100px] opacity-20"></div>
      <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
        {session.isLoggedIn ? (
          <Dashboard onLogout={handleLogout} demoData={demoData} />
        ) : (
          <Login
            error={mutateLogin.error || getDashBoardData.error}
            onLogin={(data, password, save) => {
              return handleLogin(data, password, save)
            }}
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 py-2 text-center pointer-events-none flex-shrink-0">
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
