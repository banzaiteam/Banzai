import { baseApi } from '@shared/api/baseApi'
import type { AddCommentResponse, DeletePostResponse, PostDataResponse } from '@/features'
import { userApi } from '@shared/api/userApi'

export const showPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPostData: build.query<PostDataResponse, string>({
      query: postId => ({
        url: `/posts`,
        method: 'GET',
        params: {
          filter: `id:eq:${postId}`,
        },
      }),
      keepUnusedDataFor: 9999999,
      providesTags: (result, error, postId) => [{ type: 'Post', id: postId }],
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
              const comment = {
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
              console.log(comments)
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
