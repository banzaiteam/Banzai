import { useGetMeQuery } from '@/shared/api/userApi'
import { useGetUserProfileQuery } from './api/profileApi'

export const ProfileTest = () => {
  const { data: meData, isLoading: meIsLoading, isError, error: meError } = useGetMeQuery()
  // const { data, isLoading, error } = useGetUserProfilePostsQuery(meData?.id as string)

  useGetUserProfileQuery('1')

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error loading posts</div>

  return (
    <div>
      <p>asdf</p>
      {/* {data?.map(post => <div key={post.id}>{post.title}</div>)} */}
    </div>
  )
}
