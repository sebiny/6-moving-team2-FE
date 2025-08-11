"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/common/PageHeader";
import OrangeBackground from "@/components/OrangeBackground";
import ShareDriver from "@/components/ShareDriver";
import EstimateHeaderSection from "./_components/EstimateHeaderSection";
import EstimateInfoSection from "./_components/EstimateInfoSection";
import LoadingLottie from "@/components/lottie/LoadingLottie";
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

  const renderLoadingState = () => (
    <main className="flex min-h-screen flex-col bg-neutral-50" role="main" aria-label="견적 상세 페이지 로딩 중">
      <PageHeader title={t("estDetail")} />
      <OrangeBackground />
      <div className="mt-8 flex w-full flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:px-90">
        <LoadingLottie text={t("loading")} />
      </div>
    </main>
  );

  const renderErrorState = (message: string) => (
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
  );

  if (isPending) return renderLoadingState();
  if (error || !estimateDetail) return renderErrorState(t("error.loadFailed"));

  const { estimateRequest, price, status, isDesignated } = estimateDetail;
  const { customer, moveType, moveDate, fromAddress, toAddress } = estimateRequest;

  // 데이터 안전성 검증
  if (!customer?.authUser || !fromAddress || !toAddress) {
    console.error("Missing required data:", { customer, fromAddress, toAddress });
    return renderErrorState(t("error.incompleteData"));
  }

  const customerName = customer.authUser.name || "고객명 없음";

  const handleKakaoShare = () => {
    createShareLink(
      { estimateId, sharedFrom: "DRIVER" },
      {
        onSuccess: (response) => {
          const shareUrl = response?.shareUrl;
          if (!shareUrl) {
            ToastModal(t("error.shareUrlFailed"), 3000, "error");
            return;
          }

          shareToKakao({
            title: `${customerName} 고객님 견적서`,
            description: `가격: ${price?.toLocaleString()}원`,
            imageUrl: "/assets/images/img_profile.svg",
            link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
            buttons: [{ title: "견적서 보기", link: { mobileWebUrl: shareUrl, webUrl: shareUrl } }]
          });
        },
        onError: (error: Error) => {
          ToastModal(t("error.shareLinkFailed") + ": " + error.message, 3000, "error");
        }
      }
    );
  };

  const handleFacebookShare = () => {
    createShareLink(
      { estimateId, sharedFrom: "DRIVER" },
      {
        onSuccess: (response) => {
          const shareUrl = response?.shareUrl;
          if (!shareUrl) {
            ToastModal(t("error.shareUrlFailed"), 3000, "error");
            return;
          }
          const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          window.open(facebookShareUrl, "_blank", "width=600,height=400");
        },
        onError: (error: Error) => {
          ToastModal(t("error.facebookShareFailed") + ": " + error.message, 3000, "error");
        }
      }
    );
  };

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
              moveTypeLabel={moveTypeLabelMap[moveType as MoveType]?.label || moveType}
              moveDate={(() => {
                setDayjsLocale(locale);
                return formatDateTime(moveDate);
              })()}
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
      {/* 오른쪽 - 공유 버튼 */}
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
