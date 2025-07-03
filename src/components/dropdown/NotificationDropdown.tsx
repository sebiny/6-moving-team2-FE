import Image from 'next/image'
import React from 'react'
import iconNotification from '/public/assets/icons/ic_alarm.svg'

export default function Notification() {
  return (
    <button className='cursor-pointer'><Image src={iconNotification} alt="알림" height={24} width={24} /></button>
  )
}
