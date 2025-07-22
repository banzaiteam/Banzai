import { Edit2Outline, TrashOutline } from '@/assets/icons/components'
import type { MeatballsMenuItemData } from '@/widgets'

export const MyPostItems: MeatballsMenuItemData[] = [
  {
    title: 'Edit Post',
    icon: <Edit2Outline />,
    onClick: () => {
      console.log(111)
    },
  },
  {
    title: 'Delete Post',
    icon: <TrashOutline />,
    onClick: () => {
      console.log(222)
    },
  },
]
