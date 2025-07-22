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
      <ShowPost id={'1c2ebde9-2001-46b0-b65d-35ea0f741bf9'} open={isOpen} onClose={setOpen} />
    </>
  )
}
