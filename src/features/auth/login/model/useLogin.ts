import { baseApi } from '@/shared/api/baseApi';
import { LoginFormValues } from './loginSchema';

interface LoginResponse {
  token: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginFormValues>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
