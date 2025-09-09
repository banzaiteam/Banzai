'use client'
import { MouseEvent } from 'react'
import { type ComponentPropsWithoutRef, useState } from 'react'
import s from './ShowMoreText.module.scss'

type Props = {
  text: string
  maxLength?: number
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
} & Omit<ComponentPropsWithoutRef<'p'>, 'children' & 'onClick'>

export const ShowMoreText = (props: Props) => {
  const { text, onClick, maxLength = 150, ...rest } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const [maxLengthText, setMaxLengthText] = useState(maxLength)

  // Проверяем, нужно ли вообще добавлять show more
  const needsTruncation = text.length > maxLength

  const displayedText = `${text.slice(0, maxLengthText).trimEnd()}${text.length > maxLengthText ? (isExpanded ? '..' : '...') : ''} `

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
