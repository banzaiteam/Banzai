import React, { useState } from 'react'
import { RadioGroup } from '@/shared/ui/radioGroup/RadioGroup'
import s from './AccountManagement.module.scss'
import { SubscriptionSelector } from './SubscriptionSelector'
import { CurrentSubscription } from './currentSubscription'

export const AccountManagement = () => {
  const [accountType, setAccountType] = useState('personal')

  return (
    <section className={s.section}>
      <div className={s.container}>
        <CurrentSubscription />
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
