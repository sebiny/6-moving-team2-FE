// 견적 상태 데이터 연결 시 수정

"use client";

import Image from "next/image";
import { ReceivedEstimateData } from "./ReceivedEstimateData";
import { labelIconMap, statusIconMap, iconAssets } from "@/components/title/LabelIcons";

interface Props {
  data: ReceivedEstimateData;
}

export default function ReceivedEstimate({ data }: Props) {
  const { labels, driver, message, price, status } = data;

  return (
    <div className="w-full space-y-4 bg-white px-6 py-5">
      {/* 라벨 목록 */}
      <div className="flex gap-2">
        {labels.map((label) => (
          <Image key={label} src={labelIconMap[label]} alt={label} width={90} height={24} />
        ))}
      </div>

      {/* 소개 메시지 */}
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-gray-800">{message}</p>
        <div className="font-['Pretendard'] text-base leading-relaxed font-semibold text-neutral-400">견적대기</div>
      </div>

      {/* 기사 프로필 */}
      <div className="flex items-center rounded-lg border px-4 py-3">
        {/* 기사 이미지 */}
        <Image src={driver.imageUrl} alt="기사 프로필" width={48} height={48} className="mr-3" />

        {/* 기사 정보 전체 */}
        <div className="flex w-full flex-col">
          {/* 이름 + 좋아요 */}
          <div className="flex items-center justify-between text-base font-medium">
            {/* 왼쪽: 이름 + 마크 */}
            <div className="flex items-center gap-1">
              <Image src={iconAssets.profileMark} alt="기사 마크" width={16} height={16} />
              <span>{driver.name} 기사님</span>
            </div>

            {/* 오른쪽: 좋아요 */}
            <div className="flex items-center gap-1">
              <Image src="/assets/icons/ic_like_empty.svg" alt="찜 아이콘" width={25} height={25} />
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

      {/* 견적 상태 및 가격 */}
      <div className="flex justify-end text-2xl font-extrabold text-gray-900">
        <span className="mt-2 mr-2 text-sm font-medium text-gray-500">견적 금액</span>
        {price.toLocaleString()}원
      </div>
    </div>
  );
}
