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

dayjs.locale("ko");

export default function SharedEstimatePage() {
  const { token } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sharedEstimate", token],
    queryFn: () => defaultFetch(`/estimate/shared/${token}`),
    enabled: !!token
  });

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        <LoadingLottie className="mt-30" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <main className="mt-20 text-center" role="status" aria-live="assertive">
        견적을 불러올 수 없습니다.
      </main>
    );
  }

  const isDriverShared = data?.type === "DRIVER";

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

  return (
    <div className="bg-white">
      {/* 헤더 영역: 페이지 장식 배경 + (고객 공유 시) 프로필 */}
      <header aria-label="견적서 공유 헤더" className="relative">
        <OrangeBackground />
        {!isDriverShared && (
          <div className="relative mx-auto max-w-[800px] md:max-w-[1000px] lg:max-w-[1550px]">
            {/* 장식/프로필: 정보 전달 목적이면 figure, 아니면 단순 이미지 */}
            <figure className="relative -mt-10 md:-mt-20">
              <Image
                src={driver?.profileImage ?? "/assets/images/img_profile.svg"}
                alt="기사님 프로필"
                width={100}
                height={100}
                className="h-18 w-18 rounded-lg md:h-27 md:w-27 lg:h-37 lg:w-37"
              />
              {/* 캡션이 필요 없다면 생략 가능 */}
              {/* <figcaption className="sr-only">{driver?.authUser?.name ?? "기사님"}</figcaption> */}
            </figure>
          </div>
        )}
      </header>

      {/* 본문 */}
      <main
        id="main-content"
        className="flex flex-col px-5 pt-10 md:px-17 lg:mx-auto lg:max-w-[1700px] lg:gap-20 lg:px-10 lg:pb-[120px]"
      >
        <section aria-labelledby="estimate-section-title" className="flex flex-col gap-10">
          <h1 id="estimate-section-title" className="sr-only">
            공유된 견적 상세
          </h1>

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

              <hr className="border-t border-gray-100" aria-hidden="true" />

              <EstimateDetailInfo
                requestDate={estimateRequest?.createdAt ? formatDate(estimateRequest.createdAt) : ""}
                serviceType={
                  moveTypeLabelMap[estimateRequest?.moveType as MoveType]?.label || estimateRequest?.moveType
                }
                moveDate={estimateRequest?.moveDate ? formatDateTime(estimateRequest.moveDate) : ""}
                from={estimateRequest?.fromAddress?.street ?? ""}
                to={estimateRequest?.toAddress?.street ?? ""}
              />
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
            </>
          )}
        </section>
      </main>
    </div>
  );
}
