import { Checkbox } from '@/shared/ui/checkbox/Checkbox'
import styles from './CurrentSubscription.module.scss'

export const CurrentSubscription = () => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.current}>Current Subscription:</p>
        <div className={styles.duration}>
          <div className={styles.info__item}>
            <span className={styles.label}>Expire at</span>
            <span className={styles.value}>10.05.2025</span>
          </div>
          <div className={styles.info__item}>
            <span className={styles.label}>Next payment</span>
            <span className={styles.value}>10.06.2025</span>
          </div>
        </div>
        <div className={styles.checkbox}>
          <Checkbox checked />
          <span>Auto Renewal</span>
        </div>
      </div>
    </>
  )
}
