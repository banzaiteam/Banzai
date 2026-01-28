import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { OutlineBell } from '@/assets/icons/components'
import styles from './dropdown.module.scss'
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from '@/widgets/notifications/api/notificationsApi'
import { Notification } from '@/widgets/notifications/model/notificationsTypes'

type Props = {
  className?: string
}

const NotificationsDropdown = ({ className }: Props) => {
  const { data: notifications } = useGetNotificationsQuery()
  const [markAsRead] = useMarkAsReadMutation()

  function handleNotificationClick(notification: Notification) {
    // Only send request if not already read
    if (notification.readAt === '') {
      markAsRead(notification.id)
    }
  }

  return (
    <DropdownMenu.Root>
      {/* .Root is the wrapper/provider for the entire dropdown system. It manages the internal state (is dropdown open or closed?) and provides context to all child components. */}
      <DropdownMenu.Trigger asChild>
        {/* .Trigger is the clickable element that toggles the dropdown open/closed.  */}
        {/* Without asChild: Radix creates its own button element and puts your button inside it:
        With asChild: Radix doesn't create its own element—it merges its props onto your element:
        */}
        <button className={styles.IconButton} aria-label="Customise options">
          {/* aria-label
It's an accessibility attribute for screen readers. Since the button only contains an icon (no text), visually impaired users wouldn't know what it does. The screen reader announces "Customise options" when focused. */}
          <OutlineBell />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        {/* .Portal gives z-index hight for menu so it stays above other elements */}
        <DropdownMenu.Content className={styles.Content} sideOffset={1}>
          {/* .Content is like container for menu */}
          {/* Sets data-side attribute automatically based where user clicked */}
          <DropdownMenu.Item className={styles.Item} disabled>
            Notifications <div className={styles.RightSlot}></div>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className={styles.Separator} />
          {notifications?.map(notification => {
            const diffInMs = notification.expiresAt - notification.createdAt
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
            const now = Date.now()
            const diffFromNow = Math.floor((now - notification.createdAt) / (1000 * 60 * 60 * 24))

            return (
              <div key={notification.id}>
                <DropdownMenu.Item
                  className={styles.Item}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <span>Your subscription expires in {diffInDays} days</span>

                  {/* Only show "new" badge if unread */}
                  {notification.readAt === '' && <div className={styles.NewBadge}>new</div>}
                  {/* 
                  <div className={styles.time}>
                    {diffFromNow === 0
                      ? 'Today'
                      : `${diffFromNow} day${diffFromNow > 1 ? 's' : ''} ago`}
                  </div> */}
                </DropdownMenu.Item>
                <DropdownMenu.Separator className={styles.Separator} />
              </div>
            )
          })}

          <DropdownMenu.Arrow className={styles.Arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default NotificationsDropdown
