'use client'

import { AddPost } from '@/features'
import { useRouter } from 'next/navigation'

export const AddPostsPage = () => {
  const router = useRouter()
  return (
    <>
      <AddPost onClose={() => router.push('/')}></AddPost>
    </>
  )
}
