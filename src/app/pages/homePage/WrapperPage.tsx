'use client'

import { useGetMeQuery } from '@shared/api/userApi'
import clsx from 'clsx'
import s from './HomePage.module.scss'

export function WrapperPage({ children }: { children: React.ReactNode }) {
  const { data } = useGetMeQuery()

  const isNotAuth = !data
  const styles = clsx(s.wrapper, {
    [s.not_auth]: isNotAuth,
  })

  return <div className={styles}> {children} </div>
}
