import { baseApi } from '@/shared/api/baseApi'
import type { GetProfileResponse } from '@widgets/profile/model/types/types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getUserProfile: build.query<GetProfileResponse, { id: string; page?: number; limit?: number }>({
      query: ({ id, page, limit }) => ({
        url: `/users/${id}/profile`,
        method: 'GET',
        params: { page, limit },
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return `${queryArgs.id}-${queryArgs.limit}`
      },
      merge: (currentCache, data) => {
        currentCache.posts.items.push(...data.posts.items)
        currentCache.posts.page = data.posts.page
      },
      /*нужно ли принудительно выполнять новый запрос или взять из cash 👀*/
      forceRefetch: ({ currentArg, previousArg }) => currentArg?.page !== previousArg?.page,
      /*👉 Надо подумать если 0 👀*/
      keepUnusedDataFor: 999999,
    }),
  }),
})

export const { useLazyGetUserProfileQuery } = profileApi
