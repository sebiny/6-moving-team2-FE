"use client";

import React, { useState } from "react";
import RequestCardList from "./_components/RequestCardList";
import { Request } from "@/types/request";
import SearchBar from "@/components/input/SearchBar";
import ChipCircle from "@/components/chip/ChipCircle";
import SortDropdown from "@/components/dropdown/SortDropdown";
import PageHeader from "@/components/common/PageHeader";
import CustomCheckbox from "@/components/button/CustomCheckbox";
import imgEmptyReview from "/public/assets/images/img_empty_review.svg";
import Image from "next/image";

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
  const [checked, setChecked] = useState(false);
  const requests = [...dummyRequests, ...dummyRequests].map((item, idx) => ({ ...item, id: `${item.id}-${idx}` }));

  return (
    <div className="flex min-h-screen justify-center bg-gray-50 px-4 py-10 pt-25">
      <div className="flex flex-col gap-6">
        <PageHeader title="받은 요청" />
        <SearchBar width="w-full" placeholder="어떤 고객님을 찾고 계세요?" />
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
              {requests.length}건
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            {/* 체크박스 2개 */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <CustomCheckbox checked={checked} onChange={setChecked} />
                <span className="text-base font-normal text-neutral-900">지정 견적 요청</span>
              </label>
              <label className="flex items-center gap-2">
                <CustomCheckbox checked={checked} onChange={setChecked} />
                <span className="text-base font-normal text-neutral-900">서비스 가능 지역</span>
              </label>
            </div>
            <SortDropdown sortings={["평점 높은순", "이사 빠른순", "요청일 빠른순"]} sort="평점 높은순" />
          </div>
        </div>
        {requests.length === 0 ? (
          <div className="inline-flex flex-col items-start justify-start gap-2.5">
            <div className="flex w-[955px] flex-col items-center justify-center gap-2.5 p-44">
              <div className="flex flex-col items-center justify-start gap-8">
                <div className="relative h-48 w-60 overflow-hidden">
                  <div className="absolute top-[-16.29px] left-[-11.04px] h-64 w-64 opacity-50">
                    <Image src={imgEmptyReview} alt="empty" fill style={{ objectFit: "cover" }} />
                  </div>
                </div>
                <div className="justify-center text-center font-['Pretendard'] text-xl leading-loose font-normal text-neutral-400">
                  아직 받은 요청이 없어요!
                </div>
              </div>
            </div>
          </div>
        ) : (
          <RequestCardList requests={requests} />
        )}
      </div>
    </div>
  );
}
