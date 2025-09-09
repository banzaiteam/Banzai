import React, { type ComponentPropsWithoutRef } from 'react'
import s from './CounterRegUsers.module.scss'
import { Card } from '@shared/ui'
import clsx from 'clsx'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const CounterRegUsers = (props: Props) => {
  const { className, ...rest } = props
  const styles = clsx(s.counter_wrapper, className)
  return (
    <div className={styles} {...rest}>
      <span className={s.counter_text}>Registered users:</span>
      <Card className={s.counter}>
        <ul className={s.counter__list}>
          <li>0</li>
          <li>0</li>
          <li>9</li>
          <li>2</li>
          <li>1</li>
          <li>3</li>
        </ul>
      </Card>
    </div>
  )
}
