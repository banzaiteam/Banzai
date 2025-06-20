import {baseApi} from "@shared/api/baseApi";
import {RecoveryPasswordRequest} from "@features/auth/forgotPassword/model/type";

const forgotPasswordApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        recoveryPassword: build.mutation<void, RecoveryPasswordRequest>({
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

export const {useRecoveryPasswordMutation} = forgotPasswordApi