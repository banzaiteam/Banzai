import s from './MeatballsMenu.module.scss'
import { MoreHorizontalOutline } from '@/assets/icons/components'
import { KeyboardEvent, useState } from 'react'
import { clsx } from 'clsx'
import { MeatballsMenuItem } from './meatballsMenuItem/MeatballsMenuItem'
import type { MeatballsMenuItemData } from '@/widgets'

type Props = {
  items: MeatballsMenuItemData[]
  menuLabel?: string
}

export const MeatballsMenu = (props: Props) => {
  const { items, menuLabel = 'Actions' } = props

  const [isOpen, setOpen] = useState(false)
  const styles = clsx(s.button, isOpen && s.open)
  const itemsMapped = items.map((item: MeatballsMenuItemData, index) => (
    <MeatballsMenuItem key={index} {...item} />
  ))

  const onClickHandler = () => {
    setOpen(prev => !prev)
  }
  const onCloseHandler = (e: KeyboardEvent<HTMLUListElement | HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      setOpen(false)
      e.preventDefault()
    }
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
    onCloseHandler(e)
    if (e.key === 'Enter') {
      setOpen(prev => !prev)
      e.preventDefault()
    }
  }

  return (
    <div className={s.wrapper}>
      <button
        className={styles}
        onClick={onClickHandler}
        onKeyDown={onKeyDownHandler}
        aria-label={menuLabel}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="meatballs-menu"
      >
        <MoreHorizontalOutline />
      </button>
      {isOpen && (
        <ul
          onKeyDown={onCloseHandler}
          className={s.menu}
          id="meatballs-menu"
          role="menu"
          aria-orientation="vertical"
        >
          {itemsMapped}
        </ul>
      )}
    </div>
  )
}
