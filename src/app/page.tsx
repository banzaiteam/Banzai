'use client' ///Event handlers cannot be passed to Client Component props
import { Sidebar } from '@features/sidebar/ui/Sidebar'
import { Skeleton, SkeletonCircle, SkeletonRect } from '@shared/ui/skeleton/Skeleton'

export default function Page() {
  return (
    <>
      <Sidebar
        onClick={() => {
          console.log(321)
        }}
      />
      <main>Banzai</main>
    </>
  )
}
