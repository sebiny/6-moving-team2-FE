"use client";

import Title from "@/components/Title";
import SubHeader from "../../_components/SubHeader";
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

export default function PastDetailPage() {
  const t = useTranslations("MyEstimates");
  const { id } = useParams();
  const { data } = useEstimateDetail(id as string);
  const shareToKakao = useKakaoShare();
  const { mutate: createShareLink } = useCreateShareLink();

  if (!data) {
    return <div className="mt-20 text-center">견적 데이터를 불러오는 중입니다...</div>;
  }

  const { status, comment, price, requestDate, moveDate, moveType, fromAddress, toAddress, driver, isDesignated } =
    data;

  const labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[] =
    isDesignated && moveType !== "REQUEST" ? [moveType, "REQUEST"] : [moveType];

  const handleKakaoShare = () => {
    createShareLink(id as string, {
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
    });
  };

  const handleFacebookShare = () => {
    createShareLink(id as string, {
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
    });
  };

  return (
    <>
      {/* 상단 서브 헤더 */}
      <div className="sticky top-14 z-9 bg-white lg:top-22">
        <SubHeader title={t("estimateDetail")} />
      </div>

      {/* 상단 배경 + 프로필 */}
      <div className="relative">
        <OrangeBackground />
        <div className="absolute top-[65px] left-5 md:top-[80px] md:left-17 lg:top-[135px] lg:left-[420px]">
          <Image
            src={driver.profileImage ?? "/assets/images/img_profile.svg"}
            alt="기사님 프로필"
            width={100}
            height={100}
            className="h-18 w-18 md:h-27 md:w-27 lg:h-37 lg:w-37"
          />
        </div>
      </div>

      {/* 본문 */}
      <div className="bg-white">
        <div className="flex flex-col px-5 py-[60px] pt-10 md:px-17 md:pt-15 lg:grid lg:grid-cols-[1fr_300px] lg:gap-20 lg:px-100 lg:pt-[88px] lg:pb-[120px]">
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
              requestDate={dayjs(requestDate).format("YYYY년 MM월 DD일")}
              serviceType={getMoveTypeLabel(moveType)}
              moveDate={dayjs(moveDate).format("YYYY년 MM월 DD일")}
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
