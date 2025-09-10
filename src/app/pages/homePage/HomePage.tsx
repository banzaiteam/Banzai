import { CounterRegUsers } from '@/app/pages'
import { LastPosts } from '@/app/pages/homePage/components/lastPosts/LastPosts'
import s from './HomePage.module.scss'
import { WrapperPage } from './WrapperPage'
import { z } from 'zod'
import { postDataSchema } from '@/features'

export type ResponseData = {
  posts: z.infer<typeof postDataSchema>[]
  usersAmount: number
  /* subscribers: number
  subscriptions: number*/
}

/*
 * Next.js использует наименьшее значение revalidate из всех fetch-запросов на странице для определения времени ревалидации всей страницы.
 * Данные из fetch-запросов будут кэшироваться по умолчанию бесконечно (до перезапуска сервера)
 * Если на странице есть хотя бы один fetch с cache: 'no-store' или revalidate: 0, то вся страница будет рендериться динамически (т.е. при каждом запросе) и настройка export const revalidate будет проигнорирована.
 *
 * Next.js не устанавливает автоматическую связь между ревалидацией страницы(export const revalidate = 1800) и ревалидацией отдельных fetch-запросов({next: { revalidate }). Даже если страница ревалидируется, это не означает, что все данные на ней автоматически обновятся
 * */

export const revalidate = 60 // Перевалидировать каждые 60 секунд (1 минут)

export const HomePage = async () => {
  const data: ResponseData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/main`, {
    next: { revalidate },
  }).then(res => res.json())

  return (
    <WrapperPage>
      <CounterRegUsers usersAmount={data.usersAmount} className={s.counter_reg_users} />
      <LastPosts initialPostsData={data.posts} />
    </WrapperPage>
  )
}
