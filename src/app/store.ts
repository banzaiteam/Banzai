import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/baseApi'
import { appSlice } from '@shared/store/slices/appSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [appSlice.reducerPath]: appSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch) // подключаем слушатели

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  /*@ts-expect-error test*/
  window.getState = store.getState
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
