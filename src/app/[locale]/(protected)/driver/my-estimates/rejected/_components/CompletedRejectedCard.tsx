import React from "react";
import { Request } from "@/types/request";
import ChipRectangle from "@/components/chip/ChipRectangle";
import Image from "next/image";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import { useTranslations } from "next-intl";

interface CompletedRejectedCardProps {
  request: Request & { estimateAmount?: string; status?: string };
}

export default function CompletedRejectedCard({ request }: CompletedRejectedCardProps) {
  const t = useTranslations("MyEstimate");

  return (
    <div className="relative inline-flex w-80 flex-col gap-6 rounded-[20px] bg-white px-5 py-6 shadow-[2px_2px_10px_0px_rgba(220,220,220,0.20)] outline-[0.5px] outline-offset-[-0.5px] outline-zinc-100 md:w-[588px] md:gap-8 md:px-10 md:py-8">
      {/* 상단 */}
      <div className="flex w-full flex-col gap-6">
        <div className="flex h-8 items-center justify-between">
          <div className="flex gap-2">
            <ChipRectangle moveType={request.moveType} size="sm" />
            {request.isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
          </div>
          {request.status === "confirmed" && <ChipConfirmed />}
        </div>
        {/* 고객명 */}
        <div className="flex w-full flex-col gap-3">
          <div className="flex gap-2">
            <span className="text-xl font-semibold text-zinc-800">{request.customerName}</span>
            <span className="text-xl font-semibold text-zinc-800">{t("customer")}</span>
          </div>
          <div className="h-px w-full bg-zinc-100" />
        </div>
        {/* 출발/도착지 + 이사일 */}
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-1 items-end gap-3 md:flex-row md:items-center">
            <div className="flex flex-col">
              <div className="text-sm font-normal text-zinc-500">{t("to")}</div>
              <div className="truncate overflow-hidden text-base font-semibold whitespace-nowrap text-neutral-900">
                {request.fromAddress}
              </div>
            </div>
            <div className="relative h-5 w-4 flex-shrink-0">
              <Image src="/assets/icons/ic_arrow.svg" alt="화살표" fill className="object-center" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-normal text-zinc-500">{t("from")}</div>
              <div className="truncate overflow-hidden text-base font-semibold whitespace-nowrap text-neutral-900">
                {request.toAddress}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-normal text-zinc-500">{t("date")}</div>
            <div className="text-base font-semibold text-neutral-900">{request.moveDate}</div>
          </div>
        </div>
      </div>
      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[20px] bg-black/60">
        <div className="flex w-48 flex-col items-center gap-5">
          <div className="text-lg font-semibold text-white">반려된 요청이에요</div>
        </div>
      </div>
    </div>
  );
}
