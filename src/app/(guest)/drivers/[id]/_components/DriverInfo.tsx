import ChipRectangle from "@/components/chip/ChipRectangle";
import { DriverType } from "@/constant/driverType";
import Image from "next/image";
import React from "react";

function DriverInfo() {
  const driver: DriverType = {
    nickname: "김코드",
    shortIntro: "고객님의 물품을 안전하게 운송해 드립니다.",
    detailIntro: "안녕하세요. 이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    services: ["small", "home"],
    serviceAreas: ["서울", "경기"],
    favorite: 136
  };
  return (
    <div className="relative mt-[35px] md:mt-[46px] lg:mt-[62px]">
      <Image
        src="/assets/images/img_profile.svg"
        alt="프로필"
        width={134}
        height={134}
        className="absolute top-[-77px] w-16 md:top-[-120px] md:w-25 lg:top-[-150px] lg:w-[134px]"
      />
      <div className="flex gap-3">
        {driver.services.map((service) => (
          <ChipRectangle moveType={service} key={service} />
        ))}
      </div>
      <p className="mt-3 text-2xl font-semibold">{driver.shortIntro}</p>
      <div className="mt-5 flex justify-between">
        <div className="flex gap-[6px]">
          <Image src="/assets/icons/ic_driver.svg" alt="기사님" width={20} height={23} />
          <p className="text-lg font-semibold">{driver.nickname} 기사님</p>
        </div>
        <div className="flex items-center">
          <p>{driver.favorite}</p>
          <Image src="/assets/icons/ic_like_black.svg" alt="좋아요" width={24} height={24} />
        </div>
      </div>
      <div className="mt-5 text-gray-500">{driver.detailIntro}</div>
      <div className="border-line-200 mt-[31px] flex h-30 items-center justify-around rounded-2xl border">
        <div className="flex flex-col items-center gap-1">
          <p>진행</p>
          <p className="text-black-300 text-xl font-bold">344건</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p>리뷰</p>
          <div className="flex items-center gap-[6px]">
            <Image src="/assets/icons/ic_star_yellow.svg" alt="별점" width={20} height={20} className="block" />
            <p className="text-xl font-bold">5.0</p>
            <p className="text-gray-300">(178)</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p>총 경력</p>
          <p className="text-xl font-bold">{driver.career}년</p>
        </div>
      </div>
    </div>
  );
}

export default DriverInfo;
