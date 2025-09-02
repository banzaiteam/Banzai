import { baseApi } from '@/shared/api/baseApi'
import type { LoginRequest, LoginResponse } from '../model/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    loginIn: build.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    loginOut: build.mutation<unknown, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
})

export const { useLoginInMutation, useLoginOutMutation } = authApi
