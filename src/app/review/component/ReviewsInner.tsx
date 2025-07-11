import React from "react";
import { moveDetails } from "@/constant/moveDetails";
import useMediaHook from "@/hooks/useMediaHook";
import ReviewCost from "./ReviewCost";

interface ReviewsProps {
  setIsModal: (value: boolean) => void;
}
export default function ReviewsInner({ setIsModal }: ReviewsProps) {
  const { isMd, isLg } = useMediaHook();

  return (
    <div>
      <div className="flex h-[54px] max-w-[1040px] justify-between md:mt-6 md:w-[1040px] lg:mt-0">
        <div className="flex md:gap-22 lg:gap-0">
          <div className="sm: flex flex-wrap gap-5 sm:mt-3 md:mt-0">
            {moveDetails.map(({ label, content }) => (
              <div>
                <p className="font-[Pretendard] text-[14px] leading-[24px] font-normal text-gray-500">{label}</p>
                <p className="text-black-500 text-4 font-[Pretendard] leading-[26px] font-normal">{content}</p>
              </div>
            ))}
          </div>
          {isMd && !isLg && <ReviewCost />}
        </div>
        {/* Lg이상일때 작은버튼 */}
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
