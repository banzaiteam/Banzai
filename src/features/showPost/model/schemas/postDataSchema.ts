import { z } from 'zod'

const StatusSchema = z.union([z.literal('pending'), z.literal('success'), z.literal('ready')])
const fileDataSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  fileName: z.string(),
  url: z.string(),
  metatype: z.string(),
  status: StatusSchema,
  postId: z.string(),
})
export const commentPostSchema = z.object({
  id: z.string(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
  userId: z.string(),
  text: z.string(),
  likes: z.number(),
  parentId: z.string().nullable(),
})

export const postDataSchema = z.object({
  avatar: z.string(),
  id: z.string(),
  userId: z.string(),
  isPublished: z.boolean(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  files: fileDataSchema.array(),
  comments: commentPostSchema.array(),
})
