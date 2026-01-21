import { useGetNotificationsQuery } from '@/widgets/notifications/api/notificationsApi'

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
    <div style={{ width: 320 }}>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            <p>{notification.message}</p>

            {!notification.readAt && <span>• new</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
