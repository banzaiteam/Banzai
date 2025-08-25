import { baseApi } from '@shared/api/baseApi'
import {
  type AddCommentResponse,
  type CommentPost,
  type DeletePostResponse,
  type GetPostDataResponse,
  getPostDataSchema,
} from '@/features'
import { userApi } from '@shared/api/userApi'

import { z } from 'zod'

export const showPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPostData: build.query<GetPostDataResponse, string>({
      query: postId => `/posts?filter=id:eq:${postId}`,
      keepUnusedDataFor: 9999999,
      providesTags: (result, error, postId) => [{ type: 'Post', id: postId }],
      transformResponse: (response: GetPostDataResponse) => {
        try {
          getPostDataSchema.parse(response)
        } catch (err) {
          if (err instanceof z.ZodError) {
            console.table(err.issues)
          }
        }
        return response
      },
      /* extraOptions:{dataSchema:getPostDataSchema},*/
    }),

    deletePost: build.mutation<DeletePostResponse, string>({
      query: postId => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
    }),
    addComment: build.mutation<AddCommentResponse, { postId: string; text: string }>({
      query: body => ({
        url: `/posts/comments`,
        method: 'POST',
        body,
      }),
      async onQueryStarted({ postId, text }, { queryFulfilled, dispatch, getState }) {
        const cashMe = userApi.endpoints.getMe.select()(getState()).data
        const patchResult = dispatch(
          showPostApi.util.updateQueryData('getPostData', postId, state => {
            const comments = state.items[0].comments
            const nowDate = new Date().toISOString().split('T')[0]
            if (comments && cashMe) {
              const comment: CommentPost = {
                id: `client-${Date.now()}`,
                createdAt: nowDate,
                updatedAt: nowDate,
                deletedAt: null,
                userId: cashMe.id,
                text,
                likes: 0,
                parentId: null,
              }
              comments.push(comment)
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (_, __, arg) => [{ type: 'Post', id: arg.postId }],
    }),
  }),
})

export const { useDeletePostMutation, useGetPostDataQuery, useAddCommentMutation } = showPostApi
