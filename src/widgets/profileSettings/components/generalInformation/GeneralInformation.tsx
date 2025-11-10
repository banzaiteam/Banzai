import { useGeneralInformation } from '@widgets/profileSettings/model/hooks'
import styles from '@widgets/profileSettings/components/generalInformation/GeneralInformation.module.scss'
import { ImageOutline } from '@/assets/icons/components'
import { Button, DatePicker, Input, Textarea } from '@shared/ui'
import Select from '@shared/ui/select/Select'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AddProfilePhoto } from '@widgets/profileSettings/components/generalInformation/AddProfilePhotoModal/AddProfilePhoto'
import { useSearchParams } from 'next/navigation'
import ConfirmationModal from '../accountManagement/ConfirmationModal/ConfirmationModal'

export const GeneralInformation = () => {
  const [confirmationModal, setConfirmationModal] = useState(false)

  const handleCloseConfimModal = () => setConfirmationModal(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    const success = searchParams.get('success')

    if (success === '1') {
      setConfirmationModal(true)
    } else {
    }
  }, [searchParams])

  const countryOptions = [
    { label: 'Kiribati', value: 'kiribati' },
    { label: 'Bhutan', value: 'Bhutan' },
    { label: 'Djibouti', value: 'djibouti' },
    { label: 'Belarus', value: 'Belarus' },
  ]

  const cityOptions = [
    { label: 'Asunción', value: 'asuncion' },
    { label: 'Guadalajara', value: 'guadalajara' },
    { label: 'Kalkuta', value: 'kalkuta' },
    { label: 'Minsk', value: 'Minsk' },
  ]
  const {
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
    dateOfBirth,
    setDateOfBirth,
    setAboutMe,
    avatar,
    isFormValid,
    onSubmitHandler,
    isModalOpen,
    setIsModalOpen,
    handleAvatarSave,
  } = useGeneralInformation()

  return (
    <>
      <div className={styles.inner}>
        <form onSubmit={onSubmitHandler} role="form">
          <div className={styles.wrapper}>
            <div className={styles.image}>
              <div className={styles.img}>
                {avatar ? (
                  <Image
                    src={avatar}
                    alt={'avatar'}
                    width={192}
                    height={192}
                    className={styles.img__uploaded}
                  />
                ) : (
                  <ImageOutline className={styles.img__icon} />
                )}
              </div>
              <Button
                className={styles.img__btn}
                variant="outline"
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                Select Profile Photo
              </Button>
            </div>
            <div className={styles.info}>
              <Input
                className={styles.username}
                subTitle="Username *"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Input
                className={styles.firstname}
                subTitle="First Name *"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <Input
                className={styles.lastname}
                subTitle="Last Name *"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <DatePicker
                id="date-picker-with-required-field"
                label="Date of birth"
                value={dateOfBirth}
                onChange={date => {
                  if (Array.isArray(date)) {
                    setDateOfBirth(date[0] ?? null)
                  } else {
                    setDateOfBirth(date)
                  }
                }}
              />
              <div className={styles.selectors}>
                <div className={styles.selector}>
                  <p className={styles.text}>Select your country</p>
                  <Select
                    className={styles.select}
                    options={countryOptions}
                    value={country}
                    onValueChange={setCountry}
                    placeholder="Select country"
                  />
                </div>
                <div className={styles.selector}>
                  <p className={styles.text}>Select your city</p>
                  <Select
                    className={styles.select}
                    options={cityOptions}
                    value={city}
                    onValueChange={setCity}
                    placeholder="Select city"
                  />
                </div>
              </div>
              <Textarea
                className={styles.textarea}
                title="About Me"
                value={aboutMe}
                onChange={e => setAboutMe(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.btn}>
            <Button variant="primary" disabled={!isFormValid} type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <AddProfilePhoto
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAvatarSave}
        />
      )}
      {confirmationModal && (
        <ConfirmationModal open={confirmationModal} onOpenChange={handleCloseConfimModal} />
      )}
    </>
  )
}
