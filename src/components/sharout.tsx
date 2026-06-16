import { useInternetStatus } from '@utils/useCredentials'
import NoInternet from './NoInternet'
import TypeApplication from './common/TypeApllication'
import { useEffect, useState } from 'react'
import CaptchaModal from './CaptchaModal'
import axios from 'axios'

export default function ShareOut({ children }: { children: React.ReactNode }) {
  const isOnline = useInternetStatus()
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
  if (!isOnline) return <NoInternet />

  return (
    <div className="h-screen w-screen bg-[#F1F5F9] relative overflow-hidden font-sans tracking-tight flex flex-col">
      {/* Background decoration to match the new blue theme */}
      <TypeApplication defaultState={false} env="desktop">
        <div className="h-7"></div>
      </TypeApplication>
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-slate-200 rounded-full blur-[100px] opacity-20"></div>
      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">{children}</div>

      {/* Footer Info */}
      <div className="relative z-10 py-2 text-center pointer-events-none shrink-0">
        <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-60">
          NetQuota Desktop v1.2.0
        </span>
      </div>
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
