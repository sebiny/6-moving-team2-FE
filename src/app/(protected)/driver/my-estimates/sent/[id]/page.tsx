"use client";

import React from "react";
import PageHeader from "@/components/common/PageHeader";
import OrangeBackground from "@/components/OrangeBackground";
import ChipRectangle from "@/components/chip/ChipRectangle";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import ShareDriver from "@/components/ShareDriver";

export default function EstimateDetailPage() {
  return (
    <>
      <PageHeader title="견적 상세" />
      <OrangeBackground />
      {/* 상단 정보 + 공유 */}
      <div className="mt-10 flex w-full flex-row items-start justify-between px-90">
        {/* 왼쪽 - 상단 정보 + 견적 정보 */}
        <div className="inline-flex flex-col items-start justify-start gap-7">
          {/* 상단 정보 */}
          <div className="flex flex-col items-start justify-start gap-5">
            <div className="inline-flex items-center justify-start gap-3">
              <ChipRectangle moveType="SMALL" size="md" />
              <ChipRectangle moveType="REQUEST" size="md" />
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start gap-1.5">
                <div className="justify-start text-2xl leading-loose font-semibold text-zinc-800">김민서</div>
                <div className="justify-start text-2xl leading-loose font-semibold text-zinc-800">고객님</div>
              </div>
              <ChipConfirmed className="ml-auto" />
            </div>
          </div>

          <div className="h-0 w-[741px] outline outline-1 outline-offset-[-0.5px] outline-zinc-100" />

          {/* 견적가 */}
          <div className="inline-flex items-center justify-start gap-16">
            <div className="justify-start text-xl leading-loose font-semibold text-neutral-800">견적가</div>
            <div className="inline-flex w-52 flex-col items-start justify-start">
              <div className="justify-start text-2xl leading-loose font-bold text-neutral-800">180,000원</div>
            </div>
          </div>

          <div className="h-0 w-[741px] outline outline-1 outline-offset-[-0.5px] outline-zinc-100" />

          {/* 견적 정보 섹션도 여기에 포함시킴 */}
          <div className="flex flex-col items-start justify-start gap-7 self-stretch">
            <div className="text-xl leading-loose font-semibold text-neutral-800">견적 정보</div>
            <div className="flex flex-col items-start justify-start gap-4 self-stretch">
              <div className="inline-flex items-center gap-6">
                <div className="w-24 text-base font-normal text-neutral-400">견적 요청일</div>
                <div className="text-base font-semibold text-neutral-800">24.08.26</div>
              </div>
              <div className="inline-flex items-center gap-6">
                <div className="w-24 text-base font-normal text-neutral-400">서비스</div>
                <div className="text-base font-semibold text-neutral-800">사무실이사</div>
              </div>
              <div className="inline-flex items-center gap-6">
                <div className="w-24 text-base font-normal text-neutral-400">이용일</div>
                <div className="text-base font-semibold text-neutral-800">2024. 08. 26(월) 오전 10:00</div>
              </div>
              <div className="inline-flex items-center gap-6">
                <div className="w-24 text-base font-normal text-neutral-400">출발지</div>
                <div className="text-base font-semibold text-neutral-800">서울 중구 삼일대로 343</div>
              </div>
              <div className="inline-flex items-center gap-6">
                <div className="w-24 text-base font-normal text-neutral-400">도착지</div>
                <div className="text-base font-semibold text-neutral-800">서울 강남구 선릉로 428</div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 - 공유 버튼 */}
        <div className="mt-2 flex min-w-[180px] flex-col items-center gap-4">
          <ShareDriver text="견적서 공유하기" />
        </div>
      </div>
    </>
  );
}
