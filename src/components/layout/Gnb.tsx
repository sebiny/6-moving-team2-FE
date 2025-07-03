"use client";

import Logo from './_components/Logo';
import GnbList from '@/components/list/GnbList';
import React, { useEffect, useState } from 'react'
import Notification from '../dropdown/NotificationDropdown';
import Profile from '../dropdown/ProfileDropdown';

export default function Gnb() {
  const [isMd, setIsMd] = useState(false)
  

  useEffect(()=>{
      const handleResize = () => {
          setIsMd(window.innerWidth >= 744);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return() => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <header className="flex h-14 md:h-22 px-6 items-center justify-center border-b-1 border-line-100 bg-white ">
      <div className="flex w-full max-w-[var(--container-gnb)] items-center justify-between">
        <Logo />
        
          {isMd ?
            (
              <div className="flex justify-between items-center flex-1">
                <GnbList md="md" className="flex-1"/>
                <div className='flex justify-between items-center gap-5'>
                  <Notification />
                  <Profile md="md" />
                </div>
              </div>
            ) :
            (
              <div className="flex justify-between items-center gap-5">
                <Notification />
                <div className='flex justify-between items-center gap-5'>
                  <Profile />
                  <GnbList />
                </div>
              </div>
            )
          }
        
      </div>
    </header>
  )
}
