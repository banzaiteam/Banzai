'use client'

import { type ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { SidebarBase, SidebarBaseItem, SidebarBaseNavigation } from '@shared/ui'
import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import { useLoginOutMutation } from '@features/auth/login/api/loginApi'
import { usePathname, useRouter } from 'next/navigation'
import { linksData } from '@widgets/sidebar/model/linksData'
import { useGetMeQuery } from '@shared/api/userApi'

type SidebarProps = { isDisabled?: boolean } & ComponentPropsWithoutRef<'aside'>

export const Sidebar = ({ isDisabled, ...rest }: SidebarProps) => {
  const router = useRouter()
  const [loginOut] = useLoginOutMutation()
  const { data: user } = useGetMeQuery()
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  // Фиксим проблему SSR -> клиент
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handlerLogOut = () => {
    // const token = localStorage.getItem('accessToken')
    // loginOut([{ tokens: [token] }])
    loginOut()

    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
    }
    router.push('auth/signIn')
  }

  const sidebarItemsMapped = linksData.map(({ id, title, path, icon, iconActive }, index) => {
    // const isActive = isDisabled ? false : index === 0 //для самой первой ссылки с иконкой
    const isActive = pathname === path
    // condition if path is profile then grabbing id
    const modifiedPath = id === 3 ? `${path}/${user?.id}` : path
    return (
      <SidebarBaseItem
        disabled={isDisabled}
        key={id}
        path={modifiedPath}
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
          isActive={false}
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
