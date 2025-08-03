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
    <div className={`flex h-30 items-center justify-around rounded-2xl border ${backgroundColor}`}>
      <div className="flex flex-col items-center gap-1">
        <p>{t("driverPage.completed")}</p>
        <p className={`${textColor} text-xl font-bold`}>
          {work}
          {t("driverFindCard.count")}
        </p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p>{t("driverPage.review")}</p>
        <div className="flex items-center gap-[6px]">
          {type === "detail" && (
            <Image src="/assets/icons/ic_star_yellow.svg" alt="별점" width={20} height={20} className="block" />
          )}
          <p className={`${textColor} text-xl font-bold`}>{(averageRating ?? 0).toFixed(1)}</p>
          {type === "detail" && <p className="text-gray-300">({reviewCount})</p>}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p>{t("driverPage.Experience")}</p>
        <p className={`${textColor} text-xl font-bold`}>
          {career}
          {t("driverFindCard.year")}
        </p>
      </div>
    </div>
  );
}

export default DriverSimpleInfo;
