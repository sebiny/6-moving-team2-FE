"use client";

import React from "react";
import ReceivedRequestCardSkeleton from "./RequestCardSkeleton";

interface ReceivedRequestCardListSkeletonProps {
  count?: number; // 로딩 중일 때 보여줄 카드 개수 (기본값 4)
}

export default function ReceivedRequestCardListSkeleton({ count = 4 }: ReceivedRequestCardListSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 self-stretch md:gap-8 lg:grid-cols-2 lg:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ReceivedRequestCardSkeleton key={idx} />
      ))}
    </div>
  );
}
