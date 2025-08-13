import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

type Props = {
  /** 하단에 표시할 안내 문구 (없으면 문구 미표시) */
  text?: string;
  /** 바깥 컨테이너에 추가할 클래스 */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement> &
  React.AriaAttributes;

export default function LoadingAnimation({ text, className, ...rest }: Props) {
  const t = useTranslations("Common");

  return (
    <div className={`flex flex-col items-center gap-5 pt-30 ${className ?? ""}`} {...rest}>
      {/* 트랙 컨테이너: global.css 키프레임과 호흡을 맞추기 위해 고정폭/고정높이 유지 */}
      <div className="relative h-[70px] w-[560px] overflow-visible" aria-label="loading">
        {/* 그림자 & 로고 (각각 기존 키프레임 그대로 적용) */}
        <div className="pointer-events-none select-none">
          <div className="animate-shadowScale-l2r shadow" />
          <Image
            src="/assets/icons/ic_logo.svg"
            alt="loading logo"
            width={80}
            height={80}
            className="logo animate-runBounce-l2r"
            priority
          />
        </div>
      </div>

      {/* 옵션 텍스트 */}
      {text ? <p className="font-Pretendard text-lg font-semibold text-gray-400">{text}</p> : t("loading")}
    </div>
  );
}
