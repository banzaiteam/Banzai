import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gate.yogram.ru/api/v1/'
  }),
  endpoints: () => ({}),
  tagTypes: ['User', 'Post'],
})