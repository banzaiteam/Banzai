import { Scroll, Typography } from '@shared/ui'
import { cookies } from 'next/headers'

type Props = {}
const Page = async ({}: Props) => {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader, // передаем cookie, включая httpOnly
    },
    cache: 'no-store', // всегда свежие данные
  })
  console.log('response!!!&&&&&&&&&&&&&&&&&&&!!!!' + res)
  console.log(cookieStore, cookieHeader)
  if (res.status === 401 || res.status === 403) {
    // редирект если не авторизован
    // redirect('/auth/signIn')
  }

  return (
    <main>
      <Scroll>
        <Typography variant={'h2'} as={'h2'}>
          Posts
        </Typography>
      </Scroll>
    </main>
  )
}

export default Page
