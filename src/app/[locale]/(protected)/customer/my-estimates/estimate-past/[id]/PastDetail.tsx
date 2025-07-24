"use client";

import Title from "@/components/Title";
import SubHeader from "../../_components/SubHeader";
import EstimateDetailInfo from "../../_components/EstimateDetailInfo";
import ShareDriver from "@/components/ShareDriver";
import OrangeBackground from "@/components/OrangeBackground";
import Image from "next/image";
import { useParams } from "next/navigation";
import { receivedEstimateData } from "../_components/ReceivedEstimateData";
import AutoRejectedAlert from "./_components/AutoRejectedAlert";
import { useTranslations } from "use-intl";

export default function PastDetailPage() {
  const t = useTranslations("MyEstimates");
  const { id } = useParams();
  const estimateId = Number(id);

  // 임시 데이터에서 estimateId로 해당 견적 찾아오기
  const matchedEstimate = receivedEstimateData
    .flatMap((group) => group.estimates)
    .find((estimate) => estimate.id === estimateId);

  if (!matchedEstimate) return <div className="mt-20 flex justify-center">견적을 찾을 수 없습니다.</div>;

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
            src="/assets/images/img_profile.svg"
            alt="기사님 프로필"
            width={100}
            height={100}
            className="h-18 w-18 md:h-27 md:w-27 lg:h-37 lg:w-37"
          />
        </div>
      </div>

      {/* 본문 */}
      <div className="bg-white">
        <div className="flex flex-col px-5 py-[60px] pt-10 md:px-17 md:pt-15 lg:grid lg:grid-cols-[1fr_300px] lg:gap-40 lg:px-100 lg:pt-[88px] lg:pb-[120px]">
          {/* 왼쪽 콘텐츠 */}
          <div className="flex flex-col gap-10">
            <Title
              status={matchedEstimate.status}
              labels={matchedEstimate.labels}
              driver={matchedEstimate.driver}
              message={matchedEstimate.message}
              estimatePrice={matchedEstimate.price}
            />

            <div className="border-t border-gray-100" />

            {/* 임시 고정 */}
            <EstimateDetailInfo
              requestDate="24.08.26"
              serviceType="사무실이사"
              moveDate="2024. 08. 26(월) 오전 10:00"
              from="서울 중구 삼일대로 343"
              to="서울 강남구 선릉로 428"
            />

            {/* AUTO_REJECTED인 경우만 표시 */}
            {matchedEstimate.status === "AUTO_REJECTED" && <AutoRejectedAlert />}
          </div>

          <div className="my-6 border-t border-gray-100 lg:hidden" />

          <ShareDriver text={t("shareEstimate")} />
        </div>
      </div>
    </>
  );
}
