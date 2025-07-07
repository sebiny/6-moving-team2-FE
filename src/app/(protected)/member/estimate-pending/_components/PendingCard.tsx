"use client";

import Image from "next/image";
import { PendingData } from "./PendingData";
import { iconAssets, labelIconMap } from "@/components/title/LabelIcons";

interface Props {
  data: PendingData;
}

export default function PendingCard({ data }: Props) {
  const { labels, driver, message, from, to, date, price } = data;

  return (
    <div className="w-full space-y-6 rounded-2xl bg-white shadow-lg sm:p-4 md:px-8 md:py-6 lg:px-10 lg:py-8">
      {/* 라벨 + 상태 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {labels.map((label) => (
            <Image key={label} src={labelIconMap[label]} alt={label} width={90} height={24} />
          ))}
        </div>
        <span className="text-sm text-gray-300">견적대기</span>
      </div>

      {/* 소개 메시지 */}
      <p className="font-semibold text-gray-800 sm:text-[16px] lg:text-[18px]">{message}</p>

      {/* 기사 프로필 */}
      <div className="flex items-start gap-3">
        {/* 프로필 이미지 */}
        <Image src={driver.imageUrl} alt="기사 프로필" width={50} height={50} />

        {/* 기사 정보 영역 */}
        <div className="flex-1 space-y-2">
          {/* 이름 + 좋아요 */}
          <div className="flex items-center justify-between font-medium">
            {/* 기사 이름 */}
            <div className="flex items-center gap-1">
              <Image src={iconAssets.profileMark} alt="기사 마크" width={16} height={16} />
              <span>{driver.name} 기사님</span>
            </div>

            {/* 좋아요 */}
            <div className="flex items-center text-base font-normal text-gray-500">
              <Image src="/assets/icons/ic_like_red.svg" alt="찜" width={23} height={23} />
              <span className="ml-1">{driver.likes}</span>
            </div>
          </div>

          {/* 평점/경력/확정 */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Image src={iconAssets.star} alt="별점" width={16} height={16} />
              <span className="flex gap-0.5">
                <span className="font-medium text-black">{driver.rating.toFixed(1)}</span>({driver.reviewCount})
              </span>
            </div>
            <span className="text-gray-100">|</span>
            <span>
              경력 <span className="font-medium text-black">{driver.experienceYear}년</span>
            </span>
            <span className="text-gray-100">|</span>
            <span>
              <span className="font-medium text-black">{driver.confirmedCount}건</span> 확정
            </span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-7 border-t border-gray-100" />

      {/* 가격 */}
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-gray-700">견적 금액</span>
        <span className="text-[24px] font-bold text-gray-900">{price.toLocaleString()}원</span>
      </div>

      {/* 버튼 - 반응형 대응 */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button className="order-2 flex-1 rounded-xl border border-orange-500 py-4.5 font-semibold text-orange-500 sm:order-1">
          상세보기
        </button>
        <button className="order-1 flex-1 rounded-xl bg-orange-500 py-4.5 font-semibold text-white sm:order-2">
          견적 확정하기
        </button>
      </div>
    </div>
  );
}
