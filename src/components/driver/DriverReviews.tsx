"use client";
import React, { useState } from "react";
import DriverReview from "./DriverReview";
import StarIcon from "../icon/StarIcon";
import Pagination from "../Pagination";
import { DriverType } from "@/types/driverType";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { driverService } from "@/lib/api/api-driver";
import { ReviewType } from "@/types/reviewType";
import { useTranslations } from "next-intl";
import DriverReviewSkeleton from "./DriverReviewSkeleton";

interface ReviewsType {
  driver: DriverType;
}

function DriverReviews({ driver }: ReviewsType) {
  const [page, setPage] = useState<number>(1);
  const t = useTranslations("FindDriver.driverPage");

  const {
    data: reviews,
    isPending,
    isFetching,
    isPlaceholderData
  } = useQuery<ReviewType[] | null, Error>({
    queryKey: ["reviews", driver.id, page],
    queryFn: () => driverService.getDriverReviews(driver.id, page),
    placeholderData: keepPreviousData
  });

  if (!reviews)
    return (
      <section role="alert" aria-live="assertive" className="mb-50">
        <p>{t("reviewFetchFailed")}</p>
      </section>
    );

  function StarBar(count: number) {
    return (count / driver.reviewCount) * 100;
  }

  const levels = [5, 4, 3, 2, 1] as const;

  return (
    <section className="mb-50" aria-label={t("reviewSection")}>
      <h2 className="text-black-400 text-xl font-semibold">{t("review")}</h2>

      {isPending || isFetching ? (
        <div className="mt-8 space-y-4" role="status" aria-live="polite" aria-busy="true">
          {[...Array(3)].map((_, i) => (
            <DriverReviewSkeleton key={i} />
          ))}
        </div>
      ) : reviews.length ? (
        <>
          <section className="mt-4 flex justify-between" aria-label={t("reviewSummary")}>
            <div className="flex gap-[18px]" aria-live="polite">
              <div className="text-black-400 text-[40px] font-normal" aria-label={t("averageRating")}>
                {driver.averageRating}
              </div>
              <div>
                <StarIcon width={100} rating={driver.averageRating} aria-hidden="true" />
                <div aria-label={t("totalReviewCount")}>
                  {driver.reviewCount}
                  {t("reviewCount")}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1" aria-label={t("ratingDistribution")}>
              {levels.map((level) => (
                <div key={level} className="flex items-center gap-4">
                  <p className="text-right" id={`star-level-${level}`}>
                    {level}
                    {t("star")}
                  </p>
                  <div
                    className="bg-background-300 h-2 w-[180px] rounded"
                    role="progressbar"
                    aria-valuenow={driver.ratingStats?.[level] ?? 0}
                    aria-valuemin={0}
                    aria-valuemax={driver.reviewCount}
                    aria-labelledby={`star-level-${level}`}
                  >
                    <div
                      className="h-full rounded bg-[#FFC149]"
                      style={{ width: `${StarBar(driver.ratingStats?.[level] ?? 0)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-300">{driver.ratingStats?.[level] ?? 0}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-label={t("reviewList")}>
            {reviews.map((review) => (
              <DriverReview key={review.id} review={review} />
            ))}
          </section>

          <nav className="mt-10 flex justify-center" aria-label={t("pagination")}>
            <Pagination currentPage={page} setCurrentPage={setPage} totalReviews={driver.reviewCount} pageSize={5} />
          </nav>
        </>
      ) : (
        <section className="mt-8 flex flex-col items-center" aria-live="polite">
          <p className="font-semibold">{t("noReviews")}</p>
          <p className="text-sm text-gray-400">{t("noReviewsDesc")}</p>
        </section>
      )}
    </section>
  );
}

export default DriverReviews;
