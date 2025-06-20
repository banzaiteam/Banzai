import { baseApi } from '@/shared/api/baseApi';
import type { 
  PasswordResetResponse, 
  PasswordResetRequest 
} from '../model/types';

export const newPasswordApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    resetPassword: build.mutation<PasswordResetResponse, PasswordResetRequest>({
      query: (credentials) => ({
        url: 'auth/reset-password',
        method: 'PATCH',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = newPasswordApi;