import { baseApi } from './baseApi'

type User = {
  id: string
  email: string
  name: string
  // Добавь нужные поля
}

export const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<User, void>({
      query: () => '/me',
      providesTags: ['User'],
    }),
  }),
})

export const { useGetMeQuery } = userApi
