
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {handleError} from "@shared/utils/handleError";

export const baseApi = createApi({
  reducerPath: 'authorization', // Название редьюсера

  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      prepareHeaders: (headers) => {

        // Получаем токен из localStorage
        const token = localStorage.getItem('accessToken');
        // Если токен есть, добавляем его в заголовки
        if (token) {
          headers.set('authorization', `Bearer ${token}`);

        }
        return headers;
      },
    })(args, api, extraOptions);
    handleError(api,result);
    return result
  },
  endpoints: () => ({}),
  tagTypes: ['User', 'Post'],
})