'use client'
import { Header } from '@shared/ui/header/Header'
import { Sidebar } from '@widgets/sidebar/ui/Sidebar'

export default function Page() {
  return (
    <div className={'wrapper'}>
      <Header />
      <Sidebar onClick={() => {}}></Sidebar>

      <main>Banzai</main>
    </div>
  )
}
