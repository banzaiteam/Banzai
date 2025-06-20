import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleError } from '@shared/utils/handleError'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      prepareHeaders: headers => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('accessToken')
          if (token) {
            headers.set('authorization', `Bearer ${token}`)
          }
        }
        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json')
        return headers
      },
    })(args, api, extraOptions)
    handleError(api, result)
    return result
  },
  endpoints: () => ({}),
  tagTypes: ['User', 'Post'],
})
