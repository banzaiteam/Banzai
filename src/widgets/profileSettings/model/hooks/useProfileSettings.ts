import { useGetMeQuery } from '@shared/api/userApi'
import { useEffect, useMemo, useState } from 'react'
import { useUpdateProfileSettingsMutation } from '@widgets/profileSettings/api/profileSettingsApi'
import { profileSettingsSchema } from '@widgets/profileSettings/model/schemas'

export const useProfileSettings = () => {
  const { data: meData } = useGetMeQuery()

  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  useEffect(() => {
    if (meData?.profile) {
      setUsername(meData?.profile?.username || '')
      setAboutMe(meData?.profile?.aboutMe || '')
      //setLastName(meData?.profile?.lastName || '')
      setAboutMe(meData?.profile?.aboutMe || '')
      //setCountry(meData?.profile?.country || '')
      //setCity(meData?.profile?.city || '')
      //setDateOfBirth(meData?.profile?.dateOfBirth || '')
    }
  }, [meData])

  const [updateUser] = useUpdateProfileSettingsMutation()

  const isFormValid = useMemo(() => {
    //useMemo пересчитывает isFormValid каждый раз, когда изменяется одно из полей
    const result = profileSettingsSchema.safeParse({
      username,
      firstName,
      lastName,
      dateOfBirth,
      aboutMe,
    })
    return result.success
  }, [username, firstName, lastName, dateOfBirth, aboutMe])

  const handleSubmit = async () => {
    if (!isFormValid) {
      console.warn('Форма не прошла валидацию')
      return
    }

    const updateUserDto = { city: 'Minsk' }

    // Заглушка: создаём фиктивный файл
    const dummyImage = new Uint8Array([137, 80, 78, 71]) // PNG header bytes
    const file = new File([dummyImage], 'User.png', { type: 'image/png' })

    try {
      await updateUser({ updateUserDto, file })
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error)
    }
  }

  return {
    username,
    setUsername,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    country,
    setCountry,
    city,
    setCity,
    aboutMe,
    setAboutMe,
    dateOfBirth,
    setDateOfBirth,
    isFormValid,
    handleSubmit,
  }
}
