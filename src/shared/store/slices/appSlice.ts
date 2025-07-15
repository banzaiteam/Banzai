import { createSlice } from '@reduxjs/toolkit'

type AppState = {
  appError: string | null
}

const initialState = {
  appError: null,
} as AppState

export const appSlice = createSlice({
  name: 'appSlice',
  selectors: {
    selectAppError: state => state.appError,
  },
  initialState,
  reducers: builder => ({
    setAppError: builder.reducer<{ appError: string | null }>((state, action) => {
      state.appError = action.payload.appError
    }),
    clearAppError: builder.reducer(state => {
      state.appError = null
    }),
  }),
})

export const { setAppError, clearAppError } = appSlice.actions
export const { selectAppError } = appSlice.selectors
