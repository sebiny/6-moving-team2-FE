"use client";

import Image from "next/image";
import ChipRectangle from "./chip/ChipRectangle";
import EstimateStatus from "./chip/EstimateStatus";

// 기사 정보 타입 정의
export interface DriverInfo {
  name: string;
  rating: number;
  reviewCount: number;
  experienceYear: number;
  confirmedCount: number;
  likes: number;
}

// 전체 Title 정보 타입 정의
interface TitleProps {
<<<<<<< HEAD:src/components/Title.tsx
  status?: "PROPOSED" | "AUTO_REJECTED" | "ACCEPTED";
  labels: ("small" | "home" | "office" | "request")[];
=======
  status?: EstimateStatus;
  labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[];
>>>>>>> 05d7631ab1f217e1a53451c01a70373899ddca37:src/components/title/Title.tsx
  driver: DriverInfo;
  message: string;
  estimatePrice?: number;
}

function Title({ status, labels, driver, message, estimatePrice }: TitleProps) {
  return (
    <div className="w-full">
      {/* sm 전용 */}
      <div className="mb-2 flex items-center justify-between md:hidden">
        <div className="flex gap-2">
<<<<<<< HEAD:src/components/Title.tsx
          {labels.map((label) => (
            <ChipRectangle key={label} moveType={label} size="sm" />
          ))}
=======
          <ChipRectangle moveType="SMALL" size="sm" />
          <ChipRectangle moveType="REQUEST" size="sm" />
>>>>>>> 05d7631ab1f217e1a53451c01a70373899ddca37:src/components/title/Title.tsx
        </div>
        {status && <EstimateStatus status={status} />}
      </div>

      {/* sm 전용 */}
      <div className="text-lg font-semibold text-gray-900 md:hidden">{message}</div>

      {/* md 이상 */}
      <div className="mb-2 flex-wrap gap-2 sm:hidden md:flex">
<<<<<<< HEAD:src/components/Title.tsx
        {labels.map((label) => (
          <ChipRectangle key={label} moveType={label} size="md" />
        ))}
=======
        <ChipRectangle moveType="SMALL" size="md" />
        <ChipRectangle moveType="REQUEST" size="md" />
>>>>>>> 05d7631ab1f217e1a53451c01a70373899ddca37:src/components/title/Title.tsx
      </div>

      {/* md 이상 */}
      <div className="flex justify-between sm:hidden md:flex">
        <p className="text-xl font-semibold text-gray-900">{message}</p>
        {status && <EstimateStatus status={status} />}
      </div>

      {/* 구분선 */}
      <div className="my-5 border-t border-gray-100" />

      {/* 기사 정보 - 상단 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-base text-gray-700">
          <Image src="/assets/icons/ic_profileMark.svg" alt="기사마크" width={18} height={18} />
          <span className="font-semibold">{driver.name} 기사님</span>
        </div>

        <div className="flex items-center gap-0.5 text-base text-gray-500">
          <span>{driver.likes}</span>
          <Image src="/assets/icons/ic_like_black.svg" alt="좋아요" width={22} height={22} />
        </div>
      </div>

      {/* 기사 정보 - 평점, 경력, 확정 */}
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <Image src="/assets/icons/ic_star_yellow.svg" alt="별점" width={14} height={14} />
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
          <div className="my-5 border-t border-gray-100" />
          <div className="flex items-center justify-between md:justify-start md:gap-14">
            <p className="text-lg font-medium text-gray-700">견적가</p>
            <p className="text-2xl font-bold text-gray-900 sm:ml-2">{estimatePrice.toLocaleString()}원</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Title;
