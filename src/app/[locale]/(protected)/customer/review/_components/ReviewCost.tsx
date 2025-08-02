import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { use, useEffect, useState } from "react";
interface CostType {
  className?: string;
  cost: number;
}
export default function ReviewCost({ className, cost }: CostType) {
  const t = useTranslations("Review");
  const SIZE_CLASSES = {
    base: ["font-[Pretendard] text-gray-500 font-medium"],
    sm: ["text-[14px] leading-[24px]"],
    lg: ["md:text-[16px] leading-[26px]"]
  };
  const COST_CLASSES = {
    base: ["text-black-400 font-[Pretendard] font-bold"],
    sm: ["text-[18px] leading-[26px]"],
    lg: ["lg:text-right lg:text-[24px] leading-[32px]"]
  };
  return (
    <div className={`flex items-end justify-between md:flex-col lg:pt-[41px] ${className}`}>
      <p className={clsx(...SIZE_CLASSES.base, ...SIZE_CLASSES.lg, ...SIZE_CLASSES.sm)}>{t("cost.title")}</p>
      <p className={clsx(COST_CLASSES.base, ...COST_CLASSES.sm, ...COST_CLASSES.lg)}>{cost.toLocaleString()}원</p>
    </div>
  );
}
