'use client'

import React, { createContext, useContext, ReactNode, useState } from 'react'
import { useGetMeQuery, type User } from '@shared/api/userApi'

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
})

export function AuthProvider({
  children,
  initialUser,
}: {
  children: ReactNode
  initialUser: User | null
}) {
  const { isSuccess } = useGetMeQuery()
  const [user, setUser] = useState<User | null>(initialUser)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
