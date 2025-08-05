"use client";
import ChipRectangle from "@/components/chip/ChipRectangle";
import LikeIcon from "@/components/icon/LikeIcon";
import { DriverType } from "@/types/driverType";
import { batchTranslate } from "@/utills/batchTranslate";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface LikedDriverInfo {
  driver: DriverType;
}

function LikedDriverInfo({ driver }: LikedDriverInfo) {
  const t = useTranslations("FindDriver.driverFindCard");
  const router = useRouter();
  const locale = useLocale();
  const [translatedIntro, setTranslatedIntro] = useState({ short: "" });

  useEffect(() => {
    const translateTexts = async () => {
      if (!driver?.shortIntro) return;
      // 한국어면 번역 생략
      if (locale === "ko") {
        setTranslatedIntro({ short: driver.shortIntro ?? "" });
        return;
      }
      try {
        const result = await batchTranslate({ short: driver.shortIntro ?? "" }, locale);
        setTranslatedIntro({ short: result.short });
      } catch (e) {
        console.warn("번역 실패", e);
      }
    };

    translateTexts();
  }, [driver, locale]);
  const handleClick = () => {
    router.push(`/drivers/${driver.id}`);
  };
  return (
    <div
      className="border-line-100 w-[330px] cursor-pointer rounded-2xl border px-7 py-6 shadow-sm"
      onClick={handleClick}
    >
      <div className="flex gap-2">
        {driver.moveType.map((service) => (
          <ChipRectangle key={service} moveType={service} size="sm" />
        ))}
      </div>
      <p className="text-black-300 mt-3 w-full truncate font-semibold">{translatedIntro.short}</p>
      <div className="mt-2 flex gap-5">
        <Image
          src={driver.profileImage ?? "/assets/images/img_profile.svg"}
          alt="프로필 이미지"
          width={50}
          height={50}
          className="h-[50px] w-[50px] rounded-xl object-cover object-center"
        />
        <div className="relative mt-1 text-xs">
          <div className="flex gap-1">
            <Image src="/assets/icons/ic_driver.svg" alt="기사님" width={20} height={23} />
            <p className="text-sm font-semibold">
              {driver.nickname} {t("driver")}
            </p>
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
              <p className="text-gray-300">{t("career")}</p>
              <p>
                {driver.career} {t("year")}
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
    </div>
  );
}

export default LikedDriverInfo;
