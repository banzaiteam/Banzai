import { z } from 'zod';

export const schemaSignUp = z.object({
    username: z.string().nonempty('Username is required').regex(
        /^[a-zA-Z0-9_-]+$/,
        'Имя пользователя может содержать только буквы (A-Z, a-z), цифры (0-9), подчёркивание (_) и дефис (-)'
    ).min(6, 'Minimum number of characters 6').max(30, 'Maximum number of characters 30'),
    email: z.string().nonempty('Email is required').email('The email must match the format example@example.com'),
    password: z.string().nonempty('Password is required').min(6, 'Minimum number of characters 6').max(20, 'Maximum number of characters 20').regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).+$/, {
        message: "Must contain at least one number, one capital letter, and one special character: !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    }),
    confirmPassword: z.string().nonempty('Confirm Password is required').min(6, 'Minimum number of characters 6').max(30, 'Maximum number of characters 30'),
    agreement: z.literal(true, {
        errorMap: () => ({message: "You must accept the terms"}),
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Указываем, к какому полю привязать ошибку
})

export type FormDataSignUp = z.infer<typeof schemaSignUp>