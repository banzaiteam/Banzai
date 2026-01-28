import { baseApi } from '@/shared/api/baseApi'
import { MarkAsReadRequest, MarkAsReadResponse, Notification } from '../model/notificationsTypes'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => 'business/notifications',
      providesTags: ['Notifications'],
    }),
    markAsRead: builder.mutation<MarkAsReadResponse, MarkAsReadRequest>({
      query: notificationId => ({
        url: 'business/notifications/read',
        method: 'PATCH',
        body: { notificationId },
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
})

export const { useGetNotificationsQuery, useMarkAsReadMutation } = notificationsApi
