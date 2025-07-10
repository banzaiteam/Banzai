'use client'
import '@radix-ui/themes/styles.css'
import { HeaderItem } from '@shared/ui/headerItem/HeaderItem'

export default function WithHeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <>{children}</>
    </>
  )
}
