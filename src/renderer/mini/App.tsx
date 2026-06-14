import { useEffect } from 'react'
import MiniUsage from './MiniUsage'
import { useCredentials } from '@renderer/utils/useCredentials'
import { useFitWindow } from '@renderer/utils/hooks'

export default function App() {
  const { getQuery, isLoadingCredentials } = useCredentials()
  const ref = useFitWindow<HTMLDivElement>([])
  useEffect(() => {
    if (!getQuery.isLoading && !isLoadingCredentials && !getQuery.data) {
      window.api.invoke('showMainWindow')
      window.api.send('closeWindow')
    }
  }, [getQuery.data, getQuery.isLoading, isLoadingCredentials])
  if (getQuery.isLoading || isLoadingCredentials) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-12 h-12 mb-4 bg-purple-200 rounded-full"></div>
          <div className="w-24 h-4 bg-purple-100 rounded"></div>
        </div>
      </div>
    )
  }
  if (getQuery.isError) return <p>{getQuery.error.message}</p>
  if (!getQuery.isSuccess) return null
  return (
    <div className="bg-red-500" ref={ref}>
      <MiniUsage
        data={getQuery.data}
        onOpenMain={() => {
          window.api.invoke('showMainWindow')
        }}
        onClose={() => {
          window.api.send('hideWindow')
        }}
      />
    </div>
  )
}
