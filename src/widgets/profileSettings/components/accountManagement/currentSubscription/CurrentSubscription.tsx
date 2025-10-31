import { Checkbox } from '@/shared/ui/checkbox/Checkbox'
import styles from './CurrentSubscription.module.scss'
import { useEffect, useState } from 'react'

type Subscription = {
  createdAt?: string
  expiresAt?: string
  status?: string
}

export const CurrentSubscription = () => {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null)

  const fetchSubscription = async () => {
    const token = localStorage.getItem('accessToken')

    const request = await fetch('https://gate.yogram.ru/api/v1/business/subscriptions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const response = await request.json()
    console.log(response)
    setCurrentSubscription(response[0])
  }

  useEffect(() => {
    fetchSubscription()
  }, [])

  return (
    <div className={styles.container}>
      <p className={styles.current}>Current Subscription:</p>
      <div className={styles.duration}>
        <div className={styles.info__item}>
          <span className={styles.label}>Expire at</span>
          <span className={styles.value}>{currentSubscription?.createdAt || '10.05.2025'}</span>
        </div>
        <div className={styles.info__item}>
          <span className={styles.label}>Next payment</span>
          <span className={styles.value}>{currentSubscription?.expiresAt || '10.06.2025'}</span>
        </div>
      </div>
      <div className={styles.checkbox}>
        <Checkbox checked />
        <span>Auto Renewal</span>
      </div>
    </div>
  )
}
