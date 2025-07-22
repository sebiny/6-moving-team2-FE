"use client";

import Title, { DriverInfo } from "@/components/Title";
import SubHeader from "../../_components/SubHeader";
import Button from "@/components/Button";
import EstimateDetailInfo from "../../_components/EstimateDetailInfo";
import ShareDriver from "@/components/ShareDriver";
import OrangeBackground from "@/components/OrangeBackground";
import Image from "next/image";

export default function PendingDetailPage() {
  // Title용 임시 데이터
  const mockData = [
    {
      id: 1,
      status: "PROPOSED",
      labels: ["SMALL", "REQUEST"],
      driver: {
        name: "김코드",
        rating: 5.0,
        reviewCount: 178,
        experienceYear: 7,
        confirmedCount: 334,
        likes: 136
      } as DriverInfo,
      message: "고객님의 물품을 안전하게 운송해 드립니다.",
      estimatePrice: 180000
    }
  ] satisfies {
    id: number;
    status: "PROPOSED" | "AUTO_REJECTED" | "ACCEPTED";
    labels: ("SMALL" | "HOME" | "OFFICE" | "REQUEST")[];
    driver: DriverInfo;
    message: string;
    estimatePrice?: number;
  }[];

  return (
    <>
      {/* 상단 서브 헤더 */}
      <div className="sticky top-14 z-9 bg-white lg:top-22">
        <SubHeader title="견적 상세" />
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
        <div className="flex flex-col px-5 py-[40px] pt-10 md:px-17 md:pt-15 lg:grid lg:grid-cols-[1fr_300px] lg:gap-40 lg:px-100 lg:pt-[88px] lg:pb-[120px]">
          {/* 왼쪽 콘텐츠 열 */}
          <div className="flex flex-col gap-10">
            {/* Title 컴포넌트 */}
            <Title
              status={mockData[0].status}
              labels={mockData[0].labels}
              driver={mockData[0].driver}
              message={mockData[0].message}
              estimatePrice={mockData[0].estimatePrice}
            />

            <div className="border-t border-gray-100" />

            {/* 견적 정보 */}
            <EstimateDetailInfo
              requestDate="24.08.26"
              serviceType="사무실이사"
              moveDate="2024. 08. 26(월) 오전 10:00"
              from="서울 중구 삼일대로 343"
              to="서울 강남구 선릉로 428"
            />

            {/* 기본 버전 */}
            <div className="flex flex-col gap-6 lg:hidden">
              <div className="my-3 border-t border-gray-100" />
              <ShareDriver text="견적서 공유하기" />
              <div className="mt-10">
                <Button type="orange" text="견적 확정하기" image={false} />
              </div>
            </div>
          </div>

          {/* 오른쪽 사이드 열 */}
          <div className="mt-7 hidden lg:flex lg:flex-col lg:justify-center lg:gap-6">
            <div>
              <p className="text-lg font-semibold text-neutral-400">견적가</p>
              <p className="text-black-500 text-2xl font-bold">{mockData[0].estimatePrice.toLocaleString()}원</p>
            </div>

            <Button type="orange" text="견적 확정하기" image={false} />

            <div className="my-3 border-t border-gray-100" />

            <ShareDriver text="견적서 공유하기" />
          </div>
        </div>
      </div>
    </>
  );
}
