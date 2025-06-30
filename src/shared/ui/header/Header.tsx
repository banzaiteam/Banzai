'use client'

import Link from 'next/link'
import styles from './Header.module.scss'
import Select from '../select/Select'
import {
  FlagRussia,
  FlagUnitedKingdom,
  MoreHorizontal,
  OutlineBell,
} from '@/assets/icons/components'
import { useState } from 'react'
import { Button } from '@shared/ui'
import { useRouter } from 'next/navigation'
import { useGetMeQuery } from '@shared/api/userApi'

const languageOptions = [
  { label: 'English', value: 'en', flag: <FlagUnitedKingdom /> },
  { label: 'Russian', value: 'ru', flag: <FlagRussia /> },
]

export const Header: React.FC = () => {
  const [value, setValue] = useState(languageOptions[0].value)
  const { isSuccess } = useGetMeQuery()

  const router = useRouter()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__inner}>
          <Link className={styles.logo} href="/">
            Piksta
          </Link>
          <div className={styles.header__actions}>
            +{isSuccess && <OutlineBell className={styles.bell} />}
            <Select options={languageOptions} value={value} onValueChange={setValue} />
            <button className={styles.more}>{isSuccess && <MoreHorizontal />}</button>
            {!isSuccess && (
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
