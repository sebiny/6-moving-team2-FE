"use client";

import Image from "next/image";
import Button from "@/components/Button";
import EstimateStatus from "@/components/chip/EstimateStatus";
import { useRouter } from "next/navigation";
import { MoveType } from "@/constant/moveTypes";
import { Estimate } from "@/types/estimateType";
import { useAcceptEstimate } from "@/lib/api/api-myEstimate";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { useEffect, useState } from "react";
import AlertModal from "@/components/common-modal/AlertModal";
import { useLocale, useTranslations } from "next-intl";
import { translateWithDeepL } from "@/utills/translateWithDeepL";
import { favoriteService } from "@/lib/api/api-favorite";

interface Props {
  data: Estimate;
  moveType: MoveType;
}

export default function PendingCard({ data, moveType }: Props) {
  const t = useTranslations("MyEstimates");
  const tC = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();

  const { driver, price, status, id, isDesignated } = data;

  // 라벨 목록 구성
  const labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[] =
    isDesignated && moveType !== "REQUEST" ? [moveType, "REQUEST"] : [moveType];
  const { mutate: acceptEstimate } = useAcceptEstimate();

  const [translatedComment, setTranslatedComment] = useState<string | null>(null);
  (useEffect(() => {
    const translate = async () => {
      try {
        const translated = await translateWithDeepL(data.comment, locale.toUpperCase());
        setTranslatedComment(translated);
      } catch {
        setTranslatedComment(data.comment); //fallback
      }
    };
    translate();
  }),
    [data.comment, locale]);

  const [showModal, setShowModal] = useState(false);

  const safeDriverId = driver?.id ?? null;

  const [isFavorite, setIsFavorite] = useState<boolean>(driver?.isFavorite ?? false);
  const [favoriteCount, setFavoriteCount] = useState<number>(driver?.favoriteCount ?? 0);
  const [busy, setBusy] = useState(false);

  const handleToggleFavorite = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (busy || !safeDriverId) return;

    setBusy(true);
    try {
      if (isFavorite) {
        await favoriteService.deleteFavorite(safeDriverId);
        setIsFavorite(false);
        setFavoriteCount((prev) => Math.max(0, prev - 1));
      } else {
        await favoriteService.createFavorite(safeDriverId);
        setIsFavorite(true);
        setFavoriteCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("찜하기 실패:", err);
    } finally {
      setBusy(false);
    }
  };

  const ClickDetail = () => {
    router.push(`/customer/my-estimates/estimate-pending/${id}`);
  };

  const titleId = `estimate-${id}-title`;

  return (
    <article
      className="w-full space-y-4 rounded-2xl bg-white shadow-lg sm:p-5 md:px-8 md:py-6 lg:px-10 lg:py-8"
      aria-labelledby={titleId}
    >
      {/* 스크린리더용 카드 요약 제목 */}
      <h3 id={titleId} className="sr-only">
        {driver?.authUser?.name} {t("driver")} 견적, {price.toLocaleString()}
        {t("won")}
      </h3>

      {/* 라벨 + 상태 */}
      <header className="mb-2 flex items-center justify-between">
        <div className="flex flex-wrap items-center">
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
        </div>
        <EstimateStatus status={status} />
      </header>

      {/* 소개 메시지 */}
      <p className="mt-4 font-semibold text-gray-800 sm:text-[16px] lg:text-[19px]">
        {translatedComment ?? data.comment}
      </p>

      {/* 기사 프로필 */}
      <div className="flex items-start gap-3">
        <Image
          src={driver.profileImage ?? "/assets/icons/ic_profile_bear.svg"}
          alt={`${driver.authUser.name} 기사 프로필 사진`}
          width={50}
          height={50}
        />

        <div className="flex-1 space-y-2">
          {/* 이름 + 좋아요 */}
          <div className="flex items-center justify-between font-medium">
            <div className="flex items-center gap-1">
              <Image src="/assets/icons/ic_profileMark.svg" alt="" width={16} height={16} aria-hidden="true" />
              <span>
                {driver.authUser.name} {t("driver")}
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleFavorite}
              className="flex items-center text-base font-normal text-gray-500"
              disabled={busy}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? "찜 취소" : "찜하기"}
            >
              <Image
                src={isFavorite ? "/assets/icons/ic_like_red.svg" : "/assets/icons/ic_like_empty.svg"}
                alt=""
                width={23}
                height={23}
                aria-hidden="true"
              />
              <span className="ml-1" aria-live="polite">
                {favoriteCount}
              </span>
            </button>
          </div>

          {/* 평점/경력/확정 */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Image src="/assets/icons/ic_star_yellow.svg" alt="" width={16} height={16} aria-hidden="true" />
              <span className="flex gap-0.5">
                <span className="font-medium text-black">{driver.avgRating ? driver.avgRating.toFixed(1) : "0.0"}</span>
                ({driver.reviewCount})
              </span>
            </div>
            <span className="text-gray-100" aria-hidden="true">
              |
            </span>
            <span>
              {t("experience")}{" "}
              <span className="font-medium text-black">
                {driver.career}
                {t("year")}
              </span>
            </span>
            <span className="text-gray-100" aria-hidden="true">
              |
            </span>
            <span>
              <span className="font-medium text-black">
                {driver.work}
                {t("count")}
              </span>{" "}
              {t("confirm")}
            </span>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <hr className="my-7 border-t border-gray-100" />

      {/* 가격 */}
      <div className="flex items-center justify-between" aria-label="제안 가격">
        <span className="text-base font-medium text-gray-700">{t("proposedCost")}</span>
        <span className="text-[24px] font-bold text-gray-900">
          {price.toLocaleString()}
          {t("won")}
        </span>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-10 flex w-full flex-col gap-3 md:flex-row md:gap-3">
        <div className="order-1 w-full md:order-2 md:w-1/2">
          <Button
            type="orange"
            text={t("acceptEstimate")}
            onClick={() =>
              acceptEstimate(id, {
                onSuccess: () => setShowModal(true),
                onError: (error: any) => {
                  alert(error.message || "견적 확정 중 오류가 발생했습니다.");
                }
              })
            }
            aria-label="견적 확정하기"
          />
        </div>

        {showModal && (
          <div
            className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            <AlertModal
              type="handleClick"
              message={tC("pendingCardMsg")}
              buttonText={tC("pendingCardBtn")}
              onClose={() => setShowModal(false)}
              onConfirm={() => router.push("/customer/my-estimates?tab=past")}
            />
          </div>
        )}

        <div className="order-2 w-full md:order-1 md:w-1/2">
          <Button type="white-orange" text={t("viewDetail")} onClick={ClickDetail} aria-label="상세보기" />
        </div>
      </div>
    </article>
  );
}
