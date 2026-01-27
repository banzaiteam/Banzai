export function NotificationItem({ notification }: any) {
  const diffInMs = notification.expiresAt - notification.createdAt
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const now = Date.now()
  const diffFromNow = Math.floor((now - notification.createdAt) / (1000 * 60 * 60 * 24))

  return (
    <li>
      {/* {!notification.readAt && <span>• new</span>} */}
      <span>Your subscription expires in {diffInDays} days</span>
      <p>
        <time>{diffFromNow}</time>
        day ago
      </p>
    </li>
  )
}
