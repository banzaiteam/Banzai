import type { FindOneUserDataResponse, GetPostDataResponse } from '@/features'

export type GetProfileResponse = {
  user: FindOneUserDataResponse
  posts: GetPostDataResponse
}
