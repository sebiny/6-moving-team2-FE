import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import ChipRectangle from "@/components/chip/ChipRectangle";
import useMediaHook from "@/hooks/useMediaHook";
import ReviewsInner from "./ReviewsInner";
import Button from "@/components/Button";
import ReviewCost from "./ReviewCost";
import { useLocale, useTranslations } from "next-intl";
import { getWritableReviews } from "@/lib/api/api-review";
import NoReview from "./NoReview";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import { ReviewableItem } from "@/types/reviewType";
import { translateWithDeepL } from "@/utills/translateWithDeepL";
import ReviewModal from "./ReviewModal";

type ReviewListResponse = {
  reviewableEstimates: ReviewableItem[];
  totalCount: number;
};
export default function Reviews() {
  const [isModal, setIsModal] = useState(false);
  const [selectedReviewable, setSelectedReviewable] = useState<ReviewableItem | null>(null);

  const t = useTranslations("Review");
  const locale = useLocale();
  const tC = useTranslations("Common");
  const [page, setPage] = useState<number>(1);
  const [translatedIntros, setTranslatedIntros] = useState<Record<string, string>>({});

  const { isSm, isMd, isLg } = useMediaHook();
  const { data, isLoading, isError } = useQuery<ReviewListResponse>({
    queryKey: ["reviewable", page],
    queryFn: () => getWritableReviews(page),
    staleTime: 1000 * 60 * 5
  });
  const totalCount = data?.totalCount ?? 0;
  const reviewables = data?.reviewableEstimates ?? [];
  console.log("reviewables", reviewables);
  console.log("reviewables", reviewables[0]);
  useEffect(() => {
    //병렬 요청
    const translateAllIntros = async () => {
      if (!reviewables.length || locale === "ko") return;

      try {
        const translationEntries = await Promise.all(
          reviewables.map(async (item) => {
            const shortIntro = item.estimates[0].driver.shortIntro;
            if (!shortIntro) return [item.id, ""];

            try {
              const translated = await translateWithDeepL(shortIntro, locale.toUpperCase());
              return [item.id, translated];
            } catch (e) {
              console.warn(`번역 실패 (ID: ${item.id})`, e);
              return [item.id, shortIntro]; // fallback
            }
          })
        );

        // 배열을 객체로 변환하여 상태 저장
        const translations = Object.fromEntries(translationEntries);
        setTranslatedIntros(translations);
      } catch (error) {
        console.error("전체 번역 실패", error);
      }
    };

    translateAllIntros();
  }, [reviewables, locale]);

  if (isLoading) {
    return <LoadingLottie className="mt-30" text={tC("writableLoading")} />;
  }

  if (isError || !reviewables || reviewables.length === 0) {
    return (
      <div className="mt-30 flex h-full items-center justify-center">
        <NoReview />
      </div>
    );
  }
  return (
    <section aria-labelledby="review-section-heading">
      <h2 id="review-section-heading" className="sr-only">
        {t("myReviewableList")}
      </h2>
      <div className="flex flex-col items-center gap-5">
        {reviewables.map((reviewable) => (
          <div
            key={reviewable.id}
            onClick={() => {
              setSelectedReviewable(reviewable); // 클릭 시 해당 항목 선택
              setIsModal(true); // 모달 열기
            }}
            className={clsx(
              "lg:h-[242px] lg:w-280 lg:gap-6 lg:px-10 lg:py-8",
              "h-[410px] w-[327px] px-5 py-6",
              "md:h-[316px] md:w-auto md:p-8",
              "border-line-100 mx-auto flex flex-col self-stretch rounded-[20px] border-[0.5px] bg-gray-50"
            )}
          >
            {isSm && !isMd && (
              <div className="mb-3 flex gap-2">
                <ChipRectangle moveType={reviewable.moveType} size="sm" />
                {reviewable.estimates[0].isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex justify-between gap-6">
                {isLg && (
                  <Image
                    className="order-2 rounded-[12px]"
                    src={reviewable.estimates[0].driver.profileImage ?? "/assets/images/img_profile.svg"}
                    alt="driverImg"
                    width={100}
                    height={100}
                    priority
                  />
                )}
                {isMd && !isLg && (
                  <Image
                    className="rounded-[12px] md:order-1"
                    src={reviewable.estimates[0].driver.profileImage ?? "/assets/images/img_profile.svg"}
                    alt="driverImg"
                    width={80}
                    height={80}
                  />
                )}
                {isSm && !isMd && (
                  <Image
                    className="order-2 rounded-[12px]"
                    src={reviewable.estimates[0].driver.profileImage ?? "/assets/images/img_profile.svg"}
                    alt="driverImg"
                    width={64}
                    height={64}
                  />
                )}

                <div className={clsx("order-1 md:order-2 lg:pt-[10px]", isSm && !isMd && "w-50")}>
                  <div className={clsx(isSm && !isMd && "flex-col", "flex gap-[6px]")}>
                    <Image src="/assets/icons/ic_driver.svg" width={16} height={18} alt="driver_icon" />
                    <p className="text-black-300 font-[Pretendard] text-[16px] leading-[26px] font-bold md:text-[18px]">
                      {reviewable.estimates[0].driver.nickname} {t("driver.title")}
                    </p>
                  </div>
                  <p className="line-clamp-1 self-stretch overflow-hidden font-[Pretendard] text-[12px] leading-[24px] font-normal text-ellipsis text-gray-500 md:text-[14px]">
                    {locale === "ko"
                      ? reviewable.estimates[0].driver.shortIntro
                      : (translatedIntros[reviewable.id] ?? "Loading...")}
                  </p>
                  {isMd && <ChipRectangle moveType={reviewable.moveType} size={isLg ? "md" : "sm"} className="mt-2" />}
                  {isMd && reviewable.estimates[0].isDesignated && (
                    <ChipRectangle moveType="REQUEST" size={isLg ? "md" : "sm"} className="mt-2 ml-2" />
                  )}
                </div>
              </div>

              {isLg && <ReviewCost cost={reviewable.estimates[0].price} />}
            </div>
            <ReviewsInner setIsModal={setIsModal} review={reviewable} />
            {isMd && !isLg && (
              <Button
                onClick={() => setIsModal(true)}
                type="orange"
                text={t("button.createReview")}
                className="mt-10 md:h-[54px] md:rounded-[12px] md:text-[16px] md:font-medium"
              />
            )}
            {isSm && !isMd && !isLg && (
              <ReviewCost cost={reviewable.estimates[0].price} className="border-line-200 mt-18 mb-5 border-t pt-3" />
            )}
            {isSm && !isMd && !isLg && (
              <Button
                onClick={() => setIsModal(true)}
                type="orange"
                text={t("button.createReview")}
                className="w-[287px] py-[16px] sm:rounded-[12px] sm:font-medium"
              />
            )}
            {isModal && selectedReviewable && (
              <ReviewModal
                setIsModal={setIsModal}
                driverId={selectedReviewable.estimates[0].driver.id}
                estimateRequestId={selectedReviewable.id}
                moveType={selectedReviewable.moveType}
                isDesignated={selectedReviewable.estimates[0].isDesignated}
                fromAddress={selectedReviewable.fromAddress}
                toAddress={selectedReviewable.toAddress}
                moveDate={selectedReviewable.moveDate}
                driverNickName={selectedReviewable.estimates[0].driver.nickname}
                driverProfileImage={selectedReviewable.estimates[0].driver.profileImage}
              />
            )}
          </div>
        ))}
        <div className="mt-10">
          <Pagination currentPage={page} setCurrentPage={setPage} totalReviews={totalCount} />
        </div>
      </div>
    </section>
  );
}
