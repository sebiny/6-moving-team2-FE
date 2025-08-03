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
import { getWritableReviews } from "@/lib/api/api-review";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TranslateRegion } from "@/utills/TranslateFunction";
import { MoveType } from "@/constant/moveTypes";
import { batchTranslate } from "@/utills/batchTranslate";

interface Props {
  setIsValid: (value: boolean) => void;
  setRating: (value: number) => void;
  setContent: (value: string) => void;
  setEstimateRequestId: (id: string) => void;
  setDriverId: (id: string) => void;
}

type ReviewItem = {
  id: string;
  moveType: MoveType;
  moveDate: string;
  fromAddress: { region: string; district: string };
  toAddress: { region: string; district: string };
  estimates: {
    price: number;
    driver: {
      nickname: string;
      shortIntro: string;
      profileImage: string | null;
    };
    isDesignated: boolean;
  }[];
};

export default function ModalContent({ setIsValid, setRating, setContent, setDriverId, setEstimateRequestId }: Props) {
  const { isSm, isLg } = useMediaHook();
  const [review, setReview] = useState<ReviewItem | null>(null);
  const t = useTranslations("Review");
  const locale = useLocale();
  const [translatedInfo, setTransaltedInfo] = useState({ fromD: "", fromR: "", toD: "", toR: "", date: "" });
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "yyyy년 MM월 dd일 (EEE)", { locale: ko });
  };
  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getWritableReviews(); // page 파라미터 생략 가능
        const first = data?.reviewableEstimates?.[0]; // 첫 번째 리뷰만 선택
        if (first) {
          setEstimateRequestId(first.id);
          setDriverId(first.estimates[0].driver.id);
          setReview(first);
        }
      } catch (error) {
        console.error("리뷰 가져오기 실패", error);
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    const translatedTexts = async () => {
      if (!review) return;
      if (locale === "ko") {
        setTransaltedInfo({
          fromD: review.fromAddress.district,
          fromR: review.fromAddress.region,
          toD: review.toAddress.district,
          toR: review.toAddress.region,
          date: formatDate(review.moveDate)
        });
        return;
      }
      try {
        const result = await batchTranslate(
          {
            fromD: review.fromAddress.district ?? "",
            fromR: review.fromAddress.region ?? "",
            toD: review.toAddress.district ?? "",
            toR: review.toAddress.region ?? "",
            date: formatDate(review.moveDate) ?? ""
          },
          locale
        );
        setTransaltedInfo({
          fromD: result.fromD,
          fromR: result.fromR,
          toD: result.toD,
          toR: result.toR,
          date: result.date
        });
      } catch (e) {
        console.warn("번역 실패", e);
      }
    };
    translatedTexts();
    console.log(translatedInfo);
  }, [review, locale]);

  const moveDetails = review
    ? [
        {
          label: "from",
          content:
            locale === "ko"
              ? `${TranslateRegion(review.fromAddress.region)} ${review.fromAddress.district}`
              : `${translatedInfo.fromR} ${translatedInfo.fromD}`
        },
        {
          label: "to",
          content:
            locale === "ko"
              ? `${TranslateRegion(review.toAddress.region)} ${review.toAddress.district}`
              : `${translatedInfo.toR} ${translatedInfo.toD}`
        },
        {
          label: "date",
          content: locale === "ko" ? formatDate(review.moveDate) : translatedInfo.date,
          isArrow: false
        }
      ]
    : [];

  return (
    <div className="flex flex-col gap-7 self-stretch lg:gap-8">
      {review && (
        <div>
          <div className="flex gap-3">
            <ChipRectangle moveType={review.moveType} size={!isLg && isSm ? "sm" : "md"} />
            {review.estimates[0].isDesignated && (
              <ChipRectangle moveType="REQUEST" size={!isLg && isSm ? "sm" : "md"} />
            )}
          </div>

          <div className="border-line-100 flex justify-between border-b pt-[14px] pb-3 lg:py-4">
            <div>
              {!isLg && isSm && <Image src={DriverIcon} width={15} height={18} alt="driver_icon" />}
              {isLg && <Image src={DriverIcon} width={18} height={20} alt="driver_icon" />}
              <p className="text-black-300 text-4 leading-[26px] font-semibold lg:text-[18px]">
                {review.estimates[0].driver.nickname}
                {t("driver.title")}
              </p>
            </div>

            <Image src={review.estimates[0].driver.profileImage ?? DriverImg} width={50} height={50} alt="driver_img" />
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
