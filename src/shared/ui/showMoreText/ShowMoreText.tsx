'use client'
import { MouseEvent } from 'react'
import { type ComponentPropsWithoutRef, useState } from 'react'
import s from './ShowMoreText.module.scss'
import type { Nullable } from '@shared/types/nullable'

type Props = {
  description: Nullable<string>
  maxLength?: number
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
} & Omit<ComponentPropsWithoutRef<'p'>, 'children' & 'onClick'>

const EMPTY_DESCRIPTION_LENGTH = 0

export const ShowMoreText = (props: Props) => {
  const { description, onClick, maxLength = 150, ...rest } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const [maxLengthText, setMaxLengthText] = useState(maxLength)
  const descriptionLength = !!description ? description.length : EMPTY_DESCRIPTION_LENGTH
  // Проверяем, нужно ли вообще добавлять show more
  const needsTruncation = descriptionLength > maxLength

  const displayedText = !!description
    ? `${description.slice(0, maxLengthText).trimEnd()}${descriptionLength > maxLengthText ? (isExpanded ? '..' : '...') : ''} `
    : ''

  const onShowHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsExpanded(true)
    setMaxLengthText(maxLength + 500)
    onClick?.(e)
  }
  const onHideHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsExpanded(false)
    setMaxLengthText(maxLength)
    onClick?.(e)
  }

  return (
    <div className={s.show_more_container}>
      <p className={s.text_content} {...rest}>
        {displayedText}
      </p>
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
    </div>
  )
}
