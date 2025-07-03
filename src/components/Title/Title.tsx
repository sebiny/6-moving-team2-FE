"use client";

import Image from "next/image";
import {
  iconAssets,
  statusIconMap,
  labelIconMap,
  LabelText,
  EstimateStatus,
} from "./LabelIcons";
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
      <div className="flex items-center mb-2">
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

      {/* 소개 메시지 + 상태 아이콘 */}
      <div className="flex justify-between gap-12">
        <p className="text-xl font-semibold text-gray-900">{message}</p>
        {status && (
          <Image
            src={statusIconMap[status]}
            alt={status}
            width={60}
            height={24}
          />
        )}
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 my-5" />

      {/* 기사 정보 - 상단 */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Image
            src={iconAssets.profileMark}
            alt="기사마크"
            width={18}
            height={18}
          />
          <span className="font-semibold">{driver.name} 기사님</span>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <span>{driver.likes}</span>
          <Image
            src={iconAssets.heartBlack}
            alt="좋아요"
            width={16}
            height={16}
          />
        </div>
      </div>

      {/* 기사 정보 - 평점, 경력, 확정 */}
      <div className="flex items-center text-sm text-gray-600 gap-1">
        <Image src={iconAssets.star} alt="별점" width={14} height={14} />
        <span className="text-gray-800 font-medium">
          {driver.rating.toFixed(1)}
        </span>
        <span className="text-gray-300">({driver.reviewCount})</span>
        <span className="mx-1 text-gray-200">|</span>
        <span className="text-gray-300 flex gap-1">
          경력{" "}
          <span className="text-black font-medium">
            {driver.experienceYear}년
          </span>
        </span>
        <span className="mx-1 text-gray-200">|</span>
        <span className="flex gap-1 text-gray-300">
          <span className="text-black font-medium">
            {driver.confirmedCount}건
          </span>
          확정
        </span>
      </div>

      {/* 하단 견적가 (선택적으로 표시) */}
      {estimatePrice !== undefined && estimatePrice !== null && (
        <>
          <div className="border-t border-gray-200 my-5" />
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-4 text-gray-700 text-sm">
              <p className="text-lg font-medium">견적가</p>
              <p className="text-2xl font-bold text-gray-900 ml-2">
                {estimatePrice.toLocaleString()}원
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Title;
