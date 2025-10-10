import { RadioGroup } from '@/shared/ui/radioGroup/RadioGroup'
import styles from './AccountManagement.module.scss'
import { useState } from 'react'

export const AccountManagement = () => {
  const [accountType, setAccountType] = useState('personal')

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.container__inner}>
          <p className={styles.account}>Account type:</p>
          <div className={styles.type}>
            <RadioGroup
              options={[
                { label: 'Personal', value: 'personal' },
                { label: 'Business', value: 'business' },
              ]}
              value={accountType}
              onValueChange={val => setAccountType(val)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
