import React from "react";
import { useRouter } from "next/navigation";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { MoveType, moveTypeFromKorean } from "@/constant/moveTypes";
import { CompletedEstimateCardType } from "@/types/estimateType";
import { ESTIMATE_STATUS, ESTIMATE_TEXT } from "@/constant/constant";
import Image from "next/image";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import CompletedEstimateCard from "./CompletedEstimateCard";
import { useTranslations } from "next-intl";

interface CustomerEstimateCardProps {
  request: CompletedEstimateCardType;
}

export default function CustomerEstimateCard({ request }: CustomerEstimateCardProps) {
  const t = useTranslations("MyEstimate");
  const router = useRouter();
  const moveTypeKey: MoveType = moveTypeFromKorean[request.moveType] ?? "SMALL";

  return (
    <div
      className="flex w-80 cursor-pointer flex-col gap-6 rounded-[20px] bg-white px-5 py-6 shadow-[-2px_-2px_10px_0px_rgba(220,220,220,0.20)] outline outline-offset-[-0.5px] outline-zinc-100 transition-shadow hover:shadow-[-2px_-2px_15px_0px_rgba(220,220,220,0.30)] md:w-[588px] md:gap-8 md:px-10 md:py-8"
      onClick={() => router.push(`/driver/my-estimates/sent/${request.id}`)}
    >
      {/* 상단 */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex h-8 items-center justify-between">
          <div className="flex gap-2">
            <ChipRectangle moveType={moveTypeKey} size="sm" />
            {request.isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
          </div>
          {request.status === ESTIMATE_STATUS.CONFIRMED && <ChipConfirmed />}
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
      {/* 하단 */}
      <div className="flex w-full items-end justify-between border-t border-neutral-200 pt-4">
        <div className="text-base font-medium text-neutral-800">{t("cost")}</div>
        <div className="text-2xl font-bold text-neutral-800">
          {request.estimateAmount ? request.estimateAmount : ESTIMATE_TEXT.UNDEFINED}
        </div>
      </div>
      {/* 오버레이 */}
      {request.isCompleted && (
        <div className="absolute inset-0 z-10">
          <CompletedEstimateCard request={request} />
        </div>
      )}
    </div>
  );
}
