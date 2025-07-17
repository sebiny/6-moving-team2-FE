import React from "react";
import { Request } from "@/types/request";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { MoveType } from "@/constant/moveTypes";
import Image from "next/image";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import CompletedEstimateCard from "./CompletedEstimateCard";

const korToMoveTypeMap: Record<string, MoveType> = {
  소형이사: "SMALL",
  가정이사: "HOME",
  사무실이사: "OFFICE",
  지정견적요청: "REQUEST",
  "지정 견적 요청": "REQUEST"
};

interface CustomerEstimateCardProps {
  request: Request & { estimateAmount?: string; isCompleted?: boolean };
}

export default function CustomerEstimateCard({ request }: CustomerEstimateCardProps) {
  const moveTypeKey: MoveType = korToMoveTypeMap[request.moveType] ?? "SMALL";

  return (
    <div className="relative inline-flex w-[588px] flex-col gap-8 rounded-[20px] bg-white px-10 py-8 shadow-[-2px_-2px_10px_rgba(220,220,220,0.20),2px_2px_10px_rgba(220,220,220,0.20)] outline-[0.5px] outline-offset-[-0.5px] outline-zinc-100">
      {/* 상단 */}
      <div className="flex w-full flex-col gap-6">
        <div className="flex h-8 items-center justify-between">
          <div className="flex gap-2">
            <ChipRectangle moveType={moveTypeKey} size="sm" />
            {request.isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
          </div>
          <ChipConfirmed />
          {/* 확정카드는 날짜 대신 확정 라벨만 */}
        </div>
        {/* 고객명 */}
        <div className="flex w-full flex-col gap-3">
          <div className="flex gap-2">
            <span className="text-xl font-semibold text-zinc-800">{request.customerName}</span>
            <span className="text-xl font-semibold text-zinc-800">고객님</span>
          </div>
          <div className="h-px w-full bg-zinc-100" />
        </div>
        {/* 출발/도착지 + 이사일 */}
        <div className="flex w-full items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="text-sm text-zinc-500">출발지</div>
              <div className="text-base font-semibold text-neutral-900">{request.fromAddress}</div>
            </div>
            <div className="relative h-5 w-4">
              <Image src="/assets/icons/ic_arrow.svg" alt="화살표" fill className="object-center" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-zinc-500">도착지</div>
              <div className="text-base font-semibold text-neutral-900">{request.toAddress}</div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-zinc-500">이사일</div>
            <div className="text-base font-semibold text-neutral-900">{request.moveDate}</div>
          </div>
        </div>
      </div>
      {/* 하단 */}
      <div className="flex w-full items-end justify-between border-t border-neutral-200 pt-4">
        <div className="text-base font-medium text-neutral-800">견적 금액</div>
        <div className="text-2xl font-bold text-neutral-800">
          {request.estimateAmount ? request.estimateAmount : "미정"}
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
