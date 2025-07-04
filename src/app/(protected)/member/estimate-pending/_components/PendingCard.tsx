"use client";

import Image from "next/image";
import { PendingData } from "./PendingData";
import { iconAssets, labelIconMap } from "../../../../../components/title/LabelIcons";

interface Props {
  data: PendingData;
}

export default function PendingCard({ data }: Props) {
  const { labels, driver, message, from, to, date, price } = data;

  return (
    <div className="w-full space-y-6 rounded-xl bg-white px-10 py-8 shadow-lg">
      {/* 라벨 */}
      <div className="mb-2 flex">
        {labels.map((label) => (
          <Image key={label} src={labelIconMap[label]} alt={label} width={90} height={24} />
        ))}
      </div>

      {/* 소개 메시지 */}
      <p className="text-lg font-semibold text-gray-800">{message}</p>

      {/* 기사 프로필 */}
      <div className="flex items-start gap-3">
        {/* 프로필 이미지 */}
        <Image src={driver.imageUrl} alt="기사 프로필" width={48} height={48} />

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
          <div className="flex text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <Image src={iconAssets.star} alt="별점" width={16} height={16} />
              <span className="flex gap-0.5">
                <span className="font-medium text-black">{driver.rating.toFixed(1)}</span>({driver.reviewCount})
              </span>
            </div>
            <div className="mx-1.5 text-gray-100">|</div>
            <span>
              경력 <span className="font-medium text-black">{driver.experienceYear}년</span>
            </span>
            <div className="mx-1.5 text-gray-100">|</div>
            <span>
              <span className="font-medium text-black">{driver.confirmedCount}건</span> 확정
            </span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-5 border-t border-gray-100" />

      {/* 출발지/도착지/이사일 */}
      <div className="flex justify-between">
        {/* 출발지 + 도착지 */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-20">
            {/* 출발지 라벨 */}
            <span className="text-[14px] text-gray-400">출발지</span>
            {/* 도착지 라벨 */}
            <span className="text-[14px] text-gray-400">도착지</span>
          </div>
          <div className="flex items-center gap-3">
            {/* 출발지 텍스트 */}
            <span className="text-[16px] font-semibold text-gray-900">{from}</span>
            {/* 화살표 이미지 */}
            <Image src="/assets/icons/ic_arrow.svg" alt="화살표" width={17} height={17} />
            {/* 도착지 텍스트 */}
            <span className="text-[16px] font-semibold text-gray-900">{to}</span>
          </div>
        </div>

        {/* 이사일 */}
        <div className="flex flex-col gap-1 text-left">
          <span className="text-[14px] text-gray-400">이사일</span>
          <p className="text-[16px] font-semibold text-gray-900">{date}</p>
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-6 border-t border-gray-100" />

      {/* 가격 */}
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-gray-700">견적 금액</span>
        <span className="text-[24px] font-bold text-gray-900">{price.toLocaleString()}원</span>
      </div>

      {/* 버튼 - 버튼 컴포넌트 받으면 다시 연결할 예정 */}
      <div className="mt-10 flex gap-3">
        <button className="flex-1 rounded-xl border border-orange-500 py-3 font-semibold text-orange-500">
          상세보기
        </button>
        <button className="flex-1 rounded-xl bg-orange-500 py-4 font-semibold text-white">견적 확정하기</button>
      </div>
    </div>
  );
}
