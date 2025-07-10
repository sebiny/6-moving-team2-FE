"use client";

import React from "react";
import Image from "next/image";

interface EstimateSubHeaderProps {
  data: {
    label: string;
    requestDate: string;
    from: string;
    to: string;
    date: string;
  };
}

export default function EstimateSubHeader({ data }: EstimateSubHeaderProps) {
  const { label, requestDate, from, to, date } = data;

  return (
    <div className="sticky top-[20px] z-20 bg-white p-6 shadow-sm md:px-17 md:py-5 lg:px-90 lg:py-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* 왼쪽: 제목 + 신청일 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-[20px] font-semibold text-black sm:text-[18px] md:text-[20px] lg:text-[24px]">{label}</h2>
          <p className="text-sm text-gray-400 sm:text-xs md:text-sm">견적 신청일: {requestDate}</p>
        </div>

        {/* lg, md 버전: 기존 레이아웃 유지 */}
        <div className="hidden gap-10 text-sm md:flex lg:flex-row lg:items-end lg:justify-end lg:gap-12">
          {/* 출발지 → 도착지 */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-20 text-xs text-gray-400 lg:text-sm">
              <span>출발지</span>
              <span>도착지</span>
            </div>
            <div className="flex items-center gap-2 text-base font-semibold text-black lg:text-lg">
              <span>{from}</span>
              <Image src="/assets/icons/ic_arrow.svg" alt="화살표" width={15} height={15} />
              <span>{to}</span>
            </div>
          </div>

          {/* 이사일 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 lg:text-sm">이사일</span>
            <span className="text-sm font-semibold text-black lg:text-lg">{date}</span>
          </div>
        </div>

        {/* sm 이하 전용 레이아웃 */}
        <div className="flex flex-col gap-2 p-1 md:hidden">
          {/* 출발지 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">출발지</span>
            <span className="text-sm font-semibold text-black">{from}</span>
          </div>
          {/* 도착지 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">도착지</span>
            <span className="text-sm font-semibold text-black">{to}</span>
          </div>
          {/* 이사일 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">이사일</span>
            <span className="text-sm font-semibold text-black">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
