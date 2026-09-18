import { Typography } from '@shared/ui'
import { useTranslations } from 'next-intl'
import s from './AnswerButton.module.scss'
import type { ComponentPropsWithoutRef } from 'react'
import { clsx } from 'clsx'

type Props = ComponentPropsWithoutRef<'button'>

export const AnswerButton = (props: Props) => {
  const { className, children, ...rest } = props
  const t = useTranslations('Comment')
  const styles = clsx(className, s.answer_button)
  return (
    <button className={styles} {...rest}>
      {children ? (
        children
      ) : (
        <Typography variant={'semi_bold_small_text'}>{t('AnswerButton')}</Typography>
      )}
    </button>
  )
}
