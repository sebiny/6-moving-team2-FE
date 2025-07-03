import React from "react";
import Reviews from "./_components/Reviews";
import Image from "next/image";
import DriverInfo from "./_components/DriverInfo";
import ShareDriver from "./_components/\bShareDriver";

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
                <div
                  key={service}
                  className="rounded-[100px] border border-orange-400 bg-orange-100 px-5 py-[10px] text-lg font-medium text-orange-400"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 mb-20">
            <p className="text-black-400 text-xl font-semibold">서비스 가능 지역</p>
            <div className="mt-4 flex gap-3">
              {driver.regions.map((region) => (
                <div
                  key={region}
                  className="bg-background-100 text-black-400 rounded-[100px] border border-gray-100 px-5 py-[10px] text-lg font-medium"
                >
                  {region}
                </div>
              ))}
            </div>
          </div>
          <Reviews />
        </div>
        <div className="mt-[109px] w-80">
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">
              김코드 기사님에게 <br></br>지정 견적을 요청해보세요!
            </p>
            <button className="flex h-16 w-80 items-center justify-center rounded-2xl bg-orange-400 text-lg font-semibold text-white">
              지정 견적 요청하기
            </button>
            <button className="border-line-200 flex h-16 w-80 items-center justify-center gap-[10px] rounded-2xl border">
              <Image src="/assets/icons/ic_like_black.svg" alt="찜하기" width={24} height={24} />
              <p className="text-lg font-semibold">기사님 찜하기</p>
            </button>
          </div>
          <ShareDriver />
        </div>
      </div>
    </div>
  );
}

export default DriverDetailPage;
