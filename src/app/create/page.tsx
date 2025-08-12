'use client'
import { AddPost } from '@/features/add-post/ui/AddPost'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()

  return (
    <main>
      <AddPost onClose={() => router.push('/')}></AddPost>
    </main>
  )
}

export default Page
