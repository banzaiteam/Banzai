import React, { useState } from 'react'
import { RadioGroup } from '@/shared/ui/radioGroup/RadioGroup'
import s from './SubscriptionSelector.module.scss'
import PayPal from '../../../../assets/images/paypal.png'
import Stripe from '../../../../assets/images/stripe.png'
import Image from 'next/image'

const PLANS = [
  { id: '1-day', label: '$10 per 1 Day' },
  { id: '7-day', label: '$50 per 7 Day' },
  { id: 'month', label: '$100 per month' },
]

export const SubscriptionSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0].id)

  const handlePayment = (provider: 'paypal' | 'stripe') => {
    console.log(`Redirecting to ${provider} for ${selectedPlan}`)
    // later → window.location.href = `/api/checkout?provider=${provider}&plan=${selectedPlan}`
  }

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
          onClick={() => handlePayment('paypal')}
          aria-label="Pay with PayPal"
        >
          <Image src={PayPal} alt="PayPal" />
        </button>

        <span className={s.or}>Or</span>

        <button
          className={s.payBtn}
          onClick={() => handlePayment('stripe')}
          aria-label="Pay with Stripe"
        >
          <Image src={Stripe} alt="Stripe" />
        </button>
      </div>
    </div>
  )
}
