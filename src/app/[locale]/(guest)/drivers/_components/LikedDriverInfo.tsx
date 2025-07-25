import ChipRectangle from "@/components/chip/ChipRectangle";
import LikeIcon from "@/components/icon/LikeIcon";
import { DriverType } from "@/types/driverType";
import Image from "next/image";
import React from "react";

interface LikedDriverInfo {
  driver: DriverType;
}

function LikedDriverInfo({ driver }: LikedDriverInfo) {
  return (
    <div className="border-line-100 rounded-2xl border px-7 py-6 shadow-sm">
      <ChipRectangle moveType="SMALL" size="sm" />
      <p className="text-black-300 mt-3 text-xl font-semibold">{driver.shortIntro}</p>
      <div className="flex gap-5">
        <Image src="/assets/images/img_profile.svg" alt="프로필 이미지" width={50} height={50} />
        <div>
          <div className="relative mt-5">
            <div>
              <div className="flex gap-1">
                <Image src="/assets/icons/ic_driver.svg" alt="기사님" width={20} height={23} />
                <p className="font-semibold">{driver.nickname} 기사님</p>
                <LikeIcon color="gray" isFilled={false} />
              </div>
              <div className="mt-1 flex gap-2">
                <div className="flex gap-1">
                  <Image src="/assets/icons/ic_star_yellow.svg" alt="별점" width={14} height={14} />
                  <p>{driver.averageRating?.toFixed(1)}</p>
                  <p className="text-gray-300">({driver.reviewCount})</p>
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
        </div>
      </div>
    </div>
  );
}

export default LikedDriverInfo;
