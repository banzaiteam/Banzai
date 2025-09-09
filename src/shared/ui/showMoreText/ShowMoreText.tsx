'use client'
import { type ComponentPropsWithoutRef, useState } from 'react'
import s from './ShowMoreText.module.scss'

type Props = {
  text: string
  maxLength?: number
} & Omit<ComponentPropsWithoutRef<'p'>, 'children'>

export const ShowMoreText = (props: Props) => {
  const { text, maxLength = 150, ...rest } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const [maxLengthText, setMaxLengthText] = useState(maxLength)

  // Проверяем, нужно ли вообще добавлять show more
  const needsTruncation = text.length > maxLength

  const displayedText = `${text.slice(0, maxLengthText).trimEnd()}${text.length > maxLengthText ? (isExpanded ? '..' : '...') : ''} `

  const onShowHandler = () => {
    setIsExpanded(true)
    setMaxLengthText(maxLength + 500)
  }
  const onHideHandler = () => {
    setIsExpanded(false)
    setMaxLengthText(maxLength)
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
