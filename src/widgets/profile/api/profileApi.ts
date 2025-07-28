import { baseApi } from '@/shared/api/baseApi'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getUserProfile: build.query<any, { id: string; page?: number; limit?: number }>({
      query: ({ id, page = 1, limit = 12 }) => ({
        url: `/users/${id}/profile`,
        method: 'GET',
        params: { page, limit },
      }),
    }),
  }),
})

export const { useGetUserProfileQuery } = profileApi
