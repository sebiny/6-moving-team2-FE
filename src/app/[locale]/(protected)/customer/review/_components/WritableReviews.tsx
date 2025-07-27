import React, { useEffect, useState } from "react";
import DriverImg from "/public/assets/images/img_profile.svg";
import Image from "next/image";
import clsx from "clsx";
import ChipRectangle from "@/components/chip/ChipRectangle";
import DriverIcon from "/public/assets/icons/ic_driver.svg";
import useMediaHook from "@/hooks/useMediaHook";
import ReviewsInner from "./ReviewsInner";
import Button from "@/components/Button";
import ReviewCost from "./ReviewCost";
import { useTranslations } from "next-intl";
import { getWritableReviews } from "@/lib/api/api-review";
import NoReview from "./NoReview";
import Pagination from "@/components/Pagination";

interface ReviewsProps {
  setIsModal: (value: boolean) => void;
}

type ReviewItem = {
  id: string;
  moveType: string;
  moveDate: string;
  estimates: any[];
};

export default function Reviews({ setIsModal }: ReviewsProps) {
  const [page, setPage] = useState(1); //임의로 추가

  const t = useTranslations("Review");
  const SIZE_CLASSES = {
    base: ["lg:h-[242px] lg:w-280 lg:px-10 lg:py-8 lg:gap-6"],
    sm: ["h-[410px] w-[327px] py-6 px-5"],
    md: ["md:h-[316px] md:w-[600px] md:p-8"]
  };
  const { isSm, isMd, isLg } = useMediaHook();
  const [isNoReview, setIsNoReview] = useState(false);

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviewsData = await getWritableReviews();
        if (!reviewsData || reviewsData.length === 0) {
          setIsNoReview(true);
        } else {
          setReviews(reviewsData);
          setIsNoReview(false);
        }
      } catch (error) {
        console.error("리뷰 가져오기 실패", error);
      }
    }
    fetchReviews();
  }, []);
  if (!isNoReview && reviews.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <NoReview />
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col items-center gap-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={clsx(
              ...SIZE_CLASSES.base,
              ...SIZE_CLASSES.md,
              ...SIZE_CLASSES.sm,
              "border-line-100 mx-auto flex flex-col self-stretch rounded-[20px] border-[0.5px] bg-gray-50"
            )}
          >
            {isSm && !isMd && (
              <div className="mb-3 flex gap-2">
                <ChipRectangle moveType="SMALL" size="sm" />
                <ChipRectangle moveType="REQUEST" size="sm" />
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex justify-between gap-6">
                <Image
                  className={clsx(
                    isLg ? "h-[100px] w-[100px]" : isMd ? "h-[80px] w-[80px]" : "h-[64px] w-[64px]",
                    "order-2 rounded-[12px] md:order-1"
                  )}
                  src={DriverImg}
                  alt="driverImg"
                />

                <div className={clsx("order-1 md:order-2 lg:pt-[10px]", isSm && !isMd && "w-50")}>
                  <div className={clsx(isSm && !isMd && "flex-col", "flex gap-[6px]")}>
                    <Image src={DriverIcon} width={16} height={18} alt="driver_icon" />
                    <p className="text-black-300 font-[Pretendard] text-[16px] leading-[26px] font-bold md:text-[18px]">
                      {review.estimates[0].driver.nickname} {t("driver.title")}
                    </p>
                  </div>
                  <p className="line-clamp-1 self-stretch overflow-hidden font-[Pretendard] text-[12px] leading-[24px] font-normal text-ellipsis text-gray-500 md:text-[14px]">
                    {review.estimates[0].driver.shortIntro}
                  </p>
                  {isMd && <ChipRectangle moveType="SMALL" size={isLg ? "md" : "sm"} className="mt-2" />}
                </div>
              </div>

              {isLg && <ReviewCost />}
            </div>
            <ReviewsInner setIsModal={setIsModal} />
            {isMd && !isLg && (
              <Button
                onClick={() => setIsModal(true)}
                type="orange"
                text={t("button.createReview")}
                className="mt-10 md:h-[54px] md:rounded-[12px] md:text-[16px] md:font-medium"
              />
            )}
            {isSm && !isMd && !isLg && <ReviewCost className="border-line-200 mt-18 mb-5 border-t pt-3" />}
            {isSm && !isMd && !isLg && (
              <Button
                onClick={() => setIsModal(true)}
                type="orange"
                text={t("button.createReview")}
                className="w-[287px] py-[16px] sm:rounded-[12px] sm:font-medium"
              />
            )}
          </div>
        ))}
        <div className="mt-10">
          <Pagination currentPage={page} setCurrentPage={setPage} />
        </div>
      </div>
    </div>
  );
}
