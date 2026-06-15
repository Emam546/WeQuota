import { useEffect } from 'react'
import MiniUsage from './MiniUsage'
import { useCredentials } from '@utils/useCredentials'
import { useFitWindow } from '@utils/hooks'

export default function App() {
  const { getQuery, isLoadingCredentials } = useCredentials()
  const ref = useFitWindow<HTMLDivElement>([])
  useEffect(() => {
    if (!getQuery.isLoading && !isLoadingCredentials && !getQuery.data) {
      window.api.invoke('showMainWindow')
      window.api.send('closeWindow')
    }
  }, [getQuery.data, getQuery.isLoading, isLoadingCredentials])

  if (getQuery.isError) return <p>{getQuery.error.message}</p>
  return (
    <div className="bg-red-500" ref={ref}>
      <MiniUsage
        data={getQuery.data || null}
        isLoading={getQuery.isLoading || isLoadingCredentials}
        error={getQuery.isError ? 'Failed to load data' : null}
        onRetry={() => getQuery.refetch()}
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
