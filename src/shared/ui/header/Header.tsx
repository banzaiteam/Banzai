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
import { useEffect, useState } from 'react'
import { Button } from '@shared/ui'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { selectIsLoggedIn } from '@shared/store/slices/appSlice'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useRouter } from 'next/navigation'

const languageOptions = [
  { label: 'English', value: 'en', flag: <FlagUnitedKingdom /> },
  { label: 'Russian', value: 'ru', flag: <FlagRussia /> },
]

const Header: React.FC = () => {
  const [value, setValue] = useState(languageOptions[0].value)

  // Получаем текущее состояние
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const router = useRouter()
  useEffect(() => {}, [])
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__inner}>
          <Link className={styles.logo} href="/">
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
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
