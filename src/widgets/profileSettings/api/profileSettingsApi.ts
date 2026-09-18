import { baseApi } from '@shared/api/baseApi'

export const profileSettingsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    updateGeneralInformation: build.mutation<any, { updateUserDto: any; avatarFile?: File | null }>(
      {
        query: ({ updateUserDto, avatarFile }) => {
          const formData = new FormData()
          formData.append('updateUserDto', JSON.stringify(updateUserDto))
          if (avatarFile) {
            formData.append('file', avatarFile)
          }
          return {
            url: `/users`,
            method: 'PATCH',
            body: formData,
          }
        },
      }
    ),
  }),
})

export const { useUpdateGeneralInformationMutation } = profileSettingsApi
