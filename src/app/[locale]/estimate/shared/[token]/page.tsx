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

export default function SharedEstimatePage() {
  const { token } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sharedEstimate", token],
    queryFn: () => defaultFetch(`/estimate/shared/${token}`),
    enabled: !!token
  });

  if (isLoading) {
    return <div className="mt-20 text-center">공유된 견적을 불러오는 중입니다...</div>;
  }

  if (error || !data) {
    return <div className="mt-20 text-center">견적을 찾을 수 없습니다.</div>;
  }

  const { comment, price, estimateRequest, driver, type } = data;
  const { requestDate, moveDate, moveType, fromAddress, toAddress, customer } = estimateRequest;

  const isDriverShared = type === "DRIVER";

  return (
    <>
      <OrangeBackground />
      <div className="bg-white">
        <div className="flex flex-col px-5 py-[60px] pt-10 md:px-17 lg:grid lg:grid-cols-[1fr_300px] lg:gap-20 lg:px-100 lg:pt-[60px] lg:pb-[120px]">
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

                <div className="border-t border-gray-100" />

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
