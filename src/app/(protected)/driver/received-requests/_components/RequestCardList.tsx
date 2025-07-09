'use client';

import React from 'react';
import { Request } from '@/types/request';
import RequestCard from './RequestCard';

interface RequestCardListProps {
  requests: Request[];
}

export default function RequestCardList({ requests }: RequestCardListProps) {
  return (
    <div className="flex flex-col gap-6 items-center">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
