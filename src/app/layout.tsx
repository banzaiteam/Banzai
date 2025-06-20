'use client'

import '@shared/styles/global.css' // Подключение глобальных стилей
import '@radix-ui/themes/styles.css'
import { Scroll } from '@shared/ui'
import { AppProviders } from '@/app/providers'
import { Provider } from 'react-redux'
import { store } from './store'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <body>
        <Provider store={store}>
          <AppProviders>
            <Scroll>{children}</Scroll>
          </AppProviders>
        </Provider>
      </body>
    </html>
  )
}
