import React, { useEffect, useState } from "react";
import useMediaHook from "@/hooks/useMediaHook";
import ReviewCost from "./ReviewCost";
import clsx from "clsx";
import Button from "@/components/Button";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TranslateRegion } from "@/utills/TranslateFunction";
import { batchTranslate } from "@/utills/batchTranslate";

interface ReviewsProps {
  setIsModal: (value: boolean) => void;
  review: {
    id: string;
    moveType: string;
    moveDate: string;
    fromAddress: { region: string; district: string };
    toAddress: { region: string; district: string };
    estimates: {
      id: string;
      price: number;
      driver: {
        id: string;
        nickname: string;
        shortIntro: string;
      };
    }[];
  };
}

export default function ReviewsInner({ setIsModal, review }: ReviewsProps) {
  const { isMd, isLg } = useMediaHook();
  const t = useTranslations("Review");
  const locale = useLocale();
  const [translatedInfo, setTransaltedInfo] = useState({ fromD: "", fromR: "", toD: "", toR: "", date: "" });
  const cost = review.estimates[0].price;

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "yyyy년 MM월 dd일 (EEE)", { locale: ko });
  };
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
  const moveDetails = [
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
      content: locale === "ko" ? formatDate(review.moveDate) : translatedInfo.date
    }
  ];
  return (
    <div className="flex h-[54px] max-w-[1040px] justify-between md:mt-6 lg:mt-0">
      <div className="flex md:gap-22 lg:gap-0">
        <div
          className={clsx("flex-wrap sm:mt-3 sm:flex md:mt-0", isMd && "gap-3", isLg && "gap-5", {
            "gap-1": locale === "en",
            "gap-5": locale === "ko" || locale === "zh"
          })}
        >
          {moveDetails.map(({ label, content }, index) => (
            <div
              key={label}
              className={clsx(
                index === 1 && "md:border-line-100 md:border-x md:px-4 lg:px-5",
                index === 2 && !isMd && !isLg && "border-line-100 border-r pr-4"
              )}
            >
              <p className="text-[12px] leading-[18px] text-gray-500 md:text-[14px] md:leading-[24px]">
                {t(`moveDetails.${label}`)}
              </p>
              <p className="text-black-500 text-[13px] leading-[22px] md:text-[16px] md:leading-[26px]">{content}</p>
            </div>
          ))}
          {isMd && !isLg && <ReviewCost cost={cost} />}
        </div>
      </div>
      {isLg && (
        <Button
          onClick={() => setIsModal(true)}
          type="orange"
          text={t("button.createReview")}
          className="h-[54px] w-40 sm:rounded-[12px] sm:font-medium"
        />
      )}
    </div>
  );
}
