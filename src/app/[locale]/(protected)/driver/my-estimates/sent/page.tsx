"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import EstimateCardList from "@/app/[locale]/(protected)/driver/my-estimates/sent/_components/EstimateCardList";
import { driverService } from "@/lib/api/api-driver";
import { DriverEstimateType } from "@/types/estimateType";
import { MoveType } from "@/constant/moveTypes";
import { formatDate, formatTimeAgo, formatAddress } from "@/utills/RequestMapper";

export default function SentEstimatesPage() {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 URL에 따라 selectedIdx 초기값 설정
  const currentTab = pathname.split("/").pop(); // 'sent' or 'rejected'
  const [selectedIdx, setSelectedIdx] = useState(currentTab ?? "sent");

  // React Query로 실제 API 데이터 가져오기
  const {
    data: backendEstimates = [],
    isPending,
    error
  } = useQuery({
    queryKey: ["driverEstimates"],
    queryFn: driverService.getDriverEstimates,
    staleTime: 5 * 60 * 1000 // 5분
  });

  const handleTabChange = (idx: string) => {
    setSelectedIdx(idx);
    router.push(`/driver/my-estimates/${idx}`);
  };

  // 백엔드 데이터를 프론트엔드 형식으로 변환
  const estimates = (backendEstimates || []).map((estimate: DriverEstimateType) => ({
    id: estimate.id,
    moveType: estimate.estimateRequest.moveType as MoveType,
    isDesignated: estimate.isDesignated,
    isCompleted: estimate.isCompleted,
    customerName: estimate.customerName,
    fromAddress: formatAddress(estimate.estimateRequest.fromAddress),
    toAddress: formatAddress(estimate.estimateRequest.toAddress),
    moveDate: formatDate(estimate.estimateRequest.moveDate),
    estimateAmount: estimate.price ? `${estimate.price.toLocaleString()}원` : "견적 금액 없음",
    status: estimate.status === "PROPOSED" ? "pending" : estimate.status === "ACCEPTED" ? "confirmed" : "rejected",
    createdAt: formatTimeAgo(estimate.createdAt)
  }));

  const renderContent = () => {
    if (isPending) return <p className="text-center text-base font-normal text-neutral-400 lg:text-xl">로딩 중...</p>;
    if (error)
      return <p className="text-center text-base font-normal text-red-400 lg:text-xl">견적 조회에 실패했습니다.</p>;
    if (estimates.length === 0)
      return <p className="text-center text-base font-normal text-neutral-400 lg:text-xl">아직 보낸 견적이 없어요!</p>;
    return <EstimateCardList requests={estimates} />;
  };

  return (
    <>
      <Header type="driver-estimate" selectedIdx={selectedIdx} setSelectedIdx={handleTabChange} />
      <div className="flex min-h-screen flex-col bg-neutral-50 px-4 pt-6 pb-10 md:pt-8 lg:pt-11">
        <div className="flex w-full flex-col items-center justify-center px-6 py-20">
          <div className="flex flex-col items-center gap-6">{renderContent()}</div>
        </div>
      </div>
    </>
  );
}
