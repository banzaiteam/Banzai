'use client'
import s from './HomePage.module.scss'
import { CounterRegUsers } from '@/app/pages'
import { LastPosts } from '@/app/pages/homePage/components/lastPosts/LastPosts'
import { useGetMeQuery } from '@shared/api/userApi'
import clsx from 'clsx'

export const HomePage = () => {
  const { data } = useGetMeQuery()

  const isNotAuth = !data
  const styles = clsx(s.wrapper, {
    [s.not_auth]: isNotAuth,
  })

  return (
    <div className={styles}>
      <CounterRegUsers className={s.counter_reg_users} />
      <LastPosts />
    </div>
  )
}
