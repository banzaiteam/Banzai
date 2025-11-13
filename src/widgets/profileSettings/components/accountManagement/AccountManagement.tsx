import React, { useEffect, useState } from 'react'
import { RadioGroup } from '@/shared/ui/radioGroup/RadioGroup'
import s from './AccountManagement.module.scss'
import { SubscriptionSelector } from './SubscriptionSelector'
import { CurrentSubscription } from './currentSubscription'
import { useSearchParams } from 'next/navigation'

export const AccountManagement = () => {
  const [accountType, setAccountType] = useState('personal')
  const [autoRenew, setAutoRenew] = useState(true)
  const [subscriptionID, setSubscriptionID] = useState('')
  const [showSubscription, setShowSubscription] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const success = searchParams.get('success')
    const id = searchParams.get('subscription_id')

    if (id) setSubscriptionID(id)

    if (success === '1') {
      setShowSubscription(true)
    } else {
      setShowSubscription(false)
    }
  }, [searchParams])

  useEffect(() => {
    const suspendSubscription = async () => {
      const token = localStorage.getItem('accessToken')
      await fetch(
        `https://gate.yogram.ru/api/v1/business/subscriptions/${subscriptionID}/suspend?payment=paypal`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
    }
    if (!autoRenew) {
      suspendSubscription()
      setAccountType('personal')
    }
  }, [autoRenew])

  return (
    <section className={s.section}>
      <div className={s.container}>
        {showSubscription && (
          <CurrentSubscription autoRenew={autoRenew} setAutoRenew={setAutoRenew} />
        )}
        <p className={s.account}>Account type:</p>
        <div className={s.type}>
          <RadioGroup
            options={[
              { label: 'Personal', value: 'personal' },
              { label: 'Business', value: 'business' },
            ]}
            value={accountType}
            onValueChange={setAccountType}
          />
        </div>
        {accountType === 'business' && <SubscriptionSelector />}
      </div>
    </section>
  )
}
