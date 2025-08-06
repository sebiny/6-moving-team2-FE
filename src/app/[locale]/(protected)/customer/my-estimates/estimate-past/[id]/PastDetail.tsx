"use client";

import Title from "@/components/Title";
import ShareDriver from "@/components/ShareDriver";
import OrangeBackground from "@/components/OrangeBackground";
import Image from "next/image";
import { useParams } from "next/navigation";
import AutoRejectedAlert from "./_components/AutoRejectedAlert";
import { useTranslations } from "use-intl";
import { useEstimateDetail } from "@/lib/api/api-myEstimate";
import dayjs from "dayjs";
import { getMoveTypeLabel } from "@/utills/moveUtils";
import { formatStreetAddress } from "@/utills/addressUtils";
import EstimateDetailInfo from "@/components/common/EstimateDetailInfo";
import { useKakaoShare } from "@/hooks/useKakaoShare";
import { useCreateShareLink } from "@/lib/api/api-shareEstimate";
import PageHeader from "@/components/common/PageHeader";
import LoadingLottie from "@/components/lottie/LoadingLottie";
import "dayjs/locale/ko";

export default function PastDetailPage() {
  const t = useTranslations("MyEstimates");
  const { id } = useParams();
  const { data } = useEstimateDetail(id as string);
  const shareToKakao = useKakaoShare();
  const { mutate: createShareLink } = useCreateShareLink();

  dayjs.locale("ko");

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
        <PageHeader title={t("estimateDetail")} />
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
          {/* 왼쪽 콘텐츠 */}
          <div className="flex flex-col gap-10">
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

            <EstimateDetailInfo
              requestDate={dayjs(requestDate).format("YY.MM.DD")}
              serviceType={getMoveTypeLabel(moveType)}
              moveDate={dayjs(moveDate).format("YYYY. MM. DD(ddd) A hh:mm")}
              from={formatStreetAddress(fromAddress)}
              to={formatStreetAddress(toAddress)}
            />

            {/* AUTO_REJECTED인 경우만 표시 */}
            {status === "AUTO_REJECTED" && <AutoRejectedAlert />}
          </div>

          <div className="my-6 border-t border-gray-100 lg:hidden" />

          <ShareDriver
            text={t("shareEstimate")}
            onKakaoShare={handleKakaoShare}
            onFacebookShare={handleFacebookShare}
          />
        </div>
      </div>
    </>
  );
}
