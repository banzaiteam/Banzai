import { baseApi } from './baseApi'

export type Profile = {
  id: string
  username: string
}

export type User = {
  id: string
  email: string
  verified: boolean
  profile: Profile
}

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<User, void>({
      query: () => 'auth/me',

      providesTags: ['User'],
    }),
  }),
})

export const { useGetMeQuery } = userApi
