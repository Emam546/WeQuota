import { useInternetStatus } from '@utils/useCredentials'
import NoInternet from './NoInternet'
import TypeApplication from './common/TypeApllication'

export default function ShareOut({ children }: { children: React.ReactNode }) {
  const isOnline = useInternetStatus()
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
    </div>
  )
}
