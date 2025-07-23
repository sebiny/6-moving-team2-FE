import React, { useEffect } from "react";
import { moveDetails } from "@/constant/moveDetails";
import useMediaHook from "@/hooks/useMediaHook";
import ReviewCost from "./ReviewCost";
import clsx from "clsx";
import { getWritableReviews } from "@/lib/api/api-review";
import Button from "@/components/Button";
import { useTranslations } from "next-intl";

interface ReviewsProps {
  setIsModal: (value: boolean) => void;
}
type Address = {
  region: string;
  district: string;
};
type ReviewItem = {
  id: string;
  moveType: string;
  moveDate: string; // 또는 Date (파싱 후라면)
  fromAddress: Address;
  toAddress: Address;
  estimates: any[]; // 필요하다면 estimates의 상세 타입도 정의
};
export default function ReviewsInner({ setIsModal }: ReviewsProps) {
  const t = useTranslations("Review"); // 'Review' 네임스페이스로 번역

  const { isMd, isLg } = useMediaHook();
  useEffect(() => {
    async function fetchData() {
      try {
        const data: ReviewItem[] = await getWritableReviews();
        if (data.length > 0) {
          const review = data[0];
          console.log("🔥 review:", review);
        }
      } catch (error) {
        console.error("리뷰 정보 가져오기 실패:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      <div className="flex h-[54px] max-w-[1040px] justify-between md:mt-6 lg:mt-0">
        <div className="flex md:gap-22 lg:gap-0">
          <div className="flex-wrap gap-5 sm:mt-3 sm:flex md:mt-0">
            {moveDetails.map(({ label, content }, index) => (
              <div
                key={index}
                className={clsx(
                  index == 1 && "md:border-line-100 md:border-x md:px-4 lg:px-5",
                  index == 2 && !isMd && !isLg && "border-line-100 border-r pr-4"
                )}
              >
                <p className="text-[12px] leading-[18px] text-gray-500 md:text-[14px] md:leading-[24px]">
                  {t(`moveDetails.${label}`)}
                </p>
                <p className="text-black-500 text-[13px] leading-[22px] md:text-[16px] md:leading-[26px]">{content}</p>
              </div>
            ))}
            {isMd && !isLg && <ReviewCost className="ml-6" />}
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
    </div>
  );
}
