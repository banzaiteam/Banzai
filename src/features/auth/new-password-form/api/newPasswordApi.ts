import { baseApi } from '@/shared/api/baseApi'
import type { PasswordResetRequest, ResetPasswordResponse } from '../model/types'

export const newPasswordApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resetPassword: build.mutation<ResetPasswordResponse, PasswordResetRequest>({
      query: credentials => ({
        url: 'auth/restore-password',
        method: 'PATCH',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        redirect: 'manual', // Важно для ручной обработки 303
      }),
    }),
  }),
})

export const { useResetPasswordMutation } = newPasswordApi
