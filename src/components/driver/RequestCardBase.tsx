"use client";

import React from "react";
import { Request } from "@/types/request";
import ChipRectangle from "@/components/chip/ChipRectangle";
import { MoveType } from "@/constant/moveTypes";
import Image from "next/image";
import Button from "@/components/Button";

// 한글 → MoveType enum 매핑
const korToMoveTypeMap: Record<string, MoveType> = {
  소형이사: "SMALL",
  가정이사: "HOME",
  사무실이사: "OFFICE",
  지정견적요청: "REQUEST",
  "지정 견적 요청": "REQUEST"
};

type RequestCardVariant = "received" | "final";

interface RequestCardBaseProps {
  request: Request;
  variant?: RequestCardVariant; // optional, default "received"
}

export default function RequestCardBase({ request, variant = "received" }: RequestCardBaseProps) {
  const moveTypeKey: MoveType = korToMoveTypeMap[request.moveType] ?? "SMALL";

  const renderRightTop = () => {
    if (variant === "final") {
      return (
        <div className="flex items-center gap-1 rounded-md py-1">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="text-base font-bold text-red-500">확정견적</div>
        </div>
      );
    }
    return <div className="text-sm text-zinc-500">{request.createdAt}</div>;
  };

  const renderBottom = () => {
    if (variant === "final") {
      return (
        <div className="flex w-full items-end justify-between border-t border-neutral-200 pt-4">
          <div className="text-base font-medium text-neutral-800">견적 금액</div>
          <div className="text-2xl font-bold text-neutral-800">
            {request.price ? `${request.price.toLocaleString()}원` : "미정"}
          </div>
        </div>
      );
    }
    return (
      <div className="flex w-full gap-2.5">
        <div className="w-1/2">
          <Button text="반려하기" type="white-orange" />
        </div>
        <div className="w-1/2">
          <Button text="견적 보내기" type="orange" image={true} />
        </div>
      </div>
    );
  };

  return (
    <div
      data-size="lg"
      className="inline-flex w-[588px] flex-col gap-8 rounded-[20px] bg-white px-10 py-8 shadow-[-2px_-2px_10px_rgba(220,220,220,0.20),2px_2px_10px_rgba(220,220,220,0.20)] outline-[0.5px] outline-offset-[-0.5px] outline-zinc-100"
    >
      {/* 상단 */}
      <div className="flex w-full flex-col gap-6">
        {/* 태그 + 오른쪽 상단 요소 (날짜 or 확정견적) */}
        <div className="flex h-8 items-center justify-between">
          <div className="flex gap-2">
            <ChipRectangle moveType={moveTypeKey} size="sm" />
            {request.isDesignated && <ChipRectangle moveType="REQUEST" size="sm" />}
          </div>
          {renderRightTop()}
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
          {/* 출/도착지 */}
          <div className="flex items-center gap-3">
            {/* 출발지 */}
            <div className="flex flex-col">
              <div className="text-sm text-zinc-500">출발지</div>
              <div className="text-base font-semibold text-neutral-900">{request.fromAddress}</div>
            </div>

            {/* 화살표 이미지 */}
            <div className="relative h-5 w-4">
              <Image src="/assets/icons/ic_arrow.svg" alt="화살표" fill className="object-center" />
            </div>

            {/* 도착지 */}
            <div className="flex flex-col">
              <div className="text-sm text-zinc-500">도착지</div>
              <div className="text-base font-semibold text-neutral-900">{request.toAddress}</div>
            </div>
          </div>

          {/* 이사일 */}
          <div className="flex flex-col">
            <div className="text-sm text-zinc-500">이사일</div>
            <div className="text-base font-semibold text-neutral-900">{request.moveDate}</div>
          </div>
        </div>
      </div>

      {/* 하단 */}
      {renderBottom()}
    </div>
  );
}
