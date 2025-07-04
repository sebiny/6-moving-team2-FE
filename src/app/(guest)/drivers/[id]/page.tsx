import React from "react";
import Reviews from "./_components/Reviews";
import Image from "next/image";
import DriverInfo from "./_components/DriverInfo";
import ShareDriver from "./_components/ShareDriver";
import ChipCircle from "@/components/ChipCircle";
import RequestEstimate from "./_components/RequestEstimate";

function DriverDetailPage() {
  const driver = {
    nickname: "김코드",
    line: "고객님의 물품을 안전하게 운송해 드립니다.",
    description: "안녕하세요. 이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    services: ["소형이사", "가정이사"],
    regions: ["서울", "경기"],
    like: 136,
    reviews: []
  };
  return (
    <div className="flex flex-col items-center">
      <div className="h-[225px] w-full bg-orange-400"></div>
      <div className="flex gap-[116px]">
        <div className="w-[742px]">
          <DriverInfo />
          <div className="mt-10">
            <p className="text-black-400 text-xl font-semibold">제공 서비스</p>
            <div className="mt-4 flex gap-3">
              {driver.services.map((service) => (
                <ChipCircle key={service} type="region" color="orange" text={service} />
              ))}
            </div>
          </div>
          <div className="mt-10 mb-20">
            <p className="text-black-400 text-xl font-semibold">서비스 가능 지역</p>
            <div className="mt-4 flex gap-3">
              {driver.regions.map((region) => (
                <ChipCircle key={region} type="region" color="gray" text={region} />
              ))}
            </div>
          </div>
          <div className="mb-8 lg:hidden">
            <div className="border-line-100 mb-8 border-b"></div>
            <ShareDriver />
            <div className="border-line-100 mt-8 border-b"></div>
          </div>
          <Reviews />
        </div>
        <div className="mt-[109px] w-80">
          <RequestEstimate />
          <div className="hidden lg:block">
            <ShareDriver />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverDetailPage;
