'use client'

import { store } from '@/app/store'
import { Provider } from 'react-redux'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
