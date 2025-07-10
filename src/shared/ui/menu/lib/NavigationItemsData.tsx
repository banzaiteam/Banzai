import type { ReactNode } from 'react'
import {
  Home,
  HomeOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  SearchOutline,
} from '@/assets/icons/components'
import { PATHS } from '@shared/ui/menu/lib/constans'

type NavMenuItemData = {
  id: number | string
  label: string
  icon: ReactNode
  activeIcon: ReactNode
  path: (typeof PATHS)[keyof typeof PATHS] //union
}
// @ts-ignore
export const navigationItemsData: NavMenuItemData[] = [
  {
    id: 1,
    label: 'feed',
    icon: <HomeOutline stroke={'currentColor'} />,
    activeIcon: <Home stroke={'currentColor'} />,
    path: PATHS.feed,
  },
  {
    id: 2,
    label: 'create',
    icon: <PlusSquareOutline stroke={'currentColor'} />,
    activeIcon: <PlusSquare stroke={'currentColor'} />,
    path: PATHS.create,
  },
  {
    id: 3,
    label: 'messenger',
    icon: <MessageCircleOutline stroke={'currentColor'} />,
    activeIcon: <MessageCircle stroke={'currentColor'} />,
    path: PATHS.messenger,
  },
  {
    id: 4,
    label: 'search',
    icon: <SearchOutline stroke={'currentColor'} />,
    activeIcon: <Search stroke={'currentColor'} />,
    path: PATHS.search,
  },
  {
    id: 5,
    label: 'my posts',
    icon: <PersonOutline stroke={'currentColor'} />,
    activeIcon: <Person stroke={'currentColor'} />,
    path: PATHS.profile,
  },
]
