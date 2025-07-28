import React, { useEffect, useState } from "react";
import useMediaHook from "@/hooks/useMediaHook";
import ReviewCost from "./ReviewCost";
import clsx from "clsx";
import { getWritableReviews } from "@/lib/api/api-review";
import Button from "@/components/Button";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TranslateRegion } from "@/utills/TranslateFunction";

interface ReviewsProps {
  setIsModal: (value: boolean) => void;
  review: {
    id: string;
    moveType: string;
    moveDate: string;
    fromAddress: Address;
    toAddress: Address;
    estimates: {
      id: string;
      price: number;
      driver: {
        id: string;
        nickname: string;
        shortIntro: string;
      };
    }[];
  };
}
type Address = {
  region: string;
  district: string;
};

export default function ReviewsInner({ setIsModal, review }: ReviewsProps) {
  const t = useTranslations("Review");
  const { isMd, isLg } = useMediaHook();
  const cost = review.estimates[0].price;
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "yyyy년 MM월 dd일 (EEE)", { locale: ko });
  };
  const moveDetails = [
    {
      label: "from",
      content: `${TranslateRegion(review.fromAddress.region)} ${review.fromAddress.district}`
    },
    {
      label: "to",
      content: `${TranslateRegion(review.fromAddress.region)} ${review.toAddress.district}`
    },
    {
      label: "date",
      content: formatDate(review.moveDate)
    }
  ];

  return (
    <div className="flex h-[54px] max-w-[1040px] justify-between md:mt-6 lg:mt-0">
      <div className="flex md:gap-22 lg:gap-0">
        <div className="flex-wrap gap-5 sm:mt-3 sm:flex md:mt-0">
          {moveDetails.map(({ label, content }, index) => (
            <div
              key={label}
              className={clsx(
                index === 1 && "md:border-line-100 md:border-x md:px-4 lg:px-5",
                index === 2 && !isMd && !isLg && "border-line-100 border-r pr-4"
              )}
            >
              <p className="text-[12px] leading-[18px] text-gray-500 md:text-[14px] md:leading-[24px]">
                {t(`moveDetails.${label}`)}
              </p>
              <p className="text-black-500 text-[13px] leading-[22px] md:text-[16px] md:leading-[26px]">{content}</p>
            </div>
          ))}
          {isMd && !isLg && <ReviewCost className="ml-6" cost={cost} />}
        </div>
      </div>
      {isLg && (
        <Button
          onClick={() => setIsModal(true)}
          type="orange"
          text={t("button.createReview")}
          className="h-[54px] w-40 sm:rounded-[12px] sm:font-medium"
        />
      )}
    </div>
  );
}
