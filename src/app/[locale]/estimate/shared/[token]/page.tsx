// 견적서 공유용 페이지
"use client";

import OrangeBackground from "@/components/OrangeBackground";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getMoveTypeLabel } from "@/utills/moveUtils";
import { formatStreetAddress } from "@/utills/addressUtils";
import EstimateDetailInfo from "@/components/common/EstimateDetailInfo";
import { defaultFetch } from "@/lib/FetchClient";
import Title from "@/components/Title";
import EstimateHeaderSection from "@/app/[locale]/(protected)/driver/my-estimates/sent/[id]/_components/EstimateHeaderSection";
import EstimateInfoSection from "@/app/[locale]/(protected)/driver/my-estimates/sent/[id]/_components/EstimateInfoSection";
import { MoveType, moveTypeLabelMap } from "@/constant/moveTypes";
import { formatDate, formatDateTime } from "@/utills/dateUtils";
import LoadingLottie from "@/components/lottie/LoadingLottie";

export default function SharedEstimatePage() {
  const { token } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sharedEstimate", token],
    queryFn: () => defaultFetch(`/estimate/shared/${token}`),
    enabled: !!token
  });

  const { comment, price, estimateRequest, driver, type, isDesignated } = data;
  const { requestDate, moveDate, moveType, fromAddress, toAddress, customer } = estimateRequest;

  const labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[] =
    isDesignated && moveType !== "REQUEST" ? [moveType, "REQUEST"] : [moveType];

  const isDriverShared = type === "DRIVER";

  if (isLoading)
    return (
      <>
        <LoadingLottie className="mt-30" />
      </>
    );
  return (
    <>
      <OrangeBackground />
      <div className="bg-white">
        <div className="flex flex-col px-5 py-[60px] pt-10 md:px-17 lg:gap-20 lg:px-100 lg:pt-[20px] lg:pb-[120px]">
          <div className="flex flex-col gap-10">
            {!isDriverShared ? (
              // Pending/Past 공유 UI
              <>
                <div className="relative w-fit">
                  <Image
                    src={driver.profileImage ?? "/assets/images/img_profile.svg"}
                    alt="기사님 프로필"
                    width={100}
                    height={100}
                    className="h-18 w-18 md:h-27 md:w-27 lg:h-37 lg:w-37"
                  />
                </div>
                <Title
                  labels={labels}
                  driver={{
                    name: driver.authUser.name,
                    rating: driver.averageRating ?? 0.0,
                    reviewCount: driver.reviewsReceived?.length ?? 0,
                    experienceYear: driver.career,
                    confirmedCount: driver.work,
                    likes: driver.favorite?.length ?? 0
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
              </>
            ) : (
              // Driver 공유 UI
              <>
                <EstimateHeaderSection
                  moveType={moveType as MoveType}
                  isDesignated={false}
                  status={data.status}
                  customerName={customer.authUser.name}
                  price={price}
                />

                <EstimateInfoSection
                  createdAt={formatDate(estimateRequest.createdAt)}
                  moveTypeLabel={moveTypeLabelMap[moveType as MoveType]?.label || moveType}
                  moveDate={formatDateTime(moveDate)}
                  from={fromAddress.street}
                  to={toAddress.street}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
