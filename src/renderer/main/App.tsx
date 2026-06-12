/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react'
import Login from './components/Login'
import Widget from './components/Widget'
import { SecureStorage } from './lib/storage'
import { useMutation } from '@tanstack/react-query'

export default function App() {
  const [session, setSession] = useState<{ isLoggedIn: boolean; username: string | null }>({
    isLoggedIn: false,
    username: null
  })
  const mutateSession = useMutation({
    mutationFn: async () => {
      const saved = await SecureStorage.getSavedCredentials()
      return saved
    }
  })
  useEffect(() => {
    // Check for saved session on mount
    const checkSession = async () => {
      const saved = await mutateSession.mutateAsync()
      if (saved.success) {
        setSession({
          isLoggedIn: true,
          username: saved.username!
        })
      }
    }

    checkSession()
  }, [])

  const handleLogin = (username: string) => {
    setSession({
      isLoggedIn: true,
      username: username
    })
  }

  const handleLogout = () => {
    setSession({
      isLoggedIn: false,
      username: null
    })
  }

  if (mutateSession.isPending) {
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
    <div className="min-h-screen bg-[#F1F5F9] relative overflow-hidden flex items-center justify-center font-sans tracking-tight">
      {/* Background decoration to match the new blue theme */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-slate-200 rounded-full blur-[100px] opacity-20"></div>

      <div className="relative z-10 transition-all duration-500 ease-in-out">
        {session.isLoggedIn ? (
          <div className="flex gap-10 items-start">
            <Widget onLogout={handleLogout} username={session.username || 'User'} />
          </div>
        ) : (
          <_LoginContainer onLogin={handleLogin} />
        )}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-60">
          NetQuota Desktop v1.2.0
        </span>
      </div>
    </div>
  )
}

function _LoginContainer({ onLogin }: { onLogin: (u: string) => void }) {
  return <Login onLogin={(data) => onLogin(data.body.customer.custName)} />
}
