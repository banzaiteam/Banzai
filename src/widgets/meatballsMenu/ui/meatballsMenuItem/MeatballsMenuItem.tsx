import React, { type ComponentPropsWithoutRef, KeyboardEvent } from 'react'
import { Typography } from '@shared/ui'
import type { MeatballsMenuItemData } from '@/widgets'
import { clsx } from 'clsx'
import s from './MeatballsMenuItem.module.scss'

type Props = Omit<ComponentPropsWithoutRef<'li'>, 'onClick' | 'title'> & MeatballsMenuItemData

export const MeatballsMenuItem = (props: Props) => {
  const { icon, onClick, title, className, ...rest } = props

  const styles = clsx(s.item, className)

  const onKeyDownButtonHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>)
      e.preventDefault()
    }
  }

  return (
    <li key={title} role="none" className={styles} {...rest}>
      <button
        onClick={onClick}
        id={`menu-item-${title}`}
        data-id={`meatballs-menu-${title}`}
        role="menuitem"
        onKeyDown={onKeyDownButtonHandler}
      >
        {icon}
        <Typography variant={'regular_text_14'}>{title}</Typography>
      </button>
    </li>
  )
}
