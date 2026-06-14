import './setup'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/main.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Get demo data from preload or use mock data
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
