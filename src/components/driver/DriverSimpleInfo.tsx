import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface DriverSimpleInfoType {
  type: "my-page" | "detail";
  career: number;
  averageRating: number;
  reviewCount?: number;
  work: number;
}

function DriverSimpleInfo({ career, averageRating, reviewCount, work, type }: DriverSimpleInfoType) {
  const t = useTranslations("FindDriver");
  const textColor = type === "detail" ? "text-black-300" : "text-orange-400";
  const backgroundColor = type === "detail" ? "border-line-200 bg-gray-50" : "bg-background-100 border-line-100";

  return (
    <section
      className={`flex h-30 items-center justify-around rounded-2xl border ${backgroundColor}`}
      aria-label={t("driverPage.driverInfoSection")}
    >
      <div role="group" aria-labelledby="work-label" className="flex flex-col items-center gap-1">
        <p id="work-label">{t("driverPage.completed")}</p>
        <p className={`${textColor} text-xl font-bold`}>
          {work}
          {t("driverFindCard.count")}
        </p>
      </div>

      <div role="group" aria-labelledby="review-label" className="flex flex-col items-center gap-1">
        <p id="review-label">{t("driverPage.review")}</p>
        <div className="flex items-center gap-[6px]">
          {type === "detail" && (
            <Image
              src="/assets/icons/ic_star_yellow.svg"
              alt={t("driverFindCard.rating")}
              width={20}
              height={20}
              className="block"
            />
          )}
          <p aria-live="polite" className={`${textColor} text-xl font-bold`}>
            {(averageRating ?? 0).toFixed(1)}
          </p>
          {type === "detail" && <p className="text-gray-300">({reviewCount})</p>}
        </div>
      </div>

      <div role="group" aria-labelledby="career-label" className="flex flex-col items-center gap-1">
        <p id="career-label">{t("driverPage.Experience")}</p>
        <p className={`${textColor} text-xl font-bold`}>
          {career}
          {t("driverFindCard.year")}
        </p>
      </div>
    </section>
  );
}

export default DriverSimpleInfo;
