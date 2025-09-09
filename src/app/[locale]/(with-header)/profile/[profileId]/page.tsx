import { ProfilePage } from '@/app/pages'
import type { getProfileResponse } from '@widgets/profile/model/types/types'

export type ProfilePageProps = {
  params: Promise<{
    profileId: string
  }>
}

export default async function PageProfile({ params }: ProfilePageProps) {
  const userIdParam = (await params).profileId
  const initialProfileData: getProfileResponse = await fetch(
    `https://gate.yogram.ru/api/v1/users/${userIdParam}/profile?page=1&limit=8`,
    {
      cache: 'no-store',
    }
  ).then(res => res.json())

  return <ProfilePage initialProfileData={initialProfileData} userIdParam={userIdParam} />
}
