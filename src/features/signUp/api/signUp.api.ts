import {baseApi} from "@shared/api/baseApi";
import type {DataSignUp, ResponseSignUp} from "@features/signUp/model/types";
import {clearAppError} from "@shared/store/slices/appSlice";


export const signUpApi = baseApi.injectEndpoints({
    endpoints: build => ({
        signUp: build.mutation<ResponseSignUp, DataSignUp>({
            query: (data) => ({
                url: '/signup',
                method: 'POST',
                body: data
            }),
        }),
        sendVerifyEmail: build.mutation<ResponseSignUp, Pick<DataSignUp, 'email'>>({
            query: (data) => ({
                url: '/signup/send-verify-email',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}): Promise<void> {
                try {

                    const response = await queryFulfilled;
                    if (response) {
                        /*dispatch(login());*/
                        dispatch(clearAppError())
                    }
                } catch (error) {}

            }
        }),
    }),
});

export const {useSignUpMutation, useSendVerifyEmailMutation} = signUpApi;