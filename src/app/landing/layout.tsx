"use client";

import Container from '@/components/container/PageContainer';
import Gnb from '@/components/layout/Gnb';
import React, { ReactNode } from 'react'

export default function LandingPageLayout({children} : {children: ReactNode}) {
  return (
    <div>
        <Gnb />
        <Container>
            {children}
        </Container>
    </div>
  )
}
