'use client'
import '@shared/styles/global.css' // Подключение глобальных стилей
import '@radix-ui/themes/styles.css'
import { Scroll } from '@shared/ui'
import { Provider } from 'react-redux'
import { store } from '../store'
import { AlertError } from '@features/alertError/ui/AlertError'
import { NextIntlClientProvider } from 'next-intl'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { use } from 'react'
import enMessages from '@/messages/en.json'
import ruMessages from '@/messages/ru.json'
import { Header } from '@widgets/header/ui/Header'

// 1. Define supported locales as a union type
export type Locale = 'en' | 'ru' // Add all supported locales

// 2. Create a type for your message structure
type MessageStructure = typeof enMessages

// 3. Create a strongly typed messages object
const messages: Record<Locale, MessageStructure> = {
  en: enMessages,
  ru: ruMessages,
}

// 4. Type guard to verify valid locales
function isLocale(value: string): value is Locale {
  return value in messages
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  return (
    <html lang={locale}>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          <AlertError />
          <div className={'wrapper'}>
            <Header />
            {/*<AuthProvider>*/}
            {children}
            {/*</AuthProvider>*/}
          </div>
          <AlertError />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
