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
    <div className="sticky top-[0px] z-20 bg-white px-90 py-8 shadow-sm">
      <div className="flex items-center justify-between">
        {/* 왼쪽: 제목 + 신청일 */}
        <div>
          <h2 className="mb-1 text-[24px] font-semibold text-black">{label}</h2>
          <p className="text-sm text-gray-400">견적 신청일: {requestDate}</p>
        </div>

        {/* 오른쪽: 출발지 → 도착지 / 이사일 */}
        <div className="flex items-center gap-15 text-sm text-gray-400">
          {/* 출발지 → 도착지 */}
          <div className="flex flex-col items-start gap-1">
            <div className="flex gap-20 text-[14px] text-gray-400">
              <span>출발지</span>
              <span>도착지</span>
            </div>
            <div className="flex items-center gap-2 text-[18px] font-semibold text-black">
              <span>{from}</span>
              <Image src="/assets/icons/ic_arrow.svg" alt="화살표" width={15} height={15} />
              <span>{to}</span>
            </div>
          </div>

          {/* 이사일 */}
          <div className="flex flex-col items-start gap-1">
            <span className="text-[14px] text-gray-400">이사일</span>
            <span className="text-[18px] font-semibold text-black">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
