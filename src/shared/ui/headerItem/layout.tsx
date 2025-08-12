// @flow
import * as React from 'react'
import { useState } from 'react'
import styles from '@shared/ui/headerItem/Header.module.scss'
import Link from 'next/link'
import {
  FlagRussia,
  FlagUnitedKingdom,
  MoreHorizontal,
  OutlineBell,
} from '@/assets/icons/components'
import Select from '@shared/ui/select/Select'
import { Button } from '@shared/ui'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@shared/constants/routes'

type Props = {
  isLoggedIn: boolean
  profile?: React.ReactNode
}
export const Layout = ({ isLoggedIn, profile }: Props) => {
  const router = useRouter()

  const languageOptions = [
    { label: 'English', value: 'en', flag: <FlagUnitedKingdom /> },
    { label: 'Russian', value: 'ru', flag: <FlagRussia /> },
  ]

  const [value, setValue] = useState(languageOptions[0].value)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__inner}>
          <Link className={styles.logo} href={ROUTES.home}>
            Piksta
          </Link>
          <div className={styles.header__actions}>
            {isLoggedIn && <OutlineBell className={styles.bell} />}
            <Select options={languageOptions} value={value} onValueChange={setValue} />
            <button className={styles.more}>{isLoggedIn && <MoreHorizontal />}</button>
            {!isLoggedIn && (
              <div className={styles.registration}>
                <Button
                  onClick={() => {
                    router.push('/auth/signIn')
                  }}
                  variant="text-button"
                >
                  {isLoggedIn ? 'Log out' : 'Log in'}
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
            {profile}
          </div>
        </div>
      </div>
    </header>
  )
}
