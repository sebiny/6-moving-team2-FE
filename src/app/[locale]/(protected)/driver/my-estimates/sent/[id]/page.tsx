"use client";

import React from "react";
import PageHeader from "@/components/common/PageHeader";
import OrangeBackground from "@/components/OrangeBackground";
import ChipRectangle from "@/components/chip/ChipRectangle";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import ShareDriver from "@/components/ShareDriver";
import EstimateDetailInfo from "@/components/common/EstimateDetailInfo";
import { useTranslations } from "next-intl";

export default function EstimateDetailPage() {
  const t = useTranslations("MyEstimate");
  return (
    <>
      <PageHeader title={t("estDetail")} />
      <OrangeBackground />
      {/* 상단 정보 + 공유 */}
      <div className="mt-8 flex w-full flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-90">
        {/* 왼쪽 - 상단 정보 + 견적 정보 */}
        <div className="flex flex-col items-start gap-7">
          {/* 상단 정보 */}
          <div className="flex w-full flex-col gap-5">
            {/* 칩들: 이사 유형 + 확정견적 (모바일) */}
            <div className="flex items-center gap-3">
              <ChipRectangle moveType="SMALL" size="md" />
              <ChipRectangle moveType="REQUEST" size="md" />
              {/* 모바일에서만 확정견적 칩 표시 */}
              <div className="block md:hidden">
                <ChipConfirmed />
              </div>
            </div>
            {/* 고객명 + 확정견적 (PC 이상) */}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="text-lg leading-loose font-semibold text-zinc-800 md:text-2xl">김민서</div>
                <div className="text-lg leading-loose font-semibold text-zinc-800 md:text-2xl">{t("customer")}</div>
              </div>
              {/* md 이상일 때만 보여지는 확정견적 칩 */}
              <div className="ml-auto hidden md:block">
                <ChipConfirmed />
              </div>
            </div>
          </div>

          <div className="h-0 w-full outline outline-offset-[-0.5px] outline-zinc-100" />

          {/* 견적가 */}
          <div className="flex w-full items-center justify-between md:w-1/2">
            <div className="text-base leading-loose font-semibold text-neutral-800 md:text-xl">{t("cost")}</div>
            <div className="text-xl leading-loose font-bold text-neutral-800 md:text-2xl">180,000원</div>
          </div>

          <div className="h-0 w-full outline-1 outline-offset-[-0.5px] outline-zinc-100" />
          <div className="w-full max-w-[744px]">
            <EstimateDetailInfo
              requestDate="24.08.26"
              serviceType="사무실이사"
              moveDate="2024. 08. 26(월) 오전 10:00"
              from="서울 중구 삼일대로 343"
              to="서울 강남구 선릉로 428"
            />
          </div>
        </div>

        {/* 오른쪽 - 공유 버튼 */}
        <div className="items-left mb-10 flex flex-col md:flex-row">
          <ShareDriver text={t("wannaRecommend?")} />
        </div>
      </div>
    </>
  );
}
