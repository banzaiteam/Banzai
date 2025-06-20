import { z } from 'zod';
import {
    agreementSchema,
    confirmPasswordInputSchema,
    emailInputSchema,
    passwordInputSchema,
    usernameInputSchema
} from "@features/auth";

export const schemaSignUp = z.object({
    username:usernameInputSchema,
    email: emailInputSchema,
    password: passwordInputSchema,
    confirmPassword: confirmPasswordInputSchema,
    agreement: agreementSchema,
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Указываем, к какому полю привязать ошибку
})

export type FormDataSignUp = z.infer<typeof schemaSignUp>