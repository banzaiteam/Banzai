import { Sidebar } from '@widgets/sidebar/ui/Sidebar'
import { useTranslations } from 'next-intl'

export const metadata = {
  title: 'P i k s t a',
  description: 'Piksta is a platform for discovering and supporting creators.',
  keywords: ['photo sharing app', 'photos', 'piksta'],
  authors: [{ name: 'Banzai Team', url: 'https://github.com/banzaiteam/Banzai' }],
  creator: 'Banzai Team',
}

export default function Page() {
  const t = useTranslations('IndexPage')
  return (
    <>
      <Sidebar></Sidebar>
      <main>{/* Banzai {t('title')} */}</main>
    </>
  )
}
