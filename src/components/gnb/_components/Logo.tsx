import imgLogo from "/public/assets/icons/ic_logo.svg";
import imgLogoText from "/public/assets/icons/ic_logo_text.svg";
import Image from "next/image";
import { useTransitionRouter } from "@/hooks/useTransitionRouter";

export default function Logo() {
  const { pushWithTransition } = useTransitionRouter();
  return (
    <button className="flex cursor-pointer items-center justify-between" onClick={() => pushWithTransition("/")}>
      <Image src={imgLogo} alt="무빙 이미지 로고" className="h-8 w-8 lg:h-11 lg:w-11" />
      <Image src={imgLogoText} alt="무빙 텍스트 로고" className="h-8 w-13 lg:h-10 lg:w-18" />
    </button>
  );
}
