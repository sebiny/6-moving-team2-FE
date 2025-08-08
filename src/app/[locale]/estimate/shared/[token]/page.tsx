"use client";

import OrangeBackground from "@/components/OrangeBackground";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import EstimateDetailInfo from "@/components/common/EstimateDetailInfo";
import { defaultFetch } from "@/lib/FetchClient";
import Title from "@/components/Title";
import EstimateHeaderSection from "@/app/[locale]/(protected)/driver/my-estimates/sent/[id]/_components/EstimateHeaderSection";
import EstimateInfoSection from "@/app/[locale]/(protected)/driver/my-estimates/sent/[id]/_components/EstimateInfoSection";
import { MoveType, moveTypeLabelMap } from "@/constant/moveTypes";
import { formatDate, formatDateTime } from "@/utills/dateUtils";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import "dayjs/locale/ko";
import ShareDriver from "@/components/ShareDriver";
import { useKakaoShare } from "@/hooks/useKakaoShare";
import { useCreateShareLink } from "@/lib/api/api-shareEstimate";

dayjs.locale("ko");

export default function SharedEstimatePage() {
  const { token } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sharedEstimate", token],
    queryFn: () => defaultFetch(`/estimate/shared/${token}`),
    enabled: !!token
  });

  if (isLoading) return <LoadingLottie className="mt-30" />;
  if (error || !data) return <div className="mt-20 text-center">견적을 불러올 수 없습니다.</div>;

  const isDriverShared = data?.type === "DRIVER";
  const sharedFrom: "DRIVER" | "CUSTOMER" = isDriverShared ? "DRIVER" : "CUSTOMER";

  const estimateId: string | undefined = data?.estimateId;

  const estimateRequest = data?.estimateRequest ?? {};
  const driver = data?.driver ?? {};
  const customer = estimateRequest?.customer ?? {};

  const comment = data?.comment ?? "";
  const price = data?.price ?? 0;
  const status = data?.status ?? "";
  const isDesignated = data?.isDesignated ?? false;

  const labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[] =
    isDesignated && estimateRequest?.moveType !== "REQUEST"
      ? [estimateRequest?.moveType, "REQUEST"]
      : [estimateRequest?.moveType];

  // 공유 훅/뮤테이션
  const shareToKakao = useKakaoShare();
  const { mutate: createShareLink } = useCreateShareLink();

  // 역할에 따른 공유용 텍스트/이미지
  const driverName = driver?.authUser?.name ?? "기사님";
  const customerName = customer?.authUser?.name ?? "고객님";
  const shareTitle = isDriverShared ? `${customerName} 견적서` : `${driverName} 견적서`;
  const shareDescription = price ? `가격: ${price.toLocaleString()}원` : "";
  const shareImageUrl = (!isDriverShared ? driver?.profileImage : undefined) || "/assets/images/img_profile.svg";

  //  공통 공유 링크 생성 + 카카오 호출
  const handleKakaoShare = () => {
    // estimateId가 없다면 현재 URL로라도 공유 (백엔드가 허용 안 하면 반드시 estimateId 포함해 주도록 응답 조정)
    const fallbackUrl = typeof window !== "undefined" ? window.location.href : undefined;

    if (!estimateId) {
      if (!fallbackUrl) {
        alert("공유 URL을 생성하지 못했습니다.");
        return;
      }
      shareToKakao({
        title: shareTitle,
        description: shareDescription,
        imageUrl: shareImageUrl,
        link: { mobileWebUrl: fallbackUrl, webUrl: fallbackUrl },
        buttons: [{ title: "견적서 보기", link: { mobileWebUrl: fallbackUrl, webUrl: fallbackUrl } }]
      });
      return;
    }

    createShareLink(
      { estimateId, sharedFrom },
      {
        onSuccess: (res: any) => {
          const shareUrl = res?.shareUrl;
          if (!shareUrl) {
            alert("공유 URL을 생성하지 못했습니다.");
            return;
          }
          shareToKakao({
            title: shareTitle,
            description: shareDescription,
            imageUrl: shareImageUrl,
            link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
            buttons: [{ title: "견적서 보기", link: { mobileWebUrl: shareUrl, webUrl: shareUrl } }]
          });
        },
        onError: (err: Error) => alert("공유 링크 생성 실패: " + err.message)
      }
    );
  };

  // 공통 공유 링크 생성 + 페북 공유
  const handleFacebookShare = () => {
    const fallbackUrl = typeof window !== "undefined" ? window.location.href : undefined;

    if (!estimateId) {
      if (!fallbackUrl) {
        alert("공유 URL을 생성하지 못했습니다.");
        return;
      }
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fallbackUrl)}`;
      window.open(facebookShareUrl, "_blank", "width=600,height=400");
      return;
    }

    createShareLink(
      { estimateId, sharedFrom },
      {
        onSuccess: (res: any) => {
          const shareUrl = res?.shareUrl;
          if (!shareUrl) {
            alert("공유 URL을 생성하지 못했습니다.");
            return;
          }
          const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          window.open(facebookShareUrl, "_blank", "width=600,height=400");
        },
        onError: (err: Error) => alert("Facebook 공유 링크 생성 실패: " + err.message)
      }
    );
  };

  return (
    <>
      {/* 상단 배경 + (CUSTOMER 전용) 프로필 겹치기 */}
      <div className="relative">
        <OrangeBackground />
        {!isDriverShared && (
          <div className="relative mx-auto max-w-[600px] md:max-w-[700px] lg:max-w-[1150px]">
            <div className="relative -mt-10 md:-mt-20">
              <Image
                src={driver?.profileImage ?? "/assets/images/img_profile.svg"}
                alt="기사님 프로필"
                width={100}
                height={100}
                className="h-18 w-18 rounded-lg md:h-27 md:w-27 lg:h-37 lg:w-37"
              />
            </div>
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="bg-white">
        <div className="flex flex-col px-5 pt-10 md:px-17 md:pt-15 lg:mx-auto lg:grid lg:max-w-[1300px] lg:grid-cols-[1fr_300px] lg:gap-20 lg:px-10 lg:pt-[50px] lg:pb-[120px]">
          {/* 왼쪽 */}
          <div className="flex flex-col gap-10">
            {!isDriverShared ? (
              <>
                <Title
                  labels={labels}
                  driver={{
                    id: driver.id,
                    isFavorite: driver.isFavorite,
                    name: driver?.authUser?.name ?? "이름 없음",
                    rating: driver?.averageRating ?? 0.0,
                    reviewCount: driver?.reviewsReceived?.length ?? 0,
                    experienceYear: driver?.career ?? 0,
                    confirmedCount: driver?.work ?? 0,
                    likes: driver?.favorite?.length ?? 0
                  }}
                  message={comment}
                  estimatePrice={price}
                />
                <div className="border-t border-gray-100" />
                <EstimateDetailInfo
                  requestDate={estimateRequest?.createdAt ? formatDate(estimateRequest.createdAt) : ""}
                  serviceType={
                    moveTypeLabelMap[estimateRequest?.moveType as MoveType]?.label || estimateRequest?.moveType
                  }
                  moveDate={estimateRequest?.moveDate ? formatDateTime(estimateRequest.moveDate) : ""}
                  from={estimateRequest?.fromAddress?.street ?? ""}
                  to={estimateRequest?.toAddress?.street ?? ""}
                />

                {/* 모바일 공유 영역 */}
                <div className="flex flex-col gap-6 lg:hidden">
                  <div className="my-3 border-t border-gray-100" />
                  <ShareDriver
                    text="견적서 공유하기"
                    onKakaoShare={handleKakaoShare}
                    onFacebookShare={handleFacebookShare}
                  />
                </div>
              </>
            ) : (
              <>
                <EstimateHeaderSection
                  moveType={estimateRequest?.moveType as MoveType}
                  isDesignated={false}
                  status={status}
                  customerName={customer?.authUser?.name ?? "고객명 없음"}
                  price={price}
                />
                <EstimateInfoSection
                  createdAt={estimateRequest?.createdAt ? formatDate(estimateRequest.createdAt) : ""}
                  moveTypeLabel={
                    moveTypeLabelMap[estimateRequest?.moveType as MoveType]?.label || estimateRequest?.moveType
                  }
                  moveDate={estimateRequest?.moveDate ? formatDateTime(estimateRequest.moveDate) : ""}
                  from={estimateRequest?.fromAddress?.street ?? ""}
                  to={estimateRequest?.toAddress?.street ?? ""}
                />

                {/* 모바일 공유 영역 */}
                <div className="flex flex-col gap-6 lg:hidden">
                  <div className="my-3 border-t border-gray-100" />
                  <ShareDriver
                    text="견적서 공유하기"
                    onKakaoShare={handleKakaoShare}
                    onFacebookShare={handleFacebookShare}
                  />
                </div>
              </>
            )}
          </div>

          {/* 우측 사이드: 공유만! */}
          <div className="mt-7 hidden lg:flex lg:flex-col lg:gap-6">
            <ShareDriver text="견적서 공유하기" onKakaoShare={handleKakaoShare} onFacebookShare={handleFacebookShare} />
          </div>
        </div>
      </div>
    </>
  );
}
