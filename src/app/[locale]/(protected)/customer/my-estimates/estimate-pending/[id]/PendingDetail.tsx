"use client";

import Title from "@/components/Title";
import Button from "@/components/Button";
import ShareDriver from "@/components/ShareDriver";
import OrangeBackground from "@/components/OrangeBackground";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAcceptEstimate, useEstimateDetail } from "@/lib/api/api-myEstimate";
import dayjs from "dayjs";
import { getMoveTypeLabel } from "@/utills/moveUtils";
import { formatStreetAddress } from "@/utills/addressUtils";
import EstimateDetailInfo from "@/components/common/EstimateDetailInfo";
import { useState } from "react";
import AlertModal from "@/components/common-modal/AlertModal";
import { useTranslations } from "next-intl";
import { useKakaoShare } from "@/hooks/useKakaoShare";
import { useCreateShareLink } from "@/lib/api/api-shareEstimate";
import PageHeader from "@/components/common/PageHeader";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import "dayjs/locale/ko";

export default function PendingDetailPage() {
  dayjs.locale("ko");

  const t = useTranslations("MyEstimates");
  const t1 = useTranslations("MyEstimate");
  const tC = useTranslations("Common");
  const { id } = useParams();
  const { data } = useEstimateDetail(id as string);

  const router = useRouter();

  const { mutate: acceptEstimate } = useAcceptEstimate();
  const { mutate: createShareLink } = useCreateShareLink();

  const [showModal, setShowModal] = useState(false);

  const shareToKakao = useKakaoShare();

  if (!data) {
    return (
      <>
        <LoadingLottie className="mt-70" />
      </>
    );
  }

  const { status, comment, price, requestDate, moveDate, moveType, fromAddress, toAddress, driver, isDesignated } =
    data;

  const labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[] =
    isDesignated && moveType !== "REQUEST" ? [moveType, "REQUEST"] : [moveType];

  const handleAcceptEstimate = () => {
    acceptEstimate(data.id, {
      onSuccess: () => setShowModal(true),
      onError: (error: any) => {
        alert(error.message || "견적 확정 중 오류가 발생했습니다.");
      }
    });
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    createShareLink(
      { estimateId: id as string, sharedFrom: "CUSTOMER" },
      {
        onSuccess: (response) => {
          const shareUrl = response?.shareUrl;

          if (!shareUrl) {
            alert("공유 URL을 생성하지 못했습니다.");
            return;
          }

          shareToKakao({
            title: `${driver.name} 기사님의 견적서`,
            description: `가격: ${price.toLocaleString()}원`,
            imageUrl: driver.profileImage
              ? `https://www.moving-2.click${driver.profileImage}`
              : "https://www.moving-2.click/assets/images/img_profile.svg",
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl
            },
            buttons: [
              {
                title: "견적서 보기",
                link: { mobileWebUrl: shareUrl, webUrl: shareUrl }
              }
            ]
          });
        },
        onError: (error: any) => {
          alert("공유 링크 생성 실패: " + error.message);
        }
      }
    );
  };

  // 페이스북 공유
  const handleFacebookShare = () => {
    createShareLink(
      { estimateId: id as string, sharedFrom: "CUSTOMER" },
      {
        onSuccess: (response) => {
          const shareUrl = response?.shareUrl;

          if (!shareUrl) {
            alert("공유 URL을 생성하지 못했습니다.");
            return;
          }

          // Facebook 공유 창 열기
          const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          window.open(facebookShareUrl, "_blank", "width=600,height=400");
        },
        onError: (error: any) => {
          alert("Facebook 공유 링크 생성 실패: " + error.message);
        }
      }
    );
  };

  return (
    <>
      {/* 상단 서브 헤더 */}
      <div className="sticky top-14 z-9 bg-white lg:top-22">
        <PageHeader title={t1("estDetail")} />
      </div>

      {/* 상단 배경 + 프로필 */}
      <div className="relative">
        <OrangeBackground />
        <div className="relative mx-auto max-w-[600px] md:max-w-[700px] lg:max-w-[1150px]">
          <div className="relative -mt-10 md:-mt-20">
            <Image
              src={driver.profileImage ?? "/assets/images/img_profile.svg"}
              alt="기사님 프로필"
              width={100}
              height={100}
              className="h-18 w-18 rounded-lg md:h-27 md:w-27 lg:h-37 lg:w-37"
            />
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="bg-white">
        <div className="flex flex-col px-5 py-[60px] pt-10 md:px-17 md:pt-15 lg:mx-auto lg:grid lg:max-w-[1300px] lg:grid-cols-[1fr_300px] lg:gap-20 lg:px-10 lg:pt-[50px] lg:pb-[120px]">
          {/* 왼쪽 콘텐츠 열 */}
          <div className="flex flex-col gap-10">
            {/* Title 컴포넌트 */}
            <Title
              status={status}
              labels={labels}
              driver={{
                name: driver.name,
                rating: driver.avgRating ?? 0.0,
                reviewCount: driver.reviewCount,
                experienceYear: driver.career,
                confirmedCount: driver.work,
                likes: driver.favoriteCount
              }}
              message={comment}
              estimatePrice={price}
            />

            <div className="border-t border-gray-100" />

            {/* 견적 정보 */}
            <EstimateDetailInfo
              requestDate={dayjs(requestDate).format("YY.MM.DD")}
              serviceType={getMoveTypeLabel(moveType)}
              moveDate={dayjs(moveDate).format("YYYY. MM. DD(ddd) A hh:mm")}
              from={formatStreetAddress(fromAddress)}
              to={formatStreetAddress(toAddress)}
            />

            {/* 기본 버전 */}
            <div className="flex flex-col gap-6 lg:hidden">
              <div className="my-3 border-t border-gray-100" />
              <ShareDriver
                text={t("shareEstimate")}
                onKakaoShare={handleKakaoShare}
                onFacebookShare={handleFacebookShare}
              />
              <div className="mt-10">
                <Button type="orange" text={t("acceptEstimate")} onClick={handleAcceptEstimate} />
              </div>
            </div>
          </div>

          {/* 오른쪽 사이드 열 */}
          <div className="mt-7 hidden lg:flex lg:flex-col lg:justify-center lg:gap-6">
            <div>
              <p className="text-lg font-semibold text-neutral-400">{t("estimateCost")}</p>
              <p className="text-black-500 text-2xl font-bold">
                {price.toLocaleString()}
                {t("won")}
              </p>
            </div>

            <Button type="orange" text={t("acceptEstimate")} onClick={handleAcceptEstimate} />

            <div className="my-3 border-t border-gray-100" />

            <ShareDriver
              text={t("shareEstimate")}
              onKakaoShare={handleKakaoShare}
              onFacebookShare={handleFacebookShare}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <AlertModal
          type="handleClick"
          message={tC("reqConfirmed")}
          buttonText={tC("GoToRecReq")}
          onClose={() => setShowModal(false)}
          onConfirm={() => router.push("/customer/my-estimates?tab=past")}
        />
      )}
    </>
  );
}
