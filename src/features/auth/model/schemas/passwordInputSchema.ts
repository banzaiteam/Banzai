import {z} from "zod";

export const passwordInputSchema =z.string()
.nonempty('Password is required')
.min(6, 'Minimum number of characters 6')
.max(20, 'Maximum number of characters 20')
.regex(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).+$/, {
    message: "Must contain at least one number, one capital letter, and one special character: !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
})
