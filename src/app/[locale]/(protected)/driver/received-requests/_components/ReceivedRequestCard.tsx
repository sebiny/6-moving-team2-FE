import React from "react";
import { Request } from "@/types/request";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { MoveType, moveTypeFromKorean } from "@/constant/moveTypes";
import Image from "next/image";
import Button from "@/components/Button";
import { useTranslations } from "next-intl";

interface ReceivedRequestCardProps {
  request: Request;
  onSendEstimate: (request: Request) => void;
  onRejectEstimate: (request: Request) => void;
}

export default function ReceivedRequestCard({ request, onSendEstimate, onRejectEstimate }: ReceivedRequestCardProps) {
  const moveTypeKey: MoveType = moveTypeFromKorean[request.moveType] ?? "SMALL";
  const t = useTranslations("ReceivedReq");

  return (
    <div className="inline-flex w-80 flex-col gap-6 rounded-[20px] bg-white px-5 py-6 shadow-[-2px_-2px_10px_0px_rgba(220,220,220,0.20)] outline outline-offset-[-0.5px] outline-zinc-100 md:w-full md:gap-8 md:px-10 md:py-8">
      {/* 상단 */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex h-8 items-center justify-between">
          <div className="flex gap-2">
            <ChipRectangle moveType={moveTypeKey} size="sm" />
            {request.isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
          </div>
          <div className="text-sm text-zinc-500">{request.createdAt}</div>
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
              <div className="text-sm text-zinc-500">{t("from")}</div>
              <div className="truncate overflow-hidden text-base font-semibold whitespace-nowrap text-neutral-900">
                {request.fromAddress}
              </div>
            </div>
            <div className="relative h-5 w-4 flex-shrink-0">
              <Image src="/assets/icons/ic_arrow.svg" alt="화살표" fill className="object-center" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-zinc-500">{t("to")}</div>
              <div className="truncate overflow-hidden text-base font-semibold whitespace-nowrap text-neutral-900">
                {request.toAddress}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-zinc-500">{t("moveDate")}</div>
            <div className="text-base font-semibold text-neutral-900">{request.moveDate}</div>
          </div>
        </div>
      </div>
      {/* 하단 */}
      <div className="flex w-full flex-col gap-2.5 md:flex-row-reverse">
        <div className="w-full md:w-1/2">
          <Button text={t("sendReq")} type="orange" image={true} onClick={() => onSendEstimate(request)} />
        </div>
        <div className="w-full md:w-1/2">
          <Button text={t("reject")} type="white-orange" onClick={() => onRejectEstimate(request)} />
        </div>
      </div>
    </div>
  );
}
