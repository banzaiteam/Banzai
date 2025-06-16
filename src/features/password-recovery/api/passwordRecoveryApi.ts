import {baseApi} from "@shared/api/baseApi";

const passwordRecoveryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        forgotPassword: build.mutation<any, any>({
            query: (body) => ({
                method: 'POST',
                url: '/auth/forgot-password',
                body: { email: body.email },
                headers: {
                    'x-recaptcha-token': body.recaptchaToken,
                },
            }),
        }),
    }),
})

export const {useForgotPasswordMutation} = passwordRecoveryApi