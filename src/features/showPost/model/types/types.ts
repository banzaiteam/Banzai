import type { Nullable } from '@shared/types/nullable'

export type Status = 'pending' | 'success'
export type CommentPost = {
  id: string
  createdAt: Nullable<Date>
  updatedAt: Nullable<Date>
  deletedAt: Nullable<Date>
  userId: string
  text: string
  likes: number
  parentId: Nullable<string>
}
export type FileData = {
  id: string
  createdAt: Date
  updatedAt: Date
  fileName: string
  url: string
  metatype: string
  status: Status
  postId: string
}
export type PostData = {
  id: string
  userId: string
  isPublished: boolean
  description: string
  createdAt: Date
  updatedAt: Date
  files: FileData[]
  comments: CommentPost[] ///🤔
}
export type PostDataResponse = {
  items: PostData[]
  limit: number
  page: number
  totalItems: number
}
export type DeletePostResponse = {}
export type AddCommentResponse = {}
