'use client'
import { useEffect } from 'react'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const previousPath = sessionStorage.getItem('previous-path')
    if (previousPath) {
      sessionStorage.removeItem('previous-path')
    }
  }, [])

  return children
}
