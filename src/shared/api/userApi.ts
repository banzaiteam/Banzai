import { baseApi } from './baseApi'

export type Profile = {
  id: string
  aboutMe?: string
  username: string
}

export type User = {
  id: string
  email: string
  verified: boolean
  firstname: string
  lastname: string
  birthdate: string
  country: string
  city: string
  url: string
  profile: Profile
}

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<User, void>({
      query: () => 'auth/me',
      keepUnusedDataFor: 0,
      providesTags: ['User'],
    }),
  }),
})

export const { useGetMeQuery } = userApi
