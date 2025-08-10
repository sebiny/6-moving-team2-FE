import React from "react";

export default function RequestCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="inline-flex w-80 flex-col gap-6 rounded-[20px] bg-white px-5 py-6 shadow-[-2px_-2px_10px_0px_rgba(220,220,220,0.20)] outline outline-offset-[-0.5px] outline-zinc-100 md:w-full md:gap-8 md:px-10 md:py-8">
        {/* 상단 */}
        <div className="flex w-full flex-col gap-4">
          {/* 상단 헤더 */}
          <div className="flex h-8 items-center justify-between">
            <div className="flex gap-2">
              {/* 칩 스켈레톤 */}
              <div className="h-6 w-16 rounded bg-gray-200" />
              <div className="h-6 w-20 rounded bg-gray-200" />
            </div>
            {/* 날짜 스켈레톤 */}
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>

          {/* 고객명 영역 */}
          <div className="flex w-full flex-col gap-3">
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded bg-gray-200" />
              <div className="h-6 w-12 rounded bg-gray-200" />
            </div>
            <div className="h-px w-full bg-zinc-100" />
          </div>

          {/* 출발/도착지 + 이사일 */}
          <div className="flex w-full flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-1 items-end gap-3 md:flex-row md:items-center">
              <div className="flex flex-col">
                <div className="h-4 w-8 rounded bg-gray-200" />
                <div className="h-5 w-32 rounded bg-gray-200" />
              </div>
              {/* 화살표 스켈레톤 */}
              <div className="relative h-5 w-4 flex-shrink-0">
                <div className="h-5 w-4 rounded bg-gray-200" />
              </div>
              <div className="flex flex-col">
                <div className="h-4 w-8 rounded bg-gray-200" />
                <div className="h-5 w-32 rounded bg-gray-200" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="h-4 w-16 rounded bg-gray-200" />
              <div className="h-5 w-20 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex w-full flex-col gap-2.5 md:flex-row-reverse">
          <div className="w-full md:w-1/2">
            <div className="h-12 w-full rounded-lg bg-gray-200" />
          </div>
          <div className="w-full md:w-1/2">
            <div className="h-12 w-full rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
