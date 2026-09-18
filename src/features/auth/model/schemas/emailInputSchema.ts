import {z} from "zod";

export const emailInputSchema  = z.string().nonempty('Email is required').email('The email must match the format example@example.com')