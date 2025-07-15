'use client'
import { Typography } from '@shared/ui'
import { ShowPost } from '@features/showPost/ui/ShowPost'

export const PostsPage = () => {
  return (
    <>
      <Typography variant={'h2'} as={'h2'}>
        Posts
      </Typography>
      <ShowPost open={true} onClose={() => {}} />
    </>
  )
}
