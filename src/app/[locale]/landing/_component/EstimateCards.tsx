"use client";

import Container from "@/components/container/PageContainer";
import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";
import ImgEstimateCard from "/public/assets/images/img_landing_cardlist.avif";
import { useTranslations } from "next-intl";

const estimateCardStyle = {
  default: "w-83 h-67 lg:w-108 lg:h-86 transition-all ",
  "1stImg": "absolute duration-300 -top-42 left-8 lg:-top-100 lg:left-130",
  "2ndImg": "absolute duration-800 top-30 left-8 lg:-top-10 lg:left-130",
  "3rdImg": "absolute md:inline -top-25 left-95 lg:-top-80 lg:left-240 duration-500",
  "4thImg": "absolute md:inline top-47 left-95 lg:top-10 lg:left-240 duration-1000"
};

const estimateCard = [
  estimateCardStyle["1stImg"],
  estimateCardStyle["2ndImg"],
  estimateCardStyle["3rdImg"],
  estimateCardStyle["4thImg"]
];

function EstimateCards() {
  const [show, setShow] = useState(true);
  const t = useTranslations("Landing");
  const translateStyle = clsx(" transition-all", {
    "translate-y-0 opacity-100": show,
    "translate-y-4 opacity-0": !show
  });
  return (
    <div className="lg:mt-20 xl:mt-80">
      <Container padding="px-0 " className="flex justify-center md:max-w-[1400px]">
        <div className="text-black-400 ml-8 w-full bg-bottom-right bg-no-repeat pt-10 pb-46 text-xl font-bold md:bg-[url(/assets/images/img_landing_building.svg)] md:pt-20 md:text-[32px] lg:bg-bottom-left">
          {t("compareTitle")}
          <br />
          {t("brCompareTitle")}
        </div>
      </Container>

      <Container maxWidth="w-full" padding="0" className="overflow-crop flex h-120 justify-center bg-orange-100">
        <div className="relative min-h-130 w-full p-4 md:max-w-[1400px]">
          {ImgEstimateCard &&
            [...Array(4)].map((_, idx) => (
              <Image
                key={`estimate-card-${idx}`}
                src={ImgEstimateCard}
                alt="견적카드"
                width={332}
                height={268}
                className={clsx(estimateCardStyle.default, translateStyle, estimateCard[idx])}
                unoptimized
              />
            ))}
        </div>
      </Container>
    </div>
  );
}

export default EstimateCards;
