import { getData, login, LoginData } from '@renderer/main/api'
import { SecureStorage } from '@renderer/main/lib/storage'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { BodyData as LoginBodyData } from '@main/windows/main/utils/login'
export interface SavedData extends LoginData {
  userName: string
  password: string
}
export interface Credentials extends SavedData {
  saved: boolean
}
// useInternetStatus.ts

export function useInternetStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}
export function useCredentials() {
  const [credentials, setCredentials] = useState<Credentials | null>(null)
  const isOnline = useInternetStatus()
  const [isLoadingCredentials, setLoadingCredentials] = useState(true)
  const getQuery = useQuery({
    queryKey: ['dashboard', credentials?.userName],
    queryFn: async () => {
      if (!credentials) throw new Error('undefined state should not be triggered')

      try {
        return await getData({ ...credentials! })
      } catch (error) {
        window.api.send('log', error)
        const data = await login({
          number: credentials.userName,
          password: credentials.password
        })
        return await getData(await handleLogin(data, credentials!.password, credentials.saved))
      }
    },
    retry: 0,
    enabled: credentials != null && isOnline,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000
  })
  useEffect(() => {
    SecureStorage.getSavedCredentials<SavedData>().then((saved) => {
      if (saved.success && saved.data) setCredentials({ ...saved.data, saved: true })
      setLoadingCredentials(false)
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
  return { isLoadingCredentials, credentials, getQuery, handleLogin, handleLogout, isOnline }
}
