import { motion } from 'motion/react'
import { RefreshCw, Shield } from 'lucide-react'
import { useState } from 'react'
import style from './style.module.scss'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
interface DataForm {
  code: string
  token: string
}
export default function App() {
  const { register, setValue, handleSubmit, formState, setError } = useForm<DataForm>({
    values: { code: '', token: window.context.token }
  })

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [captchaImage, setCaptchaImage] = useState(window.context.captcha)

  const handleRefresh = () => {
    setIsRefreshing(true)
    window.api
      .invoke('refreshCaptcha', window.context.number)
      .then((data) => {
        if (data.status == 'Success') {
          if (data.requireInteraction) {
            setValue('token', data.token)
            setValue('code', '')
            setCaptchaImage(data.captcha)
          } else window.api.invoke('code', '', data.token)
        }
      })
      .catch((err) => setError('root', err))
      .finally(() => setIsRefreshing(false))
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          await window.api.invoke('code', data.code.trim(), data.token)
        })}
        className={classNames('bg-white  shadow-2xl w-full overflow-hidden h-screen')}
      >
        {/* Header */}
        <div
          className={classNames(
            style['frame-drag'],
            'bg-linear-to-r from-blue-600 to-blue-700 px-6 py-5'
          )}
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 text-white">
              <Shield size={20} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Verification</h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          <p className="text-sm text-slate-600">
            Please enter the code below to verify you are human.
          </p>
          {formState.errors.root && <p className="text-red-500">{formState.errors.root.message}</p>}
          {formState.errors.form && <p className="text-red-500">{formState.errors.form.message}</p>}
          {/* Captcha Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-slate-700">Security Code</label>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-slate-50 border-2 border-slate-200 rounded-lg p-4 flex items-center justify-center min-h-20">
                <img src={captchaImage} alt="CAPTCHA" className="h-16 object-contain select-none" />
              </div>
            </div>
          </div>

          {/* Input Field */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 ml-1">
              Enter Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('code', { required: true })}
              placeholder="Enter the code shown above"
              className="block w-full px-4 py-3 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 sm:text-sm transition-all shadow-sm"
              maxLength={6}
            />
            {formState.errors.code && (
              <p className="text-red-500">{formState.errors.code.message}</p>
            )}

            <input type="hidden" {...register('token')} />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              window.api.invoke('cancel')
            }}
            className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            OK
          </button>
        </div>
      </form>
    </div>
  )
}
