import Image from "next/image";
import React from "react";

function DriverSimpleInfo() {
  const driver = {
    nickname: "김코드",
    line: "고객님의 물품을 안전하게 운송해 드립니다.",
    description: "안녕하세요. 이사 업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.",
    career: 7,
    service: ["소형이사", "가정이사"],
    region: ["서울", "경기"],
    like: 136,
    count: 334,
    reviews: []
  };
  return (
    <div className="border-line-100 rounded-2xl border px-7 py-6">
      <div>소형이사</div>
      <div className="flex gap-5">
        <Image src="/assets/images/img_profile.svg" alt="프로필 이미지" width={134} height={134} />
        <div>
          <p className="text-black-300 text-xl font-semibold">{driver.line}</p>
          <p className="text-sm text-gray-500">{driver.description}</p>
          <div className="relative mt-5">
            <div>
              <div className="flex">
                <Image src="/assets/icons/ic_driver.svg" alt="기사님" width={20} height={23} />
                <p className="font-semibold">{driver.nickname} 기사님</p>
              </div>
              <div className="mt-1 flex gap-2">
                <div className="flex gap-1">
                  <Image src="/assets/icons/ic_star_yellow.svg" alt="별점" width={14} height={14} />
                  <p>5.0</p>
                  <p className="text-gray-300">(178)</p>
                </div>
                <div className="border-line-200 w-[1px] border-l"></div>
                <div className="flex gap-1">
                  <p className="text-gray-300">경력</p>
                  <p>{driver.career}년</p>
                </div>
                <div className="border-line-200 w-[1px] border-l"></div>
                <div className="flex gap-1">
                  <div>{driver.count}건</div>
                  <p className="text-gray-300">확정</p>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 flex gap-[6px]">
              <Image src="/assets/icons/ic_like_red.svg" alt="좋아요" width={14} height={12} />
              <p>{driver.like}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverSimpleInfo;
