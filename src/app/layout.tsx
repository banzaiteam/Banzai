import '@shared/styles/global.css' // Подключение глобальных стилей
import '@radix-ui/themes/styles.css'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { AlertError } from '@features/alertError/ui/AlertError'
import { HeaderItem } from '@shared/ui/headerItem/HeaderItem'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { Header } from '@widgets/header/ui/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreProvider>{children}</StoreProvider>
    </>
  )
}
