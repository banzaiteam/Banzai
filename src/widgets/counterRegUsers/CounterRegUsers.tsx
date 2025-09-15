'use client'
import React, { type ComponentPropsWithoutRef, useEffect, useMemo, useState } from 'react'
import s from './CounterRegUsers.module.scss'
import { Card } from '@shared/ui'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { animate, useMotionValue, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'
const DIGITS_COUNT = 6

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  usersAmount: number
  ariaLabel?: string
  ariaDescription?: string
}

export const CounterRegUsers = (props: Props) => {
  const { className, usersAmount, ariaDescription, ariaLabel, ...rest } = props
  const styles = clsx(s.counter_wrapper, className)
  const t = useTranslations('CounterRegUsers')
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  /*const arrayNumbers = useMemo(() => usersAmount.toString().split(''), [usersAmount])*/

  const countUsers = useMemo(() => {
    const count = (usersAmount || 0).toString().padStart(DIGITS_COUNT, '0').split('')

    return count.map((num, index) => (
      <CountNumber key={index} num={+num} isReducedMotion={isReducedMotion} />
    ))
  }, [usersAmount, isReducedMotion])

  // Определяем предпочтения пользователя по уменьшению motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setIsReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <section
      className={styles}
      {...rest}
      aria-label={ariaLabel || t('RegUsers')}
      aria-describedby={ariaDescription && 'counter-description'}
    >
      <h2 className={s.counter_text}>{t('RegUsers')}</h2>
      <Card className={s.counter} aria-live="polite" aria-atomic="true">
        {/* Обертка с ARIA-атрибутами */}
        <div role="status" aria-live="polite" aria-atomic="true">
          <ul className={s.counter__list} aria-hidden="true">
            {countUsers}
          </ul>
        </div>
      </Card>
    </section>
  )
}

type CountNumberProps = {
  num: number
  isReducedMotion: boolean
}

const CountNumber = (props: CountNumberProps) => {
  const { num, isReducedMotion } = props
  const count = useMotionValue(0)
  const rounded = useTransform(() => Math.round(count.get()))

  useEffect(() => {
    if (isReducedMotion) {
      count.set(num) // Мгновенное установление значения без анимации
      return
    }

    const controls = animate(count, num, {
      duration: 4, // Постепенная анимация цифр
      ease: 'easeOut',
    })
    return () => controls.stop()
  }, [])

  return (
    <li aria-hidden="true">
      <motion.span aria-hidden="true">{rounded}</motion.span>
    </li>
  )
}
