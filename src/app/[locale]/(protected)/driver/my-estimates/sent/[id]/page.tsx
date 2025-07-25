"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/common/PageHeader";
import OrangeBackground from "@/components/OrangeBackground";
import ChipRectangle from "@/components/chip/ChipRectangle";
import ChipConfirmed from "@/components/chip/ChipConfirmed";
import ShareDriver from "@/components/ShareDriver";
import EstimateDetailInfo from "@/components/common/EstimateDetailInfo";
import { useTranslations } from "next-intl";
import { driverService } from "@/lib/api/api-driver";
import { DriverEstimateDetailType } from "@/types/estimateType";
import { formatDate, formatDateTime } from "@/utills/dateUtils";

// 거절된 견적을 위한 칩 컴포넌트
const ChipRejected = () => {
  const t = useTranslations("Chip");
  return (
    <div className="inline-flex items-center gap-1 rounded-md bg-gray-50 py-1 pr-1.5 pl-[5px] font-[Pretendard] font-semibold shadow-[4px_4px_8px_0px_rgba(217,217,217,0.10)]">
      <div className="text-sm leading-normal text-gray-500">{t("REJECTED")}</div>
    </div>
  );
};

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

  // 상태에 따른 칩 표시
  const getStatusChip = () => {
    switch (status) {
      case "ACCEPTED":
        return <ChipConfirmed />;
      case "REJECTED":
        return <ChipRejected />;
      default:
        return null;
    }
  };

  // 고객 이름 안전하게 가져오기
  const customerName = customer.authUser?.name || "고객명 없음";

  return (
    <>
      <PageHeader title={t("estDetail")} />
      <OrangeBackground />
      {/* 상단 정보 + 공유 */}
      <div className="mt-8 flex w-full flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-90">
        {/* 왼쪽 - 상단 정보 + 견적 정보 */}
        <div className="flex flex-col items-start gap-7">
          {/* 상단 정보 */}
          <div className="flex w-full flex-col gap-5">
            {/* 칩들: 이사 유형 + 상태 (모바일) */}
            <div className="flex items-center gap-3">
              <ChipRectangle moveType={moveType} size="md" />
              {isDesignated && <ChipRectangle moveType="REQUEST" size="md" />}
              {/* 모바일에서만 상태 칩 표시 */}
              <div className="block md:hidden">{getStatusChip()}</div>
            </div>
            {/* 고객명 + 상태 (PC 이상) */}
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="text-lg leading-loose font-semibold text-zinc-800 md:text-2xl">{customerName}</div>
                <div className="text-lg leading-loose font-semibold text-zinc-800 md:text-2xl">{t("customer")}</div>
              </div>
              {/* md 이상일 때만 보여지는 상태 칩 */}
              <div className="ml-auto hidden md:block">{getStatusChip()}</div>
            </div>
          </div>

          <div className="h-0 w-full outline outline-offset-[-0.5px] outline-zinc-100" />

          {/* 견적가 */}
          <div className="flex w-full items-center justify-between md:w-1/2">
            <div className="text-base leading-loose font-semibold text-neutral-800 md:text-xl">{t("cost")}</div>
            <div className="text-xl leading-loose font-bold text-neutral-800 md:text-2xl">
              {price ? `${price.toLocaleString()}원` : "견적가 없음"}
            </div>
          </div>

          <div className="h-0 w-full outline-1 outline-offset-[-0.5px] outline-zinc-100" />

          {/* 견적 상세 정보 */}
          <div className="w-full max-w-[744px]">
            <EstimateDetailInfo
              requestDate={formatDate(estimateRequest.createdAt)}
              serviceType={getMoveTypeLabel(moveType)}
              moveDate={formatDateTime(moveDate)}
              from={fromAddress.street}
              to={toAddress.street}
            />
          </div>
        </div>

        {/* 오른쪽 - 공유 버튼 */}
        <div className="items-left mb-10 flex flex-col md:flex-row">
          <ShareDriver text={t("wannaRecommend?")} />
        </div>
      </div>
    </>
  );
}
