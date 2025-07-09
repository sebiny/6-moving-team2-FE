import React from "react";
import ChipRectangle from "@/components/chip/ChipRectangle";
import Image from "next/image";
import clsx from "clsx";
import DriverIcon from "../../../../public/assets/icons/ic_driver.svg";
import arrow from "../../../../public/assets/icons/ic_arrow.svg";
import DriverImg from "../../../../public/assets/images/img_profile.svg";
import { moveDetails } from "@/constant/moveDetails";
import ReviewWrite from "./ReviewWrite";

interface Props {
  setIsValid: (value: boolean) => void;
}
export default function ModalContent({ setIsValid }: Props) {
  return (
    <div className="flex flex-col gap-8 self-stretch">
      <div>
        <div className="flex gap-3">
          <ChipRectangle moveType="SMALL" size="md" />
          <ChipRectangle moveType="REQUEST" size="md" />
        </div>
        <div className="border-line-100 flex justify-between border-b py-4">
          <div>
            <Image src={DriverIcon} width={18} height={20} alt="driver_icon" />
            <p className="text-black-300 text-[18px] leading-[26px] font-semibold">김코드 기사님</p>
          </div>
          <Image src={DriverImg} width={50} height={50} alt="driver_img" />
        </div>
        <div className="border-line-100 flex border-b py-4">
          {moveDetails.map(({ label, content, isArrow }) => (
            <div key={label} className={clsx("flex", label === "이사일" && "ml-10")}>
              <div>
                <p className="text-[14px] leading-6 text-gray-500">{label}</p>
                <p>{content}</p>
              </div>
              {isArrow && <Image src={arrow} width={16} height={23} alt="arrow" className="mx-3" />}
            </div>
          ))}
        </div>
      </div>
      <ReviewWrite setIsValid={setIsValid} />
    </div>
  );
}
