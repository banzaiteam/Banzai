import React, { useEffect, useState } from 'react'
import { RadioGroup } from '@/shared/ui/radioGroup/RadioGroup'
import s from './AccountManagement.module.scss'
import { SubscriptionSelector } from './SubscriptionSelector'
import { CurrentSubscription } from './currentSubscription'
import { useSearchParams } from 'next/navigation'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'

export const AccountManagement = () => {
  const [accountType, setAccountType] = useState('personal')
  const [confirmationModal, setConfirmationModal] = useState(false)
  const searchParams = useSearchParams()

  const handleCloseConfimModal = () => setConfirmationModal(false)

  useEffect(() => {
    const success = searchParams.get('success')
    if (success === '1') setConfirmationModal(true)
  }, [searchParams])

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
        {confirmationModal && (
          <ConfirmationModal open={confirmationModal} onOpenChange={handleCloseConfimModal} />
        )}
      </div>
    </section>
  )
}
