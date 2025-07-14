import React from "react";
import { moveDetails } from "@/constant/moveDetails";
import useMediaHook from "@/hooks/useMediaHook";
import ReviewCost from "./ReviewCost";
import clsx from "clsx";

interface ReviewsProps {
  setIsModal: (value: boolean) => void;
}
export default function ReviewsInner({ setIsModal }: ReviewsProps) {
  const { isMd, isLg } = useMediaHook();

  return (
    <div>
      <div className="flex h-[54px] max-w-[1040px] justify-between md:mt-6 lg:mt-0">
        <div className="flex md:gap-22 lg:gap-0">
          <div className="flex-wrap gap-5 sm:mt-3 sm:flex md:mt-0">
            {moveDetails.map(({ label, content }, index) => (
              <div
                className={clsx(
                  index == 1 && "md:border-line-100 md:border-x md:px-4 lg:px-5",
                  index == 2 && isMd && !isLg && "border-line-100 border-r pr-4"
                )}
              >
                <p className="text-[12px] leading-[18px] text-gray-500 md:text-[14px] md:leading-[24px]">{label}</p>
                <p className="text-black-500 text-[13px] leading-[22px] md:text-[16px] md:leading-[26px]">{content}</p>
              </div>
            ))}
            {isMd && !isLg && <ReviewCost className="ml-6" />}
          </div>
        </div>
        {isLg && (
          <div
            onClick={() => setIsModal(true)}
            className="flex h-[54px] w-40 cursor-pointer items-center justify-center rounded-[12px] bg-orange-400 p-4"
          >
            <p className="text-center font-[Pretendard] leading-[26px] font-semibold text-gray-50">리뷰 작성하기</p>
          </div>
        )}
      </div>
    </div>
  );
}
