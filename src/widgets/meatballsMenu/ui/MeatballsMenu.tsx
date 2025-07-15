import s from './MeatballsMenu.module.scss'
import { MoreHorizontalOutline } from '@/assets/icons/components'
import type { MeatballsMenuItem } from '@widgets/meatballsMenu/model/types'
import { KeyboardEvent, useState } from 'react'
import { clsx } from 'clsx'
import { Typography } from '@shared/ui'

type Props = {
  items: MeatballsMenuItem[]
  menuLabel?: string
}

export const MeatballsMenu = (props: Props) => {
  const { items, menuLabel = 'Actions' } = props

  const [isOpen, setOpen] = useState(false)
  const styles = clsx(isOpen && s.open)
  const itemsMapped = items.map(({ title, onClick, icon }: MeatballsMenuItem) => (
    <li key={title} role="none">
      <button
        onClick={onClick}
        id={`menu-item-${title}`}
        role="menuitem"
        tabIndex={isOpen ? 0 : -1}
      >
        {icon}
        <Typography variant={'regular_text_14'}>{title}</Typography>
      </button>
    </li>
  ))

  const onClickHandler = () => {
    setOpen(prev => !prev)
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLButtonElement>) => {
    console.log(e.key)
    if (e.key === 'Enter' || e.key === ' ') {
      console.log(3213)
      setOpen(false)
      e.preventDefault()
    }
  }

  return (
    <div className={s.wrapper}>
      <button
        className={s.button}
        onClick={onClickHandler}
        onKeyDown={onKeyDownHandler}
        aria-label={menuLabel}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="meatballs-menu"
      >
        <MoreHorizontalOutline className={styles} />
      </button>
      {isOpen && (
        <ul className={s.menu} id="meatballs-menu" role="menu" aria-orientation="vertical">
          {itemsMapped}
        </ul>
      )}
    </div>
  )
}
