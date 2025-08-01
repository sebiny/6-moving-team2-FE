"use client";
import ChipRectangle from "@/components/chip/ChipRectangle";
import LikeIcon from "@/components/icon/LikeIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DriverType } from "@/types/driverType";
import React, { useState } from "react";
import CustomCheckbox from "../button/CustomCheckbox";
import { useTranslations } from "next-intl";

interface DriverFindCardType {
  driver: DriverType;
  isFavoritePage?: boolean; // 찜한 기사님 페이지 여부
  checked?: boolean; // 전체 선택 체크 상태
  onCheckChange?: (val: boolean) => void; // 전체 선택용 변경 핸들러
}

function DriverFindCard({ driver, isFavoritePage = false, checked = false, onCheckChange }: DriverFindCardType) {
  const t = useTranslations("FindDriver.driverFindCard");
  const router = useRouter();

  const handleClick = () => {
    if (isFavoritePage) return; // 찜한 기사님 페이지일 시, 클릭 막기
    router.push(`/drivers/${driver.id}`);
  };

  return (
    <div className="border-line-100 relative rounded-2xl border bg-white p-5 shadow-sm" onClick={handleClick}>
      {/* 체크박스 (우측 상단) */}
      {isFavoritePage && (
        <div className="absolute top-4 right-4">
          <CustomCheckbox checked={checked} onChange={onCheckChange} shape="square" />
        </div>
      )}

      {/* sm */}
      <div className="flex gap-2 md:hidden">
        {driver.moveType.map((service) => (
          <ChipRectangle key={service} moveType={service} size="sm" />
        ))}
      </div>

      {/* md 이상 */}
      <div className="hidden gap-2 md:flex">
        {driver.moveType.map((service) => (
          <ChipRectangle key={service} moveType={service} size="md" />
        ))}
      </div>

      <div className="mt-3 flex gap-5 overflow-hidden">
        <Image
          src={driver.profileImage ?? "/assets/images/img_profile.svg"}
          alt="프로필 이미지"
          width={134}
          height={134}
          className="hidden object-cover md:block"
        />
        <div className="w-full">
          <p className="text-black-300 text-xl font-semibold">{driver.shortIntro}</p>
          <p className="mt-2 text-sm text-gray-500">{driver.detailIntro}</p>
          <div className="border-line-100 mt-4 border-b md:hidden"></div>
          <div className="relative mt-5">
            <div className="flex gap-2">
              <Image
                src={driver.profileImage ?? "/assets/images/img_profile.svg"}
                alt="프로필 이미지"
                width={50}
                height={50}
                className="object-cover md:hidden"
              />
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Image src="/assets/icons/ic_driver.svg" alt="기사님" width={20} height={23} />
                    <p className="text-sm font-semibold md:text-base">
                      {driver.nickname} {t("driver")}
                    </p>
                  </div>
                  <div className="flex items-center justify-center md:hidden">
                    <LikeIcon color="red" />
                    <p className="pt-1 text-gray-500">{driver.favoriteCount}</p>
                  </div>
                </div>
                <div className="mt-[2px] flex items-center gap-2 text-[13px] md:mt-2">
                  <div className="flex gap-1">
                    <Image src="/assets/icons/ic_star_yellow.svg" alt="별점" width={20} height={20} />
                    <p>{driver.averageRating?.toFixed(1)}</p>
                    <p className="text-gray-300">({driver.reviewCount ?? 0})</p>
                  </div>
                  <div className="border-line-200 h-[14px] w-[1px] border-l"></div>
                  <div className="flex gap-1">
                    <p className="text-gray-300">{t("career")}</p>
                    <p>
                      {driver.career}
                      {t("year")}
                    </p>
                  </div>
                  <div className="border-line-200 h-[14px] w-[1px] border-l"></div>
                  <div className="flex gap-1">
                    <div>
                      {driver.work}
                      {t("count")}
                    </div>
                    <p className="text-gray-300">{t("confirm")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 hidden items-center justify-center gap-[6px] md:flex">
              <LikeIcon color="red" />
              <p className="pt-1 text-gray-500">{driver.favoriteCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverFindCard;
