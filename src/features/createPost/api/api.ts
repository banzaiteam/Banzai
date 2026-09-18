import { baseApi } from '@shared/api/baseApi'
import type { CreatePostResponse } from '@features/createPost/model/types/types'

export const createPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPost: build.mutation<CreatePostResponse, { files: File[] }>({
      query: ({ files }) => {
        const formData = new FormData()

        files.forEach(file => {
          formData.append('files', file) // 'files' - имя поля, которое ожидает сервер
        })

        return {
          url: '/posts',
          method: 'POST',
          body: formData,
        }
      },
    }),
  }),
})

export const { useCreatePostMutation } = createPostApi
