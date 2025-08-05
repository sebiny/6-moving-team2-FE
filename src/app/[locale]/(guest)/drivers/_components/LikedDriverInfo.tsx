"use client";
import ChipRectangle from "@/components/chip/ChipRectangle";
import LikeIcon from "@/components/icon/LikeIcon";
import { DriverType } from "@/types/driverType";
import { translateWithDeepL } from "@/utills/translateWithDeepL";
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
  const [translatedIntro, setTranslatedIntro] = useState<string | null>(null);

  useEffect(() => {
    const translate = async () => {
      try {
        const translated = await translateWithDeepL(driver.shortIntro, locale.toUpperCase());
        setTranslatedIntro(translated);
      } catch {
        setTranslatedIntro(driver.shortIntro);
      }
    };
    translate();
  }, [driver, locale]);

  const handleClick = () => {
    router.push(`/drivers/${driver.id}`);
  };

  return (
    <article
      className="border-line-100 w-[330px] cursor-pointer rounded-2xl border px-7 py-6 shadow-sm"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      aria-label={`${driver.nickname} ${t("driver")}`}
    >
      <div className="flex gap-2" aria-label="moveTypes" role="list">
        {driver.moveType.map((service) => (
          <ChipRectangle key={service} moveType={service} size="sm" />
        ))}
      </div>

      <p className="text-black-300 mt-3 w-full truncate font-semibold" aria-label="shortIntro">
        {translatedIntro}
      </p>

      <section className="mt-2 flex gap-5" aria-label="driverProfile">
        <Image
          src={driver.profileImage ?? "/assets/images/img_profile.svg"}
          alt={`${driver.nickname} profileImage`}
          width={50}
          height={50}
          className="h-[50px] w-[50px] rounded-xl object-cover object-center"
          role="img"
          aria-label={`${driver.nickname} profileImage`}
        />
        <div className="relative mt-1 text-xs">
          <header className="flex gap-1" aria-label="driverInfo">
            <Image src="/assets/icons/ic_driver.svg" alt="" width={20} height={23} aria-hidden="true" />
            <p className="text-sm font-semibold">
              {driver.nickname} {t("driver")}
            </p>
            <LikeIcon color="gray" isFilled={false} aria-hidden="true" />
          </header>

          <ul className="mt-1 flex gap-2 text-gray-300" aria-label="driverStats">
            <li className="flex items-center gap-1" aria-label="rating">
              <Image src="/assets/icons/ic_star_yellow.svg" alt="star" width={14} height={14} />
              <span>{driver.averageRating?.toFixed(1)}</span>
              <span>({driver.reviewCount})</span>
            </li>
            <li className="border-line-200 h-[14px] w-[1px] border-l" aria-hidden="true" />
            <li className="flex gap-1" aria-label={t("career")}>
              <span>{t("career")}</span>
              <span>
                {driver.career} {t("year")}
              </span>
            </li>
            <li className="border-line-200 h-[14px] w-[1px] border-l" aria-hidden="true" />
            <li className="flex gap-1" aria-label={t("confirm")}>
              <span>
                {driver.work}
                {t("count")}
              </span>
              <span>{t("confirm")}</span>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}

export default LikedDriverInfo;
