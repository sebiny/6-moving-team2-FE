import Image from "next/image";
import React from "react";

function DriverInfo() {
  const driver = {
    nickname: "김코드",
    line: "고객님의 물품을 안전하게 운송해 드립니다.",
    description: "안녕하세요. 이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    service: ["소형이사", "가정이사"],
    region: ["서울", "경기"],
    like: 136,
    reviews: []
  };
  return (
    <div className="mt-[62px]">
      <div></div>
      <p className="text-2xl font-semibold">{driver.line}</p>
      <div className="mt-5 flex justify-between">
        <div className="flex gap-[6px]">
          <Image src="/assets/icons/ic_driver.svg" alt="기사님" width={20} height={23} />
          <p className="text-lg font-semibold">{driver.nickname} 기사님</p>
        </div>
        <div className="flex items-center">
          <p>{driver.like}</p>
          <Image src="/assets/icons/ic_like_black.svg" alt="좋아요" width={24} height={24} />
        </div>
      </div>
      <div className="mt-5 text-gray-500">{driver.description}</div>
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
