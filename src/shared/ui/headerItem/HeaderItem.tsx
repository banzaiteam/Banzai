'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { MoreHorizontal, OutlineBell } from '@/assets/icons/components'
import { Button } from '@shared/ui'
import { useRouter } from 'next/navigation'
import { useGetMeQuery } from '@shared/api/userApi'
import { LocaleSwitcher } from '@/widgets'

export const HeaderItem: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)

  const { isSuccess } = useGetMeQuery()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const router = useRouter()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__inner}>
          <Link className={styles.logo} href="/">
            Piksta
          </Link>
          <div className={styles.header__actions}>
            {isSuccess && <OutlineBell className={styles.bell} />}
            <LocaleSwitcher />
            <button className={styles.more}>{isSuccess && <MoreHorizontal />}</button>
            {isMounted && !isSuccess && (
              <div className={styles.registration}>
                <Button
                  onClick={() => {
                    router.push('/auth/signIn')
                  }}
                  variant="text-button"
                >
                  {isSuccess ? 'Log out' : 'Log in'}
                </Button>
                <Button
                  onClick={() => {
                    router.push('/signup')
                  }}
                  variant="primary"
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
