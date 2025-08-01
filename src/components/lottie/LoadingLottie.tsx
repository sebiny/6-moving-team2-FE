// components/lottie/LoadingLottie.tsx
import React from "react";
import Lottie from "react-lottie-player";
import loadingLottie from "../../../public/lottie/loadingLottie.json";
import { useTranslations } from "next-intl";

type LoadingLottieProps = {
  text?: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function LoadingLottie({ text, className, width = 150, height = 150 }: LoadingLottieProps) {
  const t = useTranslations("Common");
  return (
    <div className={`flex flex-col items-center gap-5 pt-30 ${className}`}>
      <Lottie loop animationData={loadingLottie} play style={{ width, height }} />
      <p className="font-Pretendard text-lg font-semibold text-gray-400">{text ?? t("loading")}</p>
    </div>
  );
}
