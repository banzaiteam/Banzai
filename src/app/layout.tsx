import '@shared/styles/global.css' // Подключение глобальных стилей
import '@radix-ui/themes/styles.css'
import { StoreProvider } from '@/app/providers/StoreProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreProvider>{children}</StoreProvider>
    </>
  )
}
