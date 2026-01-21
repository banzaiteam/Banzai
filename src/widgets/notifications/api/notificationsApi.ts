import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const notificationsApiSlice = createApi({
  reducerPath: 'notificationsApi', // name of the slice in Redux store; do i need to add this slice to store?
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gate.yogram.ru/api/v1/',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getNotifications: builder.query<any[], void>({
      query: () => 'business/notifications', // endpoint path
    }),
  }),
})

export const { useGetNotificationsQuery } = notificationsApiSlice
