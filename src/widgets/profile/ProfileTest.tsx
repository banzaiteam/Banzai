import { useGetMeQuery } from '@/shared/api/userApi'
import { useGetUserProfileQuery } from './api/profileApi'

export const ProfileTest = () => {
  const { data: meData, isLoading: meIsLoading, error: meError } = useGetMeQuery()

  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useGetUserProfileQuery(meData?.id as string, {
    skip: !meData?.id,
  })

  if (meIsLoading || profileLoading) return <div>Loading...</div>
  if (meError || profileError) return <div>Error loading profile</div>

  const posts = profileData?.posts?.items || []

  return (
    <div>
      <h2>User: {profileData?.user?.username}</h2>
      <h2>Posts: {profileData?.user?.profile?.username}</h2>
      <p>email: {meData?.email}</p>
      <p>verified: {meData?.verified}</p>
      <p>profile: {meData?.profile.id}</p>
      <p>profile username: {meData?.profile.username}</p>
      {posts.map((post: any) => (
        <div key={post.id}>
          <p>{post.description}</p>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          <img src={post.files?.[0]?.url} alt="post" width={200} />
        </div>
      ))}
    </div>
  )
}
