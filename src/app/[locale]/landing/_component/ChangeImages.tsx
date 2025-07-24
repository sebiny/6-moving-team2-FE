import React, { useEffect, useState } from "react";
import ImgEstimateVisualDefault from "/public/assets/images/img_landing_card.png";
import ImgEstimateVisualMd from "/public/assets/images/img_landing_card_md.png";
import ImgEstimateVisualLg from "/public/assets/images/img_landing_card_lg.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ChangeImages() {
  const [windowWidth, setWindowWidth] = useState(0);
  const t = useTranslations("Landing");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    setWindowWidth(window.innerWidth); // 최초 렌더링 시 값 세팅
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let estimateVisualImg = ImgEstimateVisualDefault;
  if (windowWidth >= 1280) {
    estimateVisualImg = ImgEstimateVisualLg;
  } else if (windowWidth >= 375) {
    estimateVisualImg = ImgEstimateVisualMd;
  }

  return (
    <div className="relative">
      <Image src={estimateVisualImg} alt="견적카드" />
      <div className="absolute top-8 right-8 text-right text-xl font-bold text-gray-50 md:top-13 md:right-13 md:text-[32px] lg:top-38 lg:-translate-x-2/3 lg:text-left">
        {t("imageTitle")}
        <br />
        {t("brImageTitle")}
      </div>
    </div>
  );
}
