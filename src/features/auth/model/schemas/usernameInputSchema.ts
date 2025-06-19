import {z} from "zod";

export const usernameInputSchema =  z.string().nonempty('Username is required').regex(
    /^[a-zA-Z0-9_-]+$/,
    'Имя пользователя может содержать только буквы (A-Z, a-z), цифры (0-9), подчёркивание (_) и дефис (-)'
).min(6, 'Minimum number of characters 6').max(30, 'Maximum number of characters 30')