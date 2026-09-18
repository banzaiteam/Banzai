import {z} from "zod";

export const agreementSchema =z.literal(true, {
    errorMap: () => ({message: "You must accept the terms"}),
})