import { baseApi } from '@/shared/api/baseApi';
import type { LoginResponse, LoginRequest } from '../model/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;