import { defineRouting } from 'next-intl/routing'

export type Locales = 'en' | 'ru'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ru'],

  // Used when no locale matches
  defaultLocale: 'ru',
})
