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

  if (isLoading) return <LoadingLottie className="mt-30" />;

  if (error || !data) {
    return <div className="mt-20 text-center">견적을 불러올 수 없습니다.</div>;
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
    <>
      <OrangeBackground />
      <div className="bg-white">
        <div className="flex flex-col px-5 pt-5 md:px-17 lg:mx-auto lg:max-w-[1700px] lg:gap-20 lg:px-10 lg:pb-[120px]">
          <div className="flex flex-col gap-10">
            {!isDriverShared ? (
              <>
                <div className="relative w-fit">
                  <Image
                    src={driver?.profileImage ?? "/assets/images/img_profile.svg"}
                    alt="기사님 프로필"
                    width={100}
                    height={100}
                    className="h-18 w-18 rounded-lg md:h-27 md:w-27 lg:h-37 lg:w-37"
                  />
                </div>
                <Title
                  labels={labels}
                  driver={{
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
          </div>
        </div>
      </div>
    </>
  );
}
