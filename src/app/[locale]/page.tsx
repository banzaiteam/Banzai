import { Sidebar } from '@widgets/sidebar/ui/Sidebar'
import { useTranslations } from 'next-intl'
import { ProfilePage } from '../pages/profilePage/ProfilePage'

export default function Page() {
  const t = useTranslations('IndexPage')
  return (
    <>
      <Sidebar></Sidebar>
      <main>
        {/* Banzai {t('title')} */}
        <ProfilePage />
      </main>
    </>
  )
}
