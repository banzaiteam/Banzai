import { baseApi } from '@shared/api/baseApi'
import { clearAppError } from '@shared/store/slices/appSlice'
import type { DataSignUp, ResponseSignUp } from '@features/auth/signUp/model/types'
import type { VerifyEmailData } from '@features/auth/emailVerify/model/types/type'

export const signUpApi = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation<ResponseSignUp, DataSignUp>({
      query: data => ({
        url: '/signup',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }): Promise<void> {
        try {
          const response = await queryFulfilled
          if (response) {
            /*dispatch(login());*/
            dispatch(clearAppError())
          }
        } catch (error: any) {}
      },
    }),
    sendVerifyEmail: build.mutation<ResponseSignUp, VerifyEmailData>({
      query: data => ({
        url: '/signup/send-verify-email',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }): Promise<void> {
        try {
          const response = await queryFulfilled
          if (response) {
            dispatch(clearAppError())
          }
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: true,
})

export const { useSignUpMutation, useSendVerifyEmailMutation } = signUpApi
