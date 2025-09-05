import { baseApi } from '@shared/api/baseApi'
import type { CreatePostResponse } from '@features/createPost/model/types'

export const createPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPost: build.mutation<CreatePostResponse, { files: File[] }>({
      query: ({ files }) => ({
        url: '/posts',
        method: 'POST',
        body: {
          files,
        },
      }),
    }),
  }),
})

export const { useCreatePostMutation } = createPostApi
