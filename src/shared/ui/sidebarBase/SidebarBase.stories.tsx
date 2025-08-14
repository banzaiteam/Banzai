import type { Meta, StoryObj } from '@storybook/react'
import {
  SidebarBase,
  SidebarBaseNavigation,
  SidebarBaseItem,
  type SidebarBaseProps,
} from '@shared/ui'
import { useMemo } from 'react'
import { LogOutOutline } from '@/assets/icons/components'
import { linksData } from '@widgets/sidebar/model/linksData'

type RenderDefaultProps = SidebarBaseProps & {
  isDisabled?: boolean
}

const RenderDefault = (props: RenderDefaultProps) => {
  const { isDisabled = false, ...rest } = props

  const sidebarItemsMapped = useMemo(() => {
    return linksData.map(({ id, title, path, icon, iconActive }, index) => {
      const isActive = isDisabled ? false : index === 0

      return (
        <SidebarBaseItem
          disabled={isDisabled}
          key={id}
          path={path}
          icon={isActive ? iconActive : icon}
          isActive={isActive}
        >
          {title}
        </SidebarBaseItem>
      )
    })
  }, [])

  return (
    <SidebarBase style={{ gridArea: 'sidebar' }} {...rest}>
      <SidebarBaseNavigation>{sidebarItemsMapped}</SidebarBaseNavigation>
      <SidebarBaseItem
        isActive={isDisabled}
        disabled={isDisabled}
        icon={<LogOutOutline stroke={'currentColor'} />}
        onClick={() => alert('Some event')}
      >
        Log Out
      </SidebarBaseItem>
    </SidebarBase>
  )
}

const meta: Meta<typeof SidebarBase> = {
  title: 'Shared/Sidebar',
  component: SidebarBase,
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarBase>

export default meta

type Story = StoryObj<typeof SidebarBase>

export const Default: Story = {
  render: props => <RenderDefault {...props} />,
}

export const Disabled: Story = {
  ...Default,
  render: props => <RenderDefault isDisabled={true} {...props} />,
}
