"use client";

import Image from "next/image";
import EstimateStatus from "@/components/chip/EstimateStatus";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Estimate } from "@/types/estimateType";
import { MoveType } from "@/constant/moveTypes";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { useEffect, useState } from "react";
import { translateWithDeepL } from "@/utills/translateWithDeepL";
import { favoriteService } from "@/lib/api/api-favorite";

interface Props {
  data: Estimate;
  moveType: MoveType;
}

export default function ReceivedEstimate({ data, moveType }: Props) {
  const t = useTranslations("MyEstimates");
  const router = useRouter();
  const { driver, comment, price, status, id, isDesignated } = data;
  const locale = useLocale();

  const [translatedMessage, setTranslatedMessage] = useState<string | null>(null);
  (useEffect(() => {
    const translate = async () => {
      try {
        const translated = await translateWithDeepL(comment, locale.toUpperCase());
        setTranslatedMessage(translated);
      } catch {
        setTranslatedMessage(comment); //fallback
      }
    };
    translate();
  }),
    [comment, locale]);
  // 라벨 목록 구성
  const labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[] =
    isDesignated && moveType !== "REQUEST" ? [moveType, "REQUEST"] : [moveType];

  const goDetail = () => {
    router.push(`/customer/my-estimates/estimate-past/${id}`);
  };

  const [isFavorite, setIsFavorite] = useState<boolean>(driver.isFavorite ?? false);
  const [favoriteCount, setFavoriteCount] = useState<number>(driver.favoriteCount ?? 0);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setIsFavorite(driver.isFavorite ?? false);
    setFavoriteCount(driver.favoriteCount ?? 0);
  }, [driver]);

  const handleToggleFavorite = async () => {
    if (isToggling) return;
    setIsToggling(true);
    try {
      if (isFavorite) {
        await favoriteService.deleteFavorite(driver.id);
        setIsFavorite(false);
        setFavoriteCount((prev) => Math.max(0, prev - 1));
      } else {
        await favoriteService.createFavorite(driver.id);
        setIsFavorite(true);
        setFavoriteCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("찜하기 실패", error);
      alert("찜하기에 실패했습니다.");
    } finally {
      setIsToggling(false);
    }
  };

  const titleId = `received-estimate-${id}-title`;

  return (
    <article className="w-full space-y-3 bg-white md:space-y-4" aria-labelledby={titleId}>
      {/* 라벨 목록 */}
      <div className="flex gap-2 md:hidden" aria-label="서비스 유형 라벨">
        {labels.map((label) => (
          <ChipRectangle key={label} moveType={label} size="sm" />
        ))}
      </div>
      <div className="hidden gap-2 md:flex" aria-label="서비스 유형 라벨">
        {labels.map((label) => (
          <ChipRectangle key={label} moveType={label} size="md" />
        ))}
      </div>

      {/* 제목/상태 */}
      <header className="flex items-center justify-between">
        {/* 스크린리더용 카드 제목(요약) */}
        <h3 id={titleId} className="sr-only">
          {driver.authUser.name} {t("driver")} 견적, {price.toLocaleString()}
          {t("won")} — 상태 {status}
        </h3>

        {/* 소개 메시지 버튼(키보드 접근 가능) */}
        <button
          type="button"
          onClick={goDetail}
          className="cursor-pointer text-left text-base font-semibold text-gray-800 hover:text-orange-400 hover:underline lg:text-xl"
          aria-label="견적 상세 보기"
        >
          {translatedMessage}
        </button>

        <div className="hidden md:block">
          <EstimateStatus status={status} />
        </div>
      </header>

      {/* 기사 프로필 카드 */}
      <div className="flex items-center rounded-lg border border-gray-200 px-4 py-3">
        <Image
          src={driver.profileImage ?? "/assets/icons/ic_profile_bear.svg"}
          alt={`${driver.authUser.name} 기사 프로필 사진`}
          width={48}
          height={48}
          className="mr-3"
        />

        <div className="flex w-full flex-col">
          {/* 이름 + 좋아요 */}
          <div className="flex items-center justify-between text-base font-medium">
            <div className="flex items-center gap-1">
              <Image src="/assets/icons/ic_profileMark.svg" alt="" aria-hidden="true" width={16} height={16} />
              <span>
                {driver.authUser.name} {t("driver")}
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleFavorite}
              className="flex items-center gap-1"
              disabled={isToggling}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? "찜 취소" : "찜하기"}
            >
              <Image
                src={isFavorite ? "/assets/icons/ic_like_black.svg" : "/assets/icons/ic_like_empty.svg"}
                alt=""
                aria-hidden="true"
                width={22}
                height={22}
              />
              <span aria-live="polite">{favoriteCount}</span>
            </button>
          </div>

          {/* 평점/경력/확정 */}
          <ul className="mt-2 flex text-xs text-gray-400" role="list">
            <li className="flex items-center gap-1">
              <Image src="/assets/icons/ic_star_yellow.svg" alt="" aria-hidden="true" width={16} height={16} />
              <span className="flex gap-0.5 font-medium text-black">{driver.avgRating?.toFixed(1) ?? "0.0"}</span>
              <span className="text-gray-400">({driver.reviewCount})</span>
            </li>
            <li className="mx-2 text-gray-300" aria-hidden="true">
              |
            </li>
            <li>
              {t("experience")}
              <span className="font-medium text-black">
                {driver.career}
                {t("year")}
              </span>
            </li>
            <li className="mx-2 text-gray-300" aria-hidden="true">
              |
            </li>
            <li>
              <span className="font-medium text-black">
                {driver.work}
                {t("count")}
              </span>{" "}
              {t("confirm")}
            </li>
          </ul>
        </div>
      </div>

      {/* 견적가 (md 이상) */}
      <section
        className="hidden items-center justify-end text-2xl font-extrabold text-gray-900 md:flex"
        aria-label="견적가"
      >
        <span className="mr-2 text-base font-medium text-gray-500">{t("estimateCost")}</span>
        {price.toLocaleString()}
        {t("won")}
      </section>

      {/* 견적 상태 및 가격 (sm) */}
      <div className="flex items-center justify-between py-2 md:hidden">
        <EstimateStatus status={status} />
        <div className="flex text-lg font-extrabold text-gray-900" aria-label="견적가">
          <span className="mt-1 mr-2 text-sm font-normal text-gray-500">{t("estimateCost")}</span>
          {price.toLocaleString()}
          {t("won")}
        </div>
      </div>
    </article>
  );
}
