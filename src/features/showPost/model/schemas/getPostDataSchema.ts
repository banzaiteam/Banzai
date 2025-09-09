import { z } from 'zod'
import { postDataSchema } from '@features/showPost/model/schemas/postDataSchema'

export const getPostDataSchema = z.object({
  items: postDataSchema.array(),
  limit: z.number().int().nonnegative(),
  page: z.number().int().nonnegative(),
  totalItems: z.number().int().nonnegative(),
})
