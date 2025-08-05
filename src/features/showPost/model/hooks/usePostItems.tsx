'use client'
import React, { useState } from 'react'
import {
  CopyOutline,
  Edit2Outline,
  PersonAddOutline,
  PersonRemoveOutline,
  TrashOutline,
} from '@/assets/icons/components'
import type { MeatballsMenuItemData } from '@/widgets'

export const usePostItems = () => {
  const [isOpenVerifyDeleteModal, setOpenVerifyDeleteModal] = useState(false)
  const [isOpenMeatballsMenu, setOpenMeatballsMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const isFollow = false
  const myPostItems: MeatballsMenuItemData[] = [
    {
      title: 'Edit Post',
      icon: <Edit2Outline />,
      onClick: () => {
        setIsEditing(true)
        setOpenMeatballsMenu(false)
      },
    },
    {
      title: 'Delete Post',
      icon: <TrashOutline />,
      onClick: () => {
        setOpenVerifyDeleteModal(true)
        setOpenMeatballsMenu(false)
      },
    },
  ]
  const notMyPostItems: MeatballsMenuItemData[] = [
    {
      title: isFollow ? 'Unfollow' : 'Follow',
      icon: isFollow ? <PersonRemoveOutline /> : <PersonAddOutline />,
      onClick: () => {
        setIsEditing(true)
        setOpenMeatballsMenu(false)
      },
    },

    {
      title: 'Copy Link',
      icon: <CopyOutline />,
      onClick: () => {
        setIsEditing(true)
        setOpenMeatballsMenu(false)
      },
    },
  ]
  const postItems = myPostItems || notMyPostItems
  const handleCloseEditModal = () => setIsEditing(false)
  return {
    postItems,
    isEditing,
    isOpenVerifyDeleteModal,
    isOpenMeatballsMenu,
    handleCloseEditModal,
    setOpenVerifyDeleteModal,
    setOpenMeatballsMenu,
  }
}
