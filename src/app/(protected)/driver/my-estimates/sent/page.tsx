"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header";
import CustomerEstimateCard from "@/app/(protected)/driver/my-estimates/sent/_components/CustomerEstimateCard";
import CompletedEstimateCard from "@/app/(protected)/driver/my-estimates/sent/_components/CompletedEstimateCard";
import { Request } from "@/types/request";

// 보낸견적 타입 정의
interface SentEstimate {
  id: string;
  moveType: string;
  isDesignated: boolean;
  isCompleted: boolean;
  customerName: string;
  fromAddress: string;
  toAddress: string;
  moveDate: string;
  estimateAmount: string;
  status: "pending" | "confirmed" | "rejected";
  createdAt: string;
}

const dummySentEstimates: SentEstimate[] = [
  {
    id: "1",
    moveType: "소형이사",
    isDesignated: true,
    isCompleted: false,
    customerName: "김인서",
    fromAddress: "서울시 중구",
    toAddress: "경기도 수원시",
    moveDate: "2024년 07월 01일 (월)",
    estimateAmount: "150,000원",
    status: "confirmed",
    createdAt: "1시간 전"
  },
  {
    id: "2",
    moveType: "가정이사",
    isDesignated: true,
    isCompleted: true,
    customerName: "이현지",
    fromAddress: "서울시 강남구",
    toAddress: "인천광역시 남동구",
    moveDate: "2024년 07월 05일 (금)",
    estimateAmount: "300,000원",
    status: "pending",
    createdAt: "2시간 전"
  },
  {
    id: "3",
    moveType: "사무실이사",
    isDesignated: true,
    isCompleted: true,
    customerName: "박철수",
    fromAddress: "서울시 서초구",
    toAddress: "경기도 성남시",
    moveDate: "2024년 07월 10일 (수)",
    estimateAmount: "500,000원",
    status: "rejected",
    createdAt: "3시간 전"
  }
];

export default function SentEstimatesPage() {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 URL에 따라 selectedIdx 초기값 설정
  const currentTab = pathname.split("/").pop(); // 'sent' or 'rejected'
  const [selectedIdx, setSelectedIdx] = useState(currentTab ?? "sent");

  const handleTabChange = (idx: string) => {
    setSelectedIdx(idx);
    router.push(`/driver/my-estimates/${idx}`);
  };

  const estimates = [...dummySentEstimates, ...dummySentEstimates].map((item, idx) => ({
    ...item,
    id: `${item.id}-${idx}`
  }));

  const handleViewDetails = (estimateId: string) => {
    router.push(`/driver/my-estimates/sent/${estimateId}`);
  };

  return (
    <>
      <Header type="driver-estimate" selectedIdx={selectedIdx} setSelectedIdx={handleTabChange} />
      <div className="flex min-h-screen justify-center bg-neutral-50 px-4 py-10 pt-25">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6 self-stretch">
            {estimates.map((estimate) =>
              estimate.isCompleted ? (
                <CompletedEstimateCard
                  key={estimate.id}
                  request={estimate as unknown as Request & { estimateAmount?: string }}
                  onViewDetails={() => handleViewDetails(estimate.id)}
                />
              ) : (
                <CustomerEstimateCard
                  key={estimate.id}
                  request={estimate as unknown as Request & { estimateAmount?: string }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
