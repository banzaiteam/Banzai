import { baseApi } from '@shared/api/baseApi'
/*import type { AuthResponse } from '../model/types/types'*/

type AuthResponse = {}

export const showPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    deletePost: build.mutation<AuthResponse, { email: string; password: string }>({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})
/*TODO*/
export const {} = showPostApi
