import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import React, { useState, useEffect } from 'react'
import { Popup } from '@/shared/ui/popup/Popup'
import { Checkbox } from '@/shared/ui/checkbox/Checkbox'
import { Button } from '@/shared/ui/button/Button'
import s from './CreatePaymentModal.module.scss'

type Props = {
  open: boolean
  provider: 'paypal' | 'stripe'
  planId: string
  onClose: () => void
}

export const CreatePaymentModal: React.FC<Props> = ({ open, provider, planId, onClose }) => {
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Reset states when modal opens
  useEffect(() => {
    if (open) {
      setAgree(false)
      setLoading(false)
      setError(null)
    }
  }, [open])

  const handleOk = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem('accessToken')
      if (!token) throw new Error('Access token missing.')

      const response = await fetch(
        `https://gate.yogram.ru/api/v1/business/subscriptions/subscribe?payment=${provider}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subscriptionType: 1 }),
        }
      )

      // Try to read JSON response
      const data = await response.json().catch(() => null)

      if (response.status === 307 && data?.link) {
        window.location.href = data.link
        return
      }

      if (data?.link) {
        window.location.href = data.link
        return
      }

      if (response.status === 400) {
        throw new Error(
          'You already have two active subscriptions or the same type is already active.'
        )
      }

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popup
      open={open}
      onOpenChange={v => {
        if (!v) onClose()
      }}
      size="sm"
      width={375}
      aria-label="Create payment modal"
    >
      <VisuallyHidden>
        <Dialog.Title>Create payment modal</Dialog.Title>
      </VisuallyHidden>

      <div className={s.modal}>
        <div className={s.header}>
          <h3>Create payment</h3>
          <button aria-label="Close" onClick={onClose} className={s.close}>
            ✕
          </button>
        </div>

        <div className={s.body}>
          <p className={s.text}>
            Auto-renewal will be enabled with this payment. You can disable it anytime in your
            profile settings.
          </p>

          <div className={s.checkboxRow}>
            <Checkbox
              checked={agree}
              onCheckedChange={(c: boolean) => setAgree(!!c)}
              id="agree-checkbox"
            />
            <label htmlFor="agree-checkbox" className={s.checkboxLabel}>
              I agree
            </label>
          </div>

          {error && <div className={s.error}>{error}</div>}
        </div>

        <div className={s.footer}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!agree || loading}
            style={{ minWidth: 96 }}
            onClick={handleOk}
          >
            {loading ? 'Redirecting...' : 'OK'}
          </Button>
        </div>
      </div>
    </Popup>
  )
}
