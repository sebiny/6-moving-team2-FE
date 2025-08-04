import React, { useEffect, useState } from "react";
import StarIcon from "../icon/StarIcon";
import { format } from "date-fns";
import { ReviewType } from "@/types/reviewType";
import { translateWithDeepL } from "@/utills/translateWithDeepL";
import { useLocale, useTranslations } from "next-intl";

interface DriverReviewType {
  review: ReviewType;
}

function DriverReview({ review }: DriverReviewType) {
  const locale = useLocale();
  const [translatedReview, setTrnaslatedReview] = useState<string | null>(null);

  (useEffect(() => {
    const translate = async () => {
      try {
        const translated = await translateWithDeepL(review.content, locale.toUpperCase());
        setTrnaslatedReview(translated);
      } catch {
        setTrnaslatedReview(review.content); //fallback
      }
    };
    translate();
  }),
    [review, locale]);
  return (
    <div className="flex flex-col gap-6 py-6">
      <div>
        <div className="flex gap-[14px]">
          <div className="">{review.email?.slice(0, 3)}****</div>
          <div className="border-line-200 w-[1px] border-l"></div>
          <div className="text-gray-300">{format(new Date(review.createdAt), "yyyy-MM-dd")}</div>
        </div>
        <div className="mt-2">
          <StarIcon rating={review.rating} width={100} />
        </div>
      </div>
      <p>{translatedReview}</p>
    </div>
  );
}

export default DriverReview;
