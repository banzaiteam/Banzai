'use client'

import { Card as RadixCard } from '@radix-ui/themes'
import styles from './Card.module.scss'
import { ReactNode } from 'react'
import clsx from 'clsx'
import { Scroll } from '@shared/ui'

interface CardProps {
  children?: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <RadixCard className={clsx(styles.card, className)}>
      {/*<Scroll>{children}</Scroll>*/}
      {children}
    </RadixCard>
  )
}
