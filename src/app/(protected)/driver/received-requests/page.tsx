"use client";

import React from "react";
import RequestCardList from "./_components/RequestCardList";
import { Request } from "@/types/request";
import SearchBarPlaceholder from "./_components/SearchBarPlaceholder";
import ChipCircle from "@/components/chip/ChipCircle";
import SortDropdown from "@/components/dropdown/SortDropdown";

const dummyRequests: Request[] = [
  {
    id: "1",
    moveType: "소형이사",
    isDesignated: true,
    createdAt: "1시간 전",
    customerName: "김인서",
    fromAddress: "서울시 중구",
    toAddress: "경기도 수원시",
    moveDate: "2024년 07월 01일 (월)"
  },
  {
    id: "2",
    moveType: "가정이사",
    isDesignated: false,
    createdAt: "2시간 전",
    customerName: "이현지",
    fromAddress: "서울시 강남구",
    toAddress: "인천광역시 남동구",
    moveDate: "2024년 07월 05일 (금)"
  }
];

export default function ReceivedRequestsPage() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-50 px-4 py-10">
      <div className="flex flex-col gap-6">
        <SearchBarPlaceholder />
        <div className="inline-flex items-start justify-start gap-3">
          <ChipCircle type="region" text="소형이사" color="gray" />
          <ChipCircle type="region" text="가정이사" color="gray" />
          <ChipCircle type="region" text="사무실이사" color="gray" />
        </div>
        <div className="inline-flex flex-col items-start justify-start gap-6 self-stretch">
          <div className="inline-flex items-center justify-start gap-1">
            <div className="justify-start text-center font-['Pretendard'] text-lg leading-relaxed font-semibold text-neutral-800">
              전체
            </div>
            <div className="justify-start text-center font-['Pretendard'] text-lg leading-relaxed font-semibold text-neutral-800">
              8건
            </div>
          </div>
          <div className="inline-flex items-center justify-between self-stretch">
            <div className="flex items-center justify-start gap-3">
              <div className="flex items-center justify-start">
                <div className="relative h-9 w-9 overflow-hidden">
                  <div className="absolute top-[8px] left-[8px] h-5 w-5 rounded border border-neutral-200 bg-white" />
                </div>
                <div className="justify-center font-['Pretendard'] text-base leading-relaxed font-normal text-neutral-900">
                  지정 견적 요청
                </div>
              </div>
              <div className="flex items-center justify-start">
                <div className="relative h-9 w-9 overflow-hidden">
                  <div className="absolute top-[8px] left-[8px] h-5 w-5 rounded border border-neutral-200 bg-white" />
                </div>
                <div className="justify-center font-['Pretendard'] text-base leading-relaxed font-normal text-neutral-900">
                  서비스 가능 지역
                </div>
              </div>
            </div>
            <SortDropdown sortings={["평점 높은순", "이사 빠른순", "요청일 빠른순"]} value="평점 높은순" />
          </div>
        </div>
        <RequestCardList requests={[...dummyRequests, ...dummyRequests]} />
      </div>
    </div>
  );
}
