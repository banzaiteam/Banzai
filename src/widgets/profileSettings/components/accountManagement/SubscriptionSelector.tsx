import React, { useState } from 'react'
import { RadioGroup } from '@/shared/ui/radioGroup/RadioGroup'
import s from './SubscriptionSelector.module.scss'
import PayPal from '@/assets/images/paypal.png'
import Stripe from '@/assets/images/stripe.png'
import Image from 'next/image'
import { CreatePaymentModal } from './PaymentModal'

const PLANS = [
  { id: '1-day', label: '$10 per 1 Day' },
  { id: '7-day', label: '$50 per 7 Day' },
  { id: 'month', label: '$100 per month' },
]

export const SubscriptionSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0].id)
  const [modal, setModal] = useState<{
    open: boolean
    provider: 'paypal' | 'stripe'
    planId: string
  } | null>(null)

  const openModal = (provider: 'paypal' | 'stripe') => {
    setModal({ open: true, provider, planId: selectedPlan })
  }

  const closeModal = () => setModal(null)

  return (
    <div className={s.wrapper}>
      <p className={s.title}>Your subscription costs:</p>

      <div className={s.radio}>
        <RadioGroup
          options={PLANS.map(p => ({ label: p.label, value: p.id }))}
          value={selectedPlan}
          onValueChange={v => setSelectedPlan(v)}
        />
      </div>

      <div className={s.payment}>
        <button
          className={s.payBtn}
          onClick={() => openModal('paypal')}
          aria-label="Pay with PayPal"
        >
          <Image src={PayPal} alt="PayPal" />
        </button>

        <span className={s.or}>Or</span>

        <button
          className={s.payBtn}
          onClick={() => openModal('stripe')}
          aria-label="Pay with Stripe"
        >
          <Image src={Stripe} alt="Stripe" />
        </button>
      </div>

      {modal && (
        <CreatePaymentModal
          open={modal.open}
          provider={modal.provider}
          planId={modal.planId}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
