"use client";

import Title from "@/components/Title";
import SubHeader from "../../_components/SubHeader";
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
import { useEffect, useState } from "react";
import AlertModal from "@/components/common-modal/AlertModal";
import { useTranslations } from "next-intl";

export default function PendingDetailPage() {
  const t = useTranslations("MyEstimates");
  const t1 = useTranslations("MyEstimate");

  const { id } = useParams();
  const { data } = useEstimateDetail(id as string);

  const router = useRouter();

  const { mutate: acceptEstimate } = useAcceptEstimate();

  const [showModal, setShowModal] = useState(false);

  const estimateUrl = `https://www.moving-2.click/customer/my-estimates/estimate-pending/${id}`;

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  if (!data) {
    return <div className="mt-90 flex justify-center text-center">견적 데이터를 불러오는 중입니다...</div>;
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

  const handleKakaoShare = () => {
    if (typeof window !== "undefined" && window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `견적서 - ${driver.name} 기사님`,
          description: `가격: ${price.toLocaleString()}원\n이사 날짜: ${dayjs(moveDate).format(
            "YYYY년 MM월 DD일"
          )}\n출발: ${formatStreetAddress(fromAddress)}\n도착: ${formatStreetAddress(toAddress)}`,
          imageUrl: driver.profileImage ?? "/assets/images/img_profile.svg",
          link: {
            mobileWebUrl: estimateUrl,
            webUrl: estimateUrl
          }
        },
        buttons: [
          {
            title: "견적서 보기",
            link: {
              mobileWebUrl: estimateUrl,
              webUrl: estimateUrl
            }
          }
        ]
      });
    }
  };

  return (
    <>
      {/* 상단 서브 헤더 */}
      <div className="sticky top-14 z-9 bg-white lg:top-22">
        <SubHeader title={t1("estDetail")} />
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
        <div className="flex flex-col px-5 py-[40px] pt-10 md:px-17 md:pt-15 lg:grid lg:grid-cols-[1fr_300px] lg:gap-40 lg:px-100 lg:pt-[88px] lg:pb-[120px]">
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
              requestDate={dayjs(requestDate).format("YYYY년 MM월 DD일")}
              serviceType={getMoveTypeLabel(moveType)}
              moveDate={dayjs(moveDate).format("YYYY년 MM월 DD일")}
              from={formatStreetAddress(fromAddress)}
              to={formatStreetAddress(toAddress)}
            />

            {/* 기본 버전 */}
            <div className="flex flex-col gap-6 lg:hidden">
              <div className="my-3 border-t border-gray-100" />
              <ShareDriver text={t("shareEstimate")} onKakaoShare={handleKakaoShare} />
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

            <ShareDriver text={t("shareEstimate")} onKakaoShare={handleKakaoShare} />
          </div>
        </div>
      </div>

      {showModal && (
        <AlertModal
          type="handleClick"
          message="견적이 확정되었습니다!"
          buttonText="받았던 견적 보러가기"
          onClose={() => setShowModal(false)}
          onConfirm={() => router.push("/customer/my-estimates?tab=past")}
        />
      )}
    </>
  );
}
