import { Sidebar } from '@widgets/sidebar/ui/Sidebar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Page() {
  return (
    <>
      <Sidebar></Sidebar>
      <main>Banzai</main>
    </>
  )
}
