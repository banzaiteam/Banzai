import { baseApi } from '@shared/api/baseApi'
import type { AuthResponse } from '../model/types/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<AuthResponse, { email: string; password: string }>({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    google: build.query<AuthResponse, void>({
      query: () => 'auth/google',
    }),
  }),
})

export const { useLazyGoogleQuery } = authApi
