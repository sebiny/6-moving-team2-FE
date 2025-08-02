"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import EstimateCardList from "@/app/[locale]/(protected)/driver/my-estimates/sent/_components/EstimateCardList";
import { driverService } from "@/lib/api/api-driver";
import { DriverEstimateType } from "@/types/estimateType";
import { MoveType } from "@/constant/moveTypes";
import { formatDate, formatTimeAgo, formatAddress } from "@/utills/RequestMapper";
import { useLocale, useTranslations } from "next-intl";
import { batchTranslate } from "@/utills/batchTranslate";

export default function SentEstimatesPage() {
  const router = useRouter();
  const locale = useLocale();
  const [translatedTexts, setTranslatedTexts] = useState<Record<string, string>>({});

  const pathname = usePathname();
  const tC = useTranslations();
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
  //동적번역 요청
  useEffect(() => {
    if (!backendEstimates || backendEstimates.length === 0) return;

    const translateTexts = async () => {
      const textsToTranslate: Record<string, string> = {};
      //estimates로 저장되는거라 키값이 따로 필요함
      backendEstimates.forEach((estimate, idx) => {
        const prefix = `estimate_${idx}`;
        textsToTranslate[`${prefix}_from`] = formatAddress(estimate.estimateRequest.fromAddress);
        textsToTranslate[`${prefix}_to`] = formatAddress(estimate.estimateRequest.toAddress);
        textsToTranslate[`${prefix}_date`] = formatDate(estimate.estimateRequest.moveDate);
      });

      try {
        const result = await batchTranslate(textsToTranslate, locale);
        setTranslatedTexts(result);
      } catch (e) {
        console.warn("번역 실패", e);
        setTranslatedTexts(textsToTranslate); // fallback
      }
    };

    translateTexts();
  }, [backendEstimates, locale]);

  // 백엔드 데이터를 프론트엔드 형식으로 변환
  const estimates = (backendEstimates || []).map((estimate: DriverEstimateType, idx) => {
    const prefix = `estimate_${idx}`;
    return {
      id: estimate.id,
      moveType: estimate.estimateRequest.moveType as MoveType,
      isDesignated: estimate.isDesignated,
      isCompleted: estimate.isCompleted,
      customerName: estimate.customerName,
      fromAddress: translatedTexts[`${prefix}_from`] || formatAddress(estimate.estimateRequest.fromAddress),
      toAddress: translatedTexts[`${prefix}_to`] || formatAddress(estimate.estimateRequest.toAddress),
      moveDate: translatedTexts[`${prefix}_date`] || formatDate(estimate.estimateRequest.moveDate),
      estimateAmount: estimate.price ? `${estimate.price.toLocaleString()} ${tC("won")}` : tC("noCost"),
      status: estimate.status === "PROPOSED" ? "pending" : estimate.status === "ACCEPTED" ? "confirmed" : "rejected",
      createdAt: formatTimeAgo(estimate.createdAt)
    };
  });

  const renderContent = () => {
    if (isPending)
      return <p className="text-center text-base font-normal text-neutral-400 lg:text-xl">{tC("loading")}</p>;
    if (error) return <p className="text-center text-base font-normal text-red-400 lg:text-xl">{}</p>;
    if (estimates.length === 0)
      return <p className="text-center text-base font-normal text-neutral-400 lg:text-xl">{tC("noSentReq")}</p>;
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
