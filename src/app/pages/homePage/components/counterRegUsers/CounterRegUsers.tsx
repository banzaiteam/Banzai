import React, { type ComponentPropsWithoutRef, useMemo } from 'react'
import s from './CounterRegUsers.module.scss'
import { Card } from '@shared/ui'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

const DIGITS_COUNT = 6

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  usersAmount: number
}

export const CounterRegUsers = (props: Props) => {
  const { className, usersAmount, ...rest } = props
  const styles = clsx(s.counter_wrapper, className)
  const t = useTranslations('CounterRegUsers')

  /*const arrayNumbers = useMemo(() => usersAmount.toString().split(''), [usersAmount])*/

  const countUsers = useMemo(() => {
    const count = (usersAmount || 0).toString().padStart(DIGITS_COUNT, '0').split('')

    return count.map((num, index) => <li key={index}>{num}</li>)
  }, [usersAmount])

  return (
    <div className={styles} {...rest}>
      <span className={s.counter_text}>{t('RegUsers')}</span>
      <Card className={s.counter}>
        <ul className={s.counter__list}>{countUsers}</ul>
      </Card>
    </div>
  )
}
