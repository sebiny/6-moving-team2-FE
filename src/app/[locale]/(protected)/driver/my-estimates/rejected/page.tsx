"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import RejectedCardList from "./_components/RejectedCardList";
import { driverService } from "@/lib/api/api-driver";
import { mapBackendRejectedRequestToFrontend } from "@/utills/RequestMapper";
import { BackendRequest } from "@/types/request";
import { useTranslations } from "next-intl";
import RejectedEstimateCardListSkeleton from "@/components/skeleton/RejectedEstimateCardListSkeleton";

export default function RejectedEstimatesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const tC = useTranslations("Common");
  const [minLoadingTime, setMinLoadingTime] = useState(false);

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
    staleTime: 5 * 60 * 1000, // 5분 캐시
    refetchOnWindowFocus: false // 창 포커스 시 재조회 비활성화
  });

  const handleTabChange = (idx: string) => {
    setSelectedIdx(idx);
    router.push(`/driver/my-estimates/${idx}`);
  };

  // 최소 로딩 시간 관리 (0.5초)
  useEffect(() => {
    if (!isPending) {
      const timer = setTimeout(() => setMinLoadingTime(false), 500);
      return () => clearTimeout(timer);
    } else {
      setMinLoadingTime(true);
    }
  }, [isPending]);

  // 백엔드 데이터를 프론트엔드 형식으로 변환
  const estimates = (
    (backendEstimates as unknown as { estimateRequest: BackendRequest; reason?: string; createdAt: string }[]) || []
  ).map(mapBackendRejectedRequestToFrontend);

  const renderContent = () => {
    // Early return 패턴으로 가독성 향상
    if (isPending || minLoadingTime) {
      // 이전 데이터가 있다면 그것을 기반으로 스켈레톤 개수 결정
      const skeletonCount = (backendEstimates?.length || 0) > 0 ? Math.min(backendEstimates?.length || 0, 4) : 1;
      return (
        <section aria-label="로딩 중" aria-live="polite">
          <RejectedEstimateCardListSkeleton count={skeletonCount} />
        </section>
      );
    }

    if (error) {
      return (
        <div role="alert" aria-live="polite" className="text-center text-base font-normal text-red-400 lg:text-xl">
          {tC("failedRejReq")}
        </div>
      );
    }

    if (estimates.length === 0) {
      return (
        <section aria-label="빈 상태" className="text-center text-base font-normal text-neutral-400 lg:text-xl">
          {tC("noReject")}
        </section>
      );
    }

    // 정상적인 경우: 거부된 견적 목록 렌더링
    return <RejectedCardList requests={estimates} />;
  };

  return (
    <main className="flex min-h-screen flex-col bg-neutral-50" role="main" aria-label="거부된 견적 페이지">
      <Header type="driver-estimate" selectedIdx={selectedIdx} setSelectedIdx={handleTabChange} />
      <div className="flex min-h-screen flex-col bg-neutral-50 px-4 pt-6 pb-10 md:pt-8 lg:pt-11">
        <div className="flex w-full flex-col items-center justify-center px-6 py-20">
          <div className="flex flex-col items-center gap-6">{renderContent()}</div>
        </div>
      </div>
    </main>
  );
}
