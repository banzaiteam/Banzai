import { Button, Typography } from '@/shared/ui'
import styles from './HeaderCard.module.scss'
import { Close } from '@/assets/icons/components'

type Props = {
  title: string
}

export const HeaderCard = ({ title }: Props) => {
  return (
    <div className={styles.container}>
      <Typography as="h1" className={styles.title}>
        {title}
      </Typography>
      <Button variant="with-icons">
        <Close />
      </Button>
    </div>
  )
}
