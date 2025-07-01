'use client'
import { Header } from '@shared/ui/header/Header'
import { Sidebar } from '@widgets/sidebar/ui/Sidebar'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('IndexPage')
  return (
    <div className={'wrapper'}>
      <Header />
      <Sidebar onClick={() => {}}></Sidebar>

      <main>Banzai {t('title')} </main>
    </div>
  )
}
