// components/estimate/EstimateHeaderSection.tsx
"use client";

import React from "react";
import ChipRectangle from "@/components/chip/ChipRectangle";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import { useTranslations } from "next-intl";
import { MoveType } from "@/constant/moveTypes";

interface Props {
  moveType: MoveType;
  isDesignated: boolean;
  status: string;
  customerName: string;
  price: number | null;
}

export default function EstimateHeaderSection({ moveType, isDesignated, status, customerName, price }: Props) {
  const t = useTranslations("MyEstimate");

  return (
    <div className="flex flex-col items-start gap-5 md:gap-7">
      {/* 상단 정보 */}
      <div className="flex w-full flex-col gap-5">
        {/* 첫 번째 줄: 칩들 + 확정견적 칩 */}
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-wrap items-center justify-start gap-3">
            <ChipRectangle moveType={moveType} size="md" />
            {isDesignated && <ChipRectangle moveType="REQUEST" size="md" />}
          </div>
          {/* 확정견적 칩 - 항상 표시 */}
          <div className="ml-auto block md:hidden">{status === "ACCEPTED" && <ChipConfirmed />}</div>
        </div>

        {/* 두 번째 줄: 고객명 */}
        <div className="flex w-full items-center justify-start gap-1.5 md:justify-between">
          <div className="flex items-center gap-1.5">
            <div className="text-lg font-semibold text-zinc-800 md:text-2xl">{customerName}</div>
            <div className="text-lg font-semibold text-zinc-800 md:text-2xl">{t("customer")}</div>
          </div>
          {/* md 이상일 때만 보여지는 상태 칩 */}
          <div className="ml-auto hidden md:block">{status === "ACCEPTED" && <ChipConfirmed />}</div>
        </div>
      </div>

      {/* 고객명 아래 구분선 - 모바일에서 끝까지 */}
      <div className="h-0 w-full outline outline-offset-[-0.5px] outline-zinc-100" />

      {/* 견적가 */}
      <div className="flex w-full items-start text-base md:max-w-[420px]">
        {/* label - 고정 너비 */}
        <span className="w-32 font-semibold text-neutral-800 md:w-[220px] md:text-xl">{t("cost")}</span>
        {/* value - 오른쪽 정렬 */}
        <span className="flex-1 text-right text-xl font-bold text-neutral-800 md:text-left md:text-2xl">
          {price ? `${price.toLocaleString()}원` : "견적가 없음"}
        </span>
      </div>

      {/* 견적가 아래 구분선 - 모바일에서 끝까지 */}
      <div className="h-0 w-full outline-1 outline-offset-[-0.5px] outline-zinc-100" />
    </div>
  );
}
