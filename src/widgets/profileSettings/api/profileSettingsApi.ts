import { baseApi } from '@shared/api/baseApi'

export const profileSettingsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    updateProfileSettings: build.mutation<any, any>({
      query: ({ updateUserDto, file }) => {
        const formData = new FormData()
        formData.append('updateUserDto', JSON.stringify(updateUserDto))
        if (file) {
          formData.append('file', file)
        }

        return {
          url: `/users`,
          method: 'PATCH',
          body: formData,
        }
      },
    }),
  }),
})

export const { useUpdateProfileSettingsMutation } = profileSettingsApi
