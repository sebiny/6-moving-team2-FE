"use client";
import ChipRectangle from "@/components/chip/ChipRectangle";
import LikeIcon from "@/components/icon/LikeIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { DriverType } from "@/constant/driverType";

interface DriverFindCardType {
  driver: DriverType;
}

function DriverFindCard({ driver }: DriverFindCardType) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/drivers/${driver.id}`);
  };

  return (
    <div className="border-line-100 rounded-2xl border bg-white p-5 shadow-sm" onClick={handleClick}>
      <ChipRectangle moveType="SMALL" />
      <div className="mt-3 flex gap-5">
        <Image
          src="/assets/images/img_profile.svg"
          alt="프로필 이미지"
          width={134}
          height={134}
          className="hidden md:block"
        />
        <div className="w-full">
          <p className="text-black-300 text-xl font-semibold">{driver.shortIntro}</p>
          <p className="mt-2 text-sm text-gray-500">{driver.detailIntro}</p>
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
                    <p className="pt-1 text-gray-500">{driver.favorite}</p>
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
                    <div>{driver.work}건</div>
                    <p className="text-gray-300">확정</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 hidden justify-center gap-[6px] md:flex">
              <LikeIcon color="red" />
              <p className="pt-1 text-gray-500">{driver.favorite}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverFindCard;
