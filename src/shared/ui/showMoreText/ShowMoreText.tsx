'use client'
import { MouseEvent } from 'react'
import { type ComponentPropsWithoutRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './ShowMoreText.module.scss'
import type { Nullable } from '@shared/types/nullable'

type Props = {
  description: Nullable<string>
  maxLength?: number
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  animationDuration?: number
} & Omit<ComponentPropsWithoutRef<'p'>, 'children' | 'onClick'>

const EMPTY_DESCRIPTION_LENGTH = 0

export const ShowMoreText = (props: Props) => {
  const { description, onClick, maxLength = 150, animationDuration = 0.3, ...rest } = props
  const [isExpanded, setIsExpanded] = useState(false)

  const descriptionLength = !!description ? description.length : EMPTY_DESCRIPTION_LENGTH
  const needsTruncation = descriptionLength > maxLength
  const displayedText = !!description
    ? isExpanded
      ? description
      : `${description.slice(0, maxLength).trimEnd()}${needsTruncation ? '... ' : ''}`
    : ''

  const onShowHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsExpanded(true)
    onClick?.(e)
  }

  const onHideHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsExpanded(false)
    onClick?.(e)
  }

  // Исправленные настройки анимации для текста
  const textVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: animationDuration,
        ease: 'easeInOut' as const,
      },
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: animationDuration,
        ease: 'easeInOut' as const,
      },
    },
  }

  return (
    <div className={s.show_more_container}>
      <AnimatePresence mode="wait">
        <motion.div
          // для реанимации при изменении значения будет срабатывать повторная анимация
          key={isExpanded ? 'expanded' : 'collapsed'}
          variants={textVariants}
          initial="hidden" /*Параметр initial содержит состояние начала анимации*/
          animate="visible" /* параметр animate - конца*/
          exit="hidden"
          className={s.text_container}
        >
          <p className={s.text_content} {...rest}>
            {displayedText}

            {needsTruncation &&
              (isExpanded ? (
                <button className={s.show_more_button} onClick={onHideHandler}>
                  Hide
                </button>
              ) : (
                <button className={s.show_more_button} onClick={onShowHandler}>
                  Show More
                </button>
              ))}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
