import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include', // обязательно! чтобы отправлялись cookies (если там сессия)

  prepareHeaders: (headers, { endpoint, extra }) => {
    // получаем путь запроса из extra
    if ((extra as any)?.isRefresh) return headers

    const token = localStorage.getItem('accessToken')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryNoAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include', // важно для передачи refreshToken
})

const baseQueryWithAutoRefresh: typeof rawBaseQuery = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await rawBaseQuery(args, api, extraOptions)

  // Если access token протух — пробуем обновить
  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        // refresh-запрос делаем через базовый fetch без Authorization
        const refreshResult = await baseQueryNoAuth(
          { url: '/auth/refresh', method: 'GET' },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          const newAccessToken = (refreshResult.data as any).accessToken

          // Сохраняем новый токен
          localStorage.setItem('accessToken', newAccessToken)

          // Повторяем оригинальный запрос с новым токеном
          result = await rawBaseQuery(args, api, extraOptions)
        } else {
          localStorage.removeItem('accessToken')
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await rawBaseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const baseApi = createApi({
  baseQuery: baseQueryWithAutoRefresh,
  tagTypes: ['User'],
  endpoints: () => ({}),
})
