'use client'
import { Sidebar } from '@features/sidebar/ui/Sidebar'
import Header from '@shared/ui/header/Header'

export default function Page() {
  return (
    <div className={'wrapper'}>
      <Header />
      <Sidebar onClick={() => {}}></Sidebar>

      <main>Banzai</main>
    </div>
  )
}
