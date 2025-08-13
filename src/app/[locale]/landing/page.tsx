"use client";

import { useEffect, useState } from "react";
import LandingPageLayout from "./layout";
import Container from "@/components/container/PageContainer";
import IconApp from "/public/assets/icons/ic_app.svg";

import clsx from "clsx";
import "../../globals.css";

import Image from "next/image";
import MovingCard from "./_component/MovingCard";
import ChangeImages from "./_component/ChangeImages";
import { useTranslations } from "next-intl";

import bgSm from "/public/assets/images/img_landing_bg_sm.avif";
import bgMd from "/public/assets/images/img_landing_bg_md.avif";
import bgLg from "/public/assets/images/img_landing_bg_lg.avif";
import EstimateCards from "./_component/EstimateCards";

const CARD_TYPE = ["small", "family", "office"] as const;

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
        ></div>
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
        ></div>
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
        {/* 이사업체, 어떻게 고르세요? : 항상 z-10로 이미지 위에 */}
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
      {/* 번거로운 선정과정, 이사 유형부터 선택해요 */}
      <div>
        <Container
          padding="px-0 md:px-8"
          className="mt-13 mb-20 flex flex-col md:mt-15 lg:mb-15 lg:max-w-[1400px] lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="text-black-400 ml-8 text-xl font-bold md:ml-0 md:text-[32px]">
            {t("typeTitle")}
            <br />
            {t("brTypeTitle")}
          </div>
          <div className="mt-8 flex max-w-[388px] flex-row items-center justify-center gap-2 overflow-hidden sm:mt-10 sm:max-w-none sm:gap-4 md:gap-6 lg:mt-15 lg:items-end xl:mt-25">
            {CARD_TYPE.map((type, idx) => (
              <div key={idx} className="flex-shrink-0">
                <MovingCard type={type} />
              </div>
            ))}
          </div>
        </Container>
        {/* 원하는 이사 서비스를 신청하고 견적을 받아보세요 */}
        <Container padding="p-0" className="flex max-h-[850px] max-w-[1400px] justify-center sm:p-4">
          <ChangeImages />
        </Container>
      </div>

      {/* 여러 업체의 견적을 한눈에 비교하고 선택해요 */}
      <div className="overflow-hidden">
        <EstimateCards />
      </div>

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
          className="transition-all duration-400 hover:-translate-y-1 sm:hover:-translate-y-2 md:h-[140px] md:w-[144px]"
          unoptimized
        />
        <div className="max-w-[120px] text-center text-base font-bold text-gray-50 sm:max-w-none md:text-[28px]">
          {t("endTitle")}
        </div>
      </Container>
    </LandingPageLayout>
  );
}
