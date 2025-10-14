'use client'

import { type ComponentPropsWithoutRef, type ReactNode, useEffect, useState } from 'react'
import { SidebarBase, SidebarBaseItem, SidebarBaseNavigation } from '@shared/ui'
import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import { useLoginOutMutation } from '@features/auth/login/api/loginApi'
import { usePathname, useRouter } from 'next/navigation'
import { linksData } from '@widgets/sidebar/model/linksData'
import { useGetMeQuery } from '@shared/api/userApi'
import { ROUTES } from '@shared/constants/routes'
import { motion } from 'framer-motion'
import styles from './Sidebar.module.scss'

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
    router.push(ROUTES.signIn)
  }

  const sidebarItemsMapped = linksData.map(({ id, title, path, icon, iconActive }) => {
    // const isActive = isDisabled ? false : index === 0 //для самой первой ссылки с иконкой
    path = path === '/profile' && user?.id ? ROUTES.profile(user.id) : path
    const isActive = pathname === path
    return (
      <SidebarBaseItem
        disabled={isDisabled}
        key={id}
        path={path}
        icon={isActive ? iconActive : icon}
        isActive={isActive}
      >
        <span className={styles.hide__on__mobile}>{title}</span>
      </SidebarBaseItem>
    )
  })

  return (
    <SidebarBase {...rest}>
      <SidebarBaseNavigation>
        <AnimationWrapper>{sidebarItemsMapped}</AnimationWrapper>
      </SidebarBaseNavigation>
      {isMounted && user && (
        <AnimationWrapper>
          <SidebarBaseItem
            isActive={false}
            disabled={isDisabled}
            icon={<LogOutOutline stroke={'currentColor'} />}
            onClick={handlerLogOut}
          >
            Log Out
          </SidebarBaseItem>
        </AnimationWrapper>
      )}
    </SidebarBase>
  )
}

const AnimationWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0.5, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.1,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}
