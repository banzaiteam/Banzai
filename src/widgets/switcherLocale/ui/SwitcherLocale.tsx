'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import Select from '@shared/ui/select/Select'
import { useEffect, useState } from 'react'
import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons/components'
import { useLocale } from 'next-intl'
import type { Locales } from '@/i18n/routing'

const languageOptions = [
  { label: 'Russian', value: 'ru', flag: <FlagRussia /> },
  { label: 'English', value: 'en', flag: <FlagUnitedKingdom /> },
]
const NEXT_LOCALE = 'NEXT_LOCALE'

const defaultLocaleValue = languageOptions[0].value as Locales

export function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locales | undefined | null
  const [value, setValue] = useState<Locales>(defaultLocaleValue)

  const setCurrentLocale = (currentValue: Locales | undefined | null) => {
    if (currentValue) {
      if (currentValue === 'ru' || currentLocale === 'en') {
        setValue(currentValue)
        localStorage.setItem(NEXT_LOCALE, currentValue)
      }
    }
  }

  useEffect(() => {
    setCurrentLocale(currentLocale)
  }, [])

  const onValueChangeHandler = (currentValue: string) => {
    setCurrentLocale(currentValue as Locales)
    router.replace(pathname, { locale: currentValue })
  }

  return <Select options={languageOptions} value={value} onValueChange={onValueChangeHandler} />
}
