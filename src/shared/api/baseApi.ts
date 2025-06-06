import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {handleError} from "@shared/utils/handleError";

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: 'https://gate.yogram.ru/api/v1',
      prepareHeaders: (headers) => {
        // Получаем токен из localStorage
        const token = localStorage.getItem('access_token');
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