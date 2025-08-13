import React, { useEffect, useState } from "react";
import ChipRectangle from "@/components/chip/ChipRectangle";
import Image from "next/image";
import clsx from "clsx";
import DriverIcon from "/public/assets/icons/ic_driver.svg";
import arrow from "/public/assets/icons/ic_arrow.svg";
import DriverImg from "/public/assets/images/img_profile.svg";
import ReviewWrite from "./ReviewWrite";
import useMediaHook from "@/hooks/useMediaHook";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { MoveType } from "@/constant/moveTypes";
import { Address } from "@/types/reviewType";
import { TranslateRegion } from "@/utills/TranslateFunction";

interface Props {
  setIsValid: (value: boolean) => void;
  setRating: (value: number) => void;
  setContent: (value: string) => void;
  estimateRequestId: string;
  isDesignated: boolean;
  fromAddress: Address;
  toAddress: Address;
  moveDate: string;
  moveType: MoveType;
  driverNickName: string;
  driverProfileImage: string | null;
}

export default function ModalContent({
  setIsValid,
  setRating,
  setContent,
  estimateRequestId,
  moveDate,
  moveType,
  fromAddress,
  isDesignated,
  toAddress,
  driverNickName,
  driverProfileImage
}: Props) {
  const { isSm, isLg } = useMediaHook();
  const t = useTranslations("Review");
  const locale = useLocale();
  const [translatedInfo, setTransaltedInfo] = useState({
    fromDistrict: "",
    fromRegion: "",
    toDistrict: "",
    toRegion: "",
    date: ""
  });
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "yyyy년 MM월 dd일 (EEE)", { locale: ko });
  };

  useEffect(() => {
    const translatedTexts = async () => {
      if (!fromAddress || !toAddress) return;

      // 한국어면 그냥 원본 세팅
      if (locale === "ko") {
        setTransaltedInfo({
          fromDistrict: fromAddress.district,
          fromRegion: fromAddress.region,
          toDistrict: toAddress.district,
          toRegion: toAddress.region,
          date: formatDate(moveDate)
        });
        return;
      }

      try {
        // 각각 translate 호출
        const translate = async (text: string) => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/translate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, targetLang: locale.toUpperCase() })
          });
          const data = await res.json();
          return data.translation;
        };

        const fromDistrictTranslated = await translate(fromAddress.district ?? "");
        const fromRegionTranslated = await translate(fromAddress.region ?? "");
        const toDistrictTranslated = await translate(toAddress.district ?? "");
        const toRegionTranslated = await translate(toAddress.region ?? "");
        const dateTranslated = await translate(formatDate(moveDate) ?? "");

        setTransaltedInfo({
          fromDistrict: fromDistrictTranslated,
          fromRegion: fromRegionTranslated,
          toDistrict: toDistrictTranslated,
          toRegion: toRegionTranslated,
          date: dateTranslated
        });
      } catch (e) {
        console.warn("번역 실패", e);
      }
    };

    translatedTexts();
  }, [estimateRequestId, locale]);

  const moveDetails = estimateRequestId
    ? [
        {
          label: "from",
          content:
            locale === "ko"
              ? `${TranslateRegion(fromAddress.region)} ${fromAddress.district}`
              : `${translatedInfo.fromRegion} ${translatedInfo.fromDistrict}`
        },
        {
          label: "to",
          content:
            locale === "ko"
              ? `${TranslateRegion(toAddress.region)} ${toAddress.district}`
              : `${translatedInfo.toRegion} ${translatedInfo.toDistrict}`
        },
        {
          label: "date",
          content: locale === "ko" ? formatDate(moveDate) : translatedInfo.date,
          isArrow: false
        }
      ]
    : [];

  return (
    <div className="flex flex-col gap-7 self-stretch lg:gap-8">
      {estimateRequestId && (
        <div className="pointer-events-none">
          <div className="flex gap-3">
            <ChipRectangle moveType={moveType} size={!isLg && isSm ? "sm" : "md"} />
            {isDesignated && <ChipRectangle moveType="REQUEST" size={!isLg && isSm ? "sm" : "md"} />}
          </div>

          <div className="border-line-100 flex justify-between border-b pt-[14px] pb-3 lg:py-4">
            <div>
              {!isLg && isSm && <Image src={DriverIcon} width={15} height={18} alt="driver_icon" />}
              {isLg && <Image src={DriverIcon} width={18} height={20} alt="driver_icon" />}
              <p className="text-black-300 text-4 leading-[26px] font-semibold lg:text-[18px]">
                {driverNickName} {t("driver.title")}
              </p>
            </div>

            <Image src={driverProfileImage ?? DriverImg} width={50} height={50} alt="driver_img" />
          </div>

          <div className="border-line-100 flex border-b py-3 lg:py-4">
            {moveDetails.map(({ label, content, isArrow }, index) => (
              <div key={label} className={clsx("flex items-center", index === 2 && "ml-auto lg:ml-10")}>
                <div className={clsx(label === "from" && "mr-[20px]")}>
                  <p className="text-[12px] leading-[18px] text-gray-500 lg:text-[14px] lg:leading-6">
                    {t(`moveDetails.${label}`)}
                  </p>
                  <p className="text-[13px] leading-[22px] font-medium lg:text-[14px] lg:leading-[26px]">{content}</p>
                </div>
                {isArrow && <Image src={arrow} height={23} alt="arrow" className="mx-3 w-3 lg:w-4" />}
              </div>
            ))}
          </div>
        </div>
      )}

      <ReviewWrite setIsValid={setIsValid} setRating={setRating} setContent={setContent} />
    </div>
  );
}
