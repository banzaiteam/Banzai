import { baseApi } from '@shared/api/baseApi'

export const profileSettingsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    updateGeneralInformation: build.mutation<any, any>({
      query: ({ updateUserDto }) => {
        const formData = new FormData()
        formData.append('updateUserDto', JSON.stringify(updateUserDto))
        return {
          url: `/users`,
          method: 'PATCH',
          body: formData,
        }
      },
    }),
  }),
})

export const { useUpdateGeneralInformationMutation } = profileSettingsApi
