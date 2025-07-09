'use client';

import React from 'react';
import RequestCardList from './_components/RequestCardList';
import { Request } from '@/types/request';

const dummyRequests: Request[] = [
  {
    id: '1',
    moveType: '소형이사',
    isDesignated: true,
    createdAt: '1시간 전',
    customerName: '김인서',
    fromAddress: '서울시 중구',
    toAddress: '경기도 수원시',
    moveDate: '2024년 07월 01일 (월)',
  },
  {
    id: '2',
    moveType: '가정이사',
    isDesignated: false,
    createdAt: '2시간 전',
    customerName: '이현지',
    fromAddress: '서울시 강남구',
    toAddress: '인천광역시 남동구',
    moveDate: '2024년 07월 05일 (금)',
  },
];

export default function ReceivedRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="flex flex-col gap-6">
        <RequestCardList requests={dummyRequests} />
      </div>
    </div>
  );
}
