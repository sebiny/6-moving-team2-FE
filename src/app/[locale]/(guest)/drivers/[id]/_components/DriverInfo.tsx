import ChipRectangle from "@/components/chip/ChipRectangle";
import LikeIcon from "@/components/icon/LikeIcon";
import { DriverType } from "@/types/driverType";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
      if (locale === "ko") {
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
    <section className="relative mt-[35px] md:mt-[46px] lg:mt-[62px]" aria-label={t("driverPage.driverInfoSection")}>
      <figure className="absolute top-[-77px] md:top-[-120px] lg:top-[-150px]">
        <Image
          src={driver.profileImage ?? "/assets/images/img_profile.svg"}
          alt={t("driverPage.profileImageAlt", { name: driver.nickname })}
          width={134}
          height={134}
          className="h-16 w-16 rounded-2xl object-cover object-center md:h-25 md:w-25 lg:h-[134px] lg:w-[134px]"
        />
      </figure>

      {/* 이동 서비스 유형 */}
      <ul className="flex gap-3" aria-label={t("driverPage.serviceTypeList")}>
        {driver.moveType.map((service) => (
          <li key={service}>
            <ChipRectangle moveType={service} />
          </li>
        ))}
      </ul>

      {/* 짧은 소개 */}
      <p className="mt-3 text-2xl font-semibold" aria-label={t("driverPage.shortIntro")}>
        {translatedIntro.short}
      </p>

      {/* 닉네임과 찜 수 */}
      <div className="mt-5 flex justify-between">
        <div className="flex items-center gap-[6px]" aria-label={t("driverPage.driverNameSection")}>
          <Image src="/assets/icons/ic_driver.svg" alt="" role="presentation" width={20} height={23} />
          <p className="text-lg font-semibold">
            {driver.nickname}
            {t("driverFindCard.driver")}
          </p>
        </div>
        <div className="flex items-center" aria-label={t("driverPage.favoriteCount", { count: driver.favoriteCount })}>
          <p aria-hidden="true">{driver.favoriteCount}</p>
          <LikeIcon color="black" aria-hidden="true" />
        </div>
      </div>

      {/* 상세 소개 */}
      <p className="mt-5 mb-[31px] text-gray-500" aria-label={t("driverPage.detailIntro")}>
        {translatedIntro.detail}
      </p>

      {/* 간단 정보 */}
      <DriverSimpleInfo
        type="detail"
        career={driver.career}
        averageRating={driver.averageRating}
        reviewCount={driver.reviewCount}
        work={driver.work}
      />
    </section>
  );
}

export default DriverInfo;
