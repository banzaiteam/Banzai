'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import { AuthProvider } from '@/app/providers/AuthProvider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  )
}
