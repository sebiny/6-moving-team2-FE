"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import EstimateCardList from "@/app/[locale]/(protected)/driver/my-estimates/sent/_components/EstimateCardList";
import { driverService } from "@/lib/api/api-driver";
import { DriverEstimateType } from "@/types/estimateType";

// 백엔드 데이터를 프론트엔드 형식으로 변환하는 함수
const mapBackendEstimateToFrontend = (estimate: DriverEstimateType) => {
  const moveTypeMap: Record<string, string> = {
    SMALL: "소형이사",
    HOME: "가정이사",
    OFFICE: "사무실이사",
    REQUEST: "지정견적요청"
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}시간 전`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}일 전`;
    }
  };

  const formatAddress = (address: { street: string; detail?: string; region?: string; district?: string }) =>
    address.region && address.district
      ? `${["서울시", "부산시", "대구시", "인천시", "광주시", "대전시", "울산시", "세종시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주도"][["SEOUL", "BUSAN", "DAEGU", "INCHEON", "GWANGJU", "DAEJEON", "ULSAN", "SEJONG", "GYEONGGI", "GANGWON", "CHUNGBUK", "CHUNGNAM", "JEONBUK", "JEONNAM", "GYEONGBUK", "GYEONGNAM", "JEJU"].indexOf(address.region)] || address.region} ${address.district}`
      : address.detail
        ? `${address.street} ${address.detail}`
        : address.street;

  return {
    id: estimate.id,
    moveType: moveTypeMap[estimate.estimateRequest.moveType] || "소형이사",
    isDesignated: estimate.estimateRequest.moveType === "REQUEST",
    isCompleted: estimate.isCompleted, // 백엔드에서 계산된 완료 상태 사용
    customerName: estimate.customerName,
    fromAddress: formatAddress(estimate.estimateRequest.fromAddress),
    toAddress: formatAddress(estimate.estimateRequest.toAddress),
    moveDate: formatDate(estimate.estimateRequest.moveDate),
    estimateAmount: `${estimate.price.toLocaleString()}원`,
    status: estimate.status === "PROPOSED" ? "pending" : estimate.status === "ACCEPTED" ? "confirmed" : "rejected",
    createdAt: formatTimeAgo(estimate.createdAt)
  };
};

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
  const estimates = (backendEstimates || []).map(mapBackendEstimateToFrontend);

  return (
    <>
      <Header type="driver-estimate" selectedIdx={selectedIdx} setSelectedIdx={handleTabChange} />
      <div className="flex justify-center bg-neutral-50 px-4 pt-6 pb-10 md:pt-8 lg:pt-11">
        {isPending ? (
          <div className="flex w-full flex-col items-center justify-center px-6 py-20">
            <div className="flex flex-col items-center gap-6">
              <p className="text-center text-base font-normal text-neutral-400 lg:text-xl">로딩 중...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex w-full flex-col items-center justify-center px-6 py-20">
            <div className="flex flex-col items-center gap-6">
              <p className="text-center text-base font-normal text-red-400 lg:text-xl">견적 조회에 실패했습니다.</p>
            </div>
          </div>
        ) : estimates.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center px-6 py-20">
            <div className="flex flex-col items-center gap-6">
              <p className="text-center text-base font-normal text-neutral-400 lg:text-xl">아직 보낸 견적이 없어요!</p>
            </div>
          </div>
        ) : (
          <EstimateCardList requests={estimates} />
        )}
      </div>
    </>
  );
}
