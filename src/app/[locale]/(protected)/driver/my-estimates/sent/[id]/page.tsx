"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/common/PageHeader";
import OrangeBackground from "@/components/OrangeBackground";
import ShareDriver from "@/components/ShareDriver";
import EstimateHeaderSection from "./_components/EstimateHeaderSection";
import EstimateInfoSection from "./_components/EstimateInfoSection";
import { useTranslations } from "next-intl";
import { driverService } from "@/lib/api/api-driver";
import { DriverEstimateDetailType } from "@/types/estimateType";
import { formatDate, formatDateTime } from "@/utills/dateUtils";
import { MoveType } from "@/constant/moveTypes";

export default function EstimateDetailPage() {
  const t = useTranslations("MyEstimate");
  const params = useParams();
  const estimateId = params.id as string;

  const {
    data: estimateDetail,
    isLoading,
    error
  } = useQuery<DriverEstimateDetailType | null>({
    queryKey: ["driverEstimateDetail", estimateId],
    queryFn: () => driverService.getDriverEstimateDetail(estimateId),
    enabled: !!estimateId
  });

  // 디버깅을 위한 콘솔 로그
  console.log("estimateDetail:", estimateDetail);

  if (isLoading) {
    return (
      <>
        <PageHeader title={t("estDetail")} />
        <OrangeBackground />
        <div className="mt-8 flex w-full flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-90">
          <div className="flex flex-col items-start gap-7">
            <div className="h-8 w-32 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </>
    );
  }

  if (error || !estimateDetail) {
    return (
      <>
        <PageHeader title={t("estDetail")} />
        <OrangeBackground />
        <div className="mt-8 flex w-full flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-90">
          <div className="flex flex-col items-start gap-7">
            <div className="text-red-500">견적 정보를 불러올 수 없습니다.</div>
          </div>
        </div>
      </>
    );
  }

  const { estimateRequest, price, status, isDesignated } = estimateDetail;
  const { customer, moveType, moveDate, fromAddress, toAddress } = estimateRequest;

  // 데이터 안전성 검증
  if (!customer || !customer.authUser || !fromAddress || !toAddress) {
    console.error("Missing required data:", { customer, fromAddress, toAddress });
    return (
      <>
        <PageHeader title={t("estDetail")} />
        <OrangeBackground />
        <div className="mt-8 flex w-full flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-90">
          <div className="flex flex-col items-start gap-7">
            <div className="text-red-500">견적 정보가 불완전합니다.</div>
          </div>
        </div>
      </>
    );
  }

  // moveType을 한글로 변환
  const getMoveTypeLabel = (moveType: string) => {
    const moveTypeMap: Record<string, string> = {
      SMALL: "소형이사",
      HOME: "가정이사",
      OFFICE: "사무실이사",
      REQUEST: "지정견적요청"
    };
    return moveTypeMap[moveType] || moveType;
  };

  // 고객 이름 안전하게 가져오기
  const customerName = customer.authUser?.name || "고객명 없음";

  return (
    <>
      <PageHeader title={t("estDetail")} />
      <OrangeBackground />
      {/* 상단 정보 + 공유 */}
      <div className="mt-8 flex w-full flex-col gap-5 px-5 md:gap-7 md:px-18 lg:flex-row lg:items-start lg:justify-between lg:px-90">
        {/* 왼쪽 - 헤더 섹션 + 견적 정보 섹션 */}
        <div className="flex flex-col items-start gap-7">
          {/* 헤더 섹션 */}
          <EstimateHeaderSection
            moveType={moveType as MoveType}
            isDesignated={isDesignated}
            status={status}
            customerName={customerName}
            price={price}
          />

          {/* 견적 정보 섹션 */}
          <EstimateInfoSection
            createdAt={formatDate(estimateRequest.createdAt)}
            moveTypeLabel={getMoveTypeLabel(moveType)}
            moveDate={formatDateTime(moveDate)}
            from={fromAddress.street}
            to={toAddress.street}
          />
        </div>

        {/* 오른쪽 - 공유 버튼 (lg에서만 보임) */}
        <div className="hidden lg:block">
          <ShareDriver text={t("shareEstimate")} />
        </div>
      </div>

      {/* 모바일/태블릿용 구분선과 공유 버튼 */}
      {/* 오른쪽 - 공유 버튼 */}
      <div className="mt-5 px-5 md:my-8 md:mt-8 md:px-18 lg:hidden">
        <div className="h-0 w-full outline outline-offset-[-0.5px] outline-zinc-100" />
      </div>

      <div className="items-left mb-10 flex flex-col px-5 md:flex-row md:px-18 lg:hidden">
        <ShareDriver text={t("wannaRecommend?")} />
      </div>
    </>
  );
}
