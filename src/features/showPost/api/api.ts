import { baseApi } from '@shared/api/baseApi'
/*import type { AuthResponse } from '../model/types/types'*/
type Status = 'pending' | 'success'
type FileData = {
  id: string
  createdAt: Date
  updatedAt: Date
  fileName: string
  url: string
  metatype: string
  status: Status
  postId: string
}
type PostData = {
  id: string
  userId: string
  isPublished: boolean
  description: string
  createdAt: Date
  updatedAt: Date
  files: FileData[]
  comments: Array<object> ///🤔
}
export type PostDataResponse = {
  items: PostData[]
  limit: number
  page: number
  totalItems: number
}
type DeletePostResponse = {}
export const showPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    deletePost: build.mutation<DeletePostResponse, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
    getPostData: build.query<PostDataResponse, string>({
      query: postid => ({
        url: `/posts`,
        method: 'GET',
        params: {
          filter: `id:eq:${postid}`,
        },
      }),
    }),
  }),
})

export const { useDeletePostMutation, useGetPostDataQuery } = showPostApi
