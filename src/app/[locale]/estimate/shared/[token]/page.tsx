// 견적서 공유용 페이지 (대기중인 & 받았던 견적 상세에서)
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

export default function SharedEstimatePage() {
  const { token } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sharedEstimate", token],
    queryFn: () => defaultFetch(`/share-estimate/shared/${token}`),
    enabled: !!token
  });

  if (isLoading) {
    return <div className="mt-20 text-center">공유된 견적을 불러오는 중입니다...</div>;
  }

  if (error || !data) {
    return <div className="mt-20 text-center">견적을 찾을 수 없습니다.</div>;
  }

  const { comment, price, estimateRequest, driver } = data;
  const { requestDate, moveDate, moveType, fromAddress, toAddress } = estimateRequest;

  return (
    <>
      {/* 상단 배경 + 기사 프로필 */}
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
              // status, labels 제거
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
          </div>
        </div>
      </div>
    </>
  );
}
