import { baseApi } from '@shared/api/baseApi'

type PublishPostRequest = {
  postId: string
  description?: string
}

export const publicationApi = baseApi.injectEndpoints({
  endpoints: build => ({
    publishPost: build.mutation<void, PublishPostRequest>({
      query: ({ postId, description }) => ({
        url: `/posts/publish/${postId}`,
        method: 'PATCH',
        body: description ? { description } : undefined,
      }),
    }),
  }),
})

export const { usePublishPostMutation } = publicationApi
