'use client'

import React, { useState } from 'react'
import { Tabs } from '@/shared/ui/tabs/Tabs'
import styles from './ProfileSettings.module.scss'
import {
  AccountManagement,
  Devices,
  GeneralInformation,
  MyPayments,
} from '@widgets/profileSettings/components'

export default function ProfileSettings() {
  const tabs = [
    { value: 'tab-1', title: 'General information' },
    { value: 'tab-2', title: 'Devices' },
    { value: 'tab-3', title: 'Account Management' },
    { value: 'tab-4', title: 'My payments' },
  ]

  const [activeTab, setActiveTab] = useState('tab-1')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tab-1':
        return <GeneralInformation />
      case 'tab-2':
        return <Devices />
      case 'tab-3':
        return <AccountManagement />
      case 'tab-4':
        return <MyPayments />
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Tabs
          className={styles.tabs}
          tabs={tabs}
          defaultValue="tab-1"
          onValueChange={setActiveTab}
        />
      </div>
      {renderTabContent()}
    </div>
  )
}
