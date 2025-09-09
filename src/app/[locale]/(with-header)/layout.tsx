'use client'
import type { ReactNode } from 'react'
import { Header } from '@widgets/header/ui/Header'
import { Sidebar } from '@widgets/sidebar/ui/Sidebar'
import { useGetMeQuery } from '@shared/api/userApi'
import clsx from 'clsx'

export default function WithHeaderLayout({ children }: { children: ReactNode }) {
  const { data } = useGetMeQuery()
  const isAuth = !!data
  const isNotAuth = !data
  const styles = clsx('wrapper', {
    ['wrapper_not_auth']: isNotAuth,
  })
  return (
    <>
      <div className={styles}>
        <Header />
        {/*<AuthProvider>*/}
        {isAuth && <Sidebar />}
        <main>{children}</main>
        {/*</AuthProvider>*/}
      </div>
    </>
  )
}
