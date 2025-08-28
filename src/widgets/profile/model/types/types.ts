import type { FindOneUserDataResponse, GetPostDataResponse } from '@/features'

export type getProfileResponse = {
  user: FindOneUserDataResponse
  posts: GetPostDataResponse
}
