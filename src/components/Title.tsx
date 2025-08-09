"use client";

import Image from "next/image";
import ChipRectangle from "./chip/ChipRectangle";
import EstimateStatus from "./chip/EstimateStatus";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { translateWithDeepL } from "@/utills/translateWithDeepL";
import { favoriteService } from "@/lib/api/api-favorite";

// 기사 정보 타입 정의
export interface DriverInfo {
  id: string;
  isFavorite: boolean;
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
  const locale = useLocale();
  const [translatedMessage, setTranslatedMessage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(driver.isFavorite ?? false);
  const [likeCount, setLikeCount] = useState<number>(driver.likes ?? 0);
  const [isToggling, setIsToggling] = useState(false);

  (useEffect(() => {
    const translate = async () => {
      try {
        const translated = await translateWithDeepL(message, locale.toUpperCase());
        setTranslatedMessage(translated);
      } catch {
        setTranslatedMessage(message); //fallback
      }
    };
    translate();
  }),
    [message, locale]);

  const handleToggleFavorite = async () => {
    if (isToggling) return;
    setIsToggling(true);

    try {
      if (isFavorite) {
        await favoriteService.deleteFavorite(driver.id);
        setIsFavorite(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        await favoriteService.createFavorite(driver.id);
        setIsFavorite(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("찜하기 오류", err);
    } finally {
      setIsToggling(false);
    }
  };

  const titleId = `driver-${driver.id}-title`;

  return (
    <section className="w-full" aria-labelledby={titleId}>
      {/* 스크린리더용 제목: 카드 요약 */}
      <h2 id={titleId} className="sr-only">
        {driver.name} {t("driver")} 견적 요약
      </h2>

      {/* 상단 라벨/상태 */}
      <header className="mb-2 flex items-center justify-between md:mb-0">
        {/* sm 전용 라벨 */}
        <div className="flex gap-2 md:hidden" aria-label="서비스 유형 라벨">
          {labels?.map((label) => (
            <ChipRectangle key={label} moveType={label} size="sm" />
          ))}
        </div>

        {status !== undefined && status !== "AUTO_REJECTED" && (
          <div className="md:hidden">
            <EstimateStatus status={status} />
          </div>
        )}
      </header>

      {/* sm 전용 메시지 */}
      <p className="text-lg font-semibold text-gray-900 md:hidden">{translatedMessage}</p>

      {/* md 이상 라벨 */}
      <div className="mb-4 hidden flex-wrap gap-2 md:flex" aria-label="서비스 유형 라벨">
        {labels?.map((label) => (
          <ChipRectangle key={label} moveType={label} size="md" />
        ))}
      </div>

      {/* md 이상 메시지 + 상태 */}
      <div className="hidden items-start justify-between md:flex">
        <p className="text-2xl font-semibold text-gray-900 md:max-w-[70%] lg:max-w-[100%]">{translatedMessage}</p>
        {status !== undefined && status !== "AUTO_REJECTED" && <EstimateStatus status={status} />}
      </div>

      {/* 구분선 */}
      <hr className="my-6 border-t border-gray-100" />

      {/* 기사 정보 - 상단 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-base text-gray-700 lg:text-lg">
          <Image src="/assets/icons/ic_profileMark.svg" alt="" aria-hidden="true" width={18} height={18} />
          <span className="font-semibold">
            {driver.name} {t("driver")}
          </span>
        </div>

        {/* 좋아요 토글: 버튼 + aria-pressed + 라이브 카운트 */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          className="flex items-center gap-1 text-base text-gray-500"
          disabled={isToggling}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "찜 취소" : "찜하기"}
        >
          <span aria-live="polite">{likeCount}</span>
          <Image
            src={isFavorite ? "/assets/icons/ic_like_black.svg" : "/assets/icons/ic_like_empty.svg"}
            alt=""
            aria-hidden="true"
            width={22}
            height={22}
          />
        </button>
      </div>

      {/* 기사 정보 - 평점, 경력, 확정 (단순 목록 표현) */}
      <ul className="flex items-center gap-1 text-sm text-gray-600" role="list">
        <li className="flex items-center gap-1">
          <Image src="/assets/icons/ic_star_yellow.svg" alt="" aria-hidden="true" width={14} height={14} />
          <span className="font-medium text-gray-800">{driver.rating.toFixed(1)}</span>
          <span className="text-gray-300">({driver.reviewCount})</span>
        </li>
        <li className="mx-1 text-gray-200" aria-hidden="true">
          |
        </li>
        <li className="flex gap-1 text-gray-300">
          {t("experience")}{" "}
          <span className="font-medium text-black">
            {driver.experienceYear}
            {t("year")}
          </span>
        </li>
        <li className="mx-1 text-gray-200" aria-hidden="true">
          |
        </li>
        <li className="flex gap-1 text-gray-300">
          <span className="font-medium text-black">
            {driver.confirmedCount}
            {t("count")}
          </span>
          {t("confirm")}
        </li>
      </ul>

      {/* 하단 견적가 (선택적으로 표시) */}
      {estimatePrice !== undefined && estimatePrice !== null && (
        <section aria-label="견적가" className="mt-6">
          <hr className="mb-6 border-t border-gray-100" />
          <div className="flex items-center justify-between md:justify-start md:gap-14">
            <p className="text-xl font-semibold text-gray-700">{t("estimateCost")}</p>
            <p className="text-2xl font-bold text-gray-900 sm:ml-2">
              {estimatePrice.toLocaleString()}
              {t("won")}
            </p>
          </div>
        </section>
      )}
    </section>
  );
}

export default Title;
