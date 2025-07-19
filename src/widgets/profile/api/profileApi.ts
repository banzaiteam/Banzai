import { baseApi } from '@/shared/api/baseApi'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getUserProfile: build.query<any, string>({
      query: id => ({
        url: `/users/${id}/profile`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetUserProfileQuery } = profileApi
