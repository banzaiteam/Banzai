'use client'
import { Typography } from '@shared/ui'
import { ShowPost } from '@features/showPost/ui/ShowPost'
import { useState } from 'react'

export const PostsPage = () => {
  const [isOpen, setOpen] = useState(true)
  return (
    <>
      <Typography variant={'h2'} as={'h2'}>
        Posts
      </Typography>
      <ShowPost id={'1718761e-fb9e-4d07-b1a6-5147516bce99'} open={isOpen} onClose={setOpen} />
    </>
  )
}
