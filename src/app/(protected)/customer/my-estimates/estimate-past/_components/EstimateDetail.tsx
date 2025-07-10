"use client";

import React from "react";

interface EstimateDetailProps {
  moveType: string;
  startAddress: string;
  endAddress: string;
  date: string;
  createdDate: string;
}

export default function EstimateDetail({ moveType, startAddress, endAddress, date, createdDate }: EstimateDetailProps) {
  return (
    <div className="w-full rounded-xl bg-white md:pb-7">
      {/* 상단: 제목 + 생성일 */}
      <div className="mb-6 flex flex-col items-center justify-between md:mb-8 md:flex-row">
        <h2 className="text-lg font-bold text-gray-900 md:text-xl">견적 정보</h2>
        <p className="mt-2 hidden text-sm text-gray-400 md:mt-0 md:flex">{createdDate}</p>
      </div>

      {/* 본문 정보 */}
      <div className="space-y-3 text-sm md:text-base">
        <div className="flex justify-between">
          <span className="font-bold text-orange-400">이사 유형</span>
          <span className="font-semibold text-gray-900">{moveType}</span>
        </div>

        <hr className="border-t border-gray-100 lg:hidden" />

        <div className="flex justify-between">
          <span className="font-bold text-orange-400">출발지</span>
          <span className="max-w-[60%] text-right font-semibold">{startAddress}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold text-orange-400">도착지</span>
          <span className="max-w-[60%] text-right font-semibold">{endAddress}</span>
        </div>

        <hr className="border-t border-gray-100 lg:hidden" />

        <div className="flex justify-between">
          <span className="font-bold text-orange-400">이용일</span>
          <span className="font-semibold">{date}</span>
        </div>
      </div>

      {/* 하단 날짜 (sm 전용) */}
      <p className="mt-5 text-right text-sm text-gray-400 md:hidden">{createdDate}</p>
    </div>
  );
}
