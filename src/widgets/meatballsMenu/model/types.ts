import type { ReactNode, MouseEvent } from 'react'

export type MeatballsMenuItemData = {
  title: string
  icon: ReactNode
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}
