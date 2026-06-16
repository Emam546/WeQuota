import { getData, login } from '@utils/store/api'
import { SecureStorage } from '@utils/storage'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { BodyData as LoginBodyData } from '@main/windows/main/utils/login'
import { useAppSelector } from '@utils/store'
import { useDispatch } from 'react-redux'
import { CredentialActions, Credentials, SavedData } from './store/credentials'

// useInternetStatus.ts

export function useInternetStatus() {
  const [isOnline, setIsOnline] = useState(true)

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
  const credentials = useAppSelector((state) => state.credentials)
  const dispatch = useDispatch()
  const isOnline = useInternetStatus()
  const [isLoadingCredentials, setLoadingCredentials] = useState(true)
  const getQuery = useQuery({
    queryKey: ['dashboard', credentials?.userName],
    queryFn: async () => {
      if (!credentials) throw new Error('You have to login first')

      try {
        return await getData({ ...credentials })
      } catch (error) {
        window.api.send('error', error)
        const data = await login({
          number: credentials.userName,
          password: credentials.password
        })
        window.api.send('log', 'login')
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
      if (saved.success && saved.data)
        dispatch(CredentialActions.setData({ ...saved.data, saved: true }))

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
    dispatch(CredentialActions.setData(credentials))

    return credentials
  }
  const retry = async () => {
    setLoadingCredentials(true)
    const saved = await SecureStorage.getSavedCredentials<SavedData>()
    if (saved.success && saved.data) {
      dispatch(CredentialActions.setData({ ...saved.data, saved: true }))
    }
    return new Promise((res) => {
      setTimeout(async () => {
        setLoadingCredentials(false)
        res()
      }, 1000)
    })
  }
  const handleLogout = async () => {
    await SecureStorage.clearSession()
    dispatch(CredentialActions.setData(null))
  }
  return { isLoadingCredentials, credentials, retry, getQuery, handleLogin, handleLogout, isOnline }
}
