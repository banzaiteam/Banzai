import { z } from 'zod'

export const profileSettingsSchema = z.object({
  username: z
    .string()
    .min(6, { message: 'Username must be at least 6 characters long' })
    .max(30, { message: 'Username must be at most 30 characters long' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'Username can only contain Latin letters, numbers, underscores and hyphens',
    })
    .nonempty('The field cannot be empty'),

  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name must be at most 50 characters long' })
    .regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, {
      message: 'First name can only contain Latin and Russian letters',
    })
    .nonempty('The field cannot be empty'),

  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(50, { message: 'Last name must be at most 50 characters long' })
    .regex(/^[a-zA-Zа-яА-ЯёЁ]+$/, {
      message: 'Last name can only contain Latin and Russian letters',
    })
    .nonempty('The field cannot be empty'),

  dateOfBirth: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, {
      message: 'Date of birth must be in format dd.mm.yyyy',
    })
    .optional() //Разрешаем отсутствие поля dateOfBirth — оно может быть undefined
    .or(z.literal('')), //разрешаем пустую строку '' как валидное значение

  aboutMe: z
    .string()
    .max(200, { message: 'About me must be at most 200 characters long' })
    .optional()
    .or(z.literal('')),

  country: z.string().optional(),
  city: z.string().optional(),
})

// export type ProfileSettingsFormData = z.infer<typeof profileSettingsSchema>
//
// // Валидация отдельных полей (если нужно валидировать по одному)
// export const usernameSchema = profileSettingsSchema.pick({ username: true })
// export const firstNameSchema = profileSettingsSchema.pick({ firstName: true })
// export const lastNameSchema = profileSettingsSchema.pick({ lastName: true })
// export const dateOfBirthSchema = profileSettingsSchema.pick({ dateOfBirth: true })
// export const aboutMeSchema = profileSettingsSchema.pick({ aboutMe: true })
