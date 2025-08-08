import Image from "next/image";
import React from "react";
import SmallMoving from "/public/assets/images/img_small_moving.svg";
import FamilyMoving from "/public/assets/images/img_family_moving.svg";
import OfficeMoving from "/public/assets/images/img_office_moving.svg";
import { useTranslations } from "next-intl";

export default function MovingCard({ type }: { type: "small" | "family" | "office" }) {
  const t = useTranslations("Landing");
  const MOVING_TYPE = {
    small: {
      src: SmallMoving,
      titleText: t("smallBox.text"),
      subText: t("smallBox.subText")
    },
    family: {
      src: FamilyMoving,
      titleText: t("familyBox.text"),
      subText: t("familyBox.subText")
    },
    office: {
      src: OfficeMoving,
      titleText: t("officeBox.text"),
      subText: t("officeBox.subText")
    }
  };
  return (
    <div className="bg-background-200 flex min-h-31 min-w-31 flex-col items-center justify-center rounded-[20px] border-orange-300 transition-all delay-100 duration-300 ease-in-out hover:scale-120 hover:border-2 sm:min-h-50 sm:min-w-50 sm:hover:border-3">
      <Image
        src={MOVING_TYPE[type].src}
        alt="소형이사"
        width={52}
        height={52}
        className="h-14 w-14 sm:h-25 sm:w-25"
        unoptimized
      />
      <div className="mt-2 flex flex-col text-center sm:mt-4">
        <span className="text-black-500 text-[10px] font-bold sm:text-base">{MOVING_TYPE[type].titleText}</span>
        <span className="text-[8px] font-medium text-gray-500 sm:text-[10px]">{MOVING_TYPE[type].subText}</span>
      </div>
    </div>
  );
}
