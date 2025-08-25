'use client'

import { useGetMeQuery } from '@shared/api/userApi'
import { ProfileImages } from '@widgets/profile/ProfileImages'
import { ProfileInfo } from '@widgets/profile/ProfileInfo'
import { Sidebar } from '@widgets/sidebar/ui/Sidebar'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const { isSuccess } = useGetMeQuery()
  const [isLogIn, setIsLogIn] = useState(false)

  useEffect(() => {
    setIsLogIn(isSuccess)
  }, [isSuccess])

  return (
    <>
      {isLogIn && <Sidebar />}
      <main>
        <ProfileInfo />
        <ProfileImages />
      </main>
    </>
  )
}

export default ProfilePage
