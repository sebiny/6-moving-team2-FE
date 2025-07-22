import React from "react";
import ChipRectangle from "@/components/chip/ChipRectangle";
import Image from "next/image";
import clsx from "clsx";
import DriverIcon from "../../../../../public/assets/icons/ic_driver.svg";
import arrow from "../../../../../public/assets/icons/ic_arrow.svg";
import DriverImg from "../../../../../public/assets/images/img_profile.svg";
import { moveDetails } from "@/constant/moveDetails";
import ReviewWrite from "./ReviewWrite";
import useMediaHook from "@/hooks/useMediaHook";

interface Props {
  setIsValid: (value: boolean) => void;
}
export default function ModalContent({ setIsValid }: Props) {
  const { isSm, isLg } = useMediaHook();
  return (
    <div className="flex flex-col gap-7 self-stretch lg:gap-8">
      <div>
        <div className="flex gap-3">
          <ChipRectangle moveType="SMALL" size={!isLg && isSm ? "sm" : "md"} />
          <ChipRectangle moveType="REQUEST" size={!isLg && isSm ? "sm" : "md"} />
        </div>
        <div className="border-line-100 flex justify-between border-b pt-[14px] pb-3 lg:py-4">
          <div>
            {!isLg && isSm && <Image src={DriverIcon} width={15} height={18} alt="driver_icon" />}
            {isLg && <Image src={DriverIcon} width={18} height={20} alt="driver_icon" />}
            <p className="text-black-300 text-4 leading-[26px] font-semibold lg:text-[18px]">김코드 기사님</p>
          </div>
          <Image src={DriverImg} width={50} height={50} alt="driver_img" />
        </div>
        <div className="border-line-100 flex border-b py-3 lg:py-4">
          {moveDetails.map(({ label, content, isArrow }, index) => (
            <div key={label} className={clsx("flex items-center", index == 2 && "ml-auto lg:ml-10")}>
              <div>
                <p className="text-[12px] leading-[18px] text-gray-500 lg:text-[14px] lg:leading-6">{label}</p>
                <p className="text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]">{content}</p>
              </div>
              {isArrow && <Image src={arrow} height={23} alt="arrow" className="mx-3 w-3 lg:w-4" />}
            </div>
          ))}
        </div>
      </div>
      <ReviewWrite setIsValid={setIsValid} />
    </div>
  );
}
