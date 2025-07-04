"use client";

import Image from "next/image";
import { iconAssets, statusIconMap, labelIconMap, LabelText, EstimateStatus } from "./LabelIcons";
import { DriverInfo } from "./TitleData";

interface TitleProps {
  status?: EstimateStatus;
  labels: LabelText[];
  driver: DriverInfo;
  message: string;
  estimatePrice?: number;
}

function Title({ status, labels, driver, message, estimatePrice }: TitleProps) {
  return (
    <div className="w-full">
      {/* 상단 라벨 */}
      <div className="mb-2 flex items-center">
        {labels.map((label) => (
          <Image key={label} src={labelIconMap[label]} alt={label} width={90} height={24} />
        ))}
      </div>

      {/* 소개 메시지 + 상태 아이콘 */}
      <div className="flex justify-between">
        <p className="text-xl font-semibold text-gray-900">{message}</p>
        {status && <Image src={statusIconMap[status]} alt={status} width={60} height={24} />}
      </div>

      {/* 구분선 */}
      <div className="my-5 border-t border-gray-200" />

      {/* 기사 정보 - 상단 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-base text-gray-700">
          <Image src={iconAssets.profileMark} alt="기사마크" width={18} height={18} />
          <span className="font-semibold">{driver.name} 기사님</span>
        </div>

        <div className="flex items-center gap-0.5 text-base text-gray-500">
          <span>{driver.likes}</span>
          <Image src={iconAssets.heartBlack} alt="좋아요" width={22} height={22} />
        </div>
      </div>

      {/* 기사 정보 - 평점, 경력, 확정 */}
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <Image src={iconAssets.star} alt="별점" width={14} height={14} />
        <span className="font-medium text-gray-800">{driver.rating.toFixed(1)}</span>
        <span className="text-gray-300">({driver.reviewCount})</span>
        <span className="mx-1 text-gray-200">|</span>
        <span className="flex gap-1 text-gray-300">
          경력 <span className="font-medium text-black">{driver.experienceYear}년</span>
        </span>
        <span className="mx-1 text-gray-200">|</span>
        <span className="flex gap-1 text-gray-300">
          <span className="font-medium text-black">{driver.confirmedCount}건</span>
          확정
        </span>
      </div>

      {/* 하단 견적가 (선택적으로 표시) */}
      {estimatePrice !== undefined && estimatePrice !== null && (
        <>
          <div className="my-5 border-t border-gray-200" />
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-14 text-sm text-gray-700">
              <p className="text-lg font-medium">견적가</p>
              <p className="ml-2 text-2xl font-bold text-gray-900">{estimatePrice.toLocaleString()}원</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Title;
