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
import { MoveType, moveTypeLabelMap } from "@/constant/moveTypes";

export default function EstimateDetailPage() {
  const t = useTranslations("MyEstimate");
  const params = useParams();
  const estimateId = params.id as string;

  const {
    data: estimateDetail,
    isPending,
    error
  } = useQuery<DriverEstimateDetailType | null>({
    queryKey: ["driverEstimateDetail", estimateId],
    queryFn: () => driverService.getDriverEstimateDetail(estimateId),
    enabled: !!estimateId
  });

  const renderLoadingState = () => (
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

  const renderErrorState = (message: string) => (
    <>
      <PageHeader title={t("estDetail")} />
      <OrangeBackground />
      <div className="mt-8 flex w-full flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-90">
        <div className="flex flex-col items-start gap-7">
          <div className="text-red-500">{message}</div>
        </div>
      </div>
    </>
  );

  if (isPending) return renderLoadingState();
  if (error || !estimateDetail) return renderErrorState("견적 정보를 불러올 수 없습니다.");

  const { estimateRequest, price, status, isDesignated } = estimateDetail;
  const { customer, moveType, moveDate, fromAddress, toAddress } = estimateRequest;

  // 데이터 안전성 검증
  if (!customer?.authUser || !fromAddress || !toAddress) {
    console.error("Missing required data:", { customer, fromAddress, toAddress });
    return renderErrorState("견적 정보가 불완전합니다.");
  }

  const customerName = customer.authUser.name || "고객명 없음";

  return (
    <>
      <PageHeader title={t("estDetail")} />
      <OrangeBackground />
      {/* 상단 정보 + 공유 */}
      <div className="mt-8 flex w-full flex-col gap-5 px-5 md:gap-7 md:px-18 lg:flex-row lg:items-start lg:justify-between lg:px-90">
        <div className="w-full lg:w-[60%]">
          <EstimateHeaderSection
            moveType={moveType as MoveType}
            isDesignated={isDesignated}
            status={status}
            customerName={customerName}
            price={price}
          />

          <div className="mt-5 lg:mt-7">
            <EstimateInfoSection
              createdAt={formatDate(estimateRequest.createdAt)}
              moveTypeLabel={moveTypeLabelMap[moveType as MoveType]?.label || moveType}
              moveDate={formatDateTime(moveDate)}
              from={fromAddress.street}
              to={toAddress.street}
            />
          </div>
        </div>

        {/* 오른쪽 - 공유 버튼 (lg에서만 보임) */}
        <div className="hidden lg:flex lg:w-[30%] lg:items-start lg:justify-end">
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
