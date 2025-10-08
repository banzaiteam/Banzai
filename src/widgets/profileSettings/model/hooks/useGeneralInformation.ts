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
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [avatar, setAvatar] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (meData) {
      setUsername(meData?.profile?.username || '')
      setFirstName(meData?.firstname || '')
      setLastName(meData?.lastname || '')
      setDateOfBirth(meData?.birthdate ? new Date(meData.birthdate) : null)
      setCountry(meData?.country || '')
      setCity(meData?.city || '')
      setAboutMe(meData?.profile?.aboutMe || '')
      setAvatar(meData?.url || '')
    }
  }, [meData])

  const [updateUser] = useUpdateGeneralInformationMutation()

  const handleAvatarSave = (file: File) => {
    setAvatarFile(file)
    // Создаем временный URL для предпросмотра
    const imageUrl = URL.createObjectURL(file)
    setAvatar(imageUrl)
  }

  const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  const isFormValid = useMemo(() => {
    const dateOfBirthString = dateOfBirth ? formatDateToDDMMYYYY(dateOfBirth) : ''

    //useMemo пересчитывает isFormValid каждый раз, когда изменяется одно из полей
    const result = generalInformationSchema.safeParse({
      username,
      firstName,
      lastName,
      dateOfBirth: dateOfBirthString,
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
      // Преобразуем Date в строку для отправки на сервер
      updateUserDto.birthdate = formatDateToDDMMYYYY(dateOfBirth)
    }

    try {
      await updateUser({ updateUserDto, avatarFile }).unwrap()
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
    avatar,
    setAvatar,
    isFormValid,
    onSubmitHandler,
    isModalOpen,
    setIsModalOpen,
    handleAvatarSave,
  }
}
