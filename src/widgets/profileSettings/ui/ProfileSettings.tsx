'use client'

import React from 'react'
import { Tabs } from '@/shared/ui/tabs/Tabs'
import styles from './ProfileSettings.module.scss'
import { ImageOutline } from '@/assets/icons/components'
import { Button, DatePicker, Input, Textarea } from '@/shared/ui'
import Select from '@/shared/ui/select/Select'
import { useProfileSettings } from '@widgets/profileSettings/model/hooks'

export default function ProfileSettings() {
  const tabs = [
    { value: 'tab-1', title: 'General information' },
    { value: 'tab-2', title: 'Devices' },
    { value: 'tab-3', title: 'Account Management' },
    { value: 'tab-4', title: 'My payments' },
  ]

  const countryOptions = [
    { label: 'Kiribati', value: 'kiribati' },
    { label: 'Bhutan', value: 'bhutan' },
    { label: 'Djibouti', value: 'djibouti' },
  ]

  const cityOptions = [
    { label: 'Asunción', value: 'asuncion' },
    { label: 'Guadalajara', value: 'guadalajara' },
    { label: 'Kalkuta', value: 'kalkuta' },
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
    setAboutMe,
    isFormValid,
    handleSubmit,
  } = useProfileSettings()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Tabs className={styles.tabs} tabs={tabs} defaultValue="tab-1" />
      </div>
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          <div className={styles.image}>
            <div className={styles.img}>
              <ImageOutline className={styles.img__icon} />
            </div>
            <Button className={styles.img__btn} variant="outline">
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
            <DatePicker id="date-picker-with-required-field" label="Date of birth" />
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
          <Button variant="primary" disabled={!isFormValid} onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
