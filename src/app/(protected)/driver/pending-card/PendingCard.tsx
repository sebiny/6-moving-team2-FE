"use client";

import Image from "next/image";
import { PendingData } from "./PendingData";
import { iconAssets, labelIconMap } from "../../../../components/Title/LabelIcons";

interface Props {
  data: PendingData;
}

export default function PendingCard({ data }: Props) {
  const { labels, driver, message, from, to, date, price } = data;

  return (
    <div className="w-full bg-white rounded-xl px-10 py-8 space-y-4 shadow-lg">
      {/* 라벨 */}
      <div className="flex mb-2">
        {labels.map((label) => (
          <Image
            key={label}
            src={labelIconMap[label]}
            alt={label}
            width={90}
            height={24}
          />
        ))}
      </div>

      {/* 소개 메시지 */}
      <p className="text-base font-semibold text-gray-800">{message}</p>

      {/* 기사 프로필 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={driver.imageUrl}
            alt="기사 프로필"
            width={48}
            height={48}
          />
          <div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Image
                src={iconAssets.profileMark}
                alt="기사 마크"
                width={16}
                height={16}
              />
              <span>{driver.name} 기사님</span>
            </div>
            <div className="text-xs text-gray-300 flex mt-1">
              <div className="flex items-center gap-1">
                <Image
                  src={iconAssets.star}
                  alt="별점"
                  width={14}
                  height={14}
                />
                <span className="flex gap-0.5"><span className="text-black font-medium">{driver.rating.toFixed(1)}</span>({driver.reviewCount})</span>
              </div>
              <div className="mx-1.5 text-gray-100">|</div>
              <span>경력 <span className="text-black font-medium">{driver.experienceYear}년</span></span>
              <div className="mx-1.5 text-gray-100">|</div>
              <span><span className="text-black font-medium">{driver.confirmedCount}건</span> 확정</span>
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-1">{driver.likes}</span>
          <Image src="/assets/icons/ic_like_red.svg" alt="찜" width={16} height={16} />
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-100 my-5" />

      {/* 출발지/도착지/이사일 */}
        <div className="flex justify-between items-start">
          <div className="flex gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-[14px]">출발지</span>
              <span className="text-gray-900 text-[16px] font-semibold">{from}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-400 text-[14px]">도착지</span>
              <span className="text-gray-900 text-[16px] font-semibold">{to}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 text-[14px]">이사일</span>
            <p className="text-gray-900 text-[16px] font-semibold">{date}</p>
          </div>
        </div>

      {/* 구분선 */}
      <div className="border-t border-gray-100 my-5" />

      {/* 가격 */}
      <div className="flex justify-between items-center">
        <span className="text-base text-gray-700">견적 금액</span>
        <span className="text-xl font-bold text-gray-900">{price.toLocaleString()}원</span>
      </div>

      {/* 버튼 - 버튼 컴포넌트 받으면 다시 연결할 예정 */}
      <div className="flex gap-3 mt-10">
        <button className="flex-1 border border-orange-500 text-orange-500 py-3 rounded-lg font-semibold">
          상세보기
        </button>
        <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold">
          견적 확정하기
        </button>
      </div>
    </div>
  );
}
