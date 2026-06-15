import { motion } from 'motion/react'
import { Lock, User, Wifi, Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { login } from '../../utils/store/api'
import { useEffect, useState } from 'react'
import CaptchaModal from '@src/components/CaptchaModal'
import axios from 'axios'
import TypeApplication from '@src/components/common/TypeApllication'
import { useCredentials } from '@utils/useCredentials'
import { useRouter } from 'next/router'

interface FieldValues {
  number: string
  password: string
  saveCredentials: boolean
  autoLunch: boolean
}
export default function Login() {
  const { getQuery, handleLogin } = useCredentials()
  const router = useRouter()
  const { register, handleSubmit, formState, setError } = useForm<FieldValues>()
  const isLoading = formState.isSubmitting
  const [showPassword, setShowPassword] = useState(false)
  const [captchaModal, setCaptchaModal] = useState<{
    isOpen: boolean
    captchaImage: string
    token: string
    number: string
    resolve: (result: { token: string; imgCode: string } | null) => void
  }>({
    isOpen: false,
    captchaImage: '',
    token: '',
    number: '',
    resolve: () => {}
  })
  useEffect(() => {
    if (getQuery.error) setError('root', { message: getQuery.error?.message })
  }, [getQuery.error])

  const handleAutoLaunchChange = async (enabled: boolean) => {
    if (window.Environment !== 'desktop') return

    try {
      if (enabled) {
        const result = await window.api.invoke('enableAutoLaunch')
      } else {
        const result = await window.api.invoke('disableAutoLaunch')
      }
    } catch (error) {
      console.error('Failed to toggle auto-launch:', error)
    }
  }

  useEffect(() => {
    const handleCaptcha = (event: CustomEvent) => {
      const { image, token, number, resolve } = event.detail
      setCaptchaModal({
        isOpen: true,
        captchaImage: image,
        token,
        number,
        resolve
      })
    }

    window.addEventListener('show-captcha', handleCaptcha as EventListener)
    return () => {
      window.removeEventListener('show-captcha', handleCaptcha as EventListener)
    }
  }, [])
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-6 sm:max-w-md lg:max-w-lg sm:space-y-8"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-blue-600 border border-blue-100 shadow-sm sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-blue-50 sm:mb-6">
            <Wifi size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-2xl text-slate-900">
            NetQuota Login
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Manage your connection and startup preferences.
          </p>
          {formState.errors.root && (
            <p className="text-xs text-center text-red-500 sm:text-sm">
              {formState.errors.root?.message}
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              const result = await login({
                number: data.number.slice(1),
                password: data.password
              })
              await handleLogin(result, data.password, data.saveCredentials)
              try {
                await handleAutoLaunchChange(data.autoLunch)
              } catch (error) {
                window.log(error)
              }
              await router.push('/')
            } catch (error) {
              if (error instanceof Error) setError('root', { message: error.message })
            }
          })}
          className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
        >
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] sm:text-[13px] font-bold text-slate-700 ml-1">
                Service Provider Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  {...register('number', { required: true })}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 text-xs sm:text-sm transition-all shadow-sm"
                  placeholder="0473862111"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] sm:text-[13px] font-bold text-slate-700 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  className="block w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 text-xs sm:text-sm transition-all shadow-sm"
                  placeholder="••••••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors text-slate-400 hover:text-slate-600"
                >
                  {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-2 sm:space-y-3">
            <TypeApplication defaultState={true} env={'desktop'}>
              <div className="flex items-center">
                <input
                  id="startup"
                  type="checkbox"
                  {...register('autoLunch')}
                  onChange={(e) => handleAutoLaunchChange(e.target.checked)}
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label
                  htmlFor="startup"
                  className="ml-2 sm:ml-3 block text-[11px] sm:text-[13px] text-slate-500 font-medium"
                >
                  Launch automatically with Windows
                </label>
              </div>
            </TypeApplication>
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                {...register('saveCredentials')}
                defaultChecked
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 sm:ml-3 block text-[11px] sm:text-[13px] text-slate-500 font-medium"
              >
                Save credentials and auto-login
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 sm:py-3.5 px-4 border border-transparent text-xs sm:text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md shadow-blue-200 transition-all disabled:opacity-50 mt-3 sm:mt-4"
          >
            {isLoading ? (
              <svg className="w-4 h-4 text-white animate-spin sm:h-5 sm:w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Save Configuration'
            )}
          </button>
        </form>
      </motion.div>

      <CaptchaModal
        isOpen={captchaModal.isOpen}
        captchaImage={captchaModal.captchaImage}
        token={captchaModal.token}
        refresh={async () => {
          const res = await axios.post('/api/login/captcha', { number: captchaModal.number })
          const data = res.data
          if (data.status == 'Success') {
            if (data.requireInteraction) return data
            else {
              captchaModal.resolve({ token: data.token, imgCode: '' })
              setCaptchaModal((prev) => ({ ...prev, isOpen: false }))
            }
          }
          return { captcha: '', token: '' }
        }}
        // number={captchaModal.number}
        onSubmit={(solution) => {
          captchaModal.resolve({ token: solution.token, imgCode: solution.code })
          setCaptchaModal((prev) => ({ ...prev, isOpen: false }))
        }}
        onClose={() => {
          setCaptchaModal((prev) => ({ ...prev, isOpen: false }))
          captchaModal.resolve(null)
        }}
      />
    </div>
  )
}
