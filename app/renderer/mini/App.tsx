import { useEffect } from 'react'
import MiniUsage from './MiniUsage'
import { useCredentials } from '@utils/useCredentials'
import { useFitWindow } from '@utils/hooks'

export default function App() {
  const { getQuery, isLoadingCredentials, credentials, retry } = useCredentials(false)
  const ref = useFitWindow<HTMLDivElement>([])
  useEffect(() => {
    if (!isLoadingCredentials && !credentials) {
      window.api.invoke('showMainWindow')
    }
  }, [credentials])
  useEffect(() => {
    if (getQuery.error) window.api.send('error', getQuery.error)
  }, [getQuery.error])
  return (
    <div className="bg-red-500" ref={ref}>
      <MiniUsage
        data={getQuery.data || null}
        isLoading={getQuery.isLoading || isLoadingCredentials}
        error={getQuery.isError ? getQuery.error.message : null}
        onRetry={async () => {
          await retry()
          await getQuery.refetch()
        }}
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
