import { useGetMeQuery } from '@shared/api/userApi'
import { useEffect, useMemo, useState } from 'react'
import { useUpdateGeneralInformationMutation } from '@widgets/profileSettings/api/profileSettingsApi'
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
      setFirstName(meData?.firstname || '')
      setLastName(meData?.lastname || '')
      setDateOfBirth(meData?.birthdate || '')
      setCountry(meData?.country || '')
      setCity(meData?.city || '')
      setAboutMe(meData?.profile?.aboutMe || '')
    }
  }, [meData])

  const [updateUser] = useUpdateGeneralInformationMutation()

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

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() //отменяет перезагрузку страницы
    handleSubmit()
  }

  const handleSubmit = async () => {
    if (!isFormValid) {
      console.warn('Форма не прошла валидацию')
      return
    }
    const updateUserDto: Record<string, any> = {
      //тип Record: объект, у которого ключи — строки (string), а значения — любые (any).
      username,
      aboutMe,
      firstName,
      lastName,
      country,
      city,
    }

    if (dateOfBirth) {
      updateUserDto.birthdate = dateOfBirth
    }

    try {
      await updateUser({ updateUserDto }).unwrap()
      alert('Your settings are saved!')
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error)
      alert('Error! Server is not available!')
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
    onSubmitHandler,
  }
}
