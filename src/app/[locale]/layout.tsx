'use client'
import '@shared/styles/global.css' // Подключение глобальных стилей
import '@radix-ui/themes/styles.css'
import { AlertError } from '@widgets/alertError/ui/AlertError'
import { NextIntlClientProvider } from 'next-intl'
import { use } from 'react'
import enMessages from '@/messages/en.json'
import ruMessages from '@/messages/ru.json'
import { Header } from '@widgets/header/ui/Header'
import { useNavigationTracker } from '@shared/hooks/useNavigationTracker'

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
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  useNavigationTracker() // Активируем трекинг
  if (!isLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }
  return (
    <html lang={locale}>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          <AlertError />
          {modal}
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
