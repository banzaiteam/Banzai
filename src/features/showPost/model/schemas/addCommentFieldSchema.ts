import { z } from 'zod'

export const schemaAddCommentFieldSchema = z.object({
  comment: z.string(),
})

export type FormDataAddCommentField = z.infer<typeof schemaAddCommentFieldSchema>
