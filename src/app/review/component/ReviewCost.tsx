import clsx from "clsx";
import React from "react";
interface CostType {
  className?: string;
}
export default function ReviewCost({ className }: CostType) {
  const SIZE_CLASSES = {
    base: ["font-[Pretendard] text-gray-300 font-medium"],
    sm: ["text-[14px] leading-[24px]"],
    lg: ["md:text-[16px] leading-[26px] md:text-gray-500"]
  };
  const COST_CLASSES = {
    base: ["text-black-400 font-[Pretendard] font-bold"],
    sm: ["text-[18px] leading-[26px]"],
    lg: ["lg:text-right lg:text-[24px] leading-[32px]"]
  };
  return (
    <div className={`flex items-end justify-between md:flex-col lg:pt-[41px] ${className}`}>
      <p className={clsx(...SIZE_CLASSES.base, ...SIZE_CLASSES.lg, ...SIZE_CLASSES.sm)}>견적 금액</p>
      <p className={clsx(COST_CLASSES.base, ...COST_CLASSES.sm, ...COST_CLASSES.lg)}>180,000원</p>
    </div>
  );
}
