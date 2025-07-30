"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("MyEstimates");
  const t1 = useTranslations("MyEstimate");

  const { label, requestDate, from, to, date } = data;

  return (
    <div className="bg-white p-6 shadow-sm md:px-17 md:py-7 lg:px-90 lg:py-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* 왼쪽: 제목 + 신청일 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-[20px] font-semibold text-black sm:text-[18px] md:text-[20px] lg:text-[24px]">{label}</h2>
          <p className="text-sm text-gray-400 sm:text-xs md:text-sm">
            {t("applicationDate")}: {requestDate}
          </p>
        </div>

        {/* lg, md 버전: 기존 레이아웃 유지 */}
        <div className="hidden gap-10 text-sm md:flex lg:flex-row lg:items-end lg:justify-end lg:gap-12">
          {/* 출발지 → 도착지 */}
          <div className="flex items-end gap-10 text-sm md:flex-row lg:gap-5">
            {/* 출발지 */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 lg:text-sm">{t1("from")}</span>
              <span className="text-base font-semibold text-black lg:text-lg">{from}</span>
            </div>

            {/* 화살표 */}
            <img src="/assets/icons/ic_arrow_short.svg" alt="화살표" width={13} height={13} className="" />

            {/* 도착지 */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 lg:text-sm">{t1("to")}</span>
              <span className="text-base font-semibold text-black lg:text-lg">{to}</span>
            </div>
          </div>

          {/* 이사일 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 lg:text-sm">{t1("date")}</span>
            <span className="text-sm font-semibold text-black lg:text-lg">{date}</span>
          </div>
        </div>

        {/* sm 이하 전용 레이아웃 */}
        <div className="flex flex-col gap-2 p-1 md:hidden">
          {/* 출발지 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{t1("from")}</span>
            <span className="text-sm font-semibold text-black">{from}</span>
          </div>
          {/* 도착지 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{t1("to")}</span>
            <span className="text-sm font-semibold text-black">{to}</span>
          </div>
          {/* 이사일 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{t1("date")}</span>
            <span className="text-sm font-semibold text-black">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
