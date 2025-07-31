import s from './MeatballsMenu.module.scss'
import { MoreHorizontalOutline } from '@/assets/icons/components'
import { type Dispatch, KeyboardEvent, type SetStateAction } from 'react'
import { clsx } from 'clsx'
import { MeatballsMenuItem } from './meatballsMenuItem/MeatballsMenuItem'
import type { MeatballsMenuItemData } from '@/widgets'

type Props = {
  items: MeatballsMenuItemData[]
  menuLabel?: string
  isOpen: boolean
  toggleOpen: Dispatch<SetStateAction<boolean>>
  disabled?: boolean
}

export const MeatballsMenu = (props: Props) => {
  const { items, isOpen, toggleOpen, disabled = false, menuLabel = 'Actions' } = props

  const styles = clsx(s.button, {
    [s.open]: isOpen,
    [s.disabled]: disabled,
  })
  const itemsMapped = items.map((item: MeatballsMenuItemData, index) => (
    <MeatballsMenuItem key={index} {...item} />
  ))

  const onClickHandler = () => {
    toggleOpen(prev => !prev)
    /*onClose?.(prev => !prev)*/
  }
  const onCloseHandler = (e: KeyboardEvent<HTMLUListElement | HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      toggleOpen(false)
      e.preventDefault()
    }
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
    onCloseHandler(e)
    if (e.key === 'Enter') {
      toggleOpen(prev => !prev)
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
        data-id={'meatballs-menu-btn'}
        disabled={disabled}
      >
        <MoreHorizontalOutline />
      </button>
      {isOpen && (
        <ul
          onKeyDown={onCloseHandler}
          className={s.menu}
          id="meatballs-menu"
          role="menu"
          data-id={'meatballs-menu-list'}
          aria-orientation="vertical"
        >
          {itemsMapped}
        </ul>
      )}
    </div>
  )
}
