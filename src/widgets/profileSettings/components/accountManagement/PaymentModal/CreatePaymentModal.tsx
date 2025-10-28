import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import React, { useState } from 'react'
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

  // when modal opens, reset states
  React.useEffect(() => {
    if (open) {
      setAgree(false)
      setLoading(false)
      setError(null)
    }
  }, [open])

  return (
    <Popup
      open={open}
      // open={true} → modal shows; open={false} → modal hides.
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
          <Button variant="primary" disabled={!agree || loading} style={{ minWidth: 96 }}>
            {loading ? 'Redirecting...' : 'OK'}
          </Button>
        </div>
      </div>
    </Popup>
  )
}
