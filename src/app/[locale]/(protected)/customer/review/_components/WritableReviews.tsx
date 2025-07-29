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
import { useQuery } from "@tanstack/react-query";
import { MoveType } from "@/constant/moveTypes";
import Lottie from "react-lottie-player";
import reviewLottie from "../../../../../../../public/lottie/review-lottie.json";

interface ReviewsProps {
  setIsModal: (value: boolean) => void;
}
type Address = {
  region: string;
  district: string;
};
type ReviewableItem = {
  id: string;
  moveType: MoveType;
  moveDate: string;
  fromAddress: Address;
  toAddress: Address;
  estimates: {
    id: string;
    price: number;
    isDesignated: boolean;
    driver: {
      id: string;
      nickname: string;
      shortIntro: string;
      profileImage: string | null;
    };
  }[];
};

type ReviewListResponse = {
  reviewableEstimates: ReviewableItem[];
  totalCount: number;
};
export default function Reviews({ setIsModal }: ReviewsProps) {
  const [page, setPage] = useState<number>(1);
  const t = useTranslations("Review");
  const SIZE_CLASSES = {
    base: ["lg:h-[242px] lg:w-280 lg:px-10 lg:py-8 lg:gap-6"],
    sm: ["h-[410px] w-[327px] py-6 px-5"],
    md: ["md:h-[316px] md:w-[600px] md:p-8"]
  };
  const { isSm, isMd, isLg } = useMediaHook();

  const { data, isLoading, isError } = useQuery<ReviewListResponse>({
    queryKey: ["reviewable", page],
    queryFn: () => getWritableReviews(page)
  });

  const totalCount = data?.totalCount ?? 0;
  const reviewables = data?.reviewableEstimates ?? [];
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-5 pt-30">
        <Lottie loop animationData={reviewLottie} play style={{ width: 150, height: 150 }} />
        <p className="font-Pretendard text-lg font-semibold text-gray-400">작성 가능한 리뷰들을 불러오고 있어요!!</p>
      </div>
    );
  }

  if (isError || !reviewables || reviewables.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <NoReview />
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col items-center gap-5">
        {reviewables.map((reviewable) => (
          <div
            key={reviewable.id}
            className={clsx(
              ...SIZE_CLASSES.base,
              ...SIZE_CLASSES.md,
              ...SIZE_CLASSES.sm,
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
                <Image
                  className={clsx(
                    isLg ? "h-[100px] w-[100px]" : isMd ? "h-[80px] w-[80px]" : "h-[64px] w-[64px]",
                    "order-2 rounded-[12px] md:order-1"
                  )}
                  src={reviewable.estimates[0].driver.profileImage ?? DriverImg}
                  alt="driverImg"
                />

                <div className={clsx("order-1 md:order-2 lg:pt-[10px]", isSm && !isMd && "w-50")}>
                  <div className={clsx(isSm && !isMd && "flex-col", "flex gap-[6px]")}>
                    <Image src={DriverIcon} width={16} height={18} alt="driver_icon" />
                    <p className="text-black-300 font-[Pretendard] text-[16px] leading-[26px] font-bold md:text-[18px]">
                      {reviewable.estimates[0].driver.nickname} {t("driver.title")}
                    </p>
                  </div>
                  <p className="line-clamp-1 self-stretch overflow-hidden font-[Pretendard] text-[12px] leading-[24px] font-normal text-ellipsis text-gray-500 md:text-[14px]">
                    {reviewable.estimates[0].driver.shortIntro}
                  </p>
                  {isMd && <ChipRectangle moveType={reviewable.moveType} size={isLg ? "md" : "sm"} className="mt-2" />}
                  {reviewable.estimates[0].isDesignated && (
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
          </div>
        ))}
        <div className="mt-10">
          <Pagination currentPage={page} setCurrentPage={setPage} totalReviews={totalCount} />
        </div>
      </div>
    </div>
  );
}
