"use client";

import Image from "next/image";
import { ReceivedEstimateData } from "./ReceivedEstimateData";
import { iconAssets } from "@/components/title/LabelIcons";
import ChipRectangle from "@/components/chip/ChipRectangle";

interface Props {
  data: ReceivedEstimateData;
}

export default function ReceivedEstimate({ data }: Props) {
  const { labels, driver, message, price, status } = data;

  return (
    <div className="w-full space-y-3 bg-white md:space-y-4">
      {/* 라벨 목록 */}
      <div className="flex gap-2">
        {/* sm 이하 (기본) */}
        <div className="flex gap-2 md:hidden">
          <ChipRectangle moveType="OFFICE" size="sm" />
          <ChipRectangle moveType="REQUEST" size="sm" />
        </div>
        {/* md 이상 */}
        <div className="hidden gap-2 md:flex">
          <ChipRectangle moveType="OFFICE" size="md" />
          <ChipRectangle moveType="REQUEST" size="md" />
        </div>
      </div>

      {/* 소개 메시지 */}
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-gray-800 md:text-xl">{message}</p>
        <div className="hidden font-['Pretendard'] text-base font-semibold text-gray-400 md:flex">견적대기</div>
      </div>

      {/* 기사 프로필 */}
      <div className="flex items-center rounded-lg border border-gray-200 px-4 py-3">
        <Image src={driver.imageUrl} alt="기사 프로필" width={48} height={48} className="mr-3" />

        <div className="flex w-full flex-col">
          {/* 이름 + 좋아요 */}
          <div className="flex items-center justify-between text-base font-medium">
            <div className="flex items-center gap-1">
              <Image src={iconAssets.profileMark} alt="기사 마크" width={16} height={16} />
              <span>{driver.name} 기사님</span>
            </div>

            <div className="flex items-center">
              <Image src="/assets/icons/ic_like_empty.svg" alt="찜 아이콘" width={22} height={0} />
              <span>{driver.likes}</span>
            </div>
          </div>

          {/* 별점 및 상세 정보 */}
          <div className="mt-2 flex text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Image src={iconAssets.star} alt="별점" width={16} height={16} />
              <span className="flex gap-0.5 font-medium text-black">{driver.rating.toFixed(1)}</span>
              <span className="text-gray-400">({driver.reviewCount})</span>
            </div>
            <div className="mx-2 text-gray-300">|</div>
            <span>
              경력 <span className="font-medium text-black">{driver.experienceYear}년</span>
            </span>
            <div className="mx-2 text-gray-300">|</div>
            <span>
              <span className="font-medium text-black">{driver.confirmedCount}건</span> 확정
            </span>
          </div>
        </div>
      </div>

      {/* 견적가 (md 이상) */}
      <div className="hidden items-center justify-end text-2xl font-extrabold text-gray-900 md:flex">
        <span className="mr-2 text-base font-medium text-gray-500">견적 금액</span>
        {price.toLocaleString()}원
      </div>

      {/* 견적 상태 및 가격 (sm) */}
      <div className="flex items-center justify-between py-2 md:hidden">
        <div className="font-['Pretendard'] text-base font-semibold text-gray-300">견적대기</div>
        <div className="flex text-lg font-extrabold text-gray-900">
          <span className="mt-1 mr-2 text-sm font-normal text-gray-500">견적 금액</span>
          {price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}
