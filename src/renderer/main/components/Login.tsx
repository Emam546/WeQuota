import { motion } from 'motion/react'
import { Lock, User, Wifi, Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { login } from '../api'
import { useEffect, useState } from 'react'
interface LoginProps {
  error?: Error | null
  onLogin: (data: Awaited<ReturnType<typeof login>>, password: string, saveData: boolean) => unknown
}

interface FieldValues {
  number: string
  password: string
  saveCredentials: boolean
}
export default function Login({ onLogin, error }: LoginProps) {
  const { register, handleSubmit, formState, setError } = useForm<FieldValues>()
  const isLoading = formState.isSubmitting
  const [showPassword, setShowPassword] = useState(false)
  useEffect(() => {
    if (error) setError('root', { message: error?.message })
  }, [error])
  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg space-y-6 sm:space-y-8"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 mb-4 sm:mb-6 shadow-sm border border-blue-100">
            <Wifi size={24} />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-slate-900 tracking-tight">
            NetQuota Login
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Manage your connection and startup preferences.
          </p>
          {formState.errors.root && (
            <p className="text-red-500 text-center text-xs sm:text-sm">
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
              await onLogin(result, data.password, data.saveCredentials)
            } catch (error) {
              if (error instanceof Error) setError('root', { message: error.message })
            }
          })}
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-5"
        >
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] sm:text-[13px] font-bold text-slate-700 ml-1">
                Service Provider Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
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
                Access Token / Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
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
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 pt-2">
            <div className="flex items-center">
              <input
                id="startup"
                name="startup"
                type="checkbox"
                defaultChecked
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <label
                htmlFor="startup"
                className="ml-2 sm:ml-3 block text-[11px] sm:text-[13px] text-slate-500 font-medium"
              >
                Launch automatically with Windows
              </label>
            </div>
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
              <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" viewBox="0 0 24 24">
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
    </div>
  )
}
