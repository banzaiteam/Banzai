import type { Nullable } from '@shared/types/nullable'
import { z } from 'zod'
import { commentPostSchema, getPostDataSchema } from '@/features'

/*export type Status = 'pending' | 'success'*/

/*export type FileData = z.infer<typeof fileDataSchema>
export type PostData = z.infer<typeof postDataSchema>*/

export type CommentPost = z.infer<typeof commentPostSchema>

export type GetPostDataResponse = z.infer<typeof getPostDataSchema>
export type FindOneUserDataResponse = {
  id: string
  username: string
  email: string
  url: string
  verified: boolean
  profile: {
    id: string
    aboutMe: Nullable<string>
    username: string
  }
}
export type DeletePostResponse = void
export type AddCommentResponse = void
