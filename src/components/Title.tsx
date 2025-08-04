"use client";

import Image from "next/image";
import ChipRectangle from "./chip/ChipRectangle";
import EstimateStatus from "./chip/EstimateStatus";
import { useTranslations } from "next-intl";

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
  status?: "PROPOSED" | "AUTO_REJECTED" | "ACCEPTED";
  labels?: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[];
  driver: DriverInfo;
  message: string;
  estimatePrice?: number;
}

function Title({ status, labels, driver, message, estimatePrice }: TitleProps) {
  const t = useTranslations("MyEstimates");
  return (
    <div className="w-full">
      {/* sm 전용 */}
      <div className="mb-2 flex items-center justify-between md:hidden">
        <div className="flex gap-2">
          {labels?.map((label) => (
            <ChipRectangle key={label} moveType={label} size="sm" />
          ))}
        </div>
        {status !== undefined && status !== "AUTO_REJECTED" && <EstimateStatus status={status} />}
      </div>

      {/* sm 전용 */}
      <div className="text-lg font-semibold text-gray-900 md:hidden">{message}</div>

      {/* md 이상 */}
      <div className="mb-4 hidden flex-wrap gap-2 md:flex">
        {labels?.map((label) => (
          <ChipRectangle key={label} moveType={label} size="md" />
        ))}
      </div>

      {/* md 이상 */}
      <div className="hidden justify-between md:flex">
        <p className="text-2xl font-semibold text-gray-900 md:max-w-[70%] lg:max-w-[100%]">{message}</p>
        {status !== undefined && status !== "AUTO_REJECTED" && <EstimateStatus status={status} />}
      </div>

      {/* 구분선 */}
      <div className="my-6 border-t border-gray-100" />

      {/* 기사 정보 - 상단 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-base text-gray-700 lg:text-lg">
          <Image src="/assets/icons/ic_profileMark.svg" alt="기사마크" width={18} height={18} />
          <span className="font-semibold">
            {driver.name} {t("driver")}
          </span>
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
          {t("experience")}{" "}
          <span className="font-medium text-black">
            {driver.experienceYear}
            {t("year")}
          </span>
        </span>
        <span className="mx-1 text-gray-200">|</span>
        <span className="flex gap-1 text-gray-300">
          <span className="font-medium text-black">
            {driver.confirmedCount}
            {t("count")}
          </span>
          {t("confirm")}
        </span>
      </div>

      {/* 하단 견적가 (선택적으로 표시) */}
      {estimatePrice !== undefined && estimatePrice !== null && (
        <>
          <div className="my-6 border-t border-gray-100" />
          <div className="flex items-center justify-between md:justify-start md:gap-14">
            <p className="text-xl font-semibold text-gray-700">{t("estimateCost")}</p>
            <p className="text-2xl font-bold text-gray-900 sm:ml-2">
              {estimatePrice.toLocaleString()}
              {t("won")}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Title;
