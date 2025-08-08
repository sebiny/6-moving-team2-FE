"use client";

import { useEffect, useState } from "react";
import LandingPageLayout from "./layout";
import Container from "@/components/container/PageContainer";
import IconApp from "/public/assets/icons/ic_app.svg";
import ImgEstimateCard from "/public/assets/images/img_landing_cardlist.avif";
import clsx from "clsx";
import "../../globals.css";

import Image from "next/image";
import MovingCard from "./_component/MovingCard";
import ChangeImages from "./_component/ChangeImages";
import { useTranslations } from "next-intl";

import bgSm from "/public/assets/images/img_landing_bg_sm.avif";
import bgMd from "/public/assets/images/img_landing_bg_md.avif";
import bgLg from "/public/assets/images/img_landing_bg_lg.avif";

const CARD_TYPE = ["small", "family", "office"] as const;

const estimateCardStyle = {
  default: "w-83 h-67 lg:w-108 lg:h-86 transition-all",
  "1stImg": "absolute duration-300 -top-42 left-8 lg:-top-100 lg:left-130",
  "2ndImg": "absolute duration-800 top-30 left-8 lg:-top-10 lg:left-130",
  "3rdImg": "hidden absolute md:inline -top-25 left-95 lg:-top-80 lg:left-240 duration-500",
  "4thImg": "hidden absolute md:inline top-47 left-95 lg:top-10 lg:left-240 duration-1000"
};

const estimateCard = [
  estimateCardStyle["1stImg"],
  estimateCardStyle["2ndImg"],
  estimateCardStyle["3rdImg"],
  estimateCardStyle["4thImg"]
];

export default function LandingPage() {
  const t = useTranslations("Landing");
  const [show, setShow] = useState(false);

  const translateStyle = clsx(" transition-all", {
    "translate-y-0 opacity-100": show,
    "translate-y-4 opacity-0": !show
  });

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <LandingPageLayout>
      <Container maxWidth="w-full" padding="0" className="relative min-h-[313px] bg-top bg-no-repeat sm:max-h-[405px]">
        {/* 모바일 배경 이미지 */}
        <div
          className="absolute inset-0 block sm:hidden"
          style={{
            backgroundImage: `url(${bgSm.src})`, // 크고 넓은 배경이미지
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            zIndex: 1
          }}
        >
          {/* <Image
            src={bgSm}
            width={375}
            height={313}
            alt="배경이미지"
            className="h-full min-h-[313px] w-full object-cover"
            priority
          /> */}
        </div>
        {/* 타블렛(sm 이상) 배경은 div의 css로 */}
        <div
          className="absolute inset-0 hidden max-h-[405px] sm:block md:hidden lg:hidden"
          style={{
            backgroundImage: `url(${bgMd.src})`, // 크고 넓은 배경이미지
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            zIndex: 1
          }}
        >
          {/* <Image
            src={bgMd}
            width={744}
            height={405}
            alt="배경이미지"
            className="h-full min-h-[405px] w-full object-cover"
            priority
          /> */}
        </div>
        {/* 타블렛 (md 이상) 배경은 div의 css로 */}
        <div
          className="absolute inset-0 hidden max-h-[405px] w-full md:block xl:h-[405px]"
          style={{
            backgroundImage: `url(${bgLg.src})`, // 크고 넓은 배경이미지
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            zIndex: 1
          }}
        ></div>
        {/* 텍스트 영역: 항상 z-10로 이미지 위에 */}
        <div className="3xl:top-80 absolute inset-0 top-30 z-2 flex flex-col items-center justify-center xl:top-52 2xl:top-70">
          <div className={`${translateStyle} text-center text-xl font-bold text-gray-50 duration-800 sm:text-[32px]`}>
            {t("title")}
          </div>
          <div className={`${translateStyle} mt-3 text-center text-base text-gray-100 duration-1000 md:text-lg/snug`}>
            {t("detail")}
            <br /> {t("brDetail")}
          </div>
        </div>
      </Container>
      <Container
        padding="px-0 md:px-8"
        className="mt-13 mb-20 flex flex-col md:mt-15 lg:mt-29 lg:mb-32 lg:max-w-[1400px] lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="text-black-400 ml-8 text-xl font-bold md:ml-0 md:text-[32px]">
          {t("typeTitle")}
          <br />
          {t("brTypeTitle")}
        </div>
        <div className="mt-8 flex max-w-[388px] flex-row items-center justify-center gap-2 sm:mt-10 sm:max-w-none sm:gap-4 md:gap-6 lg:mt-0">
          {CARD_TYPE.map((type, idx) => (
            <div key={idx}>
              <MovingCard type={type} />
            </div>
          ))}
        </div>
      </Container>
      <Container padding="p-0" className="flex max-h-[850px] max-w-[1400px] justify-center sm:mb-20 sm:p-4">
        <ChangeImages />
      </Container>
      <Container padding="px-0 sm:px-8" className="flex justify-center md:max-w-[1400px]">
        <div className="text-black-400 ml-8 w-full bg-bottom-right bg-no-repeat pt-10 pb-46 text-xl font-bold md:ml-0 md:bg-[url(/assets/images/img_landing_building.svg)] md:pt-44 md:text-[32px] lg:bg-bottom-left">
          {t("compareTitle")}
          <br />
          {t("brCompareTitle")}
        </div>
      </Container>

      <Container maxWidth="w-full" padding="0" className="flex h-130 justify-center bg-orange-100">
        <div className="relative min-h-130 w-full p-4 md:max-w-[1400px]">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Image
              key={idx}
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
      <Container
        maxWidth="w-full"
        padding="0"
        className="flex flex-col items-center gap-3 bg-orange-400 py-10 md:gap-4 md:py-20"
      >
        <Image
          src={IconApp}
          alt="무빙 로고"
          width={56}
          height={57}
          className="transition-all duration-400 hover:-translate-y-1 sm:h-[140px] sm:w-[144px] sm:hover:-translate-y-2"
          unoptimized
        />
        <div className="max-w-[120px] text-center text-base font-bold text-gray-50 sm:max-w-none sm:text-[28px]">
          {t("endTitle")}
        </div>
      </Container>
    </LandingPageLayout>
  );
}
