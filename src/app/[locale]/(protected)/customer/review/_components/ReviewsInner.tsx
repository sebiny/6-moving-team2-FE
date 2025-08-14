import React, { useEffect, useState } from "react";
import useMediaHook from "@/hooks/useMediaHook";
import ReviewCost from "./ReviewCost";
import clsx from "clsx";
import Button from "@/components/Button";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { TranslateRegion } from "@/utills/TranslateFunction";
import { ReviewsProps } from "@/types/reviewType";

export default function ReviewsInner({ setIsModal, review }: ReviewsProps) {
  const { isMd, isLg } = useMediaHook();
  const t = useTranslations("Review");
  const locale = useLocale();
  const [translatedInfo, setTransaltedInfo] = useState({
    fromDistrict: "",
    fromRegion: "",
    toDistrict: "",
    toRegion: "",
    date: ""
  });
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
          fromDistrict: review.fromAddress.district,
          fromRegion: review.fromAddress.region,
          toDistrict: review.toAddress.district,
          toRegion: review.toAddress.region,
          date: formatDate(review.moveDate)
        });
        return;
      }

      try {
        const translate = async (text: string) => {
          const res = await fetch(`http://localhost:4000/translate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, targetLang: locale.toUpperCase() })
          });
          const data = await res.json();
          return data.translation;
        };

        // 개별 번역
        const [fromDistrictTranslated, fromRegionTranslated, toDistrictTranslated, toRegionTranslated, dateTranslated] =
          await Promise.all([
            translate(review.fromAddress.district ?? ""),
            translate(review.fromAddress.region ?? ""),
            translate(review.toAddress.district ?? ""),
            translate(review.toAddress.region ?? ""),
            translate(formatDate(review.moveDate) ?? "")
          ]);

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
  }, [review, locale]);

  const moveDetails = [
    {
      label: "from",
      content:
        locale === "ko"
          ? `${TranslateRegion(review.fromAddress.region)} ${review.fromAddress.district}`
          : `${translatedInfo.fromRegion} ${translatedInfo.fromDistrict}`
    },
    {
      label: "to",
      content:
        locale === "ko"
          ? `${TranslateRegion(review.toAddress.region)} ${review.toAddress.district}`
          : `${translatedInfo.toRegion} ${translatedInfo.toDistrict}`
    },
    {
      label: "date",
      content: locale === "ko" ? formatDate(review.moveDate) : translatedInfo.date
    }
  ];
  return (
    <div className="flex h-[54px] max-w-[1040px] justify-between md:mt-6 lg:mt-0">
      <div className="flex md:gap-22 lg:gap-0">
        <section
          className={clsx("flex-wrap sm:mt-3 sm:flex md:mt-0", isMd && "gap-3", isLg && "gap-5", {
            "gap-1": locale === "en",
            "gap-5": locale === "ko" || locale === "zh"
          })}
          aria-labelledby="move-details-heading"
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
        </section>
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
