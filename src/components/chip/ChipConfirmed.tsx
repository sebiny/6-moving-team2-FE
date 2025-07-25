import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ChipConfirmedProps {
  className?: string;
}

export default function ChipConfirmed({ className = "" }: ChipConfirmedProps) {
  const t = useTranslations("MyEstimate");
  return (
    <div className={`inline-flex items-center justify-center gap-1 whitespace-nowrap ${className}`}>
      <Image src="/assets/icons/ic_frame.svg" alt="확정견적 아이콘" width={20} height={20} className="mr-1" />
      <div className="justify-center font-['Pretendard'] text-base leading-relaxed font-bold text-red-500">
        {t("confirmedEst")}
      </div>
    </div>
  );
}
