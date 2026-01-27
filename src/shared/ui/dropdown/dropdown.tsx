import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { OutlineBell } from '@/assets/icons/components'
import styles from './dropdown.module.scss'

type Props = {
  className?: string
}

const NotificationsDropdown = ({ className }: Props) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true)

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
          <DropdownMenu.Item className={styles.Item}>
            Notifications <div className={styles.RightSlot}></div>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className={styles.Separator} />

          <DropdownMenu.CheckboxItem
            className={styles.CheckboxItem}
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <DropdownMenu.ItemIndicator className={styles.ItemIndicator}>
              New
            </DropdownMenu.ItemIndicator>
            Notification <div className={styles.RightSlot}></div>
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            className={styles.CheckboxItem}
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <DropdownMenu.ItemIndicator className={styles.ItemIndicator}>
              New
            </DropdownMenu.ItemIndicator>
            Show Bookmarks <div className={styles.RightSlot}></div>
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Arrow className={styles.Arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default NotificationsDropdown
