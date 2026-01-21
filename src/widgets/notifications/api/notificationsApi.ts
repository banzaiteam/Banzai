import { baseApi } from '@/shared/api/baseApi'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<any[], void>({
      query: () => 'business/notifications', // endpoint path
    }),
  }),
})

export const { useGetNotificationsQuery } = notificationsApi
