"use client";

import React from 'react'
import Logo from './_components/Logo';

export default function Gnb() {
  return (
    <header className="flex h-14 md:h-22 px-6  items-center justify-center border-b-1 border-line-100 bg-white ">
      <div className="flex w-full max-w-[var(--container-xl)] items-center justify-between">
        <Logo />
      </div>
    </header>
  )
}
