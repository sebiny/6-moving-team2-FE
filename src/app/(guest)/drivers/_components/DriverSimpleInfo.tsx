"use client";
import ChipRectangle from "@/components/chip/ChipRectangle";
import LikeIcon from "@/components/icon/LikeIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function DriverSimpleInfo() {
  const driver = {
    id: 1,
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

  const router = useRouter();

  const handleClick = () => {
    router.push(`/drivers/${driver.id}`);
  };

  return (
    <div className="border-line-100 rounded-2xl border p-5 shadow-sm" onClick={handleClick}>
      <ChipRectangle moveType="small" />
      <div className="mt-3 flex gap-5">
        <Image
          src="/assets/images/img_profile.svg"
          alt="프로필 이미지"
          width={134}
          height={134}
          className="hidden md:block"
        />
        <div className="w-full">
          <p className="text-black-300 text-xl font-semibold">{driver.line}</p>
          <p className="mt-2 text-sm text-gray-500">{driver.description}</p>
          <div className="border-line-100 mt-4 border-b md:hidden"></div>
          <div className="relative mt-5">
            <div className="flex gap-2">
              <Image
                src="/assets/icons/ic_profile_bear.svg"
                alt="프로필 이미지"
                width={50}
                height={50}
                className="md:hidden"
              />
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Image src="/assets/icons/ic_driver.svg" alt="기사님" width={20} height={23} />
                    <p className="text-sm font-semibold md:text-base">{driver.nickname} 기사님</p>
                  </div>
                  <div className="flex items-center justify-center md:hidden">
                    <LikeIcon color="red" />
                    <p className="pt-1 text-gray-500">{driver.like}</p>
                  </div>
                </div>
                <div className="mt-[2px] flex items-center gap-2 text-[13px] md:mt-2">
                  <div className="flex gap-1">
                    <Image src="/assets/icons/ic_star_yellow.svg" alt="별점" width={20} height={20} />
                    <p>5.0</p>
                    <p className="text-gray-300">(178)</p>
                  </div>
                  <div className="border-line-200 h-[14px] w-[1px] border-l"></div>
                  <div className="flex gap-1">
                    <p className="text-gray-300">경력</p>
                    <p>{driver.career}년</p>
                  </div>
                  <div className="border-line-200 h-[14px] w-[1px] border-l"></div>
                  <div className="flex gap-1">
                    <div>{driver.count}건</div>
                    <p className="text-gray-300">확정</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 hidden justify-center gap-[6px] md:flex">
              <Image src="/assets/icons/ic_like_red.svg" alt="좋아요" width={24} height={24} />
              <p className="pt-1 text-gray-500">{driver.like}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverSimpleInfo;
