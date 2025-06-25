'use client'

import { useMemo } from 'react'
import {
  SidebarBase,
  SidebarBaseItem,
  SidebarBaseNavigation,
  type SidebarBaseProps,
} from '@shared/ui'
import { linksData } from '@features/sidebar/model/linksData'
import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import { useLoginOut2Mutation, useLoginOutMutation } from '@features/auth/login/api/loginApi'
import { useRouter } from 'next/navigation'

type SidebarProps = SidebarBaseProps & { isDisabled?: boolean; onClick?: () => void }

export const Sidebar = (props: SidebarProps) => {
  const { isDisabled, onClick, ...rest } = props

  const sidebarItemsMapped = useMemo(() => {
    return linksData.map(({ id, title, path, icon, iconActive }, index) => {
      const isActive = isDisabled ? false : index === 0 //для самой первой ссылки с иконкой

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

  const router = useRouter()
  const [loginOut] = useLoginOutMutation()
  const [loginOut2] = useLoginOut2Mutation()
  const handlerLogOut = () => {
    // const token = localStorage.getItem('accessToken')
    // loginOut([{ tokens: [token] }])
    loginOut2()

    localStorage.removeItem('accessToken')
    router.push('auth/signIn')
  }

  return (
    <SidebarBase {...rest}>
      <SidebarBaseNavigation>{sidebarItemsMapped}</SidebarBaseNavigation>
      {onClick && (
        <SidebarBaseItem
          isActive={isDisabled}
          disabled={isDisabled}
          icon={<LogOutOutline stroke={'currentColor'} />}
          onClick={handlerLogOut}
        >
          Log Out
        </SidebarBaseItem>
      )}
    </SidebarBase>
  )
}
