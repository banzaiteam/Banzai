import { cookies } from 'next/headers'
import { Sidebar } from '@widgets/sidebar/ui/Sidebar'
import { redirect } from 'next/navigation'

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  // const cookieStore = await cookies()
  // const cookieHeader = cookieStore.toString()
  //
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
  //   method: 'GET',
  //   headers: {
  //     Cookie: cookieHeader, // передаем cookie, включая httpOnly
  //   },
  //   cache: 'no-store', // всегда свежие данные
  // })
  // console.log('response!!!!!!!!!!!!!' + res.)
  // console.log(cookieStore, cookieHeader)
  // if (res.status === 401 || res.status === 403) {
  //   // редирект если не авторизован
  //   // redirect('/auth/signIn')
  // }

  return (
    <>
      <Sidebar />

      {children}
    </>
  )
}
