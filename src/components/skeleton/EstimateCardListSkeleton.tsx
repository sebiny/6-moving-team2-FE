"use client";

import React from "react";
import EstimateCardSkeleton from "./EstimateCardSkeleton";

interface EstimateCardListSkeletonProps {
  count?: number; // 로딩 중일 때 보여줄 카드 개수 (기본값 4)
}

export default function EstimateCardListSkeleton({ count = 4 }: EstimateCardListSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <EstimateCardSkeleton key={idx} />
      ))}
    </div>
  );
}
