import { useGetNotificationsQuery } from '@/widgets/notifications/api/notificationsApi'
import { NotificationItem } from './Notification'

export const Devices = () => {
  const { data: notifications, isLoading, isError } = useGetNotificationsQuery()

  if (isLoading) {
    return <div>Loading notifications...</div>
  }

  if (isError) {
    return <div>Failed to load notifications</div>
  }

  if (!notifications || notifications.length === 0) {
    return <div>No notifications</div>
  }

  return (
    <ul>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </ul>
  )
}
