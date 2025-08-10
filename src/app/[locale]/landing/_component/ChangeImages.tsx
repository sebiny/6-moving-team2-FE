import React, { useEffect, useState } from "react";
import ImgEstimateVisualDefault from "/public/assets/images/img_landing_card.avif";
import ImgEstimateVisualMd from "/public/assets/images/img_landing_card_md.avif";
import ImgEstimateVisualLg from "/public/assets/images/img_landing_card_lg.avif";
import Image from "next/image";
import { useTranslations } from "next-intl";

const IMG_ESTIMATE = {
  default: {
    src: ImgEstimateVisualDefault,
    width: 375,
    height: 496
  },
  md: {
    src: ImgEstimateVisualMd,
    width: 680,
    height: 835
  },
  lg: {
    src: ImgEstimateVisualLg,
    width: 1400,
    height: 787
  }
};

export default function ChangeImages() {
  const [windowWidth, setWindowWidth] = useState(0);
  const t = useTranslations("Landing");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    setWindowWidth(window.innerWidth); // 최초 렌더링 시 값 세팅
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let estimateVisualSrc = IMG_ESTIMATE.default.src;
  let estimateVisualWidth = IMG_ESTIMATE.default.width;
  let estimateVisualHeight = IMG_ESTIMATE.default.height;
  if (windowWidth >= 1280) {
    estimateVisualSrc = IMG_ESTIMATE.lg.src;
    estimateVisualWidth = IMG_ESTIMATE.lg.width;
    estimateVisualHeight = IMG_ESTIMATE.lg.height;
  } else if (windowWidth >= 744) {
    // 744를 먼저
    estimateVisualSrc = IMG_ESTIMATE.lg.src; // 또는 md 이미지로 변경
    estimateVisualWidth = IMG_ESTIMATE.lg.width;
    estimateVisualHeight = IMG_ESTIMATE.lg.height;
  } else if (windowWidth >= 375) {
    estimateVisualSrc = IMG_ESTIMATE.md.src;
    estimateVisualWidth = IMG_ESTIMATE.md.width;
    estimateVisualHeight = IMG_ESTIMATE.md.height;
  }

  return (
    <div className="relative flex max-h-[850px] w-full lg:justify-end">
      <Image
        src={estimateVisualSrc}
        width={estimateVisualWidth}
        height={estimateVisualHeight}
        alt="견적카드"
        className="h-auto w-full object-contain"
        priority
        quality={85}
        unoptimized // lazyloading eagerloading, 클라우드 프론트 거칠 경우 2회차부터 속도 빨라짐
      />
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
