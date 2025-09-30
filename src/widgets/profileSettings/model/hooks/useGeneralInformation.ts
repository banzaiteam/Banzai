import { useGetMeQuery } from '@shared/api/userApi'
import { useEffect, useMemo, useState } from 'react'
import { useUpdateProfileSettingsMutation } from '@widgets/profileSettings/api/profileSettingsApi'
import { generalInformationSchema } from '@widgets/profileSettings/model/schemas'

export const useGeneralInformation = () => {
  const { data: meData } = useGetMeQuery()

  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  useEffect(() => {
    if (meData) {
      setUsername(meData?.profile?.username || '')
      setAboutMe(meData?.firstname || '')
      setLastName(meData?.lastname || '')
      setDateOfBirth(meData?.birthdate || '')
      setCountry(meData?.country || '')
      setCity(meData?.city || '')
      setAboutMe(meData?.profile?.aboutMe || '')
    }
  }, [meData])

  const [updateUser] = useUpdateProfileSettingsMutation()

  const isFormValid = useMemo(() => {
    //useMemo пересчитывает isFormValid каждый раз, когда изменяется одно из полей
    const result = generalInformationSchema.safeParse({
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
