"use client";

import React, { useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/common/PageHeader";
import OrangeBackground from "@/components/OrangeBackground";
import ShareDriver from "@/components/ShareDriver";
import EstimateHeaderSection from "./_components/EstimateHeaderSection";
import EstimateInfoSection from "./_components/EstimateInfoSection";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { useTranslations, useLocale } from "next-intl";
import { driverService } from "@/lib/api/api-driver";
import { DriverEstimateDetailType } from "@/types/estimateType";
import { formatDate, formatDateTime, setDayjsLocale } from "@/utills/dateUtils";
import { MoveType, moveTypeLabelMap } from "@/constant/moveTypes";
import { useKakaoShare } from "@/hooks/useKakaoShare";
import { useCreateShareLink } from "@/lib/api/api-shareEstimate";
import { ToastModal } from "@/components/common-modal/ToastModal";

export default function EstimateDetailPage() {
  const t = useTranslations("MyEstimate");
  const locale = useLocale();
  const params = useParams();
  const estimateId = params.id as string;

  const shareToKakao = useKakaoShare();
  const { mutate: createShareLink } = useCreateShareLink();

  const {
    data: estimateDetail,
    isPending,
    error
  } = useQuery<DriverEstimateDetailType | null>({
    queryKey: ["driverEstimateDetail", estimateId],
    queryFn: () => driverService.getDriverEstimateDetail(estimateId),
    enabled: !!estimateId
  });

  // 메모이제이션된 로딩 상태 렌더링
  const renderLoadingState = useCallback(
    () => (
      <main className="flex min-h-screen flex-col bg-neutral-50" role="main" aria-label="견적 상세 페이지 로딩 중">
        <PageHeader title={t("estDetail")} />
        <div className="mt-8 flex w-full flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-90">
          <LoadingAnimation />
        </div>
      </main>
    ),
    [t]
  );

  // 메모이제이션된 에러 상태 렌더링
  const renderErrorState = useCallback(
    (message: string) => (
      <main className="flex min-h-screen flex-col bg-neutral-50" role="main" aria-label="견적 상세 페이지 오류">
        <PageHeader title={t("estDetail")} />
        <OrangeBackground />
        <div className="mt-8 flex w-full flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-80">
          <div className="flex flex-col items-start gap-7">
            <div role="alert" aria-live="polite" className="text-red-500">
              {message}
            </div>
          </div>
        </div>
      </main>
    ),
    [t]
  );

  // 데이터 검증 및 기본값 설정을 메모이제이션
  const processedData = useMemo(() => {
    if (!estimateDetail) return null;

    const { estimateRequest, price, status, isDesignated } = estimateDetail;
    const { customer, moveType, moveDate, fromAddress, toAddress } = estimateRequest;

    // 데이터 안전성 검증
    if (!customer?.authUser || !fromAddress || !toAddress) {
      console.error("Missing required data:", { customer, fromAddress, toAddress });
      return null;
    }

    return {
      estimateRequest,
      price,
      status,
      isDesignated,
      customerName: customer.authUser.name || "고객명 없음",
      moveType,
      moveDate,
      fromAddress,
      toAddress
    };
  }, [estimateDetail]);

  // 공유 링크 생성 핸들러 메모이제이션
  const handleShareLinkCreation = useCallback(
    (shareType: "kakao" | "facebook") => {
      return createShareLink(
        { estimateId, sharedFrom: "DRIVER" },
        {
          onSuccess: (response) => {
            const shareUrl = response?.shareUrl;
            if (!shareUrl) {
              ToastModal(t("error.shareUrlFailed"), 3000, "error");
              return;
            }

            if (shareType === "kakao") {
              shareToKakao({
                title: `${processedData?.customerName} 고객님 견적서`,
                description: `가격: ${processedData?.price?.toLocaleString()}원`,
                imageUrl: "/assets/images/img_profile.svg",
                link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
                buttons: [{ title: "견적서 보기", link: { mobileWebUrl: shareUrl, webUrl: shareUrl } }]
              });
            } else {
              const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
              window.open(facebookShareUrl, "_blank", "width=600,height=400");
            }
          },
          onError: (error: Error) => {
            const errorMessage = shareType === "kakao" ? t("error.shareLinkFailed") : t("error.facebookShareFailed");
            ToastModal(`${errorMessage}: ${error.message}`, 3000, "error");
          }
        }
      );
    },
    [createShareLink, estimateId, processedData, shareToKakao, t]
  );

  // 카카오 공유 핸들러
  const handleKakaoShare = useCallback(() => {
    handleShareLinkCreation("kakao");
  }, [handleShareLinkCreation]);

  // 페이스북 공유 핸들러
  const handleFacebookShare = useCallback(() => {
    handleShareLinkCreation("facebook");
  }, [handleShareLinkCreation]);

  // 날짜 포맷팅을 메모이제이션
  const formattedDate = useMemo(() => {
    if (!processedData?.moveDate) return "";
    setDayjsLocale(locale);
    return formatDateTime(processedData.moveDate);
  }, [processedData?.moveDate, locale]);

  // 이동 타입 라벨을 메모이제이션
  const moveTypeLabel = useMemo(() => {
    if (!processedData?.moveType) return "";
    return moveTypeLabelMap[processedData.moveType as MoveType]?.label || processedData.moveType;
  }, [processedData?.moveType]);

  // 로딩 상태 처리
  if (isPending) return renderLoadingState();

  // 에러 상태 처리
  if (error || !estimateDetail) return renderErrorState(t("error.loadFailed"));

  // 데이터 검증 실패 처리
  if (!processedData) return renderErrorState(t("error.incompleteData"));

  const { estimateRequest, price, status, isDesignated, customerName, moveType, moveDate, fromAddress, toAddress } =
    processedData;

  return (
    <main className="flex min-h-screen flex-col bg-neutral-50" role="main" aria-label="견적 상세 페이지">
      <PageHeader title={t("estDetail")} />
      <OrangeBackground />

      {/* 상단 정보 + 공유 */}
      <div className="mt-8 flex w-full flex-col gap-10 px-5 md:gap-7 md:px-55 lg:mb-20 lg:flex-row lg:items-start lg:justify-between">
        <section className="w-full lg:w-[60%]" aria-label="견적 정보">
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
              moveTypeLabel={moveTypeLabel}
              moveDate={formattedDate}
              from={fromAddress.street}
              to={toAddress.street}
            />
          </div>
        </section>

        {/* 오른쪽 - 공유 버튼 (lg에서만 보임) */}
        <aside className="hidden lg:flex lg:w-[30%] lg:items-start lg:justify-end" aria-label="공유 옵션">
          <ShareDriver
            text={t("shareEstimate")}
            onKakaoShare={handleKakaoShare}
            onFacebookShare={handleFacebookShare}
          />
        </aside>
      </div>

      {/* 모바일/태블릿용 구분선과 공유 버튼 */}
      <div className="mt-5 px-5 md:mt-7 md:px-55 lg:hidden">
        <div className="h-0 w-full outline outline-offset-[-0.5px] outline-zinc-100" />
      </div>

      <aside
        className="items-left mb-10 flex flex-col px-5 md:flex-row md:px-55 lg:hidden"
        aria-label="모바일 공유 옵션"
      >
        <ShareDriver
          text={t("wannaRecommend?")}
          onKakaoShare={handleKakaoShare}
          onFacebookShare={handleFacebookShare}
        />
      </aside>
    </main>
  );
}
