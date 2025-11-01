import { Button, Popup } from '@/shared/ui'
import styles from './ConfirmationModal.module.scss'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DialogTitle } from '@radix-ui/react-dialog'

type Props = {
  open: boolean
  onOpenChange: () => void
}

export default function ConfirmationModal({ open, onOpenChange }: Props) {
  return (
    <>
      <Popup width={366} open={open} onOpenChange={onOpenChange}>
        <VisuallyHidden>
          <DialogTitle>Confirmation</DialogTitle>
        </VisuallyHidden>
        <div className={styles.container}>
          <div className={styles.header}>
            <h3 className={styles.title}>Success</h3>
            <p className={styles.close}>X</p>
          </div>
          <p className={styles.confirmation}>Payment was successful!</p>
          <div className={styles.button}>
            <Button onClick={onOpenChange} className={styles.btn}>
              OK
            </Button>
          </div>
        </div>
      </Popup>
    </>
  )
}
