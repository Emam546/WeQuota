import '@src/setup'
import '../index.css'

import type { AppProps } from 'next/app'
import SharedLayout from '@src/components/sharout'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { NextPage } from 'next'
import { queryClient } from '@src/queryClient'
import { Provider } from 'react-redux'
import store from '@utils/store'

declare module 'next' {}
export type NextPageWithSpecialComponent<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: () => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithSpecialComponent
}
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SharedLayout>
          <Component {...pageProps} />
        </SharedLayout>
      </Provider>
    </QueryClientProvider>
  )
}
