import React from "react";

export default function EstimateCardSkeleton() {
  return (
    <div className="flex w-80 animate-pulse flex-col gap-6 rounded-[20px] bg-gray-200 px-5 py-6 shadow-md md:w-[588px] md:gap-8 md:px-10 md:py-8">
      {/* 상단 */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex h-8 items-center justify-between">
          <div className="flex gap-2">
            <div className="h-6 w-12 rounded-md bg-gray-300" />
            <div className="h-6 w-16 rounded-md bg-gray-300" />
          </div>
          <div className="h-6 w-8 rounded-md bg-gray-300" />
        </div>
        {/* 고객명 */}
        <div className="flex w-full flex-col gap-3">
          <div className="flex gap-2">
            <div className="h-8 w-32 rounded-md bg-gray-300" />
            <div className="h-8 w-16 rounded-md bg-gray-300" />
          </div>
          <div className="h-px w-full bg-gray-300" />
        </div>
        {/* 출발/도착지 + 이사일 */}
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-20 rounded-md bg-gray-300" />
            <div className="h-6 w-full rounded-md bg-gray-300" />
          </div>
          <div className="relative h-5 w-4 flex-shrink-0">
            <div className="h-5 w-4 rounded-md bg-gray-300" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-20 rounded-md bg-gray-300" />
            <div className="h-6 w-full rounded-md bg-gray-300" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-20 rounded-md bg-gray-300" />
            <div className="h-6 w-24 rounded-md bg-gray-300" />
          </div>
        </div>
      </div>
      {/* 하단 */}
      <div className="flex w-full items-end justify-between border-t border-gray-300 pt-4">
        <div className="h-6 w-16 rounded-md bg-gray-300" />
        <div className="h-10 w-28 rounded-md bg-gray-300" />
      </div>
    </div>
  );
}
