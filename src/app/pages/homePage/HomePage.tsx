import { CounterRegUsers } from '@/app/pages'
import { LastPosts } from '@/app/pages/homePage/components/lastPosts/LastPosts'
import s from './HomePage.module.scss'
import { WrapperPage } from './WrapperPage'

type ResponseData = {
  usersAmount: number
}

// Перевалидировать каждые 60 секунд

/*export async function generateStaticParams() {
  const data: ResponseData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/main`).then(
    res => res.json()
  )
  return data
}*/

export const HomePage = async () => {
  const data: ResponseData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/main`, {
    next: { revalidate: 60 },
  }).then(res => res.json())
  console.log(data)
  return (
    <WrapperPage>
      <CounterRegUsers usersAmount={data.usersAmount} className={s.counter_reg_users} />
      <LastPosts />
    </WrapperPage>
  )
}
