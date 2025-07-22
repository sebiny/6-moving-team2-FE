import React from "react";
import DriverImg from "../../../../../public/assets/images/img_profile.svg";
import Image from "next/image";
import clsx from "clsx";
import ChipRectangle from "@/components/chip/ChipRectangle";
import DriverIcon from "../../../../../public/assets/icons/ic_driver.svg";
import useMediaHook from "@/hooks/useMediaHook";
import ReviewsInner from "./ReviewsInner";
import Button from "@/components/Button";
import ReviewCost from "./ReviewCost";
interface ReviewsProps {
  setIsModal: (value: boolean) => void;
}
export default function Reviews({ setIsModal }: ReviewsProps) {
  const SIZE_CLASSES = {
    base: ["lg:h-[242px] lg:w-280 lg:px-10 lg:py-8 lg:gap-6"],
    sm: ["h-[410px] w-[327px] py-6 px-5"],
    md: ["md:h-[316px] md:w-[600px] md:p-8"]
  };
  const { isSm, isMd, isLg } = useMediaHook();
  return (
    <div>
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
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
              <div className="flex gap-6">
                <Image
                  className={clsx(
                    isLg ? "h-[100px] w-[100px]" : isMd ? "h-[80px] w-[80px]" : "h-[64px] w-[64px]",
                    "order-2 rounded-[12px] md:order-1"
                  )}
                  src={DriverImg}
                  alt="driverImg"
                />

                <div className="order-1 md:order-2 lg:pt-[10px]">
                  <div className={clsx(isSm && !isMd && "flex-col", "flex gap-[6px]")}>
                    <Image src={DriverIcon} width={16} height={18} alt="driver_icon" />
                    <p className="text-black-300 font-[Pretendard] text-[16px] leading-[26px] font-bold md:text-[18px]">
                      김코드 기사님
                    </p>
                  </div>
                  <p className="line-clamp-1 self-stretch overflow-hidden font-[Pretendard] text-[12px] leading-[24px] font-normal text-ellipsis text-gray-500 md:text-[14px]">
                    이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.
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
                text="리뷰 작성하기"
                className="mt-10 md:h-[54px] md:rounded-[12px] md:text-[16px] md:font-medium"
              />
            )}
            {isSm && !isMd && !isLg && <ReviewCost className="border-line-200 mt-18 mb-5 border-t pt-3" />}
            {isSm && !isMd && !isLg && (
              <Button
                onClick={() => setIsModal(true)}
                type="orange"
                text="리뷰 작성하기"
                className="w-[287px] py-[16px] sm:rounded-[12px] sm:font-medium"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
