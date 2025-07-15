import type { ReactNode, MouseEvent } from 'react'

export type MeatballsMenuItem = {
  title: string
  icon: ReactNode
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}
