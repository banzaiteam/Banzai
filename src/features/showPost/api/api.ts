import { baseApi } from '@shared/api/baseApi'
import type { AddCommentResponse, DeletePostResponse, PostDataResponse } from '@/features'

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
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.postId }],
    }),
  }),
})

export const { useDeletePostMutation, useGetPostDataQuery, useAddCommentMutation } = showPostApi
