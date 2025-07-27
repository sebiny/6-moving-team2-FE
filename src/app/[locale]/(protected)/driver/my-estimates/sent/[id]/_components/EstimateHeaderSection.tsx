// components/estimate/EstimateHeaderSection.tsx
import React from "react";
import ChipRectangle from "@/components/chip/ChipRectangle";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import { useTranslations } from "next-intl";
import { MoveType } from "@/constant/moveTypes";

// 거절된 견적을 위한 칩 컴포넌트
const ChipRejected = () => {
  const t = useTranslations("Chip");
  return (
    <div className="inline-flex items-center gap-1 rounded-md bg-gray-50 py-1 pr-1.5 pl-[5px] font-[Pretendard] font-semibold shadow-[4px_4px_8px_0px_rgba(217,217,217,0.10)]">
      <div className="text-sm leading-normal text-gray-500">{t("REJECTED")}</div>
    </div>
  );
};

interface Props {
  moveType: MoveType;
  isDesignated: boolean;
  status: string;
  customerName: string;
  price: number | null;
}

export default function EstimateHeaderSection({ moveType, isDesignated, status, customerName, price }: Props) {
  const t = useTranslations("MyEstimate");

  const getStatusChip = () => {
    switch (status) {
      case "ACCEPTED":
        return <ChipConfirmed />;
      case "REJECTED":
        return <ChipRejected />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-start gap-7">
      {/* 상단 정보 */}
      <div className="flex w-full flex-col gap-5">
        {/* 칩들: 이사 유형 + 상태 (모바일) */}
        <div className="flex items-center gap-3">
          <ChipRectangle moveType={moveType} size="md" />
          {isDesignated && <ChipRectangle moveType="REQUEST" size="md" />}
          <div className="block md:hidden">{getStatusChip()}</div>
        </div>

        {/* 고객명 + 상태 (PC 이상) */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="text-lg leading-loose font-semibold text-zinc-800 md:text-2xl">{customerName}</div>
            <div className="text-lg leading-loose font-semibold text-zinc-800 md:text-2xl">{t("customer")}</div>
          </div>
          <div className="ml-auto hidden md:block">{getStatusChip()}</div>
        </div>
      </div>

      <div className="h-0 w-full outline outline-offset-[-0.5px] outline-zinc-100" />

      {/* 견적가 */}
      <div className="flex w-full items-center justify-between md:w-1/2">
        <div className="text-base leading-loose font-semibold text-neutral-800 md:text-xl">{t("cost")}</div>
        <div className="text-xl leading-loose font-bold text-neutral-800 md:text-2xl">
          {price ? `${price.toLocaleString()}원` : "견적가 없음"}
        </div>
      </div>

      <div className="h-0 w-full outline-1 outline-offset-[-0.5px] outline-zinc-100" />
    </div>
  );
}
