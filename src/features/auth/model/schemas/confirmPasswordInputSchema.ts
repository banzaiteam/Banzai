import {z} from "zod";

export const confirmPasswordInputSchema = z.string()
.nonempty('Confirm Password is required')
.min(6, 'Minimum number of characters 6')
.max(30, 'Maximum number of characters 30')
