'use client'

import '@shared/styles/global.css' // Подключение глобальных стилей
import '@radix-ui/themes/styles.css'
import { Scroll } from '@shared/ui'
import { Provider } from 'react-redux'
import { store } from './store'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { AlertError } from '@features/alertError/ui/AlertError'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <body>
        <Provider store={store}>
          <AlertError />
          <AuthProvider>
            <Scroll>{children}</Scroll>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}
