"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import RejectedCardList from "./_components/RejectedCardList";
import { driverService } from "@/lib/api/api-driver";
import { BackendRequest } from "@/types/request";
import { mapBackendRejectedRequestToFrontend } from "@/utills/RequestMapper";

export default function RejectedEstimatesPage() {
  const router = useRouter();
  const pathname = usePathname();

  // 현재 URL에 따라 selectedIdx 초기값 설정
  const currentTab = pathname.split("/").pop(); // 'sent' or 'rejected'
  const [selectedIdx, setSelectedIdx] = useState(currentTab ?? "rejected");

  // React Query로 실제 API 데이터 가져오기
  const {
    data: backendEstimates = [],
    isPending,
    error
  } = useQuery({
    queryKey: ["driverRejectedEstimates"],
    queryFn: driverService.getRejectedRequests,
    staleTime: 5 * 60 * 1000 // 5분
  });

  const handleTabChange = (idx: string) => {
    setSelectedIdx(idx);
    router.push(`/driver/my-estimates/${idx}`);
  };

  // 백엔드 데이터를 프론트엔드 형식으로 변환
  const estimates = (
    (backendEstimates as unknown as { estimateRequest: BackendRequest; reason?: string; createdAt: string }[]) || []
  ).map(mapBackendRejectedRequestToFrontend);

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
              <p className="text-center text-base font-normal text-red-400 lg:text-xl">
                거절된 견적 조회에 실패했습니다.
              </p>
            </div>
          </div>
        ) : estimates.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center px-6 py-20">
            <div className="flex flex-col items-center gap-6">
              <p className="text-center text-base font-normal text-neutral-400 lg:text-xl">
                아직 거절된 견적이 없어요!
              </p>
            </div>
          </div>
        ) : (
          <RejectedCardList requests={estimates} />
        )}
      </div>
    </>
  );
}
