import Image from 'next/image'
import React from 'react'
import icProfile from '/public/assets/icons/ic_profile.svg'

export default function Profile({md}:{
      md?: string;
    }) {
  return (
    <div className="flex">
      {md ? (
        <button className="cursor-pointer flex justify-between items-center gap-3">
          <Image src={icProfile} alt="프로필 이미지" width={26} height={26}/>
          <span className="text-lg font-medium text-black-500" >사용자이름</span>
        </button>
        ) :
        ( 
          <button className="cursor-pointer"><Image src={icProfile} alt="프로필 이미지" width={26} height={26}/></button>
        )
      }
    </div>
  )
}