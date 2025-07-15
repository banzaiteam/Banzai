'use client'

import { type ComponentPropsWithoutRef, useEffect, useMemo, useState } from 'react'
import {
  SidebarBase,
  SidebarBaseItem,
  SidebarBaseNavigation,
  type SidebarBaseProps,
} from '@shared/ui'
import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import { useLoginOut2Mutation, useLoginOutMutation } from '@features/auth/login/api/loginApi'
import { useRouter } from 'next/navigation'
import { linksData } from '@widgets/sidebar/model/linksData'
import { useGetMeQuery } from '@shared/api/userApi'

type SidebarProps = { isDisabled?: boolean } & ComponentPropsWithoutRef<'aside'>

export const Sidebar = ({ isDisabled, ...rest }: SidebarProps) => {
  const router = useRouter()
  const [loginOut] = useLoginOutMutation()
  const [loginOut2] = useLoginOut2Mutation()
  const { data: user } = useGetMeQuery()
  const [isMounted, setIsMounted] = useState(false)

  // Фиксим проблему SSR -> клиент
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handlerLogOut = () => {
    // const token = localStorage.getItem('accessToken')
    // loginOut([{ tokens: [token] }])
    loginOut2()

    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
    }
    router.push('auth/signIn')
  }

  const sidebarItemsMapped = linksData.map(({ id, title, path, icon, iconActive }, index) => {
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

  return (
    <SidebarBase {...rest}>
      <SidebarBaseNavigation>{sidebarItemsMapped}</SidebarBaseNavigation>
      {isMounted && user && (
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
