import ChipRectangle from "@/components/chip/ChipRectangle";
import LikeIcon from "@/components/icon/LikeIcon";
import { DriverType } from "@/types/driverType";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import DriverSimpleInfo from "@/components/driver/DriverSimpleInfo";
import { useLocale, useTranslations } from "next-intl";
import { batchTranslate } from "@/utills/batchTranslate";

interface DriverInfoType {
  driver: DriverType;
}

function DriverInfo({ driver }: DriverInfoType) {
  const t = useTranslations("FindDriver");
  const locale = useLocale();
  const [translatedIntro, setTranslatedIntro] = useState({ short: "", detail: "" });

  useEffect(() => {
    const translatedTexts = async () => {
      if (!driver) return;
      if (locale == "ko") {
        setTranslatedIntro({
          short: driver.shortIntro ?? "",
          detail: driver.detailIntro ?? ""
        });
        return;
      }
      try {
        const result = await batchTranslate(
          {
            short: driver.shortIntro ?? "",
            detail: driver.detailIntro ?? ""
          },
          locale
        );
        setTranslatedIntro({
          short: result.short,
          detail: result.detail
        });
      } catch (e) {
        console.warn("번역 실패", e);
      }
    };

    translatedTexts();
  }, [driver, locale]);
  return (
    <div className="relative mt-[35px] md:mt-[46px] lg:mt-[62px]">
      <Image
        src={driver.profileImage ?? "/assets/images/img_profile.svg"}
        alt="프로필"
        width={134}
        height={134}
        className="absolute top-[-77px] w-16 md:top-[-120px] md:w-25 lg:top-[-150px] lg:w-[134px]"
      />
      <div className="flex gap-3">
        {driver.moveType.map((service) => (
          <ChipRectangle moveType={service} key={service} />
        ))}
      </div>
      <p className="mt-3 text-2xl font-semibold">{translatedIntro.short}</p>
      <div className="mt-5 flex justify-between">
        <div className="flex gap-[6px]">
          <Image src="/assets/icons/ic_driver.svg" alt="기사님" width={20} height={23} />
          <p className="text-lg font-semibold">
            {driver.nickname}
            {t("driverFindCard.driver")}
          </p>
        </div>
        <div className="flex items-center">
          <p>{driver.favoriteCount}</p>
          <LikeIcon color="black" />
        </div>
      </div>
      <div className="mt-5 mb-[31px] text-gray-500">{translatedIntro.detail}</div>
      <DriverSimpleInfo
        type="detail"
        career={driver.career}
        averageRating={driver.averageRating}
        reviewCount={driver.reviewCount}
        work={driver.work}
      />
    </div>
  );
}

export default DriverInfo;
