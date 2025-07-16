import { baseApi } from '@shared/api/baseApi'
/*import type { AuthResponse } from '../model/types/types'*/

type AuthResponse = {}

export const showPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    deletePost: build.mutation<AuthResponse, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `posts/login/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})
/*TODO*/
export const { useDeletePostMutation } = showPostApi
