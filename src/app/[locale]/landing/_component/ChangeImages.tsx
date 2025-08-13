"use client";

import React from "react";
import { useTranslations } from "next-intl";

const IMG_DEFAULT = "/assets/images/img_landing_card.avif";
const IMG_MD = "/assets/images/img_landing_card_md.avif";
const IMG_LG = "/assets/images/img_landing_card_lg.avif";

export default function ChangeImagesPicture() {
  const t = useTranslations("Landing");

  return (
    <div className="relative flex max-h-[850px] w-full lg:justify-end">
      <picture>
        <source media="(min-width: 744px)" srcSet={IMG_LG} type="image/avif" />
        <source media="(min-width: 375px)" srcSet={IMG_MD} type="image/avif" />

        <img src={IMG_DEFAULT} alt="견적카드" className={`h-auto w-full object-contain`} />
      </picture>

      <div className="absolute top-8 z-50 w-full pr-10 text-right text-xl font-bold text-gray-50 md:top-13 md:text-[32px] lg:top-54 lg:flex lg:w-1/2 lg:justify-start lg:pl-10 lg:text-[32px]">
        <div className="lg:text-left">
          {t("imageTitle")}
          <br />
          {t("brImageTitle")}
        </div>
      </div>
    </div>
  );
}
