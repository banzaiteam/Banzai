import { baseApi } from '@shared/api/baseApi'

type EditPostArgs = {
  id: string
  description: string
}

export const editPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    editPost: build.mutation<any, EditPostArgs>({
      query: ({ id, description }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: {
          description,
        },
      }),
    }),
  }),
})

export const { useEditPostMutation } = editPostApi
